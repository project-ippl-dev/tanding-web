// src/app/(with-nav-layout)/check-certificate/__tests__/page.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckCertificatePage from "../page";
import WrapperContext from "@/app/wrapper";
import * as certificateActions from "@/store/actions/certificate";

// Mock certificate actions
jest.mock("@/store/actions/certificate");
const mockGetDetailCertificate =
  certificateActions.getDetailCertificate as jest.MockedFunction<
    typeof certificateActions.getDetailCertificate
  >;

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

  it("Menguji input certificate ID", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <CheckCertificatePage />
      </WrapperContext>
    );

    const input = screen.getByPlaceholderText("Masukkan ID Sertifikat");
    await user.type(input, "cert-123");

    expect(input).toHaveValue("cert-123");
  });

  it("Menguji tombol submit disabled ketika input kosong", () => {
    render(
      <WrapperContext>
        <CheckCertificatePage />
      </WrapperContext>
    );

    const submitButton = screen.getByRole("button", { name: "Kirim" });
    expect(submitButton).toBeDisabled();
  });

  it("Menguji tombol submit enabled ketika ada input", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <CheckCertificatePage />
      </WrapperContext>
    );

    const input = screen.getByPlaceholderText("Masukkan ID Sertifikat");
    const submitButton = screen.getByRole("button", { name: "Kirim" });

    await user.type(input, "cert-123");
    expect(submitButton).toBeEnabled();
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

  it("Menguji loading state", async () => {
    const user = userEvent.setup();
    mockGetDetailCertificate.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(
      <WrapperContext>
        <CheckCertificatePage />
      </WrapperContext>
    );

    const input = screen.getByPlaceholderText("Masukkan ID Sertifikat");
    const submitButton = screen.getByRole("button", { name: "Kirim" });

    await user.type(input, "cert-123");
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
  });

  it("Menguji handle error jaringan", async () => {
    const user = userEvent.setup();
    mockGetDetailCertificate.mockRejectedValue(new Error("Network error"));

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
      expect(
        screen.getByText("Sertifikat Tidak Ditemukan")
      ).toBeInTheDocument();
    });
  });

  it("Menguji style gradient button", () => {
    render(
      <WrapperContext>
        <CheckCertificatePage />
      </WrapperContext>
    );

    const submitButton = screen.getByRole("button", { name: "Kirim" });
    expect(submitButton).toHaveStyle({
      background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
    });
  });

  it("Menguji form validation dengan whitespace", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <CheckCertificatePage />
      </WrapperContext>
    );

    const input = screen.getByPlaceholderText("Masukkan ID Sertifikat");
    const submitButton = screen.getByRole("button", { name: "Kirim" });

    await user.type(input, "   ");
    expect(submitButton).toBeEnabled(); // Should allow whitespace but trim on submit
  });
});
