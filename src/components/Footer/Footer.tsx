"use client";
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
// Updated Material-UI imports
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";

import BoxGrid from "./parts/BoxGrid";
import { styleData } from "@/types/global";

function customStyle(theme: Theme | null): styleData {
  const result = {
    root: {
      color: "#fff",
      ...(theme && {
        [theme.breakpoints.down("md")]: {
          paddingBottom: theme.spacing(7),
        },
      }),
    },
    img: {
      width: "30%",
      height: "auto",
    },
    textBold: {
      fontWeight: "600",
      color: "inherit",
    },
    containCopyright: {
      ...(theme && {
        padding: theme.spacing(3),
      }),
    },
    copyright: {
      fontSize: "14px",
    },
  };
  return result;
}

const Footer = () => {
  const [isClient, setIsClient] = useState(false);

  const theme = useTheme();
  const parameter = isClient ? theme : null;
  const style = customStyle(parameter);
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Grid container sx={{ ...style.root, background: "#2f3640" }}>
      <Grid size={{ md: 4, xs: 12 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          flexDirection="column"
          paddingY={3}
        >
          <img src="/images/logoWithText.png" style={style.img} />
          <Typography sx={style.copyright} align="center">
            Copyright 2025 - Tanding!
          </Typography>
        </Box>
      </Grid>
      {isMdUp && isClient && (
        <>
          <BoxGrid size={{ xs: 4 }} padding={4} title="Links">
            <Typography color="inherit">FAQ User</Typography>
            <Typography color="inherit">FAQ Partner</Typography>
            <Typography color="inherit">FAQ Sponsor</Typography>
            <Typography color="inherit">Term and Services</Typography>
            <Typography color="inherit">About Us</Typography>
          </BoxGrid>
          <BoxGrid size={{ xs: 4 }} padding={4} title="Have a Question">
            <Typography sx={style.textBold}>Tanding!</Typography>
            <Typography>email: tanding.indonesia@gmail.com</Typography>
          </BoxGrid>
        </>
      )}
    </Grid>
  );
};

export default Footer;
