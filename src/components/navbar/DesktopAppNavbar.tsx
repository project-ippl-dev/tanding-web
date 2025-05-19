"use client";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Box, Button, Container, Grid, Toolbar } from "@mui/material";
import Image from "next/image";
import AvatarBox from "./AvatarBoxButton";
import ProfileMenuList from "./menus/ProfileMenuList";
import KategoriMenuList from "./menus/KategoriMenuList";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth.context";

const DesktopAppNavbarButton = styled(Button)(() => ({
  paddingLeft: 12,
  paddingRight: 12,
  textTransform: "capitalize",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#e1ebff",
  },
}));

export default function DesktopAppNavbar() {
  const router = useRouter();
  const { authData } = useAuth();
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElKategori, setAnchorElKategori] = useState(null);

  const isProfileMenuOpen = Boolean(anchorElProfile);
  const isKategoriMenuOpen = Boolean(anchorElKategori);

  const handleProfileMenuClose = () => {
    setAnchorElProfile(null);
  };

  const handleKategoriMenuClose = () => {
    setAnchorElKategori(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProfileMenuOpen = (event: any) => {
    console.log(event.currentTarget);
    setAnchorElProfile(event.currentTarget);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMenuKategoriOpen = (event: any) => {
    console.log(event.currentTarget);
    setAnchorElKategori(event.currentTarget);
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.12)",
          color: "#000",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <Image
              className="cursor-pointer my-3 p-1"
              src="/images/logo.png"
              alt="Kembali ke Beranda"
              width={30}
              height={30}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Grid container spacing={0.25}>
                <DesktopAppNavbarButton
                  variant="text"
                  onClick={handleMenuKategoriOpen}
                >
                  Kategori
                </DesktopAppNavbarButton>
                <DesktopAppNavbarButton
                  variant="text"
                  onClick={() => router.push("/ranking")}
                >
                  Ranking
                </DesktopAppNavbarButton>
                {/* TODO: Navigation */}
                <DesktopAppNavbarButton variant="text">
                  Turnamenku!
                </DesktopAppNavbarButton>
              </Grid>
              <Grid container spacing={0.25}>
                {authData ? (
                  <AvatarBox onClick={handleProfileMenuOpen} />
                ) : null}
              </Grid>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ProfileMenuList
        id="menu-profile-id"
        anchorEl={anchorElProfile}
        open={isProfileMenuOpen}
        onClose={handleProfileMenuClose}
      />
      <KategoriMenuList
        id="menu-kategori-id"
        anchorEl={anchorElKategori}
        open={isKategoriMenuOpen}
        onClose={handleKategoriMenuClose}
      />
    </div>
  );
}
