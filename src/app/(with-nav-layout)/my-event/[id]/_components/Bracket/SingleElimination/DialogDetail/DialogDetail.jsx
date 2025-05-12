import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  Box,
  Grid,
  Avatar,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  colors,
} from "@material-ui/core";

import { StyledDialogTitle } from "../../../../../../components";

const useStyles = makeStyles((theme) => ({
  gridPad: {
    padding: theme.spacing(0, 1),
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  textTitle: {
    fontWeight: 600,
    fontSize: "18px",
  },
  boxTable: {
    width: "100%",
    marginTop: "10px",
    border: "1px solid #efefef",
    borderRadius: "5px",
  },
  boxParticipant: {
    padding: theme.spacing(1, 5),
    backgroundColor: colors.purple[50],
  },
}));

const DialogDetail = ({ dialog, onClose }) => {
  const classes = useStyles();

  return (
    <Dialog maxWidth="sm" fullWidth open={dialog.open} onClose={onClose}>
      <StyledDialogTitle onClose={onClose}>Match Detail</StyledDialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={6} className={classes.gridPad}>
            <Typography className={classes.textTitle}>Home</Typography>
            <Avatar src={dialog.data?.teams[0].club_logo} />
            <Typography>{dialog.data?.teams[0].club_name.String}</Typography>
            <div>
              {dialog.data?.teams[0].participants.map((value, index) => (
                <div key={index} className={classes.boxParticipant}>
                  <Typography>{value}</Typography>
                </div>
              ))}
            </div>
            {!!dialog.data?.teams[0].Score && (
              <Box className={classes.boxTable}>
                <Table>
                  <TableBody>
                    {Object.keys(dialog.data?.teams[0].Score).map((key) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{dialog.data.teams[0].Score[key]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Grid>

          {/* AWAY */}
          <Grid item xs={6} className={classes.gridPad}>
            <Typography className={classes.textTitle}>Away</Typography>
            <Avatar src={dialog.data?.teams[1].club_logo} />
            <Typography>{dialog.data?.teams[1].club_name.String}</Typography>
            <div>
              {dialog.data?.teams[1].participants.map((value, index) => (
                <div key={index} className={classes.boxParticipant}>
                  <Typography>{value}</Typography>
                </div>
              ))}
            </div>
            {!!dialog.data?.teams[1].Score && (
              <Box className={classes.boxTable}>
                <Table>
                  <TableBody>
                    {Object.keys(dialog.data?.teams[1].Score).map((key) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{dialog.data.teams[1].Score[key]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetail;
