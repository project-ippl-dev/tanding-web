import React, { useState } from "react";
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
} from "@mui/material";
import { useParams } from "next/navigation";

const FinishTournament = ({ finishTournament }: { finishTournament: (id: string) => void }) => {
  const params = useParams();
  const [dialog, setDialog] = useState(false);

  const onSubmitDialog = () => {
    finishTournament(params.id);
    setDialog(false);
  };

  return (
    <>
      <Card sx={{ padding: (theme) => theme.spacing(1, 3, 2, 3) }}>
        <CardHeader
          title={
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Rekapitulasi Tournament
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "#666666" }}>
                  Jika semua pertandingan sudah selesai, maka tournament harus
                  diselesaikan agar system bisa merekapitulasi hasil
                  pertandingan
                </Typography>
              </div>
            </Box>
          }
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%);",
                textTransform: "none",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "0",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
              }}
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
            sx={{
              margin: "0 10px",
              textTransform: "none",
              fontWeight: "bold",
              borderImageSlice: 1,
              borderWidth: "3px",
              borderStyle: "solid", // Required for borderImageSource to work
              borderImageSource:
                "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
            }}
            variant="outlined"
            onClick={onSubmitDialog}
          >
            <Typography
              sx={{
                background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
              }}
            >
              Selesai
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FinishTournament;
