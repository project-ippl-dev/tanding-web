import React, { useEffect, useState } from "react";
import {
  makeStyles,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  Paper,
  IconButton,
} from "@material-ui/core";
import { Table as TableMui } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  textHeader: {
    fontWeight: 600,
    color: "#fff",
  },
  rowHeader: {
    backgroundColor: "#3F4654",
  },
}));

const Table = ({ data, setScoring, lockScoreStatus }) => {
  const classes = useStyles();
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    let newData = [];
    if (data.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        let seeds = data[i].seeds;
        for (let j = 0; j < seeds.length; j++) {
          if (seeds[j].is_active === 1) {
            newData.push(seeds[j]);
          }
        }
      }
    }
    setDataTable(newData);
  }, [data]);

  return (
    <div>
      <TableContainer component={Paper}>
        <TableMui>
          <TableHead>
            <TableRow className={classes.rowHeader}>
              <TableCell>
                <Typography className={classes.textHeader}>
                  Partai Pertandingan
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.textHeader}>
                  Pertandingan
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.textHeader}>
                  {lockScoreStatus ? "Winner" : "Scoring"}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.map((value, index) => (
              <TableRow key={value.id}>
                <TableCell>{`Partai ${value.event_turn}`}</TableCell>
                <TableCell>
                  {value.teams?.[0].club_name.String} vs{" "}
                  {value.teams?.[1].club_name.String}
                </TableCell>
                <TableCell>
                  {!lockScoreStatus ? (
                    <IconButton
                      onClick={() => setScoring({ open: true, data: value })}
                    >
                      <EditIcon />
                    </IconButton>
                  ) : value.teams?.[0].Score.total >
                    value.teams?.[1].Score.total ? (
                    value.teams?.[0].club_name.String
                  ) : (
                    value.teams?.[1].club_name.String
                  )}
                </TableCell>
              </TableRow>
            ))}
            {dataTable.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Tidak Ada Data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableMui>
      </TableContainer>
    </div>
  );
};

export default Table;
