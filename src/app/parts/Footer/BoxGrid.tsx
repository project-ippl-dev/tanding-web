"use client";
import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { styleData } from "@/types/global";
import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

function customStyle(theme: Theme | null): styleData {
  return {
    title: {
      color: "#fff",
      fontWeight: "bold",
      marginBottom: theme ? theme.spacing(2.5) : "20px",
    },
  };
}

export default function BoxGrid({
  xs,
  padding,
  children,
  title,
}: {
  xs: number;
  padding: number;
  children: React.ReactNode;
  title: string;
}) {
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  const parameter = isClient ? theme : null;
  const style = customStyle(parameter);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Grid size={{ xs }}>
      <Box padding={padding}>
        {title && (
          <Typography variant="h4" align="center" style={style.title}>
            {title}
          </Typography>
        )}
        {children && children}
      </Box>
    </Grid>
  );
}

