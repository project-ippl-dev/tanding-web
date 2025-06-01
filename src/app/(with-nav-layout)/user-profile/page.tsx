"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Grid,
  Paper,
  Avatar,
  IconButton,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import Edit from "@mui/icons-material/Edit";
import Person from "@mui/icons-material/Person";
import Tentang from "./_component/Tentang";
import DialogProfileBasic from "./_component/DialogProfileBasic";
import Image from "next/image";
import { ProfileBasicResponse, ProfileUpdate } from "@/types/profile";
import { useAuth } from "@/context/auth.context";
import { getProfileData } from "@/store/actions/profile";
import { useNotification } from "@/context/notification.context";

const HoverableSpan = styled("span")(() => ({
  fontWeight: 700,
  color: "blue",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export default function UserProfile() {
  const theme = useTheme();
  const notification = useNotification();
  const { authData } = useAuth();
  const [dialogProfile, setDialogProfile] = useState(false);
  const [profileData, setProfileData] = useState<ProfileBasicResponse | null>(
    null
  );
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoadingProfile(true);
        console.log(authData)
        const response = await getProfileData({
          uuid: authData?.user_id || "", //NOTE: URL now uses own, uuid is accessible by admin only
        });

        if (response.error || ![200, 201].includes(response.status)) {
          notification.showNotification(
            `Gagal mengambil data profil: ${response.error || "Error tidak diketahui"}`,
            "error"
          );
          setProfileData(null); // Set to null if there's an error
        } else {
          // const data: ProfileBasicResponse = await response.json();
          const data: ProfileBasicResponse = response;
          setProfileData(data);
        }
      } catch (error) {
        notification.showNotification(
          `Gagal memuat data profil`,
          "error",
        );
        console.log("Error fetching profile data:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileData();
  }, []);

  function updateProfileData(updatedData: ProfileUpdate) {
    setProfileData((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          data: {
            ...prevState.data,
            ...updatedData,
            born_on: {
              Time: updatedData.born_on,
              Valid: true,
            },
          },
        };
      } else {
        // Kondisi yang sepertinya gak akan terjadi
        // Data Profil Awalnya udah null
        return null;
      }
    });
  }

  const useImageBackground: boolean = false;
  const backgroundProfile = React.useMemo(
    () =>
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
            background:
              "linear-gradient(135deg, #384FB9 0%, #CB4492 50%, #FF69B4 100%)",
          }}
        />
      ),
    [useImageBackground]
  );

  const MemoizedAvatar = useMemo(() => {
    const templateRender = (
      <Box
        sx={{
          objectFit: "cover", // Memastikan gambar tetap proporsional
          borderRadius: "50%", // Membuat gambar berbentuk lingkaran
          width: "180px",
          height: "180px",
          position: "absolute",
          top: "160px",
          left: "40px",
          border: "5px solid #fff",
          backgroundColor: "#fff",
        }}
      >
        <Person sx={{ color: "black", height: "100%", width: "100%" }} />
      </Box>
    );

    const imageRender = (
      <Image
        src={profileData?.data?.photo || ""}
        alt="Preview"
        width={100} // Ukuran tetap untuk lebar
        height={100} // Ukuran tetap untuk tinggi
        style={{
          objectFit: "cover", // Memastikan gambar tetap proporsional
          borderRadius: "50%", // Membuat gambar berbentuk lingkaran
          width: "180px",
          height: "180px",
          position: "absolute",
          top: "160px",
          left: "40px",
          border: "5px solid #fff",
          backgroundColor: "#fff",
        }}
      />
    );

    return profileData?.data?.photo ? imageRender : templateRender;
  }, [profileData]);

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
                  MemoizedAvatar
                )}
                <IconButton
                  data-testid="edit-button"
                  sx={{
                    position: "absolute",
                    top: "310px",
                    right: "15px",
                  }}
                  onClick={() => {
                    if (profileData) {
                      setDialogProfile(true);
                    } else {
                      notification.showNotification(
                        "Data profil belum dimuat atau kosong, tidak dapat melakukan edit.",
                        "error"
                      );
                    }
                  }}
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
                        <HoverableSpan
                          onClick={() => {
                            if (profileData) {
                              setDialogProfile(true);
                            } else {
                              notification.showNotification(
                                "Data profil belum dimuat atau kosong, tidak dapat melakukan update.",
                                "error"
                              );
                            }
                          }}
                        >
                          Update Profile Sekarang
                        </HoverableSpan>
                      ) : (
                        <span>
                          {profileData?.data?.born_at || "Unknown Date"}
                        </span>
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
                  ) : authData?.clubs?.length && authData?.clubs.length > 0 ? (
                    authData?.clubs.map((value) => (
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
            <Tentang
              wait={loadingProfile}
              description={profileData?.data?.about || null}
            />
          </Grid>
        </Grid>
        <Box height="200px" />
      </Container>

      <DialogProfileBasic
        profile={profileData}
        open={dialogProfile}
        onClose={() => setDialogProfile(false)}
        action={updateProfileData}
      />
    </div>
  );
}
