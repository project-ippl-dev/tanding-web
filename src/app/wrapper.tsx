"use client";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import themePack from "../theme/theme";
import { AuthProvider } from "@/context/auth.context";
import { NotificationProvider } from "@/context/notification.context";




export default function WrapperContext({ children }: {children: React.ReactNode}) {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ThemeProvider theme={themePack}>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}