"use client"
import React, { useState, useEffect } from "react";
import { 
  Container, 
  Grid, 
  Paper, 
  Avatar, 
  IconButton, 
  Typography, 
  Box, 
  Backdrop, 
  CircularProgress, 
  Skeleton 
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { styleData } from "@/types/global";
import Edit from "@mui/icons-material/Edit";
import Person from '@mui/icons-material/Person';
import Tentang from "./component/Tentang";
import DialogProfileBasic from "./component/DialogProfileBasic";

interface profileData {
    data: {[key: string]: string}
    club: Array<Record<string,unknown>>
}

function customStyles(theme: Theme | null): styleData {
  const result = {
    root: {
      paddingTop: theme ? theme.spacing(3) : undefined,
      ...(theme && {
        [theme.breakpoints.down("md")]: {
          paddingTop: theme.spacing(9),
        },
      }),
    },
    containerProfile: {
      borderRadius: "10px",
    },
    backgroundProfile: {
      width: "100%",
      height: "300px",
      position: "relative",
    },
    iconCamera: {
      backgroundColor: "#fff",
      color: "#0B66C2",
      position: "absolute",
      top: "15px",
      right: "15px",
    },
    backgroundImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "10px 10px 0 0",
    },
    avatarImage: {
      width: "180px",
      height: "180px",
      position: "absolute",
      top: "160px",
      left: "40px",
      border: "5px solid #fff",
      backgroundColor: "#fff",
      "& img": {
        marginTop: "3px",
      },
    },
    iconEdit: {
      position: "absolute",
      top: "310px",
      right: "15px",
    },
    containerInformation: {
      padding: theme ? theme.spacing(7, 4, 3, 4) : undefined,
    },
    name: {
      fontSize: "27px",
      fontWeight: "bold",
    },
    title: {
      fontWeight: "400",
      fontSize: "17px",
    },
    address: {
      color: "#929292",
    },
    containGroup: {
      display: "flex",
      alignItems: "center",
      marginBottom: theme ? theme.spacing(1.3) : undefined,
    },
    imgGroup: {
      marginRight: theme ? theme.spacing(1) : undefined,
    },
    textBold: {
      fontWeight: "bold",
    },
    boxClub: {
      ...(theme && {
        [theme.breakpoints.down("md")]: {
          marginTop: theme.spacing(3),
        },
      }),
    },
    textLink: {
      fontWeight: 700,
      color: "blue",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    backdrop: {
      zIndex: theme ? theme.zIndex.drawer + 1 : undefined,
      color: "#fff",
    },
  };

  return result;
}

async function fetchProfileData(): Promise<profileData> {
  const response = await fetch("/api/profile"); // Replace with your API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch profile data");
  }
  return response.json();
}

export default function UserProfile({
  profile,
  updateProfileBasic,
}: {
  profile: profileData;
  updateProfileBasic: () => void;
}) {
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  const parameter = isClient ? theme : null;
  const style: styleData = customStyles(parameter);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [loading, setLoading] = useState(false);
  const [dialogProfile, setDialogProfile] = useState(false);
  const [profileData, setProfileData] = useState<profileData | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    setLoadingProfile(true);
    fetchProfileData()
      .then((data) => {
        setProfileData(data);
        setLoadingProfile(false);
      })
      .catch(() => setLoadingProfile(false));
  }, []);

  const useImageBackground: boolean = false;
  const backgroundProfile = React.useMemo(() => (
    useImageBackground ? (
      <img
        sx={style.backgroundImage}
        alt="backgroundProfile"
        src="https://www.geeklawblog.com/wp-content/uploads/sites/528/2018/12/liprofile-656x369.png"
      />
    ) : (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #384FB9 0%, #CB4492 50%, #FF69B4 100%)",
        }}
      />
    )
  ), [useImageBackground]);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Container maxWidth="lg" sx={style.root}>
        <Grid container>
          <Grid size={{ xs: 12 }}>
            <Paper sx={style.containerProfile}>
              <div style={style.backgroundProfile}>
                {backgroundProfile}
                {loadingProfile ? (
                  <Skeleton
                    variant="circular"
                    width={180}
                    height={180}
                    sx={style.avatarImage}
                  />
                ) : (
                  <Avatar
                    sx={style.avatarImage}
                    src={profileData?.data?.photo || ""}
                    alt="User Avatar"
                  >
                    <Person sx={{ color: "black", height: "100%", width: "100%" }} />
                  </Avatar>
                )}
                <IconButton
                  sx={style.iconEdit}
                  onClick={() => setDialogProfile(true)}
                >
                  <Edit />
                </IconButton>
              </div>
              <Grid container sx={style.containerInformation}>
                <Grid size={{ md: 9, xs: 12 }}>
                  {loadingProfile ? (
                    <Skeleton width="60%" height={30} />
                  ) : (
                    <Typography sx={style.name}>
                      {profileData?.data?.name || "Unknown Name"}
                    </Typography>
                  )}
                  {loadingProfile ? (
                    <Skeleton width="40%" height={20} />
                  ) : (
                    <Typography sx={style.address}>
                      {!profileData?.data?.can_participate ? (
                        <span
                          style={style.textLink}
                          onClick={() => setDialogProfile(true)}
                        >
                          Update Profile Sekarang
                        </span>
                      ) : (
                        <span>{profileData?.data?.born_at || "Unknown Date"}</span>
                      )}
                    </Typography>
                  )}
                </Grid>
                <Grid size={{ md: 3, xs: 12 }} sx={style.boxClub}>
                  {loadingProfile ? (
                    <Skeleton width="100%" height={50} />
                  ) : profileData?.club?.length > 0 ? (
                    profileData.club.map((value) => (
                      <div sx={style.containGroup} key={value.id}>
                        <Avatar sx={style.imgGroup} src={value.image || ""} />
                        <Typography sx={style.textBold}>
                          {value.name || "Unknown Club"}
                        </Typography>
                      </div>
                    ))
                  ) : (
                    <Typography>No Clubs Available</Typography>
                  )}
                </Grid>
              </Grid>
            </Paper>
            <Tentang />
          </Grid>
        </Grid>
        <Box height="200px" />
      </Container>

      <DialogProfileBasic
        profile={profileData || profile}
        open={dialogProfile}
        onClose={() => setDialogProfile(false)}
        action={updateProfileBasic}
        setLoading={setLoading}
      />

      <Backdrop open={loading} sx={style.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}