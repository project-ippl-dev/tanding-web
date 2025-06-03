"use client"
import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  useMediaQuery,
  TabsProps,
  TabProps,
} from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Image from "next/image"; // Import Next.js Image component

// import { Register, Bracket, Participant } from "./ContentTabs";
import BannerTanding from "@/assets/images/banner-desktop.jpg";
import { useAuth } from "@/context/auth.context";
import { EventData, EventSingleResponse } from "@/types/event.type"; // Removed EventSingleResponse
import Register from "./Register";
import Participant from "./Participant";
import Bracket from "./Bracket";
import { a11yProps } from "@/utils/a11yProps";
import { getTournamentDetail } from "@/store/actions/event";
import { NotificationContextProps } from "@/types/notification.type";
import { useNotification } from "@/context/notification.context";

const StyledTabs = (props: TabsProps) => (
  <Tabs
    {...props}
    slotProps={{
      indicator: {
        children: <span style={{ width: "100%", backgroundColor: "#B84697" }} />,
      },
    }}
    sx={{
      "& .MuiTabs-indicator": {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
      },
    }}
  />
)

const StyledTab = (props: TabProps) => (
  <Tab
    disableRipple
    {...props}
    sx={{
      textTransform: "none",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "14px",
      "&:focus": {
        opacity: 1,
        color: "#11B0FE",
      },
    }}
  />
)

const TabPanel = ({
  children,
  value,
  index,
  ...other
}: {
  children: React.ReactNode;
  value: number;
  index: number;
  [key: string]: unknown;
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

async function reqGetTournamentDetail(
  id: string, 
  setData: (data: EventSingleResponse) => void,
  notification: NotificationContextProps
) {
  try {
      const response = await getTournamentDetail({ id: id }); // Use the id parameter
      if ([200,201].includes(response.status)) { // Check if response and response.data are not null
        setData(response);
      } else {
        notification.showNotification("Gagal mengambil detail tournament",'error');
      }
  } catch (error) {
    notification.showNotification("Gagal mengakses server",'error');
    console.error("Error fetching tournament detail:", error);
  }
}


const HeaderTournament = ({
  eventID,
}: {
  eventID: string | undefined;
}) => {
  const notification = useNotification()
  const [tabs, setTabs] = useState(0);
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [eventData, setEventData] = useState<EventData | null>(null);

  const { authData } = useAuth();

  const handleTabs = (event: React.SyntheticEvent, newValue: number) => {
    setTabs(newValue);
  };

  useEffect(() => {
    if (eventID) {
      reqGetTournamentDetail(
        eventID,
        (response: EventSingleResponse) => {
          setEventData(response.data);
        },
        notification
      );
      setTabs(0);
    }
  }, [eventID]);
  return (
    <Box
      sx={{
        marginTop: { xs: 7, md: 0 },
      }}
    >
      {/* Display placeholder if eventData is null */}
      {!eventData ? (
        <Box
          sx={{
            textAlign: "center",
            padding: 5,
            color: "#fff",
            backgroundColor: "#001641",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Data Tournament Tidak Ditemukan
          </Typography>
        </Box>
      ) : (
        <>
          {/*TODO: saat loading mobile dia ke render dulu terus ngilang langsung agak ganggu */}
          {isMdUp && (
            <Box
              sx={{
                width: "100%",
                height: "250px",
                position: "relative",
              }}
            >
              <Image
                style={{ borderRadius: "8px" }}
                fill
                alt="Background Image"
                src={BannerTanding}
                objectFit="cover"
              />
            </Box>
          )}

          <Box
            sx={{
              backgroundColor: "#001641",
              color: "#fff",
              padding: { xs: 3, md: 10 },
            }}
          >
            <Grid container>
              <Grid size={{ xs: 12, md: 9 }}> {/* Updated to use size prop */}
                <Box
                  sx={{
                    display: { sx: "grid", md: "flex" },
                    alignItems: "flex-end",
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "20px", md: "25px" },
                      fontWeight: "bold",
                      marginRight: { md: 2 },
                      textAlign: "center",
                    }}
                  >
                    {eventData?.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: { xs: "column", md: "row" },
                    marginTop: 0.5,
                  }}
                >
                  <Box sx={{ display: "flex", marginRight: 1.6 }}>
                    <GavelIcon sx={{ marginRight: "0.5rem", fontSize: "14px" }} />
                    <Typography>{eventData?.sport_name}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", marginRight: 1.6 }}>
                    <LocationOnIcon
                      sx={{ marginRight: "0.5rem", fontSize: "14px" }}
                    />
                    <Typography>
                      {eventData?.city
                        ? eventData.city.toLowerCase()
                        : eventData?.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <CalendarTodayIcon
                      sx={{ marginRight: "0.5rem", fontSize: "14px" }}
                    />
                    <Typography>{eventData?.start_date}</Typography>
                  </Box>
                </Box>
                <Box 
                  data-testid="tabs-header"
                  sx={{ 
                  marginTop: { xs: 0, md: 4 },
                  color: "#fff",
                  }}>
                  <StyledTabs
                    value={tabs}
                    onChange={handleTabs}
                    textColor="inherit"
                    indicatorColor="primary"
                  >
                    <StyledTab 
                    data-testid="tab-daftar"
                    label="DAFTAR" {...a11yProps(0)} />
                    <StyledTab 
                    data-testid="tab-peserta"
                    label="PESERTA" {...a11yProps(1)} />
                    {(eventData?.remark === "closed" ||
                      eventData?.remark === "ongoing" ||
                      eventData?.remark === "done") && (
                      <StyledTab 
                      data-testid="tab-braket"
                      label="BRAKET" {...a11yProps(2)} />
                    )}
                  </StyledTabs>
                </Box>
              </Grid>
              {isMdUp && (
                <Grid size={{ xs: 12, md: 3 }}> {/* Updated to use size prop */}
                  <Box sx={{ marginTop: 1 }}>
                    <Typography>Organized by</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        marginTop: 1,
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={eventData?.user_image}
                        sx={{
                          width: "50px",
                          height: "50px",
                          marginRight: 1,
                        }}
                      />
                      <Box sx={{ marginRight: 3 }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {eventData?.user_name}
                        </Typography>
                        <Typography sx={{ fontSize: "12px" }}>
                          - Follower
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        sx={{
                          background:
                            "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: "12px",
                          padding: "2px 10px",
                        }}
                        disabled
                      >
                        Follow
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>

          <TabPanel value={tabs} index={0}>
            <Register
              data={eventData}
              canRegister={authData?.can_participate || false}
            />
          </TabPanel>
          <TabPanel value={tabs} index={1}>
            <Participant />
          </TabPanel>
          <TabPanel value={tabs} index={2}>
            <Bracket data={eventData} />
          </TabPanel>
        </>
      )}
    </Box>
  );
};

export default HeaderTournament;