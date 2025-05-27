"use client";

import React from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Divider, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { UserCertificate } from "@/types/certificate.types";

interface CertificateItemProps {
  data: UserCertificate;
}

export default function CertificateItem({ data }: CertificateItemProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <div>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(2),
          transition: "background-color 0.2s",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "flex-start",
          },
        }}
        onClick={() => router.push(`/certificate/${data.id}`)}
      >
        <Box
          sx={{
            position: "relative",
            minWidth: "250px",
            height: "140px",
            borderRadius: "8px",
            overflow: "hidden",
            [theme.breakpoints.down("md")]: {
              width: "100%",
              marginBottom: theme.spacing(2),
            },
          }}
        >
          {data.thumbnail ? (
            <Image
              src={data.thumbnail}
              alt={`Certificate for ${data.event_name}`}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #384FB9 0%, #CB4492 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="white">No Image</Typography>
            </div>
          )}
        </Box>

        <Box
          sx={{
            paddingLeft: { xs: 0, md: 3 },
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: "18px",
              mb: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "1.4",
            }}
          >
            {data.event_name}
          </Typography>

          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              mb: 1,
              background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {data.reward_as}
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              color: "text.secondary",
              mb: 0.5,
            }}
          >
            {data.name}
          </Typography>

          <Typography
            sx={{
              fontSize: "13px",
              color: "text.disabled",
            }}
          >
            {moment(data.created_at).format("dddd, DD MMMM YYYY")}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </div>
  );
}
