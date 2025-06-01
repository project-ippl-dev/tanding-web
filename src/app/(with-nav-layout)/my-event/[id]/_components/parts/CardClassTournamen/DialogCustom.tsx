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
import { createClass } from "@/store/actions/classTournament";
import { useNotification } from "@/context/notification.context";
import { NotificationType } from "@/types/notification.type";

async function reqCreateClass(
  data: CreateClassPayload,
  notification: (message:string,status?:NotificationType) => void
) {
  const response = await createClass(data);
  if ([200, 201].includes(response.status)) {
    notification(response.message || "Kelas berhasil dibuat", "success");
  } else {
    notification("Gagal membuat data respon, dengan error: " + response.error, "error");
  }
}
interface DialogCustomProps {
  open: boolean;
  onClose: () => void;
  rules: ClassRules[];
  sportId: string;
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
}) => {
  const loading = useLoading();
  const notification = useNotification();
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
    await reqCreateClass(formData, notification.showNotification);
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form 
        data-testid="dialog-custom-class"
        onSubmit={handleSubmit(onSubmit)}>
        <StyledDialogTitle onClose={onClose}>
          Create Custom Class
        </StyledDialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            size="small"
            label="Nama Kelas Tournament"
            margin="normal"
            {...register("name", {required: true})}
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
          <Button 
          data-testid="submit-custom-class"
          variant="contained" color="primary" type="submit">
            Tambah Kelas
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogCustom;
