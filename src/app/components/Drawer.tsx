import React from "react";
import { 
  Box, 
  Divider, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Avatar,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { ExitToApp as ExitToAppIcon } from "@mui/icons-material";
import { NumericFormat } from "react-number-format";
import { GiBlackHandShield } from "react-icons/gi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { GrCertificate } from "react-icons/gr";
import { BsShieldFillCheck } from "react-icons/bs";
import { MdGroupAdd, MdGroup } from "react-icons/md";
import { styleData } from "@/types/global";
import { useTheme, Theme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';

type profileType = {
    powerList: string | number,
    club: [
        {
            name: string,
            logo: string,
            id: string
        }
    ],
    [key: string] : unknown 
}

function customStyle (): styleData {
    const result = {
    drawer: {
        width: "100%",
        flexShrink: 0,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
    },
    drawerPaper: {
        width: "100%",
    },
    icon: {
        fontSize: "25px",
        color: "black",
    },
    flexBetween: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
    },
    }
    
    return result
};

export default function SideDrawer({
    onClose = () => {},
    authLogout = () => {},
    profile,
    drawerProps

}:{
    onClose: () => void
    authLogout: () => void
    profile: profileType
    drawerProps: {
        open: boolean,
        setDrawer: (state: boolean) => void
    }
}) {
    const theme: Theme = useTheme()
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"))

    const styling: styleData = customStyle()

    return (
    <Drawer
        anchor="left"
        open={drawerProps.open && !isMdUp}
        onClose={() => {drawerProps.setDrawer(false)}}
    >
        <div style={styling.drawerHeader}>
        <IconButton onClick={onClose}>
          <ChevronRight />
          
        </IconButton>
        <Typography sx={{ fontWeight: 600 }}>Tanding! Menu</Typography>
      </div>
      <Divider />

      {/* POWERLIST! */}
      <List>
        <ListItem>
          <ListItemIcon>
            <GiBlackHandShield style={styling.icon} />
          </ListItemIcon>
          <Box sx={styling.flexBetween}>
            <Typography>PowerList!</Typography>
            <Typography>
              <NumericFormat
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                value={profile?.powerList}
              />
            </Typography>
          </Box>
        </ListItem>
        <Divider />

        {/* MY_EVENT & CERTIFICATE */}
        <ListItem
          onClick={() => {
            // Navigate to My Event page
            // history.push(`/my-event`);
            onClose();
          }}
        >
          <ListItemIcon>
            <AiOutlineSafetyCertificate style={styling.icon} />
          </ListItemIcon>
          <ListItemText primary="My TournamentList!" />
        </ListItem>
        <ListItem
          onClick={() => {
            // Navigate to Certificate page
            // history.push(`/certificate`);
            onClose();
          }}
        >
          <ListItemIcon>
            <GrCertificate style={styling.icon} />
          </ListItemIcon>
          <ListItemText primary="Sertifikat" />
        </ListItem>
        <ListItem
          onClick={() => {
            // Navigate to Check Certificate page
            // history.push(`/check-certificate`);
            onClose();
          }}
        >
          <ListItemIcon>
            <BsShieldFillCheck style={styling.icon} />
          </ListItemIcon>
          <ListItemText primary="Cek Sertifikat" />
        </ListItem>
        <Divider />

        {/* CREATE AND JOIN CLUB */}
        <ListItem
          onClick={() => {
            // Navigate to Create Club page
            // history.push(`/create-club`);
            onClose();
          }}
        >
          <ListItemIcon>
            <MdGroupAdd style={styling.icon} />
          </ListItemIcon>
          <ListItemText primary="Buat Club" />
        </ListItem>
        <ListItem
          onClick={() => {
            // Navigate to Join Club page
            // history.push(`/club`);
            onClose();
          }}
        >
          <ListItemIcon>
            <MdGroup style={styling.icon} />
          </ListItemIcon>
          <ListItemText primary="Join Club" />
        </ListItem>
        <Divider />

        {/* LIST CLUB */}
        {profile?.club?.map((value) => (
          <ListItem
            key={value.id}
            onClick={() => {
              // Navigate to specific Club page
              // history.push(`/club/${value.id}`);
              onClose();
            }}
          >
            <ListItemIcon>
              <Avatar src={value.logo} />
            </ListItemIcon>
            <ListItemText primary={value.name} />
          </ListItem>
        ))}
        <Divider />

        {/* LOGOUT */}
        <ListItem onClick={() => authLogout()}>
          <ListItemIcon>
            <ExitToAppIcon sx={styling.icon} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
)}