import React, { useState } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  Box,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import FindInPageIcon from "@material-ui/icons/FindInPage";

import DialogDetail from "./DialogDetail";
import DialogScore from "./DialogScore";

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    padding: "5px",
  },
  btnLockScore: {
    background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%);",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "0",
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
  },
}));

const OrderElimination = ({
  data,
  storeBracketScore,
  selected,
  lockScore,
  lockScoreStatus,
  tournament,
}) => {
  const params = useParams();
  const classes = useStyles();
  const [dialogScore, setDialogScore] = useState({ open: false, data: null });
  const [dialogDetail, setDialogDetail] = useState({ open: false, data: null });

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Club</TableCell>
            <TableCell>Peserta</TableCell>
            <TableCell>Total Points</TableCell>
            <TableCell></TableCell>
            {!lockScoreStatus && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((value, index) => (
            <TableRow key={value.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{value.club_name}</TableCell>
              <TableCell>{value.participants[0]}</TableCell>
              <TableCell>{value.scores?.total}</TableCell>
              <TableCell>
                {!!value.scores &&
                  (tournament.detail.data.remark === "ongoing" ||
                    tournament.detail.data.remark === "done") && (
                    <IconButton
                      className={classes.iconBtn}
                      onClick={() =>
                        setDialogDetail({ open: true, data: value })
                      }
                    >
                      <FindInPageIcon />
                    </IconButton>
                  )}
              </TableCell>
              {!lockScoreStatus && tournament.detail.data.remark === "ongoing" && (
                <TableCell>
                  <IconButton
                    className={classes.iconBtn}
                    onClick={() => setDialogScore({ open: true, data: value })}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/*  */}
      {!lockScoreStatus && tournament.detail.data.remark === "ongoing" && (
        <Box className={classes.flexCenter}>
          <Button
            variant="container"
            className={classes.btnLockScore}
            onClick={() => lockScore(params.id, selected)}
          >
            Pertandingan Selesai
          </Button>
        </Box>
      )}

      {/*  */}
      {dialogScore.open && (
        <DialogScore
          state={dialogScore}
          onClose={() => setDialogScore({ open: false, data: null })}
          action={storeBracketScore}
          selected={selected}
        />
      )}

      {/*  */}
      {dialogDetail.open && (
        <DialogDetail
          dialog={dialogDetail}
          onClose={() => setDialogDetail({ open: false, data: null })}
        />
      )}
    </div>
  );
};

export default OrderElimination;
