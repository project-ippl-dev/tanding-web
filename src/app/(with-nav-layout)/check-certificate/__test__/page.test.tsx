// src/app/(with-nav-layout)/check-certificate/__test__/page.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckCertificatePage from "../page";
import WrapperContext from "@/app/wrapper";

// Mock certificate actions with proper module mocking
jest.mock("@/store/actions/certificate", () => ({
  getDetailCertificate: jest.fn(),
}));

// Import the mocked function after mocking
import * as certificateActions from "@/store/actions/certificate";

// Mock LayoutCertificate component
jest.mock("../_components/LayoutCertificate", () => {
  return function MockLayoutCertificate({ data }: any) {
    return (
      <div data-testid="layout-certificate">
        Certificate for: {data?.certificate?.name || "Unknown"}
      </div>
    );
  };
});

// Cast the mocked function for proper typing
const mockGetDetailCertificate = certificateActions.getDetailCertificate as jest.MockedFunction<
  typeof certificateActions.getDetailCertificate
>;

const mockCertificateResponse = {
  data: {
    certificate: {
      id: "cert-123",
      name: "John Doe",
      reward_as: "Juara 1",
      event_name: "Test Tournament",
      created_at: "2023-01-01T00:00:00Z",
    },
  },
  message: "Certificate found successfully",
  recipient: {
    id: "user-123",
    name: "John Doe",
    photo: "http://example.com/avatar.jpg",
  },
  event: {
    id: "event-123",
    name: "Test Tournament",
    description: "Test Description",
  },
};

describe("Unit Testing Check Certificate Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Menampilkan halaman check certificate secara normal", () => {
    render(
      <WrapperContext>
        <CheckCertificatePage />
      </WrapperContext>
    );

    expect(screen.getByText("Cek Sertifikat")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Masukkan ID Sertifikat")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Kirim" })).toBeInTheDocument();
  });

  it("Menguji form input dan validation", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <CheckCertificatePage />
      </WrapperContext>
    );

    const input = screen.getByPlaceholderText("Masukkan ID Sertifikat");
    const submitButton = screen.getByRole("button", { name: "Kirim" });

    // Initially, submit button should be disabled when input is empty
    expect(submitButton).toBeDisabled();

    // Type certificate ID
    await user.type(input, "cert-123");
    expect(input).toHaveValue("cert-123");

    // Submit button should be enabled when there's input
    expect(submitButton).toBeEnabled();

    // Test with whitespace
    await user.clear(input);
    await user.type(input, "   ");
    expect(submitButton).toBeEnabled(); // Should allow whitespace but trim on submit
  });

  it("Menguji pencarian certificate berhasil", async () => {
    const user = userEvent.setup();
    mockGetDetailCertificate.mockResolvedValue(mockCertificateResponse);

    render(
      <WrapperContext>
        <CheckCertificatePage />
      </WrapperContext>
    );

    const input = screen.getByPlaceholderText("Masukkan ID Sertifikat");
    const submitButton = screen.getByRole("button", { name: "Kirim" });

    await user.type(input, "cert-123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockGetDetailCertificate).toHaveBeenCalledWith({
        certificate_id: "cert-123",
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId("layout-certificate")).toBeInTheDocument();
      expect(screen.getByText("Certificate for: John Doe")).toBeInTheDocument();
    });
  });

  it("Menguji certificate tidak ditemukan", async () => {
    const user = userEvent.setup();
    mockGetDetailCertificate.mockResolvedValue({
      error: "Certificate not found",
      status: 404,
    });

    render(
      <WrapperContext>
        <CheckCertificatePage />
      </WrapperContext>
    );

    const input = screen.getByPlaceholderText("Masukkan ID Sertifikat");
    const submitButton = screen.getByRole("button", { name: "Kirim" });

    await user.type(input, "invalid-cert");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Sertifikat Tidak Ditemukan")
      ).toBeInTheDocument();
    });
  });

  it("Menguji loading state dan handle error jaringan", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <CheckCertificatePage />
      </WrapperContext>
    );

    const input = screen.getByPlaceholderText("Masukkan ID Sertifikat");
    let submitButton = screen.getByRole("button", { name: "Kirim" });

    // Test network error first (to avoid pointer-events issue)
    mockGetDetailCertificate.mockRejectedValue(new Error("Network error"));
    await user.type(input, "cert-456");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Sertifikat Tidak Ditemukan")
      ).toBeInTheDocument();
    });

    // Clear and test loading state by checking button disabled state after click
    await user.clear(input);
    mockGetDetailCertificate.mockImplementation(() => new Promise(() => {})); // Never resolves
    await user.type(input, "cert-123");
    
    // Check that button becomes disabled during loading
    await user.click(submitButton);
    
    // Wait a bit and check if button is disabled
    await waitFor(() => {
      const disabledButton = screen.getByRole("button", { name: "Kirim" });
      expect(disabledButton).toBeDisabled();
    });
  });

  it("Menguji style gradient button", () => {
    render(
      <WrapperContext>
        <CheckCertificatePage />
      </WrapperContext>
    );

    const submitButton = screen.getByRole("button", { name: "Kirim" });
    
    // Check if button has gradient background
    const buttonStyle = getComputedStyle(submitButton);
    expect(submitButton).toHaveStyle({
      background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
    });
  });
});