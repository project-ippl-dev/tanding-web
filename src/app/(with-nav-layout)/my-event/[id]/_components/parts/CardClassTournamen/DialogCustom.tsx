import React from "react";
import {
  Dialog,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import StyledDialogTitle from "@/components/dialog/StyledDialogTitle";
import { ClassRules, CreateClassPayload } from "@/types/class.types";
import { useLoading } from "@/context/loading.context";

interface DialogCustomProps {
  open: boolean;
  onClose: () => void;
  rules: ClassRules[];
  sportId: string;
  action: (params: CreateClassPayload) => Promise<void>; // Corrected type and return annotation
}

interface FormCreateClass {
  name: string;
  class_rule_id: string;
  match_type: string;
}

const DialogCustom: React.FC<DialogCustomProps> = ({
  open,
  onClose,
  rules,
  sportId,
  action,
}) => {
  const loading = useLoading();
  const { handleSubmit, control, register, formState: { errors } } = useForm<FormCreateClass>();

  function setLoading(value: boolean) {
    if (loading?.changeState) {
      loading.changeState(value);
    }
  }

  const onSubmit = async (data: FormCreateClass) => {
    const formData: CreateClassPayload = {
      ...data,
      sport_id: sportId,
      class_type: "custom",
    };
    setLoading(true);
    await action(formData);
    setLoading(false);
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
            inputRef={register("name").ref}
            name="name"
            error={!!errors?.name}
          />
          <Controller
            control={control}
            name="class_rule_id"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                select
                fullWidth
                size="small"
                label="Peraturan Kelas"
                margin="normal"
                value={value}
                onChange={onChange}
                error={!!errors?.class_rule_id}
              >
                {rules.map((value) => (
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
            render={({ field: { onChange, value } }) => (
              <TextField
                select
                fullWidth
                size="small"
                label="Metode eliminasi"
                margin="normal"
                value={value}
                onChange={onChange}
                error={!!errors?.match_type}
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
