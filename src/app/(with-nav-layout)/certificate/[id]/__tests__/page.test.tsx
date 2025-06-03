// src/app/(with-nav-layout)/certificate/[id]/__tests__/page.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CertificateDetailPage from "../page";
import WrapperContext from "@/app/wrapper";
import * as certificateActions from "@/store/actions/certificate";

// Mock certificate actions
jest.mock("@/store/actions/certificate");
const mockGetDetailCertificate =
  certificateActions.getDetailCertificate as jest.MockedFunction<
    typeof certificateActions.getDetailCertificate
  >;

// Mock useParams
jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "cert-123" }),
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

const mockCertificateDetailResponse = {
  data: {
    certificate: {
      id: "cert-123",
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
        certificate_id: "cert-123",
      });
    });

    await waitFor(() => {
      expect(screen.getByText("CERTIFICATE")).toBeInTheDocument();
      expect(screen.getByText("OF APPRECIATION")).toBeInTheDocument();
      // Use getAllByText and check that at least one exists
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

  it("Menampilkan certificate image dengan benar", async () => {
    mockGetDetailCertificate.mockResolvedValue(mockCertificateDetailResponse);

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      const certificateImage = screen.getByAltText("certificate");
      expect(certificateImage).toBeInTheDocument();
    });
  });

  it("Menampilkan download button dalam state disabled", async () => {
    mockGetDetailCertificate.mockResolvedValue(mockCertificateDetailResponse);

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      const downloadButton = screen.getByRole("button", { name: /download/i });
      expect(downloadButton).toBeDisabled();
    });
  });

  it("Menampilkan certificate ID dan URL dengan benar", async () => {
    mockGetDetailCertificate.mockResolvedValue(mockCertificateDetailResponse);

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(screen.getByText("Certificate ID : cert-123")).toBeInTheDocument();
      expect(
        screen.getByText("Certificate URL : tanding.live/certificate/cert-123")
      ).toBeInTheDocument();
    });
  });

  it("Menampilkan tanggal certificate dengan format yang benar", async () => {
    mockGetDetailCertificate.mockResolvedValue(mockCertificateDetailResponse);

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      expect(screen.getByText("Tanding!")).toBeInTheDocument();
      // moment format will show the date
      expect(screen.getByText(/Sunday, 01 January 2023/)).toBeInTheDocument();
    });
  });

  it("Menampilkan certificate layout dengan positioning yang benar", async () => {
    mockGetDetailCertificate.mockResolvedValue(mockCertificateDetailResponse);

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      // Test certificate sections are positioned correctly
      expect(screen.getByText("Diberikan Kepada:")).toBeInTheDocument();
      expect(screen.getByText("Sebagai:")).toBeInTheDocument();
      expect(screen.getByText("Pada Acara:")).toBeInTheDocument();
    });
  });

  it("Menampilkan avatar penerima dengan benar", async () => {
    mockGetDetailCertificate.mockResolvedValue(mockCertificateDetailResponse);

    render(
      <WrapperContext>
        <CertificateDetailPage />
      </WrapperContext>
    );

    await waitFor(() => {
      // Should show avatar in the sidebar section - more specific selector
      const avatars = screen.getAllByRole("img");
      const recipientAvatar = avatars.find(
        (img) =>
          img.getAttribute("src") === "http://example.com/avatar.jpg" ||
          img.closest("[sx]") // Avatar is usually wrapped in MUI Box with sx prop
      );
      expect(recipientAvatar).toBeInTheDocument();
    });
  });

  it("Menguji certificate data tanpa event", async () => {
    const responseWithoutEvent = {
      data: {
        certificate: {
          id: "cert-123",
          name: "Jane Smith", // Different name to avoid conflicts
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
      // Use getAllByText for potentially multiple occurrences
      const janeSmithElements = screen.getAllByText("Jane Smith");
      expect(janeSmithElements.length).toBeGreaterThan(0);
      // Tournament item should not be rendered without event data
      expect(screen.queryAllByTestId("tournament-item")).toHaveLength(0);
    });
  });
});
