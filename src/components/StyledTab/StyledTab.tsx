import React from "react";
import { styled } from "@mui/material/styles";
import Tab, { TabProps } from "@mui/material/Tab";

const StyledTab = styled((props: TabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    color: "#fff",
    fontWeight: "bold",
    fontSize: theme.typography.pxToRem(14),
    "&:focus": {
      opacity: 1,
      color: "#11B0FE",
    },
  })
);

export default StyledTab;
