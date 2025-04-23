"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Paper,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

type LoginFormValues = {
  username: string;
  password: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_TANDING_API_BASE_URL;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Gagal masuk.");
      }

      const result = await response.json();
      console.log("Login success:", result);
      // TODO: set token, redirect, toast

    } catch (error: any) {
      console.error("Login failed:", error.message);
      // TODO: show error message to user
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

          <Button
            variant="contained"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              backgroundColor: "#4285F4",
              ":hover": { backgroundColor: "#3367D6" },
              mb: 1,
            }}
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
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(to right, #ec4899, #8b5cf6)",
              "&:hover": {
                background: "linear-gradient(to right, #db2777, #7c3aed)",
              },
            }}
          >
            LOGIN
          </Button>

          <Typography variant="body2" align="center" mt={3} color="text.secondary">
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
