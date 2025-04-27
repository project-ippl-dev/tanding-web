import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
} from "@material-ui/core";
import FindInPageIcon from "@material-ui/icons/FindInPage";

import DialogDetail from "./DialogDetail";

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    padding: "5px",
  },
}));

const OrderElimination = ({ data, tournament }) => {
  const classes = useStyles();

  const [dialogDetail, setDialogDetail] = useState({ open: false, data: null });

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Club</TableCell>
            <TableCell>Peserta</TableCell>
            <TableCell>Points</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((value, index) => (
            <TableRow key={value.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{value.club_name}</TableCell>
              <TableCell>{value.participants[0]}</TableCell>
              <TableCell>{value.scores?.total || 0}</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/*  */}
      {dialogDetail.open && (
        <DialogDetail
          dialog={dialogDetail}
          onClose={() => setDialogDetail({ open: false, data: null })}
        />
      )}
    </>
  );
};

export default OrderElimination;
