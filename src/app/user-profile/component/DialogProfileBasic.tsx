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
  IconButton,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DatePickerCustom from "../parts/DialogProfileBasic/DatePickerCustom";
import TextFieldNumeric from "../parts/DialogProfileBasic/TextFieldNumeric";
import { CloudUpload } from "@mui/icons-material";
import { AUTH_DATA } from "@/store/auth";
import { useAuth } from "@/context/auth.context";
import { AuthData } from "@/types/auth.type";
import { getExternalApiUrl } from "@/utils/api";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})


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

  const auth : AuthData = useAuth()


  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null); // Untuk menyimpan file gambar
  const [preview, setPreview] = useState(""); // Untuk menyimpan URL pratinjau gambar

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Simpan file gambar
      setPreview(URL.createObjectURL(file)); // Buat URL pratinjau
    }
  };

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
        photo: image || profile.data.photo, // Gunakan gambar baru jika ada
      };

      const url = getExternalApiUrl(`/profile/${auth.data.user_id}/basic`)
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+ auth.data.token.access_token,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      action(formData, image || false, profile.data.id, setLoading, profile.data.photo);
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
      setPreview(profile?.data.photo || ""); // Set pratinjau gambar dari profil
    }
  }, [open]);

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <DialogTitle style={{ padding: "16px 24px 0" }}>Data Diri</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent style={{ padding: "0 24px" }}>
          <Box marginTop={3} paddingX={1}>
            <Typography>Photo Profile</Typography>
            {preview && (
              <Box marginBottom={2} display="flex" justifyContent="center">
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "2px solid #ccc",
                  }}
                />
              </Box>
            )}
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                Upload files
                <VisuallyHiddenInput
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-photo"
                  type="file"
                  onChange={handleImageChange}
                />
              </Button>
            </Box>
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
          />
          <DatePickerCustom
            size="small"
            label="Tanggal Lahir"
            placeholder="Pilih Tanggal"
            format="DD MMMM YYYY"
            value={formData.born_on}
            onChange={(value) => handleChange("born_on", value)}
            margin="normal"
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
