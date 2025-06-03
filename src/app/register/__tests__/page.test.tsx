// src/app/register/__tests__/page.test.tsx
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterPage from "../page";
import WrapperContext from "@/app/wrapper";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock environment variable
process.env.NEXT_PUBLIC_TANDING_API_BASE_URL = "http://localhost:3000/api";

describe("Unit Testing Halaman Register Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
  });

  it("Menampilkan halaman register secara normal", async () => {
    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    // Cek elemen utama register form
    expect(screen.getByText("Daftar Akun Baru")).toBeInTheDocument();
    expect(screen.getByLabelText("Nama Lengkap")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("No Handphone")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Ulangi Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "DAFTAR" })).toBeInTheDocument();
    expect(screen.getByText("Sudah punya akun?")).toBeInTheDocument();
  });

  it("Menampilkan ilustrasi pada desktop", () => {
    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    // Cek apakah ilustrasi ditampilkan
    const illustration = screen.getByAltText("Illustration");
    expect(illustration).toBeInTheDocument();
    expect(illustration).toHaveAttribute("src", "/login-illustration.png");
  });

  it("Menguji validasi form kosong", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    const registerButton = screen.getByRole("button", { name: "DAFTAR" });
    await user.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Nama wajib diisi")).toBeInTheDocument();
      expect(screen.getByText("Email wajib diisi")).toBeInTheDocument();
      expect(screen.getByText("Nomor HP wajib diisi")).toBeInTheDocument();
      expect(screen.getByText("Password wajib diisi")).toBeInTheDocument();
    });
  });

  it("Menguji validasi format email tidak valid", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    const emailInput = screen.getByLabelText("E-mail");
    const registerButton = screen.getByRole("button", { name: "DAFTAR" });

    await user.type(emailInput, "email-tidak-valid");
    await user.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Format email tidak valid")).toBeInTheDocument();
    });
  });

  it("Menguji validasi format nomor HP tidak valid", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    const phoneInput = screen.getByLabelText("No Handphone");
    const registerButton = screen.getByRole("button", { name: "DAFTAR" });

    await user.type(phoneInput, "123");
    await user.click(registerButton);

    await waitFor(() => {
      expect(
        screen.getByText("Gunakan format 08xxx atau +628xx")
      ).toBeInTheDocument();
    });
  });

  it("Menguji validasi password minimal 6 karakter", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    const passwordInput = screen.getByLabelText("Password");
    const registerButton = screen.getByRole("button", { name: "DAFTAR" });

    await user.type(passwordInput, "123");
    await user.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Minimal 6 karakter")).toBeInTheDocument();
    });
  });

  it("Menguji validasi password tidak cocok", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Ulangi Password");
    const registerButton = screen.getByRole("button", { name: "DAFTAR" });

    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "berbeda123");
    await user.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Password tidak cocok")).toBeInTheDocument();
    });
  });

  it("Menguji toggle visibilitas password", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", { name: "" }); // visibility toggle button

    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("Menguji proses registrasi berhasil", async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Registration successful" }),
    });

    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    const nameInput = screen.getByLabelText("Nama Lengkap");
    const emailInput = screen.getByLabelText("E-mail");
    const phoneInput = screen.getByLabelText("No Handphone");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Ulangi Password");
    const registerButton = screen.getByRole("button", { name: "DAFTAR" });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(phoneInput, "081234567890");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(registerButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Register success:", {
        message: "Registration successful",
      });
    });

    consoleSpy.mockRestore();
  });

  it("Menguji handle saat registrasi gagal", async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Registration failed" }),
    });

    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    const nameInput = screen.getByLabelText("Nama Lengkap");
    const emailInput = screen.getByLabelText("E-mail");
    const phoneInput = screen.getByLabelText("No Handphone");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Ulangi Password");
    const registerButton = screen.getByRole("button", { name: "DAFTAR" });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(phoneInput, "081234567890");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(registerButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Register failed:",
        "Registration failed"
      );
    });

    consoleSpy.mockRestore();
  });

  it("Menguji link navigasi ke halaman login", () => {
    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    const loginLink = screen.getByRole("link", { name: "Login →" });
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("Menguji validasi nama dengan whitespace saja", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    const nameInput = screen.getByLabelText("Nama Lengkap");
    const registerButton = screen.getByRole("button", { name: "DAFTAR" });

    await user.type(nameInput, "   ");
    await user.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Nama tidak boleh kosong")).toBeInTheDocument();
    });
  });

  it("Menguji responsivitas layout", () => {
    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    // Test struktur layout responsif
    const mainContainer = screen.getByText("Daftar Akun Baru").closest("div");
    expect(mainContainer).toBeInTheDocument();

    // Pada mobile, ilustrasi disembunyikan (display: none pada xs)
    const illustrationContainer =
      screen.getByAltText("Illustration").parentElement;
    expect(illustrationContainer).toBeInTheDocument();
  });

  it("Menguji input form dengan data valid", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    const nameInput = screen.getByLabelText("Nama Lengkap");
    const emailInput = screen.getByLabelText("E-mail");
    const phoneInput = screen.getByLabelText("No Handphone");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Ulangi Password");

    await user.type(nameInput, "Test User");
    await user.type(emailInput, "test@example.com");
    await user.type(phoneInput, "081234567890");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");

    expect(nameInput).toHaveValue("Test User");
    expect(emailInput).toHaveValue("test@example.com");
    expect(phoneInput).toHaveValue("081234567890");
    expect(passwordInput).toHaveValue("password123");
    expect(confirmPasswordInput).toHaveValue("password123");
  });

  it("Menguji handle error jaringan saat registrasi", async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    mockFetch.mockRejectedValue(new Error("Network error"));

    render(
      <WrapperContext>
        <RegisterPage />
      </WrapperContext>
    );

    const nameInput = screen.getByLabelText("Nama Lengkap");
    const emailInput = screen.getByLabelText("E-mail");
    const phoneInput = screen.getByLabelText("No Handphone");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Ulangi Password");
    const registerButton = screen.getByRole("button", { name: "DAFTAR" });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(phoneInput, "081234567890");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(registerButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Register failed:",
        "Network error"
      );
    });

    consoleSpy.mockRestore();
  });
});
