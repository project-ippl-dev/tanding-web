import { ChevronRight, Shield, Event, Verified, GroupAdd, Group } from "@mui/icons-material";
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

function customStyle(theme: Theme | null) {
  return {
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme ? theme.spacing(2) : undefined,
    },
    title: {
      fontWeight: 600,
    },
  };
}

const sideBarLinks: {
  desc: string;
  icon: React.ReactElement;
  link: string;
}[] = [
  {
    desc: "PowerList!",
    icon: <Shield />,
    link: "/powerlist",
  },
  {
    desc: "My TournamentList!",
    icon: <Event />,
    link: "/my-event",
  },
  {
    desc: "Sertifikat",
    icon: <Verified />,
    link: "/certificate",
  },
  {
    desc: "Cek Sertifikat",
    icon: <Shield />,
    link: "/check-certificate",
  },
  {
    desc: "Buat Club",
    icon: <GroupAdd />,
    link: "/create-club",
  },
  {
    desc: "Join Club",
    icon: <Group />,
    link: "/club",
  },
];

export default function SideDrawer({
  open,
  closeDrawer,
}: {
  open: boolean;
  closeDrawer: () => void;
}) {
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  const parameter = isClient ? theme : null;
  const style = customStyle(parameter);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Drawer open={open} onClose={() => closeDrawer()}>
      <div style={style.drawerHeader}>
        <IconButton onClick={() => closeDrawer()}>
          <ChevronRight />
        </IconButton>
        <p style={style.title}>Tanding! Menu</p>
      </div>
      <Divider />
      <List>
        {sideBarLinks.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.desc} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}