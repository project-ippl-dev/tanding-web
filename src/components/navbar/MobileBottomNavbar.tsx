"use client";
import { AccountCircle, Home } from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  styled,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const StyledBottomNavigation = styled(BottomNavigation)(() => ({
  width: "100%",
  position: "fixed",
  zIndex: 10,
  bottom: 0,
  "& .MuiBottomNavigationAction-root": {
    maxWidth: "100%",
    "& .Mui-selected": {
      background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: 600,
    },
  },
}));

export default function MobileBottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState<number | null>(0);

  const redirectToValueAndPath = (newValue: number, newPath: string) => {
    if (!(newValue === value)) {
      router.push(newPath);
    }
  };

  useEffect(() => {
    const path = pathname.split("/");
    if (path[1] === "") {
      setValue(0);
    } else if (path[1] === "profile") {
      setValue(1);
    } else {
      setValue(null);
    }
  }, [pathname]);

  return (
    <StyledBottomNavigation value={value}>
      <BottomNavigationAction
        label="Beranda"
        icon={<Home />}
        onClick={() => redirectToValueAndPath(0, "/")}
      />
      <BottomNavigationAction
        label="Profil"
        icon={<AccountCircle />}
        // TODO: Navigate to Profile
        // onClick={() => router.push("/")}
      />
    </StyledBottomNavigation>
  );
}
