import React from "react";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";

type StyledMenuProps = {
    open: boolean
    id?: string 
    anchorEl?: HTMLElement | null
    onClose?: () => void
    keepMounted?: boolean
}

// Custom styled Menu component
const StyledMenu = styled(({ open, ...otherProps }: StyledMenuProps) => (
  <Menu
    open={open}
    elevation={1}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...otherProps}
  />
))(() => ({
  "& .MuiPaper-root": {
    marginTop: "8px",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
}));

export default StyledMenu;
