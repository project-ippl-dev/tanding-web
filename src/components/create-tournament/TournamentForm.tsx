"use client";

import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Typography,
  Box,
  Paper,
  Divider,
  InputAdornment,
  useTheme,
  Card,
  CardContent,
  MenuItem,
  FormHelperText,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DescriptionIcon from "@mui/icons-material/Description";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupsIcon from "@mui/icons-material/Groups";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  LocationCity,
  Delete as DeleteIcon,
  InsertDriveFile as InsertDriveFileIcon,
} from "@mui/icons-material";

const RichTextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (data: string) => void;
}) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [CKEditor, setCKEditor] = useState<any>(null);
  const [ClassicEditor, setClassicEditor] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (async () => {
        const { CKEditor: CKE } = await import("@ckeditor/ckeditor5-react");
        const Classic = (await import("@ckeditor/ckeditor5-build-classic"))
          .default;
        setCKEditor(() => CKE);
        setClassicEditor(() => Classic);
        setEditorLoaded(true);
      })();
    }
  }, []);

  return editorLoaded && CKEditor && ClassicEditor ? (
    <Card variant="outlined" sx={{ mt: 1 }}>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(_: any, editor: any) => {
          onChange(editor.getData());
        }}
      />
    </Card>
  ) : (
    <Box
      sx={{
        p: 3,
        textAlign: "center",
        bgcolor: "#f5f5f5",
        borderRadius: 1,
        mt: 1,
      }}
    >
      <Typography color="text.secondary">Loading editor...</Typography>
    </Box>
  );
};

export interface IFormValues {
  clubName: string;
  olahraga: string;
  regOpen: string;
  regClose: string;
  startDate: string;
  endDate: string;
  quota: number;
  prize: string;
  description: string;
  rules: string;
  online: boolean;
  location: string;
  province: string;
  city: string;
  thumbnail: FileList | null;
  proposal: FileList | null;
}

