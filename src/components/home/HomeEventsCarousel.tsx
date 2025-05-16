"use client";
import { Box, Container, Typography } from "@mui/material";
import Carousel from "../carousel/Carousel";

export default function HomeEventsCarousel() {
  // const data = await fetchData(); // Example Fetch data from the API

  return (
    <Box
      sx={(theme) => ({
        marginTop: theme.spacing(2),
        padding: theme.spacing(0, 3),
        [theme.breakpoints.down("md")]: {
          marginTop: theme.spacing(7),
          padding: theme.spacing(0, 0),
        },
      })}
    >
      <Carousel />
    </Box>
  );
}
