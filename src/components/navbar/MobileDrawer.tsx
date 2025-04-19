import { CLUB_DUMMY } from "@/store/club";
import { Close, ExitToApp, Group, GroupAdd } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export default function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer
      open={open}
      anchor="right"
      // classes={{
      //   // paper: classes.drawerPaper,
      // }}
    >
      <div className="flex items-center">
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
        <Typography style={{ fontWeight: 600 }}>Tanding! Menu</Typography>
      </div>
      <Divider />
      <List>
        {/* CLUB */}
        <ListItemButton
        // TODO: Connect to actual Club
        >
          <ListItemIcon>
            {/* <GroupAdd className={classes.icon} /> */}
            <GroupAdd />
          </ListItemIcon>
          <ListItemText primary="Buat Club" />
        </ListItemButton>
        <ListItemButton
        // TODO: Connect to actual Club
        >
          <ListItemIcon>
            {/* <Group className={classes.icon} /> */}
            <Group />
          </ListItemIcon>
          <ListItemText primary="Join Club" />
        </ListItemButton>
        <Divider />

        {/* CLUB LIST */}
        {CLUB_DUMMY.map((value) => (
          <ListItemButton
            key={value.id}

            // TODO: Connect to actual Club
          >
            <ListItemIcon>
              <Avatar src={value.logo} />
            </ListItemIcon>
            <ListItemText primary={value.name} />
          </ListItemButton>
        ))}

        {/* LOGOUT */}
        {/* TODO: Connect logic */}
        <ListItemButton>
          <ListItemIcon>
            {/* <ExitToApp className={classes.icon} /> */}
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
