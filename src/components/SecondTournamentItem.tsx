import React from "react";
import Image from "next/image";
import {
  Divider,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NumericFormat } from "react-number-format";
import { EventInfinityData } from "@/types/event.type";
import { useRouter } from "next/navigation";


const slobarColor = (bar: number): string => {
  if (bar <= 25) return "#4AE56C";
  if (bar <= 50) return "#FEEB21";
  if (bar <= 75) return "#FFB864";
  if (bar <= 100) return "#FF6464";
  return "#DFDFDF"; // Default color
};

const statusColor = (status: string): string => {
  if (status === "soon") return "#F57C00";
  if (status === "open") return "#388E3C";
  if (status === "closed") return "#D32F2F";
  if (status === "ongoing") return "#1976D2";
  if (status === "done" || status === "unconfirmed") return "#616161";
  return "#000000"; // Default color
};

const SecondTournamentItem: React.FC<{ data: EventInfinityData, targetEventUrl?: "tournament" | "my-event" }> = ({ data, targetEventUrl = 'tournament' }) => { 
  const router = useRouter();

  return (
    <div>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          margin: { xs: 2, md: "13.6px 16px" },
          flexDirection: { xs: "column", md: "row" },
        }}
        onClick={() => {
          router.push(`/${targetEventUrl}/${data.id}`);
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Image
            src={data.thumbnail}
            alt="image tournament"
            width={320}
            height={150}
            style={{
              width: "auto",
              height: "150px",
              aspectRatio: "16/9",
              objectFit: "cover",
              display: "block",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "10px",
              left: "7px",
              color: "white",
              padding: "2px 5px",
              borderRadius: "2px",
              backgroundColor: statusColor(data.remark),
            }}
          >
            <Typography sx={{
              fontSize: "11px",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}>
              {data.remark}
            </Typography>
          </Box>
        </Box>
        <Box pl={2} sx={{ width: "100%" }}>
          <Box sx={{ margin: "4px 0" }}>
            <Typography sx={{
              fontWeight: 600,
              fontSize: "15px",
              whiteSpace: "break-spaces",
            }}>{data.name}</Typography>
          </Box>
          <div>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{ width: "20px", height: "20px", marginRight: "5px" }}
                src={data.user_image}
              />
              <Typography sx={{
                fontSize: "13px",
                color: "#616161",
                textTransform: "capitalize",
              }} noWrap>
                {data.user_name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{
                width: "20px",
                height: "20px",
                marginRight: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <CalendarTodayIcon sx={{ width: "15px", height: "15px" }} />
              </Box>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#616161",
                  textTransform: "capitalize",
                }}
                noWrap
              >{`${data.start_date}`}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{
                width: "20px",
                height: "20px",
                marginRight: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <LocationOnIcon sx={{ width: "15px", height: "15px" }} />
              </Box>
              <Typography sx={{
                fontSize: "13px",
                color: "#616161",
                textTransform: "capitalize",
              }} noWrap>
                {data.province
                  ? `${data.city.toLowerCase()}, ${data.province.toLowerCase()}`
                  : data.location}
              </Typography>
            </Box>
          </div>
          <Box marginTop={1.2}>
            <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>TOTAL HADIAH</Typography>
            <Typography sx={{
              fontSize: "17px",
              fontWeight: "bold",
              marginTop: "-3px",
              background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              <NumericFormat
                prefix="Rp "
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                value={data.prize_pool}
              />
            </Typography>
            <Box sx={{
              width: "100%",
              height: "3px",
              borderRadius: "1px",
              backgroundColor: "#DFDFDF",
              margin: "0 auto",
            }}>
              <Box
                sx={{
                  height: "3px",
                  backgroundColor: slobarColor((data.participants / data.quota) * 100),
                  width: `${(data.participants / data.quota) * 100}%`,
                }}
              />
            </Box>
            <Typography sx={{
              fontSize: "13px",
              color: "#454545",
              marginTop: "2px",
            }}>
              {`Slot ${data.participants} / ${data.quota}`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
    </div>
  );
};

export default SecondTournamentItem;
