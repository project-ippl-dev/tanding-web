import { ChevronRight, Shield, Event, Verified, GroupAdd, Group } from "@mui/icons-material";
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

import React from "react";

const sideBarLinks: {
    desc: string,
    icon: React.ReactElement,
    link: string
}[] = [
    {
        desc: "PowerList!",
        icon: <Shield />,
        link: "/powerlist"
    },
    {
        desc: "My TournamentList!",
        icon: <Event />,
        link: "/my-event"
    },
    {
        desc: "Sertifikat",
        icon: <Verified />,
        link: "/certificate"
    },
    {
        desc: "Cek Sertifikat",
        icon: <Shield />,
        link: "/check-certificate"
    },
    {
        desc: "Buat Club",
        icon: <GroupAdd />,
        link: "/create-club"
    },
    {
        desc: "Join Club",
        icon: <Group />,
        link: "/club"
    }
];

export default function SideDrawer({
    open,
    closeDrawer: closeDrawer
}:{
    open: boolean
    closeDrawer: () => void
}) {
    return (
        <Drawer
            open={open}
            onClose={() => { closeDrawer() }}
        >
            <div style={{
                display: "flex",
                alignItems: "center",
            }}>
                <IconButton onClick={() => { closeDrawer() }}>
                    <ChevronRight />
                </IconButton>
                <Typography sx={{ fontWeight: 600 }}>Tanding! Menu</Typography>
            </div>
            <Divider />
            <List>
                {sideBarLinks.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.desc} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}