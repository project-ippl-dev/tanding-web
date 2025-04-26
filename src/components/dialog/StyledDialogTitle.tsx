"use client";
import { Close } from "@mui/icons-material";
import { DialogTitle, IconButton } from "@mui/material";

const StyledDialogTitle = ({
  children,
  classes,
  onClose,
  ...props
}: {
  children: React.ReactElement | string;
  classes?: string;
  onClose?: () => void;
}) => {
  return (
    <DialogTitle
      component="h6"
      sx={(theme) => ({
        margin: 0,
        padding: theme.spacing(2),
      })}
      className={classes}
      {...props}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          sx={(theme) => ({
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
          })}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default StyledDialogTitle;
