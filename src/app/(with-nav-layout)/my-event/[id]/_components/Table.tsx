// components/SingleElimination/Table.tsx
import React, { useEffect, useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  Paper,
  IconButton,
  Table as TableMui,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { BracketRound, BracketSeed, DialogState } from "@/types/bracket.type";

interface TableProps {
  data: BracketRound[];
  setScoring: React.Dispatch<React.SetStateAction<DialogState<BracketSeed>>>;
  lockScoreStatus: boolean;
}

const Table: React.FC<TableProps> = ({ data, setScoring, lockScoreStatus }) => {
  const [dataTable, setDataTable] = useState<BracketSeed[]>([]);

  useEffect(() => {
    let newData: BracketSeed[] = [];
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
            <TableRow sx={{ backgroundColor: "#3F4654" }}>
              <TableCell>
                <Typography sx={{ fontWeight: 600, color: "#fff" }}>
                  Partai Pertandingan
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 600, color: "#fff" }}>
                  Pertandingan
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 600, color: "#fff" }}>
                  {lockScoreStatus ? "Winner" : "Scoring"}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.map((value) => (
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