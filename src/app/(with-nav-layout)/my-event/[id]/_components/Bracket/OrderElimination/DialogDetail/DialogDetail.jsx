import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  Box,
  Avatar,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  colors,
} from "@material-ui/core";

import { StyledDialogTitle } from "../../../../../../components";

const useStyles = makeStyles((theme) => ({
  justifyCenter: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  avatarClub: {
    width: "120px",
    height: "120px",
  },
  boxParticipant: {
    padding: theme.spacing(1, 5),
    backgroundColor: colors.purple[50],
  },
}));

const DialogDetail = ({ dialog, onClose }) => {
  const classes = useStyles();

  return (
    <Dialog maxWidth="xs" fullWidth open={dialog.open} onClose={onClose}>
      <StyledDialogTitle onClose={onClose}>Match Detail</StyledDialogTitle>
      <DialogContent>
        <Box className={classes.justifyCenter}>
          <Avatar src={dialog.data.club_logo} className={classes.avatarClub} />
          <Typography variant="h6" style={{ fontWeight: 600 }}>
            {dialog.data.club_name}
          </Typography>
          <div>
            {dialog.data.participants.map((value, index) => (
              <div key={index} className={classes.boxParticipant}>
                <Typography>{value}</Typography>
              </div>
            ))}
          </div>
        </Box>
        <Box marginTop={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Round</TableCell>
                <TableCell>Point</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(dialog.data.scores).map((key) => (
                <TableRow key={key}>
                  {key !== "id" && (
                    <>
                      <TableCell>{key}</TableCell>
                      <TableCell>{dialog.data.scores[key]}</TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetail;
