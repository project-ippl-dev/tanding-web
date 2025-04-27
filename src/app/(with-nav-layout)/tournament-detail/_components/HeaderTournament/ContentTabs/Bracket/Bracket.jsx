/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Grid, TextField, MenuItem } from "@material-ui/core";

import { getBracketDetail } from "../../../../../../store/actions";
import SingleElimination from "./SingleElimination";
import OrderElimination from "./OrderElimination";
import FinalResult from "./FinalResult";

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(0, 10),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 2),
    },
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  grey: {
    marginTop: "5px",
    fontSize: "14px",
    color: "#666666",
  },
  boxBorder: {
    border: "1px solid #efefef",
    padding: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
}));

const Bracket = ({ bracket, tournament, getBracketDetail }) => {
  const classes = useStyles();
  const params = useParams();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (selected !== "") {
      getBracketDetail(params.id, selected);
    }
  }, [selected]);

  return (
    <div className={classes.box}>
      <Box marginTop={3}>
        <Typography className={classes.title}>Bagan Tournament</Typography>
      </Box>
      <div>
        <Grid container justifyContent="center">
          <Grid item md={5} xs={12}>
            <TextField
              fullWidth
              select
              margin="normal"
              variant="outlined"
              label="Pilih Kelas Pertandingan"
              value={selected}
              onChange={({ target: { value } }) => setSelected(value)}
            >
              {tournament.detail.data?.class_events.map((value) => (
                <MenuItem value={value.id} key={value.id}>
                  {value.class_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </div>
      {selected !== "" && (
        <Box marginTop={4} className={classes.boxBorder}>
          {tournament.detail.data?.remark === "done" && (
            <FinalResult data={bracket.summary} />
          )}
          {bracket.generate_status && bracket.match_type === "order" ? (
            <OrderElimination data={bracket.data} tournament={tournament} />
          ) : (
            bracket.generate_status &&
            bracket.match_type === "single" && (
              <SingleElimination data={bracket.data} tournament={tournament} />
            )
          )}
        </Box>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  bracket: state.bracket,
  tournament: state.tournament,
});

export default connect(mapStateToProps, { getBracketDetail })(Bracket);
