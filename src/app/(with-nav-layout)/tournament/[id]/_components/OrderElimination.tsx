"use client";
import React, { useState } from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  Box,
  Button,
  TableContainer,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import DialogDetail from "./parts/OrderElimination/DialogDetail";
import { BracketOrderData, DialogState, ScoreData } from "@/types/bracket.type";
import { EventData } from "@/types/event.type";
import DialogScore from "./parts/OrderElimination/DialogScore";
import { useParams } from "next/navigation";
import {
  lockBracketScore,
  storeBracketOrderScore,
} from "@/store/actions/bracket";

// Define types for props
interface OrderEliminationProps {
  bracketData: BracketOrderData[];
  tournament: EventData | null;
  selected?: string;
  lockScoreStatus?: boolean;
}

const OrderElimination: React.FC<OrderEliminationProps> = ({
  bracketData,
  tournament,
  selected = "",
  lockScoreStatus = false,
}) => {
  const params = useParams<{ id: string }>();
  const [dialogScore, setDialogScore] = useState<DialogState<BracketOrderData>>(
    {
      open: false,
      data: null,
    }
  );
  const [dialogDetail, setDialogDetail] = useState<
    DialogState<BracketOrderData>
  >({
    open: false,
    data: null,
  });

  const handleLockScoring = async () => {
    if (selected) {
      try {
        const result = await lockBracketScore({
          eventID: params.id,
          classID: selected,
        });
        if (result.status === 200) {
          alert(result.message || "Score has been locked");
          window.location.reload(); // Refresh to update UI
        } else {
          alert("Failed to lock score: " + (result.error || "Unknown error"));
        }
      } catch (error) {
        alert("Error locking score: " + error);
      }
    }
  };

  // Function to handle scoring
  const handleStoreBracketScore = async (
    eventID: string,
    bracketID: string,
    data: ScoreData,
    classID: string
  ) => {
    try {
      const result = await storeBracketOrderScore({ eventID, bracketID, data, classID });
      if (result.status === 200) {
        alert(result.message || "Score has been stored");
        window.location.reload(); // Refresh to update UI
      } else {
        alert("Failed to store score: " + (result.error || "Unknown error"));
      }
      return result;
    } catch (error) {
      alert("Error storing score: " + error);
      throw error;
    }
  };

  return (
    <>
    <TableContainer
      data-testid="order-elimination-table"
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Club</TableCell>
            <TableCell>Peserta</TableCell>
            <TableCell>Points</TableCell>
            <TableCell></TableCell>
            {!lockScoreStatus && tournament?.remark === "ongoing" && (
              <TableCell></TableCell>
            )}
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
                      data-testid={`order-match-detail`}
                      sx={{ padding: "5px" }}
                      onClick={() =>
                        setDialogDetail({ open: true, data: value })
                      }
                    >
                      <FindInPageIcon />
                    </IconButton>
                  )}
              </TableCell>
              {!lockScoreStatus && tournament?.remark === "ongoing" && (
                <TableCell>
                  <IconButton
                    sx={{ padding: "5px" }}
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
    </TableContainer>

    {!lockScoreStatus && tournament?.remark === "ongoing" && selected && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "0",
            }}
            onClick={handleLockScoring}
          >
            Pertandingan Selesai
          </Button>
        </Box>
      )}

      {dialogScore.open && (
        <DialogScore
          state={dialogScore}
          onClose={() => setDialogScore({ open: false, data: null })}
          action={handleStoreBracketScore}
          selected={selected}
        />
      )}

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
