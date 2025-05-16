import React from "react";
import { styled } from "@mui/material/styles";
import Tabs, { TabsProps } from "@mui/material/Tabs";

const StyledTabs = styled((props: TabsProps) => (
  <Tabs {...props} 
    slotProps={{ indicator: { children: <span /> } }}
  />
))(() => ({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: "#B84697",
    },
  },
}));

export default StyledTabs;
