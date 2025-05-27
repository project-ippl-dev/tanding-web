"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Avatar,
  Button,
  Container,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Image from "next/image";

// import {
  // getTournamentDetail,
  // getSport,
  // getProvince,
// } from "../../store/actions";
import BannerTanding from "@/assets/images/banner-desktop.jpg"
import { a11yProps } from "@/utils/a11yProps";
import { useParams } from "next/navigation";
import { EventSingleResponse } from "@/types/event.type";
import { getTournamentDetail } from "@/store/actions/event";
import StyledTabs from "@/components/StyledTabs/StyledTabs";
import StyledTab from "@/components/StyledTab/StyledTab";
import TabPanel from "@/components/TabPanel/TabPanel";
import Preview from "./_components/Preview";
import Participant from "./_components/Participant";
import Bracket from "./_components/Bracket";
import Setting from "./_components/Setting";
import Keuangan from "./_components/Keuangan";
import { LoadingProvider } from "@/context/loading.context";
import { useNotification } from "@/context/notification.context";


const OwnTournamentDetail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams<{ id: string }>();
  const notification = useNotification()
  const [tabs, setTabs] = useState<number>(0);
  const [tournament, setTournament] = useState<EventSingleResponse | null>(null);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const loadingElement = (
    <Backdrop
      open={loading}
      data-testid="backdrop-loading"
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1000,
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Transparent background
      }}
    >
      <CircularProgress
        color="inherit" />
    </Backdrop>
  );

  const handleTabs = (event: React.SyntheticEvent, newValue: number) => {
    setTabs(newValue);
  };

  useEffect(() => {
    async function fetchTournamentDetail(id: string) {
      const response: EventSingleResponse = await getTournamentDetail({ id });
      if (response) {
        setTournament(response);
      } else {
        notification.showNotification("Gagal mengambil data turnamen", "error");
      }
    }

    if (typeof params.id === "string") {
      fetchTournamentDetail(params.id);
    }
  }, []);


  const MemoizeParticipant = useMemo(() => {
      return <Participant />;
    }, []);

  const MemoizedSetting = useMemo(() => (<Setting tournament={tournament} />), [tournament]);

  return (
    <LoadingProvider initialValue={loading} changeState={setLoading}>
      <Container maxWidth="xl" sx={{ padding: 0 }}>
        <Box sx={{ marginTop: { xs: 7, md: 0 } }}>
          {isMdUp && (
            <Image
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                display: "block",
              }}
              alt="Background Image"
              src={BannerTanding}
              width={0}
              height={0}
              sizes="100vw"
            />
          )}
          <Box
            sx={{
              backgroundColor: "#001641",
              color: "#fff",
              padding: { xs: 3, md: 10, lg: 3 },
            }}
          >
            <Grid container>
              <Grid size={{ md: 9, xs: 12 }}>
                <Box
                  sx={{
                    display: "flex",
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
                    {tournament?.data?.name}
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
                    <Typography sx={{ textTransform: "capitalize" }}>
                      {tournament?.data?.sport_name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", marginRight: 1.6 }}>
                    <LocationOnIcon
                      sx={{ marginRight: "0.5rem", fontSize: "14px" }}
                    />
                    <Typography sx={{ textTransform: "capitalize" }}>
                      {tournament?.data?.city
                        ? tournament?.data?.city.toLowerCase()
                        : tournament?.data?.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <CalendarTodayIcon
                      sx={{ marginRight: "0.5rem", fontSize: "14px" }}
                    />
                    <Typography sx={{ textTransform: "capitalize" }}>
                      {tournament?.data?.start_date}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ marginTop: { xs: 0, md: 4 } }}>
                  {isMdUp && (
                    <StyledTabs
                      data-testid="tabs"
                      value={tabs}
                      onChange={handleTabs}
                      indicatorColor="primary"
                    >
                      <StyledTab 
                        data-testid="tab-mobile-preview"
                        label="PREVIEW" {...a11yProps(0)} />
                      <StyledTab 
                        data-testid="tab-mobile-peserta"
                        label="PESERTA" {...a11yProps(1)} />
                      <StyledTab label="BRAKET" {...a11yProps(2)} />
                      {(tournament?.data?.user_privilege.role === "owner" ||
                        tournament?.data?.user_privilege.role ===
                          "admin") && (
                        <StyledTab 
                        data-testid="tab-mobile-setting"
                        label="SETTING" {...a11yProps(3)} />
                      )}
                      {tournament?.data?.user_privilege.role ===
                        "owner" && (
                        <StyledTab 
                        data-testid="tab-mobile-keuangan"
                        label="KEUANGAN" {...a11yProps(4)} />
                      )}
                    </StyledTabs>
                  )}
                  {!isMdUp && (
                    <Tabs
                      value={tabs}
                      onChange={handleTabs}
                      variant="scrollable"
                      scrollButtons="auto"
                      textColor="inherit"
                      indicatorColor="primary"
                    >
                      <Tab 
                      label="PREVIEW" {...a11yProps(0)} />
                      <Tab 
                        data-testid="tab-peserta"
                        label="PESERTA" {...a11yProps(1)} />
                      <Tab 
                        data-testid="tab-braket"
                        label="BRAKET" {...a11yProps(2)} />
                      {(tournament?.data?.user_privilege.role === "owner" ||
                        tournament?.data?.user_privilege.role ===
                          "admin") && (
                        <Tab 
                        data-testid="tab-setting"
                        label="SETTING" {...a11yProps(3)} />
                      )}
                      {tournament?.data?.user_privilege.role ===
                        "owner" && (
                        <Tab 
                        data-testid="tab-keuangan"
                        label="KEUANGAN" {...a11yProps(4)} />
                      )}
                    </Tabs>
                  )}
                </Box>
              </Grid>
              {isMdUp && (
                <Grid size={{ md: 3, xs: 12 }}>
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
                        src={tournament?.data?.user_image || ""}
                        sx={{
                          width: "50px",
                          height: "50px",
                          marginRight: 1,
                        }}
                      />
                      <Box sx={{ marginRight: 3 }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {tournament?.data?.user_name}
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
            <Preview data={tournament} />
          </TabPanel>
          <TabPanel value={tabs} index={1}>
              {MemoizeParticipant}
          </TabPanel>
          <TabPanel value={tabs} index={2}>
            <Bracket data={tournament?.data || null}/>
          </TabPanel>
          <TabPanel value={tabs} index={3}>
            {MemoizedSetting}
          </TabPanel>
          <TabPanel value={tabs} index={4}>
            <Keuangan />
          </TabPanel>
        </Box>
      </Container>
      {loadingElement}
    </LoadingProvider>
  );
};

export default OwnTournamentDetail;