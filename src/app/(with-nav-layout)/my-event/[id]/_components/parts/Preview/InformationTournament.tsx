import React from "react";
import moment from "moment";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import UpdateIcon from "@mui/icons-material/Update";
import EventIcon from "@mui/icons-material/Event";
import GavelIcon from "@mui/icons-material/Gavel";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { NumericFormat } from "react-number-format";
import { EventData } from "@/types/event.type";

const InformationTournament = ({ data }: { data: EventData | null }) => {
  return (
    <div style={{marginBottom: "100px"}}>
      <Grid container>
        <Grid
          sx={{
            width: "100%",
          }}
        >
          <div
            style={{
              border: "5px solid #B84697",
              padding: "8px",
            }}
          >
            <Typography align="center">Total Hadiah</Typography>
            <Typography align="center">
              {data?.prize_pool === "0" ? (
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "#930E86",
                    textAlign: "center",
                    marginTop: "-5px",
                  }}
                >
                  -
                </span>
              ) : (
                <NumericFormat
                  displayType="text"
                  prefix="Rp "
                  value={data?.prize_pool}
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "#930E86",
                    textAlign: "center",
                    marginTop: "-5px",
                  }}
                  thousandSeparator="."
                  decimalSeparator=","
                />
              )}
            </Typography>
          </div>
        </Grid>
        <Grid
          sx={{
            width: { md: "50%", xs: "100%" },
            padding: { md: "32px 40px", xs: "16px 16px 0" },
          }}
        >
          <div>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PersonIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>Pembuat Acara</Typography>
            </Box>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "32px",
                marginTop: "8px",
              }}
            >
              <Avatar
                sx={{ width: "50px", height: "50px", marginRight: "8px" }}
                src={data?.user_image}
              />
              <Box sx={{ marginRight: "16px" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {data?.user_name}
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>- Follower</Typography>
              </Box>
              <Button
                disabled
                sx={{
                  background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "12px",
                  padding: "2px 10px",
                }}
              >
                Follow
              </Button>
            </div>
          </div>

          {/* Deskripsi Tournament */}
          <div style={{ marginTop: "24px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListAltIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>
                Deskripsi Tournament
              </Typography>
            </Box>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "32px",
                marginTop: "8px",
              }}
            >
              <Typography>{data?.description}</Typography>
            </div>
          </div>

          {/* Rules Tournament */}
          <div style={{ marginTop: "24px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListAltIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>
                Peraturan Tournament
              </Typography>
            </Box>
            <div style={{ marginLeft: "32px", marginTop: "8px" }}>
              {!!data?.rules}
            </div>
          </div>
        </Grid>

        {/* =========================================== */}
        <Grid
          sx={{
            width: { md: "50%", xs: "100%" },
            padding: { md: "32px 40px", xs: "16px 16px 0" },
          }}
        >
          {/* Kategori */}
          <div style={{ marginTop: "24px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SportsSoccerIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>Olahraga</Typography>
            </Box>
            <div style={{ marginLeft: "32px", marginTop: "8px" }}>
              <Typography>{data?.sport_name}</Typography>
            </div>
          </div>

          {/* System */}
          <div style={{ marginTop: "24px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <GavelIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>Kelas Tournament</Typography>
            </Box>
            <div style={{ marginLeft: "32px", marginTop: "8px" }}>
              {data?.class_events.map((value) => (
                <Typography
                  key={value.id}
                >{`${value.class_name} - (${value.match_type} elimination)`}</Typography>
              ))}
            </div>
          </div>

          {/* Due Register */}
          <div style={{ marginTop: "24px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <UpdateIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>
                Batas Waktu Daftar
              </Typography>
            </Box>
            <div style={{ marginLeft: "32px", marginTop: "8px" }}>
              <Typography>
                {moment(data?.deadline).format("DD MMMM YYYY, HH:mm")}
              </Typography>
            </div>
          </div>

          {/* Time */}
          <div style={{ marginTop: "24px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EventIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>Waktu Tournament</Typography>
            </Box>
            <div style={{ marginLeft: "32px", marginTop: "8px" }}>
              <Typography>
                {`${data?.start_date} - ${data?.end_date}`}
              </Typography>
            </div>
          </div>

          {/* Location */}
          <div style={{ marginTop: "24px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationOnIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>
                Lokasi Tournament
              </Typography>
            </Box>
            <div style={{ marginLeft: "32px", marginTop: "8px" }}>
              <Typography sx={{ textTransform: "capitalize" }}>{`${
                data?.location
              }, ${data?.city.toLowerCase()} - ${data?.province.toLowerCase()}`}</Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default InformationTournament;
