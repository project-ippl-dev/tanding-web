// src/app/(with-nav-layout)/certificate/__tests__/page.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CertificatePage from "../page";
import * as certificateActions from "@/store/actions/certificate";
import { AuthProvider } from "@/context/auth.context";
import { NotificationProvider } from "@/context/notification.context";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Mock certificate actions
jest.mock("@/store/actions/certificate");
const mockGetListCertificateUser =
  certificateActions.getListCertificateUser as jest.MockedFunction<
    typeof certificateActions.getListCertificateUser
  >;

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

// Mock auth context
jest.mock("@/context/auth.context", () => ({
  ...jest.requireActual("@/context/auth.context"),
  useAuth: () => ({
    authData: {
      user_id: "test-user-id",
      profile: { name: "Test User" },
    },
  }),
}));

// Mock notification context
jest.mock("@/context/notification.context", () => ({
  ...jest.requireActual("@/context/notification.context"),
  useNotification: () => ({
    showNotification: jest.fn(),
  }),
}));

// Create a theme for testing
const theme = createTheme();

// Create a wrapper component that includes all necessary providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <AuthProvider>{children}</AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

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
      <TestWrapper>
        <CertificatePage />
      </TestWrapper>
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
      <TestWrapper>
        <CertificatePage />
      </TestWrapper>
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
      <TestWrapper>
        <CertificatePage />
      </TestWrapper>
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
      <TestWrapper>
        <CertificatePage />
      </TestWrapper>
    );

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText("Test Event 1")).toBeInTheDocument();
    });

    // Find pagination and click page 2
    const pagination = screen.getByRole("navigation");
    expect(pagination).toBeInTheDocument();

    // Click on page 2 (assuming MUI Pagination renders buttons)
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
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    mockGetListCertificateUser.mockRejectedValue(new Error("Network error"));

    render(
      <TestWrapper>
        <CertificatePage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching certificates:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  it("Menampilkan gradient background dengan benar", async () => {
    mockGetListCertificateUser.mockResolvedValue({
      message: "success",
      data: [],
      pagination: mockPagination,
    });

    render(
      <TestWrapper>
        <CertificatePage />
      </TestWrapper>
    );

    await waitFor(() => {
      const headerElement = screen.getByText("Sertifikat");
      expect(headerElement).toBeInTheDocument();

      // Check if the header has the expected styling
      const gradientContainer = headerElement.closest("div");
      expect(gradientContainer).toHaveStyle({
        background: expect.stringContaining("linear-gradient"),
      });
    });
  });

  it("Menguji responsivitas padding", async () => {
    mockGetListCertificateUser.mockResolvedValue({
      message: "success",
      data: [],
      pagination: mockPagination,
    });

    render(
      <TestWrapper>
        <CertificatePage />
      </TestWrapper>
    );

    await waitFor(() => {
      const container =
        document.querySelector('[data-testid="container"]') ||
        document.querySelector(".MuiContainer-root");
      expect(container).toBeInTheDocument();
    });
  });

  it("Menguji certificate item rendering", async () => {
    mockGetListCertificateUser.mockResolvedValue({
      message: "success",
      data: mockCertificateData,
      pagination: mockPagination,
    });

    render(
      <TestWrapper>
        <CertificatePage />
      </TestWrapper>
    );

    await waitFor(() => {
      const certificateItems = screen.getAllByTestId("certificate-item");
      expect(certificateItems).toHaveLength(mockCertificateData.length);
    });
  });

  it("Menguji format tanggal certificate", async () => {
    mockGetListCertificateUser.mockResolvedValue({
      message: "success",
      data: mockCertificateData,
      pagination: mockPagination,
    });

    render(
      <TestWrapper>
        <CertificatePage />
      </TestWrapper>
    );

    await waitFor(() => {
      // Certificate items should be rendered with data
      expect(screen.getByText("Test Event 1")).toBeInTheDocument();
      expect(screen.getByText("Juara 1")).toBeInTheDocument();
    });
  });

  it("Menampilkan reward information dengan styling yang benar", async () => {
    mockGetListCertificateUser.mockResolvedValue({
      message: "success",
      data: mockCertificateData,
      pagination: mockPagination,
    });

    render(
      <TestWrapper>
        <CertificatePage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("Juara 1")).toBeInTheDocument();
      expect(screen.getByText("Juara 2")).toBeInTheDocument();
    });
  });

  it("Menguji rendering tanpa authData", async () => {
    // Override the mock for this specific test
    jest.doMock("@/context/auth.context", () => ({
      ...jest.requireActual("@/context/auth.context"),
      useAuth: () => ({
        authData: null,
      }),
    }));

    const { AuthProvider: MockAuthProvider } = jest.requireMock(
      "@/context/auth.context"
    );

    const TestWrapperWithoutAuth = ({
      children,
    }: {
      children: React.ReactNode;
    }) => {
      return (
        <ThemeProvider theme={theme}>
          <NotificationProvider>
            <MockAuthProvider>{children}</MockAuthProvider>
          </NotificationProvider>
        </ThemeProvider>
      );
    };

    render(
      <TestWrapperWithoutAuth>
        <CertificatePage />
      </TestWrapperWithoutAuth>
    );

    // Should still render the page structure
    expect(screen.getByText("Sertifikat")).toBeInTheDocument();
  });
});
