import { useAuth } from "@/context/auth.context";
// import { CLUB_DUMMY } from "@/store/club";
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
import { useRouter } from "next/navigation";

export default function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { logout, authData } = useAuth();
  const club: { id: string; name: string; logo?: string }[] = authData
    ? authData.clubs
    : [];

  const redirectToClub = (id: string) => {
    router.push(`/club/${id}`);
    onClose();
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <Drawer open={open} anchor="right">
      <div className="flex items-center">
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
        <Typography style={{ fontWeight: 600 }}>Tanding! Menu</Typography>
      </div>
      <Divider />
      <List>
        {/* CLUB */}
        <ListItemButton>
          <ListItemIcon>
            {/* <GroupAdd className={classes.icon} /> */}
            <GroupAdd />
          </ListItemIcon>
          <ListItemText
            primary="Buat Club"
            onClick={() => {
              router.push("/create-club");
              onClose();
            }}
          />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            {/* <Group className={classes.icon} /> */}
            <Group />
          </ListItemIcon>
          <ListItemText
            primary="Gabung Club"
            onClick={() => {
              router.push("/club");
              onClose();
            }}
          />
        </ListItemButton>
        <Divider />

        {/* CLUB LIST */}
        {/* {CLUB_DUMMY.map((value) => ( */}
        {club?.map((value) => (
          <ListItemButton
            key={value.id}
            onClick={() => redirectToClub(value.id)}
          >
            <ListItemIcon>
              <Avatar src={value.logo ? value.logo : "/images/logo.png"} />
            </ListItemIcon>
            <ListItemText primary={value.name} />
          </ListItemButton>
        ))}

        {/* LOGOUT */}
        <ListItemButton>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" onClick={handleLogout} />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
