"use client"

import React, { useState } from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  TableContainer,
} from "@mui/material";
import FindInPageIcon from "@mui/icons-material/FindInPage";

import DialogDetail from "./parts/OrderElimination/DialogDetail";
import { BracketOrderData } from "@/types/bracket.type";
import { EventData } from "@/types/event.type";

// Define types for props

interface OrderEliminationProps {
  bracketData: BracketOrderData[] | [];
  tournament: EventData | null;
}

const OrderElimination: React.FC<OrderEliminationProps> = ({ bracketData, tournament }) => {
  const [dialogDetail, setDialogDetail] = useState<{
    open: boolean;
    data: BracketOrderData | null;
  }>({
    open: false,
    data: null,
  });

  return (
    <>
    <TableContainer>
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
          {bracketData.map((value, index) => (
            <TableRow key={value.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{value.club_name}</TableCell>
              <TableCell>{value.participants[0]}</TableCell>
              <TableCell>{value.scores?.total || 0}</TableCell>
              <TableCell>
                {!!value.scores &&
                  (tournament?.remark === "ongoing" ||
                    tournament?.remark === "done") && (
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
      </TableContainer>

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
