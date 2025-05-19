"use client";
import { useRouter } from "next/navigation";
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
import { useAuth } from "@/context/auth.context";

const BoldText = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "15px",
}));

const ProfileMenuListButton = styled(Button)(() => ({
  textTransform: "none",
  padding: 0,
}));

export default function ProfileMenuList({
  anchorEl,
  id,
  open,
  onClose,
}: 
{
  anchorEl: null | HTMLElement;
  id: string;
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const redirectToProfile = () => {
    router.push("/user-profile");
    onClose();
  };

  const redirectToClub = (id: string) => {
    router.push(`/club/${id}`);
    onClose();
  };

  const { logout, authData } = useAuth();
  const club: { id: string; name: string }[] = authData ? authData.clubs : [];

  const handleLogout = async () => {
    await logout();
    onClose();
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
            src={authData?.profile.photo}
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
              {authData ? authData.profile.name : "User Name Here"}
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
            {club.map((value) => (
              <Box
                key={value.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 1,
                  cursor: "pointer",
                  borderRadius: 1,
                  "&:hover": { bgcolor: "#0066CC20" },
                }}
                onClick={() => redirectToClub(value.id)}
              >
                {/* <Avatar
                  src={value.logo}
                  sx={{
                    width: 30,
                    height: 30,
                    marginRight: "5px",
                  }}
                /> */}
                <Typography style={{ fontWeight: "bold" }}>
                  {value.name}
                </Typography>
              </Box>
            ))}
          </Grid>
          <Grid
            size={{
              xs: "auto",
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <ProfileMenuListButton
                  onClick={() => {
                    router.push("/create-club");
                    onClose();
                  }}
                >
                  Buat Club
                </ProfileMenuListButton>
                <ProfileMenuListButton
                  onClick={() => {
                    router.push("/club");
                    onClose();
                  }}
                >
                  Gabung Club
                </ProfileMenuListButton>
              </Box>
              <Box>
                <ProfileMenuListButton
                  startIcon={<ExitToApp />}
                  onClick={handleLogout}
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
