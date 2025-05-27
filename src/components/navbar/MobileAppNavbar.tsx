"use client";
import { Menu, Paid } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Slide,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HideOnScroll = (props: any) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default function AppMobileNavbar({
  setOpenDrawer,
  ...props
}: {
  setOpenDrawer: (open: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}) {
  const router = useRouter()
  return (
    <>
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            backgroundColor: "#fff",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.12)",
          }}
        >
          <Toolbar>
            <Image
              src="/images/logo.png"
              alt="Kembali ke Beranda"
              width={30}
              height={30}
            />
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <IconButton onClick={() => router.push("/payment")}>
              <Paid />
            </IconButton>
            <IconButton onClick={() => setOpenDrawer(true)}>
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
}
