import React from "react";
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
  TableContainer,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import StyledDialogTitle from "@/components/dialog/StyledDialogTitle";

// Define types for props
interface DialogDetailProps {
  dialog: {
    open: boolean;
    data: {
      club_logo?: string;
      club_name: string;
      participants: string[];
      scores: {
        [key: string]: number;
      };
    };
  };
  onClose: () => void;
}

const DialogDetail: React.FC<DialogDetailProps> = ({ dialog, onClose }) => {
  return (
    <Dialog maxWidth="xs" fullWidth open={dialog.open} onClose={onClose}>
      <StyledDialogTitle onClose={onClose}>Match Detail</StyledDialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={dialog.data.club_logo}
            sx={{ width: "120px", height: "120px" }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {dialog.data.club_name}
          </Typography>
          <div>
            {dialog.data.participants.map((value, index) => (
              <Box
                key={index}
                sx={{
                  padding: (theme) => theme.spacing(1, 5),
                  backgroundColor: purple[50],
                }}
              >
                <Typography>{value}</Typography>
              </Box>
            ))}
          </div>
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <TableContainer>
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
          </TableContainer>
      </Box>
    </DialogContent>
  </Dialog>
  );
};

export default DialogDetail;
