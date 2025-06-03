"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Link,
  Paper,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type RegisterFormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_TANDING_API_BASE_URL;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password", "");

  const normalizePhone = (phone: string): string => {
    return phone.startsWith("08")
      ? "+62" + phone.slice(1)
      : phone.startsWith("+62")
      ? phone
      : "+62" + phone;
  };

  const onSubmit = async (data: RegisterFormValues) => {
    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: normalizePhone(data.phone.trim()),
      password: data.password,
      confirm_password: data.confirmPassword,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.message || "Gagal mendaftar.");
      }

      const result = await res.json();
      // TODO: redirect or toast
    } catch (err: any) {
      console.error("Register failed:", err.message);
      // TODO: show error to user
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
          <Box textAlign="center" mb={3}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                mx: "auto",
                background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
              }}
            />
            <Typography variant="h5" fontWeight="bold" mt={2}>
              Daftar Akun Baru
            </Typography>
          </Box>

          <TextField
            {...register("name", {
              required: "Nama wajib diisi",
              validate: (value) =>
                value.trim() !== "" || "Nama tidak boleh kosong",
            })}
            label="Nama Lengkap"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Format email tidak valid",
              },
            })}
            label="E-mail"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            {...register("phone", {
              required: "Nomor HP wajib diisi",
              pattern: {
                value: /^(?:08|\+628)\d{7,12}$/,
                message: "Gunakan format 08xxx atau +628xx",
              },
            })}
            label="No Handphone"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

          <TextField
            {...register("password", {
              required: "Password wajib diisi",
              minLength: {
                value: 6,
                message: "Minimal 6 karakter",
              },
            })}
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            {...register("confirmPassword", {
              validate: (value) =>
                value === password || "Password tidak cocok",
            })}
            type="password"
            label="Ulangi Password"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
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
            DAFTAR
          </Button>

          <Box textAlign="center" mt={3}>
            <Typography variant="body2" color="text.secondary">
              Sudah punya akun?{" "}
              <Link href="/login" underline="hover" color="primary">
                Login →
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
