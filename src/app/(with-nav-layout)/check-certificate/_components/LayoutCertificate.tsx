"use client";

import React from "react";
import moment from "moment";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import LayoutCertificateBg from "@/assets/images/layout-certificate.jpg"

interface CertificateData {
  certificate: {
    id: string;
    name: string;
    reward_as: string;
    event_name: string;
    created_at: string;
  };
}

interface LayoutCertificateProps {
  data: CertificateData;
}

export default function LayoutCertificate({ data }: LayoutCertificateProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        border: "1px solid #efefef",
        padding: 1,
      }}
    >
      <div style={{ position: "relative" }}>
        <Image
          src={LayoutCertificateBg}
          alt="certificate"
          width={1000}
          height={700}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: "3%",
            top: "5%",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.8vw",
              color: "grey",
              [theme.breakpoints.down("md")]: {
                fontSize: "1.3vw",
              },
            }}
          >
            {`Certificate ID : ${data?.certificate.id}`}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.8vw",
              color: "grey",
              [theme.breakpoints.down("md")]: {
                fontSize: "1.3vw",
              },
            }}
          >
            {`Certificate URL : tanding.live/certificate/${data?.certificate.id}`}
          </Typography>
        </Box>

        {/* Certificate Title */}
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            left: "3%",
            top: "17%",
          }}
        >
          <Typography
            sx={{
              fontSize: "3.5vw",
              fontWeight: 600,
              lineHeight: "3vw",
              [theme.breakpoints.down("md")]: {
                lineHeight: "3.5vw",
                fontSize: "4vw",
              },
            }}
          >
            CERTIFICATE
          </Typography>
          <Typography
            sx={{
              fontSize: "1.2vw",
              fontWeight: 600,
              lineHeight: "1.5vw",
              color: "#575757",
              [theme.breakpoints.down("md")]: {
                lineHeight: "2vw",
                fontSize: "1.7vw",
              },
            }}
          >
            OF APPRECIATION
          </Typography>
        </Box>

        {/* Recipient */}
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            left: "3%",
            top: "35%",
          }}
        >
          <Typography
            sx={{
              fontSize: "1vw",
              fontWeight: 300,
              color: "#575757",
              [theme.breakpoints.down("md")]: {
                fontSize: "1.5vw",
              },
            }}
          >
            Diberikan Kepada:
          </Typography>
          <Typography
            sx={{
              fontSize: "1.5vw",
              color: "#D84F91",
              lineHeight: "1.5vw",
              marginLeft: "2%",
              [theme.breakpoints.down("md")]: {
                lineHeight: "2vw",
                fontSize: "2vw",
              },
            }}
          >
            {data?.certificate.name}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            position: "absolute",
            left: "3%",
            top: "45%",
          }}
        >
          <Typography
            sx={{
              fontSize: "1vw",
              fontWeight: 300,
              color: "#575757",
              [theme.breakpoints.down("md")]: {
                fontSize: "1.5vw",
              },
            }}
          >
            Sebagai:
          </Typography>
          <Typography
            sx={{
              fontSize: "1.5vw",
              color: "#575757",
              lineHeight: "1.5vw",
              marginLeft: "2%",
              [theme.breakpoints.down("md")]: {
                lineHeight: "2vw",
                fontSize: "1.8vw",
              },
            }}
          >
            {data?.certificate.reward_as}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            paddingRight: "35%",
            position: "absolute",
            left: "3%",
            top: "55%",
          }}
        >
          <Typography
            sx={{
              fontSize: "1vw",
              fontWeight: 300,
              color: "#575757",
              [theme.breakpoints.down("md")]: {
                fontSize: "1.5vw",
              },
            }}
          >
            Pada Acara:
          </Typography>
          <Typography
            sx={{
              fontSize: "1.5vw",
              color: "#575757",
              lineHeight: "1.5vw",
              marginLeft: "2%",
              [theme.breakpoints.down("md")]: {
                lineHeight: "2vw",
                fontSize: "1.8vw",
              },
            }}
          >
            {data?.certificate.event_name}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            position: "absolute",
            left: "3%",
            top: "80%",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.8vw",
              color: "grey",
              [theme.breakpoints.down("md")]: {
                fontSize: "1.3vw",
              },
            }}
          >
            Tanding!
          </Typography>
          <Typography
            sx={{
              fontSize: "0.8vw",
              color: "grey",
              [theme.breakpoints.down("md")]: {
                fontSize: "1.3vw",
              },
            }}
          >
            {moment(data?.certificate.created_at).format("dddd, DD MMMM YYYY")}
          </Typography>
        </Box>
      </div>
    </Box>
  );
}
