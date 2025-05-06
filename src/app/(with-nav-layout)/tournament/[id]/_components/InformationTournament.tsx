import React from "react";
import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person"; // Replaced FaUserCircle
import ListAltIcon from "@mui/icons-material/ListAlt"; // Replaced FaClipboardList
import PlaceIcon from "@mui/icons-material/Place"; // Replaced FaMapMarkerAlt
import UpdateIcon from "@mui/icons-material/Update"; // Replaced MdUpdate
import EventIcon from "@mui/icons-material/Event"; // Replaced MdDateRange
import GavelIcon from "@mui/icons-material/Gavel"; // Replaced MdGavel
import SportsIcon from "@mui/icons-material/Sports"; // Replaced FcSportsMode
import { NumericFormat } from "react-number-format";
import { EventData } from "@/types/event.type";

const InformationTournament = ({ 
  data 
}:{
  data: EventData | null
}) => {
  return (
    <div>
      <Grid container>
        <Grid size={12}>
          <Box
            sx={{
              border: "5px solid #B84697",
              padding: 1,
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
          </Box>
        </Grid>
        <Grid size={{xs:12, md:6}} sx={{ padding: { xs: 2, md: 4 } }}>
          <div>
            <Box display="flex" alignItems="center">
              <PersonIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>Pembuat Acara</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: 1,
              }}
            >
              <Avatar
                src={data?.user_image}
                sx={{ width: "50px", height: "50px", marginRight: 1 }}
              />
              <Box marginRight={2}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {data?.user_name}
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>- Follower</Typography>
              </Box>
              <Button
                disabled
                sx={{
                  background:
                    "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "12px",
                  padding: "2px 10px",
                }}
              >
                Follow
              </Button>
            </Box>
          </div>

          {/* Deskripsi Tournament */}
          <Box sx={{ marginTop: 3 }}>
            <Box display="flex" alignItems="center">
              <ListAltIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>
                Deskripsi Tournament
              </Typography>
            </Box>
            <Box sx={{ marginTop: 1 }}>
              <Typography>{data?.description}</Typography>
            </Box>
          </Box>

          {/* Rules Tournament */}
          <Box sx={{ marginTop: 3 }}>
            <Box display="flex" alignItems="center">
              <ListAltIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>
                Peraturan Tournament
              </Typography>
            </Box>
            <Box sx={{ marginTop: 1 }}>
              {/* {!!data.data?.rules && parse(data.data?.rules)} */}
              {data?.rules}
            </Box>
          </Box>
        </Grid>

        {/* =========================================== */}
        <Grid size={{xs:12, md:6}} sx={{ padding: { xs: 2, md: 4 } }}>
          {/* Kategori */}
          <Box sx={{ marginTop: 3 }}>
            <Box display="flex" alignItems="center">
              <SportsIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>Olahraga</Typography>
            </Box>
            <Box sx={{ marginTop: 1 }}>
              <Typography>{data?.sport_name}</Typography>
            </Box>
          </Box>

          {/* System */}
          <Box sx={{ marginTop: 3 }}>
            <Box display="flex" alignItems="center">
              <GavelIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>Kelas Tournament</Typography>
            </Box>
            <Box sx={{ marginTop: 1 }}>
              {data?.class_events.map((value) => (
                <Typography
                  key={value.id}
                >{`${value.class_name} - (${value.match_type} elimination)`}</Typography>
              ))}
            </Box>
          </Box>

          {/* Due Register */}
          <Box sx={{ marginTop: 3 }}>
            <Box display="flex" alignItems="center">
              <UpdateIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>
                Batas Waktu Daftar
              </Typography>
            </Box>
            <Box sx={{ marginTop: 1 }}>
              <Typography>
                {moment(data?.deadline || 0).format("DD MMMM YYYY, HH:mm")}
              </Typography>
            </Box>
          </Box>

          {/* Time */}
          <Box sx={{ marginTop: 3 }}>
            <Box display="flex" alignItems="center">
              <EventIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>Waktu Tournament</Typography>
            </Box>
            <Box sx={{ marginTop: 1 }}>
              <Typography>
                {`${data?.start_date} - ${data?.end_date}`}
              </Typography>
            </Box>
          </Box>

          {/* Location */}
          <Box sx={{ marginTop: 3 }}>
            <Box display="flex" alignItems="center">
              <PlaceIcon sx={{ fontSize: "23px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "18px" }}>
                Lokasi Tournament
              </Typography>
            </Box>
            <Box sx={{ marginTop: 1 }}>
              <Typography sx={{ textTransform: "capitalize" }}>{`${
                data?.location
              }, ${data?.city.toLowerCase()} - ${data?.province.toLowerCase()}`}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default InformationTournament;
