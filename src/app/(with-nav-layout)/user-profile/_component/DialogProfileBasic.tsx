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
import { styled } from '@mui/material/styles';
import DatePickerCustom from "./parts/DialogProfileBasic/DatePickerCustom";
import TextFieldNumeric from "../../../../components/input/TextFieldNumeric";
import { CloudUpload } from "@mui/icons-material";
import { useAuth } from "@/context/auth.context";
import Image from "next/image";
import moment from "moment";
import { ProfileBasicResponse, ProfileUpdate } from "@/types/profile";
import { updateProfileData } from "@/store/actions/profile";

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


interface DialogProfileBasicProps {
  open: boolean;
  action: (data: ProfileUpdate) => void;
  onClose: () => void;
  setLoading: (loading: boolean) => void;
  profile: ProfileBasicResponse | null;
}

const DialogProfileBasic: React.FC<DialogProfileBasicProps> = ({
  open,
  action,
  onClose,
  setLoading,
  profile,
}) => {
  const [formData, setFormData] = useState<ProfileUpdate>({
    name: "",
    born_at: "",
    born_on: "",
    identity_number: "",
    phone: "",
    gender: "",
    about: "",
    photo: ""
  });

  const { authData } = useAuth()
  
  const [errors, setErrors] = useState<Record<string, string>>({}); // Annotate errors as a record of string keys and string values
  const [image, setImage] = useState<File | null>(null); // Annotate image as a File or null

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (formData.photo) {
        URL.revokeObjectURL(formData.photo); // Hapus URL lama
      }
      setImage(file); // Simpan file gambar
      setFormData(prevState => ({
        ...prevState,
        photo: URL.createObjectURL(file), // Simpan URL gambar
      }))
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {}; // Annotate newErrors as a record of string keys and string values
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

  const handleChange = (field: keyof typeof formData, value: string | Date | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        photo: image || profile?.data.photo, // Gunakan gambar baru jika ada
      };

      const url =
          process.env.NODE_ENV === "development"
            ? "own"
            : authData
            ? authData.user_id
            : ""; //TODO: Handle if accessed without authData
      // const response = await fetch(`/api/profile/${url}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "Bearer "+ authData?.token.access_token,
      //   },
      //   body: JSON.stringify(payload),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to update profile");
      // }

      await updateProfileData({ uuid: url, payload: payload})
      // const result = await response.json();

      // action(formData, image || false, profile.data.id, setLoading, profile.data.photo);
      
      action(formData);
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
        born_on: profile?.data.born_on?.Time || "",
        identity_number: profile?.data.identity_number || "",
        phone: profile?.data.phone || "",
        gender: profile?.data.gender || "",
        about: profile?.data.about || "",
        photo: profile?.data.photo || ""
      });
    }
  }, [open]);

  /*
  useEffect(() => {
    return () => {
      if (formData.photo) {
        URL.revokeObjectURL(formData.photo); // Bersihkan URL saat komponen unmount
      }
    };
  }, [formData.photo]);
  */

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <DialogTitle style={{ padding: "16px 24px 0" }}>Data Diri</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent style={{ padding: "0 24px" }}>
          <Box marginTop={3} paddingX={1}>
            <Typography>Photo Profile</Typography>
            {formData.photo && (
              <Box marginBottom={2} display="flex" justifyContent="center">
                <Image
                  src={formData.photo}
                  alt="Preview"
                  width={100} // Ukuran tetap untuk lebar
                  height={100} // Ukuran tetap untuk tinggi
                  style={{
                    objectFit: 'cover', // Memastikan gambar tetap proporsional
                    borderRadius: "50%", // Membuat gambar berbentuk lingkaran
                    width: '100px', // Ukuran tetap untuk lebar
                    height: '100px', // Ukuran tetap untuk tinggi
                    border: "2px solid #ccc", // Menambahkan border
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
            value={moment(formData.born_on)}
            onChange={(value: moment.Moment | null) => handleChange("born_on", value ? value.toDate() : null)}
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
            onChange={({ value }: { value: string }) => handleChange("identity_number", value)} // Annotate onChange prop
            error={!!errors.identity_number}
            helperText={errors.identity_number}
          />
          <TextFieldNumeric
            margin="normal"
            label="Nomor Telepon"
            placeholder="1234-5678-00000"
            format="####-####-#####"
            value={formData.phone}
            onChange={({ value }: { value: string }) => handleChange("phone", value)} // Annotate onChange prop
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            select
            fullWidth
            margin="normal"
            label="Jenis Kelamin"
            value={formData.gender}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("gender", e.target.value)} // Annotate onChange prop
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
