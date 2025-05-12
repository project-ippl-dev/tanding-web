/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Avatar,
} from "@material-ui/core";

import BorderGold from "../../../../../assets/images/border-gold.webp";
import BorderSilver from "../../../../../assets/images/border-silver.webp";
import BorderBronze from "../../../../../assets/images/border-bronze.webp";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "20px",
    fontWeight: 600,
  },
  boxBackground: {
    backgroundColor: "#3F4654",
  },
  barLightSilver: {
    height: "5px",
    width: "100%",
    backgroundColor: "#BBCADC",
  },
  barLightGold: {
    height: "5px",
    width: "100%",
    backgroundColor: "#EFDA62",
  },
  barLightBronze: {
    height: "5px",
    width: "100%",
    backgroundColor: "#D6914F",
  },
  relative: {
    position: "relative",
    minHeight: "100px",
  },
  avatar: {
    width: "50px",
    height: "50px",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
  },
  border: {
    width: "auto",
    height: "90px",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    zIndex: "10",
  },
  textWinner: {
    textAlign: "center",
    color: "#fff",
  },
  clubName: {
    textAlign: "center",
    color: "#fff",
    fontSize: "18px",
    fontWeight: 600,
  },
  boxParticipant: {
    padding: theme.spacing(1, 1),
    backgroundColor: "#5b6475",
    color: "#fff",
  },
  numberOne: {
    [theme.breakpoints.down("md")]: {
      order: -1,
    },
  },
  gridItem: {
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(1),
    },
  },
}));

const FinalResult = ({ data }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title={<Typography className={classes.title}>Final Result</Typography>}
      />
      <CardContent>
        <Grid container>
          {!!data[1] && (
            <Grid item xs={4} className={classes.gridItem}>
              <Box marginX={1} className={classes.boxBackground}>
                <div className={classes.barLightSilver} />
                <Box paddingY={1} paddingX={5}>
                  <div className={classes.relative}>
                    <img src={BorderSilver} className={classes.border} />
                    <Avatar
                      src={data[1].club_logo}
                      className={classes.avatar}
                    />
                  </div>
                  <div>
                    <Typography className={classes.textWinner}>
                      Winner 2
                    </Typography>
                    <Typography className={classes.clubName}>
                      {data[1].club_name}
                    </Typography>
                  </div>
                  <div>
                    {data[1].participants.map((value, index) => (
                      <div key={index} className={classes.boxParticipant}>
                        <Typography align="center">{value}</Typography>
                      </div>
                    ))}
                  </div>
                </Box>
              </Box>
            </Grid>
          )}
          {!!data[0] && (
            <Grid item xs={4} className={classes.numberOne}>
              <Box marginX={1} className={classes.boxBackground}>
                <div className={classes.barLightGold} />
                <Box paddingY={1} paddingX={5}>
                  <div className={classes.relative}>
                    <img src={BorderGold} className={classes.border} />
                    <Avatar
                      src={data[0].club_logo}
                      className={classes.avatar}
                    />
                  </div>
                  <div>
                    <Typography className={classes.textWinner}>
                      Winner 1
                    </Typography>
                    <Typography className={classes.clubName}>
                      {data[0].club_name}
                    </Typography>
                  </div>
                  <div>
                    {data[0].participants.map((value, index) => (
                      <div key={index} className={classes.boxParticipant}>
                        <Typography align="center">{value}</Typography>
                      </div>
                    ))}
                  </div>
                </Box>
              </Box>
            </Grid>
          )}
          {!!data[2] && (
            <Grid item xs={4} className={classes.gridItem}>
              <Box marginX={1} className={classes.boxBackground}>
                <div className={classes.barLightBronze} />
                <Box paddingY={1} paddingX={5}>
                  <div className={classes.relative}>
                    <img src={BorderBronze} className={classes.border} />
                    <Avatar
                      src={data[2].club_logo}
                      className={classes.avatar}
                    />
                  </div>
                  <div>
                    <Typography className={classes.textWinner}>
                      Winner 3
                    </Typography>
                    <Typography className={classes.clubName}>
                      {data[2].club_name}
                    </Typography>
                  </div>
                  <div>
                    {data[2].participants.map((value, index) => (
                      <div key={index} className={classes.boxParticipant}>
                        <Typography align="center">{value}</Typography>
                      </div>
                    ))}
                  </div>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FinalResult;
