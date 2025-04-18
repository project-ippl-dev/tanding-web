import { styled } from "@mui/material";
import { Menu, MenuProps } from "@mui/material";

const StyledMenu =  styled((props: MenuProps) => (
  <Menu
    elevation={1}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(() => ({
  'paper': {
    marginTop: "8px",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
}));

export default StyledMenu;