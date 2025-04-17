"use client";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import StyledMenu from "../../components/StyledMenu";
import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

function customStyle(theme: Theme | null): object {
  return {
    button: {
      ...(theme && {
        margin: theme.spacing(1),
      }),
    },
  };
}

export default function MenuTicket({ anchorEl, id, open, onClose, data }) {
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  const parameter = isClient ? theme : null;
  const style = customStyle(parameter);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <StyledMenu
      anchorEl={anchorEl}
      id={id}
      keepMounted
      open={open}
      onClose={onClose}
    >
      <Button style={style.button}>Menu Tiket</Button>
    </StyledMenu>
  );
}