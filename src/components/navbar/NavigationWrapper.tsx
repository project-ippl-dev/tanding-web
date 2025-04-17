"use client";
import { useState } from "react";
import AppDesktopNavbar from "./AppDesktopNavbar";
import AppMobileNavbar from "./AppMobileNavbar";
import MobileBottomNavbar from "./MobileBottomNavbar";
import MobileDrawer from "./MobileDrawer";

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
        <div className="hidden md:block">
          <AppDesktopNavbar />
        </div>
        <div className="block md:hidden">
          <AppMobileNavbar setOpenDrawer={setOpenDrawer} />
        </div>
      </header>

      <>{children}</>
      <div className="block md:hidden">
        <MobileBottomNavbar />
      </div>
      <MobileDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
    </>
  );
}
