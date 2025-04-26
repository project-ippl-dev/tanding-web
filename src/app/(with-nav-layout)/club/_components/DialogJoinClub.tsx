"use client";
import StyledDialogTitle from "@/components/dialog/StyledDialogTitle";
import { Box, Button, Dialog, DialogActions, DialogContent, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";

function DialogJoinClub({ data, open, onClose }) {
  //TODO: Connect to actual logic
  const [value, setValue] = useState({});
  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <form> { /* onSubmit={handleSubmit(onSubmit)} */ }
        <StyledDialogTitle>{`Join to Club ${data?.name}`}</StyledDialogTitle>
        <DialogContent>
          <Box>
            <Typography align="center">Silahkan pilih Olahraga</Typography>
          </Box>
          
              <TextField
                select
                fullWidth
                margin="normal"
                label="Olahraga"
                slotProps={{ inputLabel : 
                  {shrink: true}
                }}
                value={value}
                // onChange={({ target: { value } }) => onChange(value)}
              >
                {data?.sports.map((value) => (
                  <MenuItem key={value.sport_id} value={value.sport_id}>
                    {value.sport_name}
                  </MenuItem>
                ))}
              </TextField>
            
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
