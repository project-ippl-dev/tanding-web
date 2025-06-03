"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Paper,
  Stack,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";

type LoginFormValues = { username: string; password: string };

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const { login } = useAuth();
  const router = useRouter();
  const [loginError, setLoginError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      setLoginError(""); // Clear previous errors

      await login(data.username, data.password);
      router.push("/"); // redirect after success
    } catch (err: any) {
      // Handle different types of errors
      if (
        err.message.includes("Invalid credentials") ||
        err.message.includes("password") ||
        err.message.includes("unauthorized")
      ) {
        setLoginError("Email atau password yang Anda masukkan salah");
      } else if (
        err.message.includes("network") ||
        err.message.includes("fetch")
      ) {
        setLoginError("Koneksi bermasalah. Silakan coba lagi");
      } else if (err.message.includes("User not found")) {
        setLoginError("Akun tidak ditemukan. Silakan daftar terlebih dahulu");
      } else {
        setLoginError("Terjadi kesalahan. Silakan coba lagi");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={2}
      bgcolor="#fafafa"
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack alignItems="center" spacing={2} mb={3}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "linear-gradient(to right, #ec4899, #8b5cf6)",
              }}
            />
            <Typography variant="h5" fontWeight="bold">
              Masuk Akun
            </Typography>
          </Stack>

          {/* Error Alert */}
          {loginError && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
              onClose={() => setLoginError("")}
            >
              {loginError}
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              backgroundColor: "#4285F4",
              ":hover": { backgroundColor: "#3367D6" },
              mb: 1,
            }}
            disabled={isLoading}
          >
            Masuk dengan Google
          </Button>
          <Button
            variant="contained"
            fullWidth
            startIcon={<FacebookIcon />}
            sx={{
              backgroundColor: "#3B5998",
              ":hover": { backgroundColor: "#2d4373" },
              mb: 2,
            }}
            disabled={isLoading}
          >
            Masuk dengan Facebook
          </Button>

          <TextField
            {...register("username", {
              required: "Email atau username wajib diisi",
            })}
            type="email"
            label="Email"
            size="small"
            fullWidth
            margin="normal"
            error={!!errors.username}
            helperText={errors.username?.message}
            disabled={isLoading}
          />

          <TextField
            {...register("password", {
              required: "Password wajib diisi",
              minLength: {
                value: 6,
                message: "Minimal 6 karakter",
              },
            })}
            type="password"
            label="Password"
            size="small"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={isLoading}
          />

          <Typography variant="body2" align="right" mt={1}>
            <MuiLink href="#" underline="hover">
              Lupa password?
            </MuiLink>
          </Typography>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(to right, #ec4899, #8b5cf6)",
              "&:hover": {
                background: "linear-gradient(to right, #db2777, #7c3aed)",
              },
              "&:disabled": {
                background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                opacity: 0.6,
              },
            }}
          >
            {isLoading ? "Masuk..." : "LOGIN"}
          </Button>

          <Typography
            variant="body2"
            align="center"
            mt={3}
            color="text.secondary"
          >
            Belum punya akun?{" "}
            <MuiLink href="/register" underline="hover" color="primary">
              Daftar →
            </MuiLink>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}
