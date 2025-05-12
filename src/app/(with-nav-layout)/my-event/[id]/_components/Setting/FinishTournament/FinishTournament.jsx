import React, { useState } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  Box,
  Typography,
  Button,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 3, 2, 3),
  },
  title: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  subTitle: {
    fontSize: "14px",
    color: "#666666",
  },
  spaceBetweenCenter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnFinish: {
    background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%);",
    textTransform: "none",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "0",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  },
  btnSelesai: {
    margin: "0 10px",
    textTransform: "none",
    fontWeight: "bold",
    borderImageSlice: 1,
    borderWidth: "3px",
    borderImageSource: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
  },
  textBtnSelesai: {
    background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 700,
  },
}));

const FinishTournament = ({ finishTournament }) => {
  const classes = useStyles();
  const params = useParams();
  const [dialog, setDialog] = useState(false);

  const onSubmitDialog = () => {
    finishTournament(params.id);
    setDialog(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          title={
            <Box className={classes.spaceBetweenCenter}>
              <div>
                <Typography className={classes.title}>
                  Rekapitulasi Tournament
                </Typography>
                <Typography className={classes.subTitle}>
                  Jika semua pertandingan sudah selesai, maka tournament harus
                  diselesaikan agar system bisa merekapitulasi hasil
                  pertandingan
                </Typography>
              </div>
            </Box>
          }
        />
        <CardContent>
          <Box className={classes.flexCenter}>
            <Button
              className={classes.btnFinish}
              onClick={() => setDialog(true)}
            >
              Tournament Selesai
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* DIALOG */}
      <Dialog
        maxWidth="sm"
        fullWidth
        open={dialog}
        onClose={() => setDialog(false)}
      >
        <DialogTitle>Tournament Selesai</DialogTitle>
        <DialogContent>
          Apakah anda yakin sudah memberikan nilai dan menyelesaikan semua
          pertandingan ?
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.btnSelesai}
            variant="outlined"
            onClick={onSubmitDialog}
          >
            <Typography className={classes.textBtnSelesai}>Selesai</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FinishTournament;
