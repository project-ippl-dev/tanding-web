import React from "react";
// Updated Material-UI imports
import { Grid, Box, Typography } from "@mui/material";
import { styleData } from "@/types/global";

function customStyle(): styleData {
  const result = {
    title: {
      color: "#fff",
      fontWeight: "bold",
      marginBottom: "20px",
    },
  }

  return result
}

export default function BoxGrid ({ 
  xs, padding, children, title 
}:{
  xs: number,
  padding: number,
  children: React.ReactNode,
  title: string
}) {
  const style = customStyle()
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
};

