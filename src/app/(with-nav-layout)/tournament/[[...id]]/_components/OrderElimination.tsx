"use client"

import React, { useState } from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
} from "@mui/material";
import FindInPageIcon from "@mui/icons-material/FindInPage";

import DialogDetail from "./parts/OrderElimination/DialogDetail";

// Define types for props
interface Participant {
  id: string;
  club_name: string;
  club_logo?: string;
  participants: string[];
  scores?: {
    [key: string]: number;
    total: number;
  };
}

interface Tournament {
  detail: {
    data: {
      remark: "ongoing" | "done" | "upcoming";
    };
  };
}

interface OrderEliminationProps {
  data: Participant[];
  tournament: Tournament;
}

const OrderElimination: React.FC<OrderEliminationProps> = ({ data, tournament }) => {
  const [dialogDetail, setDialogDetail] = useState<{
    open: boolean;
    data: Participant | null;
  }>({
    open: false,
    data: null,
  });

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
                      sx={{ padding: "5px" }}
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
