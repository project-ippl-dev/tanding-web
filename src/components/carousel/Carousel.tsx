"use client";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Box, IconButton, Slide, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import DesktopBanner from "@/assets/images/banner-desktop.jpg";
import MobileBanner from "@/assets/images/banner-mobile.jpg";
import Image from "next/image";

export default function Carousel() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<
    "right" | "left" | undefined
  >("left");

  const handleNextPage = () => {
    setSlideDirection("left");
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection("right");
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        height: "400px",
      }}
    >
      <IconButton
        onClick={handlePrevPage}
        sx={{
          margin: 5,
        }}
        disabled={currentPage === 0}
      >
        <NavigateBefore />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          height: "400px",
          width: "500px",
        }}
      >
        {/* RENDER IMAGES */}
        {[1, 2].map((val, i) => (
          <Slide
            direction={slideDirection}
            in={currentPage === i}
            key={`slide-${i}`}
          >
            <Box
              component="div"
              sx={{ width: "100%", height: "100%", backgroundColor: "red" }}
            >
              <Image
                  key={`image-${val}-${i}`}
                  src={DesktopBanner}
                  alt="Banner"
                />
              {/* <Typography>Teeessttt</Typography> */}
            </Box>
          </Slide>
        ))}
      </Box>
      <IconButton
        onClick={handleNextPage}
        sx={{
          margin: 5,
        }}
        disabled={currentPage === 1}
      >
        <NavigateNext />
      </IconButton>
    </Box>
  );
}
