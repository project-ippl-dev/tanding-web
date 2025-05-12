import React from "react";
import {
  Dialog,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

import { StyledDialogTitle } from "../../../../../../components";

const DialogCustom = ({ open, onClose, rules, sportId, action }) => {
  const { handleSubmit, errors, control, register } = useForm();

  const onSubmit = (data) => {
    const formData = { ...data, sport_id: sportId, class_type: "custom" };
    action(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledDialogTitle onClose={onClose}>
          Create Custom Class
        </StyledDialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            size="small"
            label="Nama Kelas Tournament"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={register}
            name="name"
            error={!!errors.class_id}
          />
          <Controller
            control={control}
            name="class_rule_id"
            defaultValue=""
            render={({ onChange, value }) => (
              <TextField
                select
                fullWidth
                size="small"
                label="Peraturan Kelas"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={value}
                onChange={({ target: { value } }) => onChange(value)}
                error={!!errors.class_rule_id}
              >
                {rules.data.map((value) => (
                  <MenuItem key={value.id} value={value.id}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            control={control}
            name="match_type"
            defaultValue=""
            render={({ onChange, value }) => (
              <TextField
                select
                fullWidth
                size="small"
                label="Metode eliminasi"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={value}
                onChange={({ target: { value } }) => onChange(value)}
                error={!!errors.match_type}
              >
                <MenuItem value="single">Single Elimination</MenuItem>
                <MenuItem value="order">Order</MenuItem>
              </TextField>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" type="submit">
            Tambah Kelas
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogCustom;
