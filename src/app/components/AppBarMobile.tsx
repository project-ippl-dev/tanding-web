"use client";
import React, { useState, useEffect } from "react";
// import { alpha, makeStyles } from "@material-ui/core/styles";
/*
import {
  Slide,
  CssBaseline,
  AppBar,
  Toolbar,
  useScrollTrigger,
  InputBase,
  IconButton,
  Badge,
} from "@material-ui/core";
*/
import { alpha } from '@mui/material/styles';
import {
    Slide,
    Toolbar,
    CssBaseline,
    AppBar,
    useScrollTrigger,
    InputBase,
    IconButton,
    Badge
} from "@mui/material";

import { Theme, useTheme } from '@mui/material/styles'
import { ConfirmationNumber, MoreVert, Search } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { styleData } from "@/types/global";
import SearchBox from "../parts/NavBar/SearchBox";

/*
import {
  getAllPaymentForClub,
  getProfileBasic,
} from "../../../../../store/actions";
*/

interface paymentData {
  data:Record <string,unknown>
}

function customStyles(theme: Theme): styleData {
  const result = {
  navbarMobile: {
    backgroundColor: "#fff",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.12)",
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    border: "1px solid #efefef",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  Search: {
    padding: theme.spacing(0.3, 1, 0),
  },
  inputRoot: {
    color: theme.palette.textColor.primary,
  },
  inputRootField: {
    color: theme.palette.textColor.primary,
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  grow: {
    flexGrow: 1,
  },
  }
  return result
}

const HiddenOnScroll = ({ children, window }) => {
  // const theme = useTheme()
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  // const style = customStyles(theme)
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default function AppBarMobile({
  getProfileBasic,
  getAllPaymentForClub,
  payment,
  setOpenDrawer,
  ...rest
}:{
  getProfileBasic: () => void,
  getAllPaymentForClub: () => void,
  payment:paymentData,
  setOpenDrawer:(a: boolean) => void,
}) {

  const theme = useTheme()
  console.log(theme)
  const style = customStyles(theme)
  // const classes = useStyles();
  // const history = useHistory();
  const { handleSubmit } = useForm();

  const [value, setValue] = useState("");

  const onSubmit = () => {
    if (value !== "") {
      // history.push(`/tournament?keyword=${value}`);
    }
  };

  useEffect(() => {
    // getAllPaymentForClub();
    // getProfileBasic();
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar style={style.navbarMobile}>
        <Toolbar>
          <div style={style.search}>
            <SearchBox />  
          </div>
          <div style={style.grow} />
            <IconButton 
            onClick={() => {}}>
            <Badge color="secondary" badgeContent={payment?.club?.all.length}>
                <ConfirmationNumber />
              </Badge>
            </IconButton>
            <IconButton onClick={() => setOpenDrawer(true)}>
              <MoreVert />
            </IconButton>
          </Toolbar>
      </AppBar>
    </>
  );
};

/*
const mapStateToProps = (state) => ({
  payment: state.payment,
});
*/

/*
export default connect(mapStateToProps, {
  getAllPaymentForClub,
  getProfileBasic,
})(React.memo(AppBarMobile));
*/