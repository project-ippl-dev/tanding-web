"use client";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import themePack from "../theme/theme";

export default function Wrapper({ children }: {children: React.ReactNode}) {
  return (
      <ThemeProvider theme={themePack}>
        {children}
      </ThemeProvider>
  );
}