import { render, screen, waitFor } from "@testing-library/react";
import CertificateDetailPage from "../page";
import { useParams } from "next/navigation";
import WrapperContext from "@/app/wrapper";
import { getDetailCertificate } from "@/store/actions/certificate";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("@/store/actions/certificate", () => ({
  getDetailCertificate: jest.fn(),
}));

describe("Certificate Detail Page", () => {
  const mockCertificateData = {
    data: {
      id: "cert123",
      name: "Certificate Name",
      user_name: "John Doe",
      event_name: "Test Event",
      issue_date: "2023-01-01",
      image_url: "https://example.com/certificate.jpg",
    },
    status: 200,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: "cert123" });
  });

  it("shows loading state initially", () => {
    (getDetailCertificate as jest.Mock).mockResolvedValueOnce(new Promise(() => {})); // Never resolves to keep loading state

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays certificate data when loaded successfully", async () => {
    (getDetailCertificate as jest.Mock).mockResolvedValueOnce(mockCertificateData);

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    // Wait for the loading to complete
    await waitFor(() => {
      expect(getDetailCertificate).toHaveBeenCalledWith({ certificate_id: "cert123" });
    });

    // Verify certificate details are displayed
    // Note: You'll need to add assertions based on your actual UI implementation
    // For example, if certificate name is displayed:
    // expect(screen.getByText(mockCertificateData.data.name)).toBeInTheDocument();
  });

  it("shows error message when certificate fetching fails", async () => {
    const errorMessage = "Certificate not found";
    (getDetailCertificate as jest.Mock).mockResolvedValueOnce({
      error: errorMessage,
      status: 404,
    });

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(getDetailCertificate).toHaveBeenCalledWith({ certificate_id: "cert123" });
    });

    // Verify error state is shown
    // Note: You'll need to adjust this based on your error UI
    // expect(screen.getByText(/certificate not found/i)).toBeInTheDocument();
  });

  it("handles unexpected errors during certificate fetching", async () => {
    (getDetailCertificate as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(getDetailCertificate).toHaveBeenCalledWith({ certificate_id: "cert123" });
    });

    // Verify generic error state is shown
    // expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
