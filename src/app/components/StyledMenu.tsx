import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import { Theme } from "@mui/material/styles";

function customStyle(theme: Theme | null) {
  return {
    paper: {
      marginTop: theme ? theme.spacing(1) : "8px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    },
  };
}

type StyledMenuProps = {
  open: boolean;
  id?: string;
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  keepMounted?: boolean;
};

export default function StyledMenuComponent(props: StyledMenuProps) {
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  const parameter = isClient ? theme : null;
  const style = customStyle(parameter);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const StyledMenu = styled(Menu)(() => ({
    "& .MuiPaper-root": style.paper,
  }));

  return <StyledMenu {...props} />;
}
