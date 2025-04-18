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
import TextFieldNumeric from "@/app/components/TextFieldNumeric";
import DatePickerCustom from "@/app/components/DatePickerCustom";

const DialogProfileBasic = ({ open, action, onClose, setLoading, profile }) => {
  const [formData, setFormData] = useState({
    name: "",
    born_at: "",
    born_on: null,
    identity_number: "",
    phone: "",
    gender: "",
    about: "",
  });

  const [errors, setErrors] = useState({});

  const [image, setImage] = useState([]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Nama lengkap harus diisi";
    if (!formData.born_at) newErrors.born_at = "Tempat lahir harus diisi";
    if (!formData.born_on) newErrors.born_on = "Tanggal lahir harus diisi";
    if (!/^\d{16}$/.test(formData.identity_number))
      newErrors.identity_number = "Nomor KTP harus terdiri dari 16 digit";
    if (!/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Nomor telepon harus terdiri dari 10-15 digit";
    if (!["male", "female"].includes(formData.gender))
      newErrors.gender = "Jenis kelamin tidak valid";
    if (!formData.about) newErrors.about = "Tentang anda harus diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        photo: !!image[0] ? image[0] : profile.data.photo,
      };

      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your-token-here",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      action(formData, !!image[0] ? image[0] : false, profile.data.id, setLoading, profile.data.photo);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile?.data !== null && open) {
      setFormData({
        name: profile?.data.name || "",
        born_at: profile?.data.born_at || "",
        born_on: profile?.data.born_on?.Time || null,
        identity_number: profile?.data.identity_number || "",
        phone: profile?.data.phone || "",
        gender: profile?.data.gender || "",
        about: profile?.data.about || "",
      });
    }
  }, [open]);

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <DialogTitle style={{ padding: "16px 24px 0" }}>Data Diri</DialogTitle>
      <form onSubmit={handleSubmit}>
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
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Tempat Lahir"
            placeholder="Tempat lahir anda"
            value={formData.born_at}
            onChange={(e) => handleChange("born_at", e.target.value)}
            error={!!errors.born_at}
            helperText={errors.born_at}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
          <DatePickerCustom
            size="small"
            label="Tanggal Lahir"
            placeholder="Pilih Tanggal"
            format="dd MMMM yyyy"
            value={formData.born_on}
            onChange={(value) => handleChange("born_on", value)}
            margin="normal"
            slotProps={{
              inputLabel: { shrink: true },
            }}
            error={!!errors.born_on}
            helperText={errors.born_on}
          />
          <TextFieldNumeric
            margin="normal"
            label="Nomor KTP"
            format="######-######-####"
            placeholder="123456-123456-0000"
            value={formData.identity_number}
            onChange={({ value }) => handleChange("identity_number", value)}
            error={!!errors.identity_number}
            helperText={errors.identity_number}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
          <TextFieldNumeric
            margin="normal"
            label="Nomor Telepon"
            placeholder="1234-5678-00000"
            format="####-####-#####"
            value={formData.phone}
            onChange={({ value }) => handleChange("phone", value)}
            error={!!errors.phone}
            helperText={errors.phone}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
          <TextField
            select
            fullWidth
            margin="normal"
            label="Jenis Kelamin"
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            error={!!errors.gender}
            helperText={errors.gender}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          >
            <MenuItem value="male">Laki-laki</MenuItem>
            <MenuItem value="female">Perempuan</MenuItem>
          </TextField>
          <TextField
            multiline
            minRows={5}
            fullWidth
            margin="normal"
            variant="outlined"
            label="Tentang anda"
            placeholder="Tentang anda"
            value={formData.about}
            onChange={(e) => handleChange("about", e.target.value)}
            error={!!errors.about}
            helperText={errors.about}
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
