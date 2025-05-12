import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";

function DialogReject({
  dialog,
  onClose,
}: {
  dialog: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={dialog}
      onClose={onClose}
    >
      <DialogTitle>Opss Sorry</DialogTitle>
      <DialogContent>
        <Typography>
          Maaf anda harus mengisi data diri terlebih dahulu sebelum mengikuti
          pertandingan
        </Typography>
      </DialogContent>
      <DialogActions>
        <Link href={"/user-profile"}>
          <Button variant="contained" color="primary">
            Update Profile
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
}

export default DialogReject;