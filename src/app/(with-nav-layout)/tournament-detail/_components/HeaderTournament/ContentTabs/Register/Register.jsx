/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import BannerTournament from "./BannerTournament";
import InformationTornament from "./InformationTornament";

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(0, 10),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 0),
    },
  },
}));

const Register = ({ data, canRegister }) => {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      <BannerTournament data={data} canRegister={canRegister} />
      <InformationTornament data={data} />
    </div>
  );
};

export default Register;
