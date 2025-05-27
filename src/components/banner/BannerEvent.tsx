"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import BannerEventImage from "@/assets/images/banner-event.jpg";
import { useRouter } from "next/navigation";

export default function BannerEvent() {
  const router = useRouter();
  return (
    <Box
      component={"div"}
      sx={{
        position: "relative",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;",
        borderRadius: "10px",
      }}
    >
      <Image
        className="w-full aspect-16/5 object-cover block rounded-lg"
        src={BannerEventImage}
        alt="Banner"
      />
      <Box
        component={"div"}
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <Typography
          sx={{
            color: "#F38C0C",
            fontWeight: 900,
            fontSize: "60px",
          }}
        >
          Tanding!
        </Typography>
        <Typography
          sx={{
            fontSize: "20px",
          }}
        >
          Temukan tournament semua olahraga dengan mudah pada aplikasi{" "}
          <b>Tanding!</b>
        </Typography>
        <Box
          component={"div"}
          sx={(theme) => ({
            display: "flex",
            marginTop: theme.spacing(2),
          })}
        >
          <Button
            size="large"
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #F3AEEE 0%, #9195FA 100%)",
              color: "#fff",
              boxShadow: "none",
              fontWeight: "bold",
              borderRadius: "0",
              fontSize: "17px",
              "&:hover": {
                boxShadow: "none",
              },
            }}
            onClick={() => router.push("/create-tournament")}
          >
            Buat Turnamen Baru!
          </Button>
          <Button
            size="large"
            variant="outlined"
            sx={{
              borderColor: "#9195FA",
              color: "#9195FA",
              borderWidth: "5px",
              borderRadius: "0",
              fontWeight: "bold",
              fontSize: "17px",
              "&:hover": {
                boxShadow: "none",
              },
            }}
            onClick={() => router.push("/tournament")}
          >
            Cari Turnamen
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
