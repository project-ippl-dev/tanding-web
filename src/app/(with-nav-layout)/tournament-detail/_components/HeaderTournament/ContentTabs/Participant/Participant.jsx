/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { getParticipants } from "../../../../../../store/actions";

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
  accorSummary: {
    padding: theme.spacing(0, 3),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 0),
    },
  },
  content: {
    width: "100%",
    padding: theme.spacing(0, 3, 0.5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 0),
    },
  },
  justifyAlignCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50px",
  },
}));

const Participant = ({ participants, getParticipants }) => {
  const classes = useStyles();
  const params = useParams();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    getParticipants(params.id);
  }, [params.id]);

  return (
    <div className={classes.box}>
      <Box marginTop={3}>
        <Typography className={classes.title}>Daftar Peserta</Typography>
      </Box>
      <Box paddingTop={3}>
        {participants.data.map((value, index) => (
          <Accordion
            className={classes.accordion}
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box className={classes.accorSummary}>
                <Typography>{value.name}</Typography>
                <Typography
                  style={{ fontWeight: 600 }}
                >{`Tanding! Point ${value.total_point}`}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails style={{ display: "block" }}>
              {value.members.map((data) => (
                <div className={classes.content}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>{data.name}</Typography>
                    <Typography>{data.class_name}</Typography>
                  </Box>
                  <Divider />
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
        {participants.data.length === 0 && (
          <Box className={classes.justifyAlignCenter}>
            <Typography>Belum ada peserta yang mendaftar</Typography>
          </Box>
        )}
      </Box>
      <Box height="100px" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  participants: state.participants,
});

export default connect(mapStateToProps, { getParticipants })(Participant);
