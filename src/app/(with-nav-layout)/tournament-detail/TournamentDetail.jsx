/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box } from "@material-ui/core";

import { getTournamentInfinity } from "../../store/actions";
import { CardTournaments } from "../Components";
import { HeaderTournament } from "./_components";

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(0),
  },
  textRekomendasi: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  boxRecomendation: {
    padding: theme.spacing(7, 10, 5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(7, 2, 5),
    },
  },
}));

const TournamentDetail = ({ getTournamentInfinity, tournament }) => {
  const classes = useStyles();

  useEffect(() => {
    getTournamentInfinity(10);
  }, []);
  return (
    <Container maxWidth="xl" className={classes.box}>
      <HeaderTournament />
      <Box className={classes.boxRecomendation}>
        <Typography className={classes.textRekomendasi}>
          Rekomendasi Tournament
        </Typography>
        <CardTournaments data={tournament.infinity.data} />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  tournament: state.tournament,
});

export default connect(mapStateToProps, { getTournamentInfinity })(
  TournamentDetail
);
