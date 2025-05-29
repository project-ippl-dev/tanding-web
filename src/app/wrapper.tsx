"use client";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import themePack from "../theme/theme";
import { AuthProvider } from "@/context/auth.context";
import { NotificationProvider } from "@/context/notification.context";
import { LoadingProvider } from "@/context/loading.context";




export default function WrapperContext({ children }: {children: React.ReactNode}) {
  return (
    <NotificationProvider>
      <LoadingProvider>
        <AuthProvider>
          <ThemeProvider theme={themePack}>
           {children}
          </ThemeProvider>
        </AuthProvider>
      </LoadingProvider>
    </NotificationProvider>
  );
}