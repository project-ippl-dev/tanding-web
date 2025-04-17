"use client";
import { styleData } from "@/types/global";
import { ProfileData } from "@/types/profile";
import { Avatar, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

function customStyle(theme: Theme | null): styleData {
  return {
    root: {
      display: "flex",
      alignItems: "center",
      margin: theme ? theme.spacing(0, 5, 0, 2) : "0 40px 0 14px",
      cursor: "pointer",
    },
    avatar: {
      width: "30px",
      height: "30px",
    },
    name: {
      color: "black",
      marginLeft: theme ? theme.spacing(1.25) : "10px",
    },
  };
}

export default function BoxAvatar({
  data = { name: "test", photo: "/img/logo.png" },
  className,
  onClick,
}: {
  data: ProfileData;
  className?: string;
  onClick?: () => void;
}) {
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  const parameter = isClient ? theme : null;
  const style: styleData = customStyle(parameter);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={className} style={style.root} onClick={onClick}>
      <Avatar style={style.avatar} alt="image" src={data.photo} />
      <Typography style={style.name} noWrap>
        {data.name}
      </Typography>
    </div>
  );
}