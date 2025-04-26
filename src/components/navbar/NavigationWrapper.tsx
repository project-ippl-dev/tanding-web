"use client";
import { useState } from "react";
import DesktopAppNavbar from "./DesktopAppNavbar";
import MobileAppNavbar from "./MobileAppNavbar";
import MobileBottomNavbar from "./MobileBottomNavbar";
import MobileDrawer from "./MobileDrawer";
import { Toolbar } from "@mui/material";

export default function Navbar({
  children,
}: {
  // setOpenDrawer: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <header>
        <div className="hidden sm:block">
          <DesktopAppNavbar />
        </div>
        <div className="block sm:hidden">
          <MobileAppNavbar setOpenDrawer={setOpenDrawer} />
          <Toolbar />
        </div>
      </header>
      <>{children}</>
      <div className="block sm:hidden">
        <MobileBottomNavbar />
      </div>
      <MobileDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
    </>
  );
}
