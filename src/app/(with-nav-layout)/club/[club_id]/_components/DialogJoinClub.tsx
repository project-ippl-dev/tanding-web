"use client";
import StyledDialogTitle from "@/components/dialog/StyledDialogTitle";
import { joinClub } from "@/store/actions/club";
import { ClubFetchOneData } from "@/types/club.type";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

function DialogJoinClub({
  data,
  open,
  onClose,
  clubId,
}: {
  data: ClubFetchOneData | undefined;
  open: boolean;
  onClose: () => void;
  clubId: string;
}) {
  //TODO: Connect to actual logic
  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<{sport_id: string}>();

  const onSubmit = async (data: {sport_id: string}) => {
    // action(params.club_id, data);
    if (!data.sport_id) {
      setError("sport_id", {
        type: "manual", 
        message: "Olahraga tidak boleh kosong",
      });
    } else {
      try {
        await joinClub(clubId, data)
      } catch (error){
        console.error(error)
      } finally {
        onClose();
      }
    }
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledDialogTitle>{`Join to Club ${data?.name}`}</StyledDialogTitle>
        <DialogContent>
          <Box>
            <Typography align="center">Silahkan pilih Olahraga</Typography>
          </Box>

          <Controller
            control={control}
            name="sport_id"
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                margin="normal"
                label="Olahraga"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                value={field.value}
                onChange={({ target: { value } }) => field.onChange(value)}
                error={!!errors.sport_id}
                helperText={errors?.sport_id?.message}
              >
                {data?.sports.map((value) => (
                  <MenuItem key={value.sport_id} value={value.sport_id}>
                    {value.sport_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" type="submit">
            Join
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default DialogJoinClub;
