/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
// import ImageUploader from "react-images-upload";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
import TextFieldNumeric from "@/app/components/TextFieldNumeric"
import DatePickerCustom  from "@/app/components/DatePickerCustom"

/*
const validationSchema = yup.object().shape({
  name: yup.string().required("Data harus diisi"),
  phone: yup.string().required("Data harus diisi"),
  born_at: yup.string().required("Data harus diisi"),
  born_on: yup
    .string()
    .required("Data harus diisi")
    .typeError("Data harus diisi"),
  identity_number: yup.string().required("Data harus diisi"),
  gender: yup.string().required("Data harus diisi"),
  about: yup.string().required("Data harus diisi"),
});
*/

const DialogProfileBasic = ({ open, action, onClose, setLoading, profile }) => {
  const [image, setImage] = useState([]);
  const { register, errors, handleSubmit, control, setValue } = useForm({
   // resolver: yupResolver(validationSchema),
    shouldUnregister: false,
  });

  const submitProfile = (data) => {
    setLoading(true);
    action(
      data,
      !!image[0] ? image[0] : false,
      profile.data.id,
      setLoading,
      profile.data.photo
    );
    onClose();
  };

  useEffect(() => {
    /*
    if (profile?.data !== null && open) {
      setValue("name", profile.data.name);
      setValue("born_at", profile.data.born_at);
      setValue("born_on", profile.data.born_on.time);
      setValue("identity_number", profile.data.identity_number);
      setValue("phone", profile.data.phone);
      setValue("gender", profile.data.gender);
      setValue("about", profile.data.about);
    }
      */
  }, [open]);

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <DialogTitle style={{ padding: "16px 24px 0" }}>Data Diri</DialogTitle>
      <form onSubmit={handleSubmit(submitProfile)}>
        <DialogContent style={{ padding: "0 24px" }}>
          <Box marginTop={3} paddingX={1}>
            <Typography>Photo Profile</Typography>
            {
              /**
                  <ImageUploader
                    withIcon={true}
                    buttonText="Upload Photo Profile"
                    onChange={(value) => setImage(value)}
                    imgExtension={[".jpg", ".jpeg", ".png"]}
                    maxFileSize={2242880}
                    withPreview={true}
                    label="Max file size : 2 mb, Format : jpeg, png, jpg"
                    accept="image/jpg,image/jpeg,image/png"
                    singleImage={true}
                    name="banner"
                  />
               */
            }

          </Box>
          <TextField
            fullWidth
            margin="normal"
            label="Nama Lengkap"
            placeholder="Tulis nama lengkap anda"
            // inputRef={register}
            name="name"
            // error={!!errors?.name}
            // helperText={errors?.name?.message}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Tempat Lahir"
            placeholder="Tempat lahir anda"
            // inputRef={register}
            name="born_at"
            // error={!!errors?.born_at}
            // helperText={errors?.born_at?.message}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
          <Controller
            control={control}
            name="born_on"
            defaultValue={null}
            render={({ onChange, value }) => (
              <DatePickerCustom
                size="small"
                label="Tanggal Lahir"
                placeholder="Pilih Tanggal"
                format="dd MMMM yyyy"
                value={value}
                onChange={onChange}
                margin="normal"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                // error={!!errors?.born_on}
                // helperText={errors?.born_on?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="identity_number"
            defaultValue=""
            render={({ onChange, value }) => (
              <TextFieldNumeric
                margin="normal"
                label="Nomor KTP"
                format="######-######-####"
                placeholder="123456-123456-0000"
                value={value}
                onChange={({ value }) => onChange(value)}
                // error={!!errors?.identity_number}
                // helperText={errors?.identity_number?.message}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            defaultValue=""
            render={({ onChange, value }) => (
              <TextFieldNumeric
                margin="normal"
                label="Nomor Telepon"
                placeholder="1234-5678-00000"
                format="####-####-#####"
                value={value}
                onChange={({ value }) => onChange(value)}
                // error={!!errors?.phone}
                // helperText={errors?.phone?.message}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="gender"
            defaultValue=""
            render={({ onChange, value }) => (
              <TextField
                select
                fullWidth
                margin="normal"
                label="Jenis Kelamin"
                value={value}
                onChange={({ target: { value } }) => onChange(value)}
                // error={!!errors?.phone}
                // helperText={errors?.phone?.message}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              >
                <MenuItem value="male">Laki-laki</MenuItem>
                <MenuItem value="female">Perempuan</MenuItem>
              </TextField>
            )}
          />
          <TextField
            multiline
            minRows={5}
            fullWidth
            margin="normal"
            variant="outlined"
            label="Tentang anda"
            placeholder="Tentang anda"
            // inputRef={register}
            name="about"
            // error={!!errors?.about}
            // helperText={errors?.about?.message}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" type="submit">
            Simpan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogProfileBasic;
