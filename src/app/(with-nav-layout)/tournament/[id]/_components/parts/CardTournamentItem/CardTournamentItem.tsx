/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Card, Typography, Avatar, Box, colors } from "@mui/material";
import Image from "next/image";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NumericFormat } from "react-number-format";
import { EventInfinityData } from "@/types/event.type";
import { useRouter } from "next/navigation";
const slobarColor = (bar: number): string => {
  if (bar <= 25) return "#4AE56C";
  if (bar <= 50) return "#FEEB21";
  if (bar <= 75) return "#FFB864";
  return "#FF6464";
};

const statusColor = (status: string): string => {
  if (status === "soon") return colors.orange[700];
  if (status === "open") return colors.green[700];
  if (status === "closed") return colors.red[700];
  if (status === "ongoing") return colors.blue[700];
  return colors.grey[700];
};

const CardTournamentItem = ({ data }: { data: EventInfinityData }) => {
  const router = useRouter();

  return (
    <div style={{ width: "230px", margin: "0 8px", paddingBottom: "5px" }}>
      <Card
        sx={{
          cursor: "pointer",
          width: "230px",
          paddingBottom: 1,
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
        onClick={() => router.push(`/tournament/${data.id}`)}
      >
        <div style={{ position: "relative" }}>
          <Image
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "16/9",
              objectFit: "cover",
            }}
            src={data.thumbnail}
            alt="image tournament"
            layout="responsive"
            width={16}
            height={9}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "7px",
              color: "white",
              padding: "2px 5px",
              borderRadius: "2px",
              backgroundColor: statusColor(data.remark),
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
              }}
            >
              {data.name}
            </Typography>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{ width: "20px", height: "20px", marginRight: "5px" }}
                src={data.user_image}
              />
              <Typography
                sx={{ fontSize: "13px", color: colors.grey[700] }}
                noWrap
              >
                {data.user_name}
              </Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EventIcon sx={{ width: "15px", height: "15px" }} />
              </div>
              <Typography
                sx={{ fontSize: "13px", color: colors.grey[700] }}
                noWrap
              >
                {`${data.start_date}`}
              </Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LocationOnIcon sx={{ width: "15px", height: "15px" }} />
              </div>
              <Typography
                sx={{ fontSize: "13px", color: colors.grey[700] }}
                noWrap
              >
                {data.province
                  ? `${data.city.toLowerCase()}, ${data.province.toLowerCase()}`
                  : data.location}
              </Typography>
            </div>
          </div>
          <Box sx={{ marginTop: 1.2 }}>
            <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
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
              <NumericFormat
                prefix="Rp "
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                value={data.prize_pool}
              />
            </Typography>
            <div
              style={{
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
                  backgroundColor: slobarColor(
                    (data.participants / data.quota) * 100
                  ),
                  width: `${(data.participants / data.quota) * 100}%`,
                }}
              />
            </div>
            <Typography
              sx={{ fontSize: "13px", color: "#454545", marginTop: "2px" }}
            >
              {`Slot ${data.participants} / ${data.quota}`}
            </Typography>
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default CardTournamentItem;
