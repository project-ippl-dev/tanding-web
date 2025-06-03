"use client";
import { useAuth } from "@/context/auth.context";
import { AccountCircle, EmojiEvents, Home } from "@mui/icons-material";
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
  const { authData } = useAuth();

  const redirectToValueAndPath = (newValue: number, newPath: string) => {
    if (!(newValue === value)) {
      router.push(newPath);
    }
  };

  useEffect(() => {
    const path = pathname.split("/");
    if (path[1] === "") {
      setValue(0);
    } else if (path[1] === "powerlist") {
      setValue(1);
    } else if (path[1] === "user-profile") {
      setValue(2);
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
        label="PowerList!"
        icon={<EmojiEvents style={{ fontSize: "23px" }} />}
        onClick={() => redirectToValueAndPath(1, "/ranking")}
      />
      {authData ? <BottomNavigationAction
        label="Profil"
        icon={<AccountCircle />}
        onClick={() => redirectToValueAndPath(2, "/user-profile")}
      />: null}
    </StyledBottomNavigation>
  );
}
