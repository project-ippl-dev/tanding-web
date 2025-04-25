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
import { useTheme, styled } from "@mui/material/styles";
import Edit from "@mui/icons-material/Edit";
import Person from '@mui/icons-material/Person';
import Tentang from "./_component/Tentang";
import DialogProfileBasic from "./_component/DialogProfileBasic";
import Image from "next/image";
import { getExternalApiUrl } from "@/utils/api";
import { ProfileData } from "@/types/profile";
import { useAuth } from "@/context/auth.context";

interface profileData {
    message: string
    data: ProfileData
}

const HoverableSpan = styled("span")(() => ({
  fontWeight: 700,
  color: "blue",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export default function UserProfile({
  updateProfileBasic,
}: {
  updateProfileBasic: () => void;
}) {
  const theme = useTheme()
  const authData = useAuth()

  const [loading, setLoading] = useState(false);
  const [dialogProfile, setDialogProfile] = useState(false);
  const [profileData, setProfileData] = useState<profileData | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoadingProfile(true);
        const token = ""; // Replace with actual token retrieval logic
        const url = process.env.NODE_ENV === 'development'? 'own' : authData?.data?.user_id
        const response = await fetch("/api/profile/own", {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: profileData = await response.json();
        console.log(data)
        setProfileData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileData();
  }, []);

  const useImageBackground: boolean = false;
  const backgroundProfile = React.useMemo(() => (
    useImageBackground ? (
      <Image
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px 10px 0 0",
        }}
        alt="backgroundProfile"
        src="https://www.geeklawblog.com/wp-content/uploads/sites/528/2018/12/liprofile-656x369.png"
        layout="fill"
        objectFit="cover"
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
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: theme.spacing(3),
          [theme.breakpoints.down("md")]: {
            paddingTop: theme.spacing(9),
          },
        }}
      >
        <Grid container>
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ borderRadius: "10px" }}>
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  position: "relative",
                }}
              >
                {backgroundProfile}
                {loadingProfile ? (
                  <Skeleton
                    variant="circular"
                    width={180}
                    height={180}
                    sx={{
                      width: "180px",
                      height: "180px",
                      position: "absolute",
                      top: "160px",
                      left: "40px",
                      border: "5px solid #fff",
                      backgroundColor: "#fff",
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
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
                    }}
                    src={profileData?.data?.photo || ""}
                    alt="User Avatar"
                  >
                    <Person sx={{ color: "black", height: "100%", width: "100%" }} />
                  </Avatar>
                )}
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "310px",
                    right: "15px",
                  }}
                  onClick={() => setDialogProfile(true)}
                >
                  <Edit />
                </IconButton>
              </div>
              <Grid
                container
                sx={{
                  padding: theme.spacing(7, 4, 3, 4),
                }}
              >
                <Grid size={{ md: 9, xs: 12 }}>
                  {loadingProfile ? (
                    <Skeleton width="60%" height={30} />
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "27px",
                        fontWeight: "bold",
                      }}
                    >
                      {profileData?.data?.name || "Unknown Name"}
                    </Typography>
                  )}
                  {loadingProfile ? (
                    <Skeleton width="40%" height={20} />
                  ) : (
                    <Typography
                      sx={{
                        color: "#929292",
                      }}
                    >
                      {!profileData?.data?.can_participate ? (
                        <HoverableSpan onClick={() => setDialogProfile(true)}>
                          Update Profile Sekarang
                        </HoverableSpan>
                      ) : (
                        <span>{profileData?.data?.born_at || "Unknown Date"}</span>
                      )}
                    </Typography>
                  )}
                </Grid>
                <Grid
                  size={{ md: 3, xs: 12 }}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      marginTop: theme.spacing(3),
                    },
                  }}
                >
                  {loadingProfile ? (
                    <Skeleton width="100%" height={50} />
                  ) : authData?.data?.clubs.length > 0 ? (
                    authData.data.clubs.map((value) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: theme.spacing(1.3),
                        }}
                        key={value.id}
                      >
                        <Avatar
                          sx={{
                            marginRight: theme.spacing(1),
                          }}
                          src={value.image || ""}
                        />
                        <Typography
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
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
            <Tentang wait={loadingProfile} description={profileData?.data?.about || null}/>
          </Grid>
        </Grid>
        <Box height="200px" />
      </Container>

      <DialogProfileBasic
        profile={profileData}
        open={dialogProfile}
        onClose={() => setDialogProfile(false)}
        action={updateProfileBasic}
        setLoading={setLoading}
      />

      <Backdrop
        open={loading}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          color: "#fff",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}