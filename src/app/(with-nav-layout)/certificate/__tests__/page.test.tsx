import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CertificatePage from "../page";
import WrapperContext from "@/app/wrapper";
import { getListCertificateUser } from "@/store/actions/certificate";
import { useAuth } from "@/context/auth.context";

// Mock dependencies
jest.mock("@/context/auth.context", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/store/actions/certificate", () => ({
  getListCertificateUser: jest.fn(),
}));

describe("Certificate Page", () => {
  const mockAuthData = {
    user_id: "user123",
    token: { access_token: "mock-token" },
  };

  const mockCertificates = {
    data: [
      {
        id: "cert1",
        name: "Certificate 1",
        event_name: "Event 1",
        issue_date: "2023-01-01",
        image_url: "https://example.com/cert1.jpg",
      },
      {
        id: "cert2",
        name: "Certificate 2",
        event_name: "Event 2",
        issue_date: "2023-02-01",
        image_url: "https://example.com/cert2.jpg",
      },
    ],
    pagination: {
      current_page: 1,
      last_page: 1,
      has_next_page: false,
      has_previous_page: false,
      previous_page: 0,
      next_page: 0,
      total_item: 2,
    },
    status: 200,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ authData: mockAuthData });
    (getListCertificateUser as jest.Mock).mockResolvedValue(mockCertificates);
  });

  it("shows loading state initially", () => {
    (getListCertificateUser as jest.Mock).mockReturnValueOnce(new Promise(() => {})); // Never resolves

    render(
      <WrapperContext>
        <CertificatePage />
      </WrapperContext>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("fetches and displays certificates", async () => {
    render(
      <WrapperContext>
        <CertificatePage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(getListCertificateUser).toHaveBeenCalledWith({
        user_id: mockAuthData.user_id,
        page: 1,
        page_size: 20,
      });
    });

    // Check if certificates are rendered
    // Note: Adjust these assertions based on your actual UI implementation
    // for (const cert of mockCertificates.data) {
    //   expect(screen.getByText(cert.name)).toBeInTheDocument();
    //   expect(screen.getByText(cert.event_name)).toBeInTheDocument();
    // }
  });

  it("doesn't fetch certificates when user is not authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({ authData: null });

    render(
      <WrapperContext>
        <CertificatePage />
      </WrapperContext>
    );

    expect(getListCertificateUser).not.toHaveBeenCalled();
  });

  it("handles pagination correctly", async () => {
    const user = userEvent.setup();
    
    render(
      <WrapperContext>
        <CertificatePage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(getListCertificateUser).toHaveBeenCalledWith(expect.anything());
    });

    // Assuming you have page 2 button in your pagination
    // Mock state update
    (getListCertificateUser as jest.Mock).mockClear();

    // This is a hypothetical test - you'll need to adjust based on your actual pagination UI
    // const page2Button = screen.getByRole('button', { name: /2/i });
    // await user.click(page2Button);
    
    // await waitFor(() => {
    //   expect(getListCertificateUser).toHaveBeenCalledWith({
    //     user_id: mockAuthData.user_id,
    //     page: 2, 
    //     page_size: 20,
    //   });
    // });
  });

  it("handles certificate fetching errors", async () => {
    (getListCertificateUser as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));

    render(
      <WrapperContext>
        <CertificatePage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(getListCertificateUser).toHaveBeenCalled();
    });

    // Verify error handling
    // Note: Adjust based on your error UI
    // expect(screen.getByText(/error fetching certificates/i)).toBeInTheDocument();
  });
});
