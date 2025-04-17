"use client";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Box, Button, Container, Grid, Toolbar } from "@mui/material";
import Image from "next/image";
import AvatarBox from "./AvatarBoxButton";
import ProfileMenuList from "./menus/ProfileMenuList";
import KategoriMenuList from "./menus/KategoriMenuList";

const AppDesktopNavbarButton = styled(Button)(() => ({
  paddingLeft: 12,
  paddingRight: 12,
  textTransform: "capitalize",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#e1ebff",
  },
}));

export default function AppDesktopNavbar() {
  const isLoggedIn = true; // TODO: Dummy state, replace with actual login state
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
    <div className="grow h-64">
      <AppBar
        position="fixed"
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
                {/* TODO: Navigation */}
                <AppDesktopNavbarButton
                  variant="text"
                  onClick={handleMenuKategoriOpen}
                >
                  Kategori
                </AppDesktopNavbarButton>
                <AppDesktopNavbarButton variant="text">
                  Ranking
                </AppDesktopNavbarButton>
                <AppDesktopNavbarButton variant="text">
                  Turnamenku!
                </AppDesktopNavbarButton>
              </Grid>
              <Grid container spacing={0.25}>
                {/**TODO: Check login state. If logged in, show Avatar. Else, show loginButton */}
                {isLoggedIn ? (
                  <AvatarBox onClick={handleProfileMenuOpen} />
                ) : (
                  <div>Logged In</div>
                )}
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
        // TODO: Replace with actual props
        // onLogout={authLogout}
        // auth={auth}
        // profile={profile}
      />
      <KategoriMenuList
        id="menu-kategori-id"
        anchorEl={anchorElKategori}
        open={isKategoriMenuOpen}
        onClose={handleKategoriMenuClose}
        // TODO: Replace with actual props
        // onLogout={authLogout}
        // auth={auth}
        // profile={profile}
      />
    </div>
  );
}
