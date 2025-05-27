"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, Typography, Avatar, Box, SvgIcon } from "@mui/material";
import Image from "next/image";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

interface TournamentData {
  id: string;
  name: string;
  thumbnail: string;
  remark: string;
  user_name: string;
  user_image: string;
  start_date: string;
  province?: string;
  city?: string;
  location?: string;
  prize_pool: number;
  participants: number;
  quota: number;
}

interface TournamentItemProps {
  data: TournamentData;
}

export default function TournamentItem({ data }: TournamentItemProps) {
  const router = useRouter();

  const getSlotBarColor = (percentage: number) => {
    if (percentage <= 25) return "#4AE56C"; 
    if (percentage <= 50) return "#FEEB21"; 
    if (percentage <= 75) return "#FFB864"; 
    return "#FF6464"; 
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "soon":
        return "#F57C00"; 
      case "open":
        return "#388E3C"; 
      case "closed":
        return "#D32F2F"; 
      case "ongoing":
        return "#1976D2"; 
      case "done":
      case "unconfirmed":
        return "#616161"; 
      default:
        return "#616161";
    }
  };

  const slotPercentage = (data.participants / data.quota) * 100;

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  return (
    <div
      style={{
        width: "230px",
        margin: "0 8px",
        paddingBottom: "5px",
        marginTop: "8px",
      }}
    >
      <Card
        sx={{
          cursor: "pointer",
          width: "230px",
          paddingBottom: "8px",
          boxShadow: "none",
          borderRadius: 0,
          "&:hover": {
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
        onClick={() => router.push(`/my-event/${data.id}`)}
      >
        <div style={{ position: "relative" }}>
          <Box
            sx={{ width: "100%", position: "relative", aspectRatio: "16/9" }}
          >
            <Image
              src={data.thumbnail || "/images/tournament-placeholder.jpg"}
              alt={data.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "7px",
              color: "white",
              padding: "2px 5px",
              borderRadius: "2px",
              backgroundColor: getStatusColor(data.remark),
            }}
          >
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {data.remark}
            </Typography>
          </div>
        </div>

        <Box sx={{ paddingRight: 1.5, paddingLeft: 1.5 }}>
          <div style={{ height: "50px", marginTop: "4px" }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "15px",
                whiteSpace: "break-spaces",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.name}
            </Typography>
          </div>

          <div>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <Avatar
                sx={{ width: "20px", height: "20px", marginRight: "5px" }}
                src={data.user_image}
                alt={data.user_name}
              />
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "text.secondary",
                  textTransform: "capitalize",
                }}
                noWrap
              >
                {data.user_name}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  marginRight: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CalendarTodayOutlinedIcon
                  sx={{
                    width: "15px",
                    height: "15px",
                    color: "text.secondary",
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "text.secondary",
                  textTransform: "capitalize",
                }}
                noWrap
              >
                {data.start_date}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  marginRight: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LocationOnOutlinedIcon
                  sx={{
                    width: "15px",
                    height: "15px",
                    color: "text.secondary",
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "text.secondary",
                  textTransform: "capitalize",
                }}
                noWrap
              >
                {data.province
                  ? `${data.city?.toLowerCase()}, ${data.province.toLowerCase()}`
                  : data.location}
              </Typography>
            </Box>
          </div>

          <Box sx={{ mt: 1.2 }}>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              TOTAL HADIAH
            </Typography>

            <Typography
              sx={{
                fontSize: "17px",
                fontWeight: "bold",
                marginTop: "-3px",
                background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {formatCurrency(data.prize_pool)}
            </Typography>

            <Box
              sx={{
                width: "100%",
                height: "3px",
                borderRadius: "1px",
                backgroundColor: "#DFDFDF",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  height: "3px",
                  width: `${slotPercentage}%`,
                  backgroundColor: getSlotBarColor(slotPercentage),
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: "13px",
                color: "#454545",
                marginTop: "2px",
              }}
            >
              {`Slot ${data.participants} / ${data.quota}`}
            </Typography>
          </Box>
        </Box>
      </Card>
    </div>
  );
}
