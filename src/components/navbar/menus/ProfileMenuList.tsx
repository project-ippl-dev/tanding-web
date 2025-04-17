"use client";
// import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import StyledMenu from "./StyledMenu";
import { ExitToApp } from "@mui/icons-material";

const BoldText = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "15px",
}));

const ProfileMenuListButton = styled(Button)(() => ({
  textTransform: "none",
  padding: 0,
}));

// TODO: DUMMY DATA
const CLUB_DUMMY = [
  {
    id: 1,
    name: "Club 1",
    logo: "/images/logo.png",
  },
  {
    id: 2,
    name: "Club 2",
    logo: "/images/logo.png",
  },
];

export default function ProfileMenuList({
  anchorEl,
  id,
  open,
  onClose,
}: // TODO: Connect to actual logout and profile
// onLogout,
// profile,
{
  anchorEl: null | HTMLElement;
  id: string;
  open: boolean;
  onClose: () => void;
}) {
  // const router = useRouter();

  const redirectToProfile = () => {
    // TODO: Connect to Profile
    // router.push("/profile");
    onClose();
  };

  const redirectToClub = () => {
    // TODO: Connect to actual club
    // router.push(`/club/${id}`);
    onClose();
  };

  const logout = () => {
    // TODO: Connect to actual logout
    onClose();
    // onLogout();
  };

  return (
    <StyledMenu
      anchorEl={anchorEl}
      id={id}
      keepMounted
      open={open}
      onClose={onClose}
      // onClick={handleClick}
    >
      <Box
        sx={{
          width: "350px",
          mx: 1,
          my: 2,
        }}
      >
        <Card
          onClick={redirectToProfile}
          sx={{
            display: "flex",
            padding: 1,
            cursor: "pointer",
            marginBottom: 1.5,
          }}
        >
          <Avatar
            // TODO: Connect to actual profile image
            // src={profile.data?.photo}
            sx={{
              width: "45px",
              height: "45px",
              objectFit: "cover",
              marginRight: 1,
            }}
            alt="profile"
          />
          <div>
            <BoldText>
              {/* TODO: Show actual name here */}
              {/* {profile.data?.name} */}
              User Name Here
            </BoldText>
            <Typography>Setting Profile</Typography>
          </div>
        </Card>
        <Grid
          container
          sx={{
            minHeight: "130px",

          }}
        >
          <Grid
            size={{
              xs: 7,
            }}
            sx={{
              borderRight: "1px solid gray",
              px: 1,
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1">Tanding! Point</Typography>
            </Box>
            <Divider />
            <Divider />
            {CLUB_DUMMY.map((value) => (
              <Box
                key={value.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 1,
                  cursor: "pointer",
                }}
                // onClick={() => redirectClub(value.id)}
                onClick={() => redirectToClub()}
              >
                <Avatar
                  src={value.logo}
                  sx={{
                    width: 30,
                    height: 30,
                    marginRight: "5px",
                  }}
                />
                <Typography style={{ fontWeight: "bold" }}>
                  {value.name}
                </Typography>
              </Box>
            ))}
          </Grid>
          <Grid
            size={{
              xs: 'auto',
            }}
            sx={{
              px: 2,
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="100%"
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <ProfileMenuListButton
                // TODO:
                // onClick={() => {
                //   router.push("/create-club");
                //   onClose();
                // }}
                >
                  Buat Club
                </ProfileMenuListButton>
                <ProfileMenuListButton
                // TODO:
                // onClick={() => {
                //   router.push("/club");
                //   onClose();
                // }}
                >
                  Join Club
                </ProfileMenuListButton>
              </Box>
              <Box>
                <ProfileMenuListButton
                  startIcon={<ExitToApp />}
                  // TODO: Connect to actual logout
                  onClick={logout}
                >
                  Keluar
                </ProfileMenuListButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </StyledMenu>
  );
}
