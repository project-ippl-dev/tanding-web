// src/app/(with-nav-layout)/certificate/[id]/__test__/page.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CertificateDetailPage from "../page";
import WrapperContext from "@/app/wrapper";

// Mock certificate actions with proper module mocking
jest.mock("@/store/actions/certificate", () => ({
  getDetailCertificate: jest.fn(),
}));

// Import the mocked function after mocking
import * as certificateActions from "@/store/actions/certificate";

// Mock useParams - use the same ID that appears in your test error
jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "bc50d5d6-6cef-4789-8d05-87db60a876e1" }),
}));

// Mock TournamentItem component
jest.mock("@/components/TournamentItem", () => {
  return function MockTournamentItem({ data }: any) {
    return (
      <div data-testid="tournament-item">
        Tournament: {data?.name || "Unknown"}
      </div>
    );
  };
});

// Mock Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Cast the mocked function for proper typing
const mockGetDetailCertificate = certificateActions.getDetailCertificate as jest.MockedFunction<
  typeof certificateActions.getDetailCertificate
>;

const mockCertificateDetailResponse = {
  data: {
    certificate: {
      id: "bc50d5d6-6cef-4789-8d05-87db60a876e1",
      name: "John Doe",
      reward_as: "Juara 1",
      event_name: "Test Tournament",
      created_at: "2023-01-01T00:00:00Z",
      recipient: "http://example.com/avatar.jpg",
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

describe("Unit Testing Certificate Detail Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Menampilkan loading state", () => {
    mockGetDetailCertificate.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("Menampilkan certificate detail secara normal", async () => {
    mockGetDetailCertificate.mockResolvedValue(mockCertificateDetailResponse);

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(mockGetDetailCertificate).toHaveBeenCalledWith({
        certificate_id: "bc50d5d6-6cef-4789-8d05-87db60a876e1",
      });
    });

    await waitFor(() => {
      expect(screen.getByText("CERTIFICATE")).toBeInTheDocument();
      expect(screen.getByText("OF APPRECIATION")).toBeInTheDocument();
      
      // Check that certificate data is displayed
      const johnDoeElements = screen.getAllByText("John Doe");
      expect(johnDoeElements.length).toBeGreaterThan(0);
      expect(screen.getByText("Juara 1")).toBeInTheDocument();
      
      const tournamentElements = screen.getAllByText("Test Tournament");
      expect(tournamentElements.length).toBeGreaterThan(0);
    });
  });

  it("Menampilkan error ketika certificate tidak ditemukan", async () => {
    mockGetDetailCertificate.mockResolvedValue({
      error: "Certificate not found",
      status: 404,
    });

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Sertifikat Tidak Ditemukan")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Sertifikat dengan ID tersebut tidak tersedia atau telah dihapus."
        )
      ).toBeInTheDocument();
    });
  });

  it("Menguji handle error jaringan", async () => {
    mockGetDetailCertificate.mockRejectedValue(new Error("Network error"));

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Sertifikat Tidak Ditemukan")
      ).toBeInTheDocument();
    });
  });

  it("Menampilkan certificate dengan elemen penting", async () => {
    mockGetDetailCertificate.mockResolvedValue(mockCertificateDetailResponse);

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      // Check certificate image
      const certificateImage = screen.getByAltText("certificate");
      expect(certificateImage).toBeInTheDocument();
      
      // Check download button (should be disabled)
      const downloadButton = screen.getByRole("button", { name: /download/i });
      expect(downloadButton).toBeDisabled();
      
      // Check certificate ID and URL
      expect(screen.getByText("Certificate ID : bc50d5d6-6cef-4789-8d05-87db60a876e1")).toBeInTheDocument();
      expect(
        screen.getByText("Certificate URL : tanding.live/certificate/bc50d5d6-6cef-4789-8d05-87db60a876e1")
      ).toBeInTheDocument();
      
      // Check certificate sections
      expect(screen.getByText("Diberikan Kepada:")).toBeInTheDocument();
      expect(screen.getByText("Sebagai:")).toBeInTheDocument();
      expect(screen.getByText("Pada Acara:")).toBeInTheDocument();
      
      // Check date formatting
      expect(screen.getByText("Tanding!")).toBeInTheDocument();
      expect(screen.getByText(/Sunday, 01 January 2023/)).toBeInTheDocument();
    });
  });

  it("Menguji certificate data tanpa event", async () => {
    const responseWithoutEvent = {
      data: {
        certificate: {
          id: "bc50d5d6-6cef-4789-8d05-87db60a876e1",
          name: "Jane Smith",
          reward_as: "Juara 2",
          event_name: "Different Tournament",
          created_at: "2023-01-01T00:00:00Z",
          recipient: "http://example.com/avatar2.jpg",
        },
      },
      message: "Certificate found successfully",
      recipient: {
        id: "user-456",
        name: "Jane Smith",
        photo: "http://example.com/avatar2.jpg",
      },
      event: null, // No event data
    };

    mockGetDetailCertificate.mockResolvedValue(responseWithoutEvent);

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(screen.getByText("CERTIFICATE")).toBeInTheDocument();
      
      // Check that certificate data is displayed
      const janeSmithElements = screen.getAllByText("Jane Smith");
      expect(janeSmithElements.length).toBeGreaterThan(0);
      
      // Tournament item should not be rendered without event data
      expect(screen.queryAllByTestId("tournament-item")).toHaveLength(0);
    });
  });
});