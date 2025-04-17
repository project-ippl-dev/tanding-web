"use client";
import { AppBar, Backdrop, Badge, Box, Button, Container, Divider, IconButton, Toolbar, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import {useTheme, styled, Theme} from "@mui/material/styles";
import SearchBox from "../parts/NavBar/SearchBox";
import { ConfirmationNumber, MoreVert } from "@mui/icons-material";
import ButtonLogin from "../parts/NavBar/ButtonLogin";
import BoxAvatar from "../parts/NavBar/BoxAvatar";
import MenuKategori from "../parts/NavBar/MenuKategori";
import MenuProfile from "../parts/NavBar/MenuProfile";
import MenuNotifikasi from "../parts/NavBar/MenuNotifikasi";
import MenuTicket from "../parts/NavBar/MenuTicket";
import { styleData } from "@/types/global";
import { ProfileData } from "@/types/profile";

interface authData {
    data: {[key: string]: unknown}
}

function customStyling(theme: Theme | null): styleData {
    const result = {
        logo: {
        },
        grow: {
            flexGrow: 1,
            height: "65px",
        },
        navbarColor: {
            backgroundColor: "#fff",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.12)",
            color: "#2f3640"
        },
        menuButton: {
            marginRight: theme ? theme.spacing(2) : undefined,
        },
        btnNavbar: {
            padding: theme ? theme.spacing(0, 5) : undefined,
            "&:hover": {
            backgroundColor: "#fff",
            },
            "&.MuiButtonroot": {
            textTransform: "none",
            },
            cursor: "pointer",
        },
        btnNavbar2: {
            padding: theme ? theme.spacing(0, 3) : undefined,
            "&:hover": {
            backgroundColor: "#fff",
            },
            "&.MuiButtonRoot": {
            textTransform: "none",
            },
            cursor: "pointer",
        },
        dividerVertical: {
            height: "30px",
            marginTop: "8px",
        },
        backdrop: {
            zIndex: 1000,
        },
        boxDownload: {
            height: "25px",
            backgroundColor: "#F3F4F5",
            color: "black",
        },
        textDownload: {
            fontSize: "12px",
            cursor: "pointer",
        },
        iconDownload: {
            fontSize: "14px",
            marginRight: "2px",
        }
    }
    return result
}

export default function NavBar({
    auth,
    profile,
    setDrawer = () => {}
}: {
    auth: authData,
    profile: ProfileData
    setDrawer?: (open: boolean) => void
}) {
    const theme: Theme = useTheme();
    const [isClient, setIsClient] = useState(false);
    const parameter = isClient ? theme : null;
    const style: styleData = customStyling(parameter);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isMdUp = useMediaQuery(theme.breakpoints.up("md"))
    const authButtonInterFace: React.ReactNode = auth?.data?.access_token ? (
        <BoxAvatar/>
    ) : (
        <ButtonLogin/>
    )
    // komponen styling 
    const NavLogo = styled("img")(() => ({
        width: "auto",
        height: "40px",
        cursor: "pointer",
        marginRight:'10px',
        ...(parameter &&{[theme.breakpoints.up('md')]:{
            margin: theme.spacing(0, 3, 0, 5),
        }})
    })) 

    // --------------------------------------------

    const tournamentList: React.ReactNode = profile?.data?.EventPrivilege ? (
        <Button sx={style.btnNavbar2}>
            <Typography noWrap>
                My TournamentList!
            </Typography>
        </Button>
    ) : (<></>)

    const mdButton = (
        <>
            <Button 
                sx={style.btnNavbar}
                variant="text">
                Kategori
            </Button>
            <Button 
                sx={style.btnNavbar}
                variant="text">
                PowerList!
            </Button>
        </>
    )

    const mdInterface = isMdUp && isClient ? (
        <>
            <Box marginRight={"10px"}>
                <IconButton>
                    <Badge
                        badgeContent={1}
                        color="secondary"
                    >
                        <ConfirmationNumber />
                    </Badge>
                </IconButton>
            </Box>
            <Divider
                orientation="vertical" flexItem />
                <div style={{
                paddingLeft: "5px"
                }}>
                {tournamentList}
                </div>
            {authButtonInterFace}
        </> 
    ) : (<></>)
    
    return(
        <>
        <div style={style.grow}>
            <AppBar 
                position="fixed"
                sx={style.navbarColor}
                >
                    <Container maxWidth="xl">
                        <Toolbar>
                            <NavLogo
                                src="/img/logo.png" 
                                alt="Logo" 
                                 />
                            {isMdUp ? mdButton : <></>}
                            <SearchBox/>
                            {/* <div style={style.grow}/>*/}
                            <div style={{
                                display: "flex",
                            }}> 
                            </div>
                            {mdInterface}
                            {!isMdUp? (
                                <IconButton onClick={() => {setDrawer(true)}}>
                                    <MoreVert />
                                </IconButton>
                            ) : (<></>)}
                        </Toolbar>
                    </Container>
            </AppBar>
        </div>
        <div>
           {/* { <MenuKategori/>
            <MenuProfile/>
            <MenuNotifikasi/>} */}
        </div>
        </>
    )
}