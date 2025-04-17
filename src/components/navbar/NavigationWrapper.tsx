"use client";
import { useState } from "react";
import DesktopAppNavbar from "./DesktopAppNavbar";
import MobileAppNavbar from "./MobileAppNavbar";
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
          <DesktopAppNavbar />
        </div>
        <div className="block md:hidden">
          <MobileAppNavbar setOpenDrawer={setOpenDrawer} />
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
