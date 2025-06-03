// src/app/login/__test__/page.test.tsx
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as authStore from "@/store/actions/auth";
import { useRouter } from "next/navigation";
import LoginPage from "../page";
import WrapperContext from "@/app/wrapper";

jest.mock("@/store/actions/auth");
jest.mock("next/navigation");

// Create a mock login function that we can control
const mockLogin = jest.fn();

jest.mock("@/context/auth.context", () => {
  const actual = jest.requireActual("@/context/auth.context");
  return {
    ...actual,
    useAuth: () => ({
      authData: null,
      login: mockLogin, // Use our controlled mock
      logout: jest.fn(),
      isAuthenticated: false,
    }),
  };
});

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    return <img src={src} alt={alt} {...props} />;
  },
}));

describe("Unit Testing Halaman Login Page", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogin.mockClear();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("Menampilkan halaman login secara normal", async () => {
    render(
      <WrapperContext>
        <LoginPage />
      </WrapperContext>
    );

    // Cek elemen utama login form
    expect(screen.getByText("Masuk Akun")).toBeInTheDocument();
    expect(screen.getByText("Masuk dengan Google")).toBeInTheDocument();
    expect(screen.getByText("Masuk dengan Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "LOGIN" })).toBeInTheDocument();
    expect(screen.getByText("Belum punya akun?")).toBeInTheDocument();
  });

  it("Menampilkan ilustrasi pada desktop", () => {
    render(
      <WrapperContext>
        <LoginPage />
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
        <LoginPage />
      </WrapperContext>
    );

    const loginButton = screen.getByRole("button", { name: "LOGIN" });
    await user.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText("Email atau username wajib diisi")
      ).toBeInTheDocument();
      expect(screen.getByText("Password wajib diisi")).toBeInTheDocument();
    });
  });

  it("Menguji validasi password minimal 6 karakter", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <LoginPage />
      </WrapperContext>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "LOGIN" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "123");
    await user.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Minimal 6 karakter")).toBeInTheDocument();
    });
  });

  it("Menguji proses login berhasil", async () => {
    const user = userEvent.setup();

    // Mock successful login
    mockLogin.mockResolvedValue({
      message: "login success",
      data: {
        profile: {
          name: "Test User",
          photo: "test.jpg",
        },
        token: {
          access_token: "test-token",
          type: "bearer",
          expired_at: 1631897246,
        },
        role: "user",
        privileges: ["competition"],
        clubs: [],
        can_participate: true,
        user_id: "test-id",
        owners: [],
      },
    });

    render(
      <WrapperContext>
        <LoginPage />
      </WrapperContext>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "LOGIN" });

    // Fill the form
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    // Debug: Check if inputs have values
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");

    // Submit the form
    await user.click(loginButton);

    // Wait for the login function to be called
    await waitFor(
      () => {
        expect(mockLogin).toHaveBeenCalledWith(
          "test@example.com",
          "password123"
        );
      },
      { timeout: 3000 }
    );

    // Should redirect after successful login
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("Menguji handle saat login gagal", async () => {
    const user = userEvent.setup();

    // Mock failed login
    mockLogin.mockRejectedValue(new Error("Login failed"));

    render(
      <WrapperContext>
        <LoginPage />
      </WrapperContext>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "LOGIN" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(loginButton);

    await waitFor(
      () => {
        expect(mockLogin).toHaveBeenCalledWith(
          "test@example.com",
          "wrongpassword"
        );
      },
      { timeout: 3000 }
    );

    // Check for error alert instead of console.error
    await waitFor(() => {
      expect(
        screen.getByText("Terjadi kesalahan. Silakan coba lagi")
      ).toBeInTheDocument();
    });

    // Verify the alert has error styling
    const errorAlert = screen.getByRole("alert");
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert).toHaveClass("MuiAlert-colorError");
  });

  // Alternative test using form submission instead of button click
  it("Menguji proses login berhasil dengan form submission", async () => {
    const user = userEvent.setup();

    mockLogin.mockResolvedValue({
      message: "login success",
      data: {
        profile: { name: "Test User", photo: "test.jpg" },
        token: {
          access_token: "test-token",
          type: "bearer",
          expired_at: 1631897246,
        },
        role: "user",
        privileges: ["competition"],
        clubs: [],
        can_participate: true,
        user_id: "test-id",
        owners: [],
      },
    });

    render(
      <WrapperContext>
        <LoginPage />
      </WrapperContext>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    // Submit form by pressing Enter in password field
    await user.type(passwordInput, "{enter}");

    await waitFor(
      () => {
        expect(mockLogin).toHaveBeenCalledWith(
          "test@example.com",
          "password123"
        );
      },
      { timeout: 3000 }
    );
  });

  it("Menguji link navigasi ke halaman register", () => {
    render(
      <WrapperContext>
        <LoginPage />
      </WrapperContext>
    );

    const registerLink = screen.getByRole("link", { name: "Daftar →" });
    expect(registerLink).toHaveAttribute("href", "/register");
  });

  it("Menguji link lupa password", () => {
    render(
      <WrapperContext>
        <LoginPage />
      </WrapperContext>
    );

    const forgotPasswordLink = screen.getByText("Lupa password?");
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink.closest("a")).toHaveAttribute("href", "#");
  });

  it("Menguji tombol social login", () => {
    render(
      <WrapperContext>
        <LoginPage />
      </WrapperContext>
    );

    const googleButton = screen.getByText("Masuk dengan Google");
    const facebookButton = screen.getByText("Masuk dengan Facebook");

    expect(googleButton).toBeInTheDocument();
    expect(facebookButton).toBeInTheDocument();

    // Tombol social login belum memiliki fungsi, jadi hanya test keberadaan
    expect(googleButton.closest("button")).toBeInTheDocument();
    expect(facebookButton.closest("button")).toBeInTheDocument();
  });

  it("Menguji responsivitas layout", () => {
    render(
      <WrapperContext>
        <LoginPage />
      </WrapperContext>
    );

    // Test struktur layout responsif
    const mainContainer =
      screen.getByText("Masuk Akun").closest("[data-testid]") ||
      screen.getByText("Masuk Akun").closest("div");

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
        <LoginPage />
      </WrapperContext>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    await user.type(emailInput, "valid@email.com");
    await user.type(passwordInput, "validpassword");

    expect(emailInput).toHaveValue("valid@email.com");
    expect(passwordInput).toHaveValue("validpassword");
  });

  it("Menguji clear form setelah error", async () => {
    const user = userEvent.setup();

    render(
      <WrapperContext>
        <LoginPage />
      </WrapperContext>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "LOGIN" });

    // Isi dengan data tidak valid
    await user.type(passwordInput, "123");
    await user.click(loginButton);

    // Tunggu error muncul
    await waitFor(() => {
      expect(screen.getByText("Minimal 6 karakter")).toBeInTheDocument();
    });

    // Clear dan isi ulang dengan data valid
    await user.clear(passwordInput);
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "validpassword");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("validpassword");
  });

  it("Menguji penutupan alert error", async () => {
    const user = userEvent.setup();

    // Mock failed login
    mockLogin.mockRejectedValue(new Error("Login failed"));

    render(
      <WrapperContext>
        <LoginPage />
      </WrapperContext>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "LOGIN" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(loginButton);

    // Wait for error alert to appear
    await waitFor(() => {
      expect(
        screen.getByText("Terjadi kesalahan. Silakan coba lagi")
      ).toBeInTheDocument();
    });

    // Find and click close button
    const closeButton = screen.getByRole("button", { name: "Close" });
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);

    // Alert should be dismissed
    await waitFor(() => {
      expect(
        screen.queryByText("Terjadi kesalahan. Silakan coba lagi")
      ).not.toBeInTheDocument();
    });
  });
});
