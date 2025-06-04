// src/app/(with-nav-layout)/certificate/__test__/page.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CertificatePage from "../page";
import WrapperContext from "@/app/wrapper";

// Mock certificate actions with proper module mocking
jest.mock("@/store/actions/certificate", () => ({
  getListCertificateUser: jest.fn(),
}));

// Import the mocked function after mocking
import * as certificateActions from "@/store/actions/certificate";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock CertificateItem component
jest.mock("../_components/CertificateItem", () => {
  return function MockCertificateItem({ data }: any) {
    return (
      <div data-testid="certificate-item">
        <div>{data.event_name}</div>
        <div>{data.reward_as}</div>
        <div>{data.name}</div>
      </div>
    );
  };
});

// Mock auth context to return test user data
jest.mock("@/context/auth.context", () => {
  const actual = jest.requireActual("@/context/auth.context");
  return {
    ...actual,
    useAuth: () => ({
      authData: {
        user_id: "test-user-id",
        profile: { name: "Test User" },
        token: { access_token: "mock-token" },
      },
    }),
  };
});

// Cast the mocked function for proper typing
const mockGetListCertificateUser = certificateActions.getListCertificateUser as jest.MockedFunction<
  typeof certificateActions.getListCertificateUser
>;

const mockCertificateData = [
  {
    id: "cert-1",
    name: "Test Certificate 1",
    event_name: "Test Event 1",
    thumbnail: "http://example.com/thumb1.jpg",
    reward_as: "Juara 1",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "cert-2",
    name: "Test Certificate 2",
    event_name: "Test Event 2",
    thumbnail: "http://example.com/thumb2.jpg",
    reward_as: "Juara 2",
    created_at: "2023-01-02T00:00:00Z",
  },
];

const mockPagination = {
  current_page: 1,
  last_page: 2,
  has_next_page: true,
  has_previous_page: false,
  previous_page: 0,
  next_page: 2,
  total_item: 25,
};

describe("Unit Testing Certificate Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Menampilkan halaman certificate secara normal", async () => {
    mockGetListCertificateUser.mockResolvedValue({
      message: "success",
      data: mockCertificateData,
      pagination: mockPagination,
    });

    render(
      <WrapperContext>
        <CertificatePage />
      </WrapperContext>
    );

    // Check header
    expect(screen.getByText("Sertifikat")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockGetListCertificateUser).toHaveBeenCalledWith({
        user_id: "test-user-id",
        page: 1,
        page_size: 20,
      });
    });

    await waitFor(() => {
      expect(screen.getByText("Test Event 1")).toBeInTheDocument();
      expect(screen.getByText("Test Event 2")).toBeInTheDocument();
    });
  });

  it("Menampilkan loading state", () => {
    mockGetListCertificateUser.mockImplementation(() => {
      return new Promise(() => {}); // Never resolves to keep loading state
    });

    render(
      <WrapperContext>
        <CertificatePage />
      </WrapperContext>
    );

    // Should show skeleton loading initially
    const skeletons = document.querySelectorAll(".MuiSkeleton-root");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("Menampilkan pesan kosong ketika tidak ada certificate", async () => {
    mockGetListCertificateUser.mockResolvedValue({
      message: "success",
      data: [],
      pagination: { ...mockPagination, total_item: 0 },
    });

    render(
      <WrapperContext>
        <CertificatePage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Tidak ada sertifikat yang ditemukan")
      ).toBeInTheDocument();
    });
  });

  it("Menguji pagination", async () => {
    const user = userEvent.setup();

    // First call for page 1
    mockGetListCertificateUser
      .mockResolvedValueOnce({
        message: "success",
        data: mockCertificateData,
        pagination: mockPagination,
      })
      // Second call for page 2
      .mockResolvedValueOnce({
        message: "success",
        data: mockCertificateData,
        pagination: { ...mockPagination, current_page: 2 },
      });

    render(
      <WrapperContext>
        <CertificatePage />
      </WrapperContext>
    );

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText("Test Event 1")).toBeInTheDocument();
    });

    // Find pagination and click page 2
    const pagination = screen.getByRole("navigation");
    expect(pagination).toBeInTheDocument();

    // Click on page 2 button
    const page2Button = screen.getByLabelText("Go to page 2");
    await user.click(page2Button);

    await waitFor(() => {
      expect(mockGetListCertificateUser).toHaveBeenCalledWith({
        user_id: "test-user-id",
        page: 2,
        page_size: 20,
      });
    });
  });

  it("Menguji handle error saat fetch certificate", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    mockGetListCertificateUser.mockRejectedValue(new Error("Network error"));

    render(
      <WrapperContext>
        <CertificatePage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching certificates:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  it("Menguji certificate item rendering", async () => {
    mockGetListCertificateUser.mockResolvedValue({
      message: "success",
      data: mockCertificateData,
      pagination: mockPagination,
    });

    render(
      <WrapperContext>
        <CertificatePage />
      </WrapperContext>
    );

    await waitFor(() => {
      const certificateItems = screen.getAllByTestId("certificate-item");
      expect(certificateItems).toHaveLength(mockCertificateData.length);
    });

    // Check that certificate data is properly displayed
    await waitFor(() => {
      expect(screen.getByText("Test Event 1")).toBeInTheDocument();
      expect(screen.getByText("Juara 1")).toBeInTheDocument();
      expect(screen.getByText("Test Event 2")).toBeInTheDocument();
      expect(screen.getByText("Juara 2")).toBeInTheDocument();
    });
  });
});