import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";

interface NotificationProps {
  open: boolean;
  message: string;
  type: AlertColor;
  onClose: () => void;
}

const Notification = ({ open, message, type, onClose }: NotificationProps) => {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <MuiAlert elevation={6} variant="filled" onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Notification;
