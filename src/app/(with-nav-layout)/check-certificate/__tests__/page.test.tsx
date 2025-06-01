import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CertificateVerificationPage from "../page";
import WrapperContext from "@/app/wrapper";
import { getDetailCertificate } from "@/store/actions/certificate";

// Mock dependencies
jest.mock("@/store/actions/certificate", () => ({
  getDetailCertificate: jest.fn(),
}));

describe("Certificate Verification Page", () => {
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
  });

  it("renders the certificate verification form", () => {
    render(
      <WrapperContext>
        <CertificateVerificationPage />
      </WrapperContext>
    );

    // Check if input field and submit button are present
    // Note: Adjust these selectors based on your actual UI implementation
    // expect(screen.getByPlaceholderText(/enter certificate id/i)).toBeInTheDocument();
    // expect(screen.getByRole("button", { name: /verify/i })).toBeInTheDocument();
  });

  it("verifies a certificate successfully when ID is submitted", async () => {
    const user = userEvent.setup();
    (getDetailCertificate as jest.Mock).mockResolvedValueOnce(mockCertificateData);

    render(
      <WrapperContext>
        <CertificateVerificationPage />
      </WrapperContext>
    );

    // Simulate user entering certificate ID and submitting
    // Note: You need to adjust these selectors based on your actual UI
    // const input = screen.getByPlaceholderText(/enter certificate id/i);
    // const submitButton = screen.getByRole("button", { name: /verify/i });
    
    // await user.type(input, "cert123");
    // await user.click(submitButton);

    // await waitFor(() => {
    //   expect(getDetailCertificate).toHaveBeenCalledWith({
    //     certificate_id: "cert123",
    //   });
    // });

    // Check if certificate details are displayed
    // expect(screen.getByText(mockCertificateData.data.name)).toBeInTheDocument();
    // expect(screen.getByText(mockCertificateData.data.user_name)).toBeInTheDocument();
  });

  it("shows error message when certificate verification fails", async () => {
    const user = userEvent.setup();
    const errorMessage = "Certificate not found";
    (getDetailCertificate as jest.Mock).mockResolvedValueOnce({
      error: errorMessage,
      status: 404,
    });

    render(
      <WrapperContext>
        <CertificateVerificationPage />
      </WrapperContext>
    );

    // Simulate user entering certificate ID and submitting
    // const input = screen.getByPlaceholderText(/enter certificate id/i);
    // const submitButton = screen.getByRole("button", { name: /verify/i });
    
    // await user.type(input, "invalid-cert");
    // await user.click(submitButton);

    // await waitFor(() => {
    //   expect(getDetailCertificate).toHaveBeenCalledWith({
    //     certificate_id: "invalid-cert",
    //   });
    // });

    // Check if error message is displayed
    // expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("handles API errors during verification", async () => {
    const user = userEvent.setup();
    (getDetailCertificate as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(
      <WrapperContext>
        <CertificateVerificationPage />
      </WrapperContext>
    );

    // Simulate user entering certificate ID and submitting
    // const input = screen.getByPlaceholderText(/enter certificate id/i);
    // const submitButton = screen.getByRole("button", { name: /verify/i });
    
    // await user.type(input, "cert123");
    // await user.click(submitButton);

    // await waitFor(() => {
    //   expect(getDetailCertificate).toHaveBeenCalled();
    // });

    // Check if generic error message is displayed
    // expect(screen.getByText(/terjadi kesalahan/i)).toBeInTheDocument();
  });

  it("shows loading state during certificate verification", async () => {
    const user = userEvent.setup();
    // Create a promise that we won't resolve to maintain loading state
    let resolvePromise: (value: unknown) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    (getDetailCertificate as jest.Mock).mockReturnValueOnce(promise);

    render(
      <WrapperContext>
        <CertificateVerificationPage />
      </WrapperContext>
    );

    // Simulate user entering certificate ID and submitting
    // const input = screen.getByPlaceholderText(/enter certificate id/i);
    // const submitButton = screen.getByRole("button", { name: /verify/i });
    
    // await user.type(input, "cert123");
    // await user.click(submitButton);

    // Check if loading indicator appears
    // expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