export default function TournamentForm({
  onSubmitComplete,
  isSubmitting = false,
}: {
  onSubmitComplete: (data: IFormValues) => void;
  isSubmitting?: boolean;
}) {
  const theme = useTheme();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      clubName: "",
      olahraga: "",
      regOpen: "",
      regClose: "",
      startDate: "",
      endDate: "",
      quota: 0,
      prize: "",
      description: "",
      rules: "",
      online: true,
      location: "",
      province: "",
      city: "",
      thumbnail: null,
      proposal: null,
    },
  });

  const isOnline = watch("online");

  const provincesIndonesia = [
    "Aceh",
    "Bali",
    "Bangka Belitung",
    "Banten",
    "Bengkulu",
    "DI Yogyakarta",
    "DKI Jakarta",
    "Gorontalo",
    "Jambi",
    "Jawa Barat",
    "Jawa Tengah",
    "Jawa Timur",
    "Kalimantan Barat",
    "Kalimantan Selatan",
    "Kalimantan Tengah",
    "Kalimantan Timur",
    "Kalimantan Utara",
    "Kepulauan Riau",
    "Lampung",
    "Maluku",
    "Maluku Utara",
    "Nusa Tenggara Barat",
    "Nusa Tenggara Timur",
    "Papua",
    "Papua Barat",
    "Riau",
    "Sulawesi Barat",
    "Sulawesi Selatan",
    "Sulawesi Tengah",
    "Sulawesi Tenggara",
    "Sulawesi Utara",
    "Sumatera Barat",
    "Sumatera Selatan",
    "Sumatera Utara",
  ];

  const onSubmit = (data: IFormValues) => {
    onSubmitComplete(data);
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, mb: 4, overflow: "hidden" }}>
      <Box
        sx={{
          p: 2,
          background: "linear-gradient(to right, #ec4899, #8b5cf6)",
          color: theme.palette.primary.contrastText,
        }}
      >
        <Typography variant="h6">Detail Tournament</Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: theme.spacing(3),
            }}
          >
            {/* Section header */}
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="subtitle1"
                fontWeight="500"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SportsSoccerIcon sx={{ mr: 1 }} color="primary" /> Informasi
                Dasar
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Box>

            {/* Club Name & Sport */}
            <Box sx={{ width: { xs: "100%", md: "48%" } }}>
              <Controller
                name="clubName"
                control={control}
                rules={{ required: "Nama tournament harus diisi" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Nama Tournament"
                    fullWidth
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                  />
                )}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "48%" } }}>
              <Controller
                name="olahraga"
                control={control}
                rules={{ required: "Jenis olahraga harus diisi" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Olahraga"
                    fullWidth
                    variant="outlined"
                    placeholder="Contoh: Sepak Bola, Basket, Voli"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                  />
                )}
              />
            </Box>

            {/* Date & Time Header */}
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="subtitle1"
                fontWeight="500"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <EventIcon sx={{ mr: 1 }} color="primary" /> Waktu dan Tanggal
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Box>

            {/* Registration Opens/Closes */}
            <Box sx={{ width: { xs: "100%", md: "48%" } }}>
              <Controller
                name="regOpen"
                control={control}
                rules={{ required: "Waktu pendaftaran dibuka harus diisi" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Waktu Registrasi Dibuka"
                    type="datetime-local"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                  />
                )}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "48%" } }}>
              <Controller
                name="regClose"
                control={control}
                rules={{ required: "Waktu pendaftaran ditutup harus diisi" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Waktu Registrasi Ditutup"
                    type="datetime-local"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                  />
                )}
              />
            </Box>

            {/* Start/End Dates */}
            <Box sx={{ width: { xs: "100%", md: "48%" } }}>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: "Tanggal mulai harus diisi" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Waktu Pertandingan Mulai"
                    type="date"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                  />
                )}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "48%" } }}>
              <Controller
                name="endDate"
                control={control}
                rules={{ required: "Tanggal berakhir harus diisi" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Waktu Pertandingan Berakhir"
                    type="date"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                  />
                )}
              />
            </Box>

            {/* Details Header */}
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="subtitle1"
                fontWeight="500"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <GroupsIcon sx={{ mr: 1 }} color="primary" /> Detail
                Pertandingan
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Box>

            {/* Quota & Prize */}
            <Box sx={{ width: { xs: "100%", md: "48%" } }}>
              <Controller
                name="quota"
                control={control}
                rules={{
                  required: "Kuota peserta harus diisi",
                  min: { value: 1, message: "Kuota minimal 1 peserta" },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Kuota Peserta"
                    type="number"
                    fullWidth
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GroupsIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "48%" } }}>
              <Controller
                name="prize"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Hadiah"
                    fullWidth
                    variant="outlined"
                    placeholder="Contoh: Rp 5.000.000 + Piala Bergilir"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmojiEventsIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>

            {/* Description */}
            <Box sx={{ width: "100%" }}>
              <Controller
                name="description"
                control={control}
                rules={{ required: "Deskripsi pertandingan harus diisi" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Deskripsi Pertandingan"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Jelaskan tentang pertandingan ini"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ alignSelf: "flex-start", mt: 1.5 }}
                        >
                          <DescriptionIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>

            {/* Thumbnail Upload */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Gambar Thumbnail
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Unggah gambar untuk ditampilkan sebagai thumbnail tournament
              </Typography>

              <Controller
                name="thumbnail"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <Box>
                    <Box
                      sx={{
                        border: "1px dashed",
                        borderColor: "primary.light",
                        borderRadius: 2,
                        p: 3,
                        textAlign: "center",
                        cursor: "pointer",
                        position: "relative",
                        transition: "all 0.2s ease-in-out",
                        backgroundColor: "background.paper",
                        "&:hover": {
                          borderColor: "primary.main",
                          backgroundColor: "action.hover",
                        },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      {...field}
                      component="label"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => onChange(e.target.files)}
                      />

                      {value && value[0] ? (
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          <Box
                            component="img"
                            src={URL.createObjectURL(value[0])}
                            alt="Thumbnail preview"
                            sx={{
                              width: 160,
                              height: 120,
                              objectFit: "cover",
                              borderRadius: 1,
                              boxShadow: 1,
                              mb: 2,
                            }}
                          />
                          <IconButton
                            size="small"
                            color="error"
                            onClick={(e) => {
                              e.stopPropagation();
                              onChange(null);
                            }}
                            sx={{
                              position: "absolute",
                              top: -12,
                              right: -12,
                              backgroundColor:
                                "linear-gradient(to right, #ec4899, #8b5cf6)",
                              color: theme.palette.primary.contrastText,
                              boxShadow: 1,
                              "&:hover": {
                                backgroundColor:
                                  "linear-gradient(to right, #ec4899, #8b5cf6)",
                                color: theme.palette.primary.contrastText,
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <CloudUploadIcon
                          fontSize="large"
                          color="primary"
                          sx={{ fontSize: 48, mb: 2 }}
                        />
                      )}

                      <Typography
                        variant="body1"
                        fontWeight="500"
                        sx={{ mb: 1 }}
                      >
                        {value && value[0]
                          ? value[0].name
                          : "Klik untuk unggah gambar thumbnail"}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        Format: JPG, PNG, Max 2MB
                      </Typography>
                    </Box>
                  </Box>
                )}
              />
            </Paper>

            {/* Rules Rich Text */}
            <Box sx={{ width: "100%" }}>
              <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                Peraturan Pertandingan
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Tulis peraturan lengkap pertandingan disini
              </Typography>
              <Controller
                name="rules"
                control={control}
                rules={{ required: "Peraturan pertandingan harus diisi" }}
                render={({ field, fieldState }) => (
                  <>
                    <RichTextEditor
                      value={field.value}
                      onChange={(data) => field.onChange(data)}
                    />
                    {fieldState.error && (
                      <FormHelperText error>
                        {fieldState.error.message}
                      </FormHelperText>
                    )}
                  </>
                )}
              />
            </Box>

            {/* Proposal Upload */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Proposal Tournament
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Unggah file proposal untuk tournament ini
              </Typography>

              <Controller
                name="proposal"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <Box>
                    <Box
                      sx={{
                        border: "1px dashed",
                        borderColor: "primary.light",
                        borderRadius: 2,
                        p: 3,
                        textAlign: "center",
                        cursor: "pointer",
                        position: "relative",
                        transition: "all 0.2s ease-in-out",
                        backgroundColor: "background.paper",
                        "&:hover": {
                          borderColor: "primary.main",
                          backgroundColor: "action.hover",
                        },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      {...field}
                      component="label"
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        hidden
                        onChange={(e) => onChange(e.target.files)}
                      />

                      {value && value[0] ? (
                        <Box
                          sx={{ position: "relative", width: "100%", mb: 1 }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              mb: 2,
                            }}
                          >
                            <InsertDriveFileIcon
                              color="primary"
                              sx={{ fontSize: 48 }}
                            />
                            <IconButton
                              size="small"
                              color="error"
                              onClick={(e) => {
                                e.stopPropagation();
                                onChange(null);
                              }}
                              sx={{
                                position: "absolute",
                                top: -12,
                                right: -12,
                                backgroundColor:
                                  "linear-gradient(to right, #ec4899, #8b5cf6)",
                                color: theme.palette.primary.contrastText,
                                boxShadow: 1,
                                "&:hover": {
                                  backgroundColor:
                                    "linear-gradient(to right, #ec4899, #8b5cf6)",
                                  color: theme.palette.primary.contrastText,
                                },
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      ) : (
                        <AttachFileIcon
                          color="primary"
                          sx={{ fontSize: 48, mb: 2 }}
                        />
                      )}

                      <Typography
                        variant="body1"
                        fontWeight="500"
                        sx={{ mb: 1 }}
                      >
                        {value && value[0]
                          ? value[0].name
                          : "Klik untuk unggah proposal"}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        Format: PDF, DOC, DOCX, Max 5MB
                      </Typography>
                    </Box>
                  </Box>
                )}
              />
            </Paper>

            {/* Location Card */}
            <Box sx={{ width: "100%" }}>
              <Card sx={{ bgcolor: "#f9f9f9", p: 2 }}>
                <CardContent sx={{ "&:last-child": { pb: 2 } }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="500"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <LocationOnIcon sx={{ mr: 1 }} color="primary" />
                    Lokasi Pertandingan
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Controller
                    name="online"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Typography variant="body1">
                            Pertandingan diadakan secara online
                          </Typography>
                        }
                      />
                    )}
                  />
                  {!isOnline && (
                    <Box>
                      <Box sx={{ mt: 2 }}>
                        <Controller
                          name="location"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Lokasi"
                              fullWidth
                              variant="outlined"
                              placeholder="Contoh: GOR Senayan, Jakarta Pusat"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocationOnIcon fontSize="small" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Controller
                          name="province"
                          control={control}
                          rules={{ required: "Provinsi harus dipilih" }}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              select
                              label="Provinsi"
                              fullWidth
                              variant="outlined"
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                            >
                              {provincesIndonesia.map((prov) => (
                                <MenuItem key={prov} value={prov}>
                                  {prov}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        />
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1,
                background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                "&:hover": {
                  background: "linear-gradient(to right, #db2777, #7c3aed)",
                },
              }}
            >
              Simpan Tournament
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
