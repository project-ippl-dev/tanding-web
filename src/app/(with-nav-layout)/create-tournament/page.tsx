"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import {
  Card,
  Container,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  Box,
  Button,
  CircularProgress,
  Autocomplete,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormBanner from "./_components/FormBanner";
import TextFieldFormat from "@/components/TextFieldFormat/TextFieldFormat";
import { createTournament } from "@/store/actions/event";
import { getSport } from "@/store/actions/sport";
import { getProvince, getCities } from "@/store/actions/address";
import { useAuth } from "@/context/auth.context";
import DatePicker from "@/components/DatePicker";
import DateTimePicker from "@/components/DateTimePicker";

interface RichTextEditorProps {
  value: string;
  onChange: (data: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
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

const validationSchema = yup.object().shape({
  name: yup.string().required("data harus diisi"),
  sport_id: yup
    .object()
    .shape({
      id: yup.string(),
      name: yup.string(),
    })
    .typeError("Data wajib diisi")
    .required("Data wajib diisi"),
  open: yup.string().required("data harus diisi").typeError("Data wajib diisi"),
  deadline: yup
    .string()
    .required("data harus diisi")
    .typeError("Data wajib diisi"),
  start_date: yup
    .string()
    .required("data harus diisi")
    .typeError("Data wajib diisi"),
  end_date: yup
    .string()
    .required("data harus diisi")
    .typeError("Data wajib diisi"),
  quota: yup
    .number()
    .required("data harus diisi")
    .typeError("Data wajib diisi"),
  prize_pool: yup.string().required("data harus diisi"),
  description: yup.string().required("data harus diisi"),
  rules: yup.string().required("data harus diisi"),
  location: yup.string().nullable(),
  province: yup
    .object()
    .shape({
      id: yup.string(),
      name: yup.string(),
    })
    .nullable(),
  city: yup
    .object()
    .shape({
      id: yup.string(),
      name: yup.string(),
    })
    .nullable(),
});

// Types
interface Sport {
  id: string;
  name: string;
}

interface Province {
  id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
}

export default function CreateTournamentPage() {
  const router = useRouter();
  const { authData } = useAuth();

  const [selectedType, setSelectedType] = useState("");
  const [keyword, setKeyword] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [proposal, setProposal] = useState<File | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sports, setSports] = useState<Sport[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      sport_id: undefined,
      open: "",
      deadline: "",
      start_date: "",
      end_date: "",
      quota: undefined,
      prize_pool: "",
      description: "",
      rules: "",
      location: "",
      province: null,
      city: null,
    },
  });

  // Watch province value to trigger city fetch
  const selectedProvince = watch("province");

  // Fetch sports data
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await getSport("1", "10", keyword, selectedType);
        if (response && response.data) {
          setSports(response.data);
        }
      } catch (error) {
        console.error("Error fetching sports:", error);
        showAlert("Error fetching sports data", "error");
      }
    };

    fetchSports();
  }, [selectedType, keyword]);

  // Fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getProvince();
        if (response) {
          setProvinces(response);
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
        showAlert("Error fetching province data", "error");
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince && selectedProvince.id) {
      const fetchCities = async () => {
        try {
          const response = await getCities(selectedProvince.id as string);
          if (response) {
            setCities(response);
          }
        } catch (error) {
          console.error("Error fetching cities:", error);
          showAlert("Error fetching city data", "error");
        }
      };

      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedProvince]);

  // Form submission
  const onSubmit = async (data: any) => {
    if (!isOnline && (!data.location || !data.province || !data.city)) {
      showAlert("Lokasi tournament harus diisi", "error");
      return;
    }

    if (!banner) {
      showAlert("Banner tournament belum diupload", "error");
      return;
    }

    setLoading(true);

    try {
      const formData = {
        ...data,
        start_date: moment(data.start_date).format("YYYY-MM-DD"),
        end_date: moment(data.end_date).format("YYYY-MM-DD"),
        deadline: moment
          .utc(moment(data.deadline))
          .format("YYYY-MM-DDTHH:mm:ss"),
        open: moment.utc(moment(data.open)).format("YYYY-MM-DDTHH:mm:ss"),
        location: isOnline ? "online" : data.location,
        city: isOnline ? "" : data.city.name,
        province: isOnline ? "" : data.province.name,
        sport_id: data.sport_id.id,
        type: "competition",
      };

      const result = await createTournament({
        data: formData,
        bannerFile: banner,
        proposalFile: proposal || undefined,
      });

      if (result.error) {
        showAlert(result.error, "error");
      } else {
        showAlert("Tournament berhasil dibuat", "success");

        // Redirect to event page
        if (result.data) {
          setTimeout(() => {
            router.push(`/my-event/${result.data}`);
          }, 1500);
        }
      }
    } catch (error: any) {
      console.error("Error creating tournament:", error);
      showAlert(
        error.message || "Terjadi kesalahan saat membuat tournament",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper to show alerts
  const showAlert = (message: string, severity: "success" | "error") => {
    setAlert({
      open: true,
      message,
      severity,
    });
  };

  // Handle alert closing
  const handleCloseAlert = () => {
    setAlert({
      ...alert,
      open: false,
    });
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
            Buat Pertandingan
          </Typography>
          <Typography sx={{ fontSize: "18px", color: "#666666", mb: 2 }}>
            Pastikan seluruh form terisi dengan lengkap dan jelas demi keaslian
            data
          </Typography>

          <Card
            sx={{
              p: 3,
              mb: 2,
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              borderRadius: 2,
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
              Data Pertandingan
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#666666", mb: 2 }}>
              Silahkan isi dengan benar
            </Typography>

            <Box sx={{ px: 1 }}>
              <TextField
                label="Nama Pertandingan"
                placeholder="Tournament Apex Legend Mobile 2th"
                fullWidth
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors?.name?.message as string}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box sx={{ width: { xs: "100%", md: "50%" }, px: 1 }}>
                <TextField
                  select
                  label="Kategori Olahraga"
                  fullWidth
                  margin="normal"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  <MenuItem value="sport">Sport</MenuItem>
                  <MenuItem value="e-sport">E-Sport</MenuItem>
                </TextField>
              </Box>

              <Box sx={{ width: { xs: "100%", md: "50%" }, px: 1 }}>
                <Controller
                  control={control}
                  name="sport_id"
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={sports}
                      getOptionLabel={(option) => option.name ?? ""}
                      onChange={(_, value) => field.onChange(value)}
                      inputValue={keyword}
                      onInputChange={(_, newValue) => setKeyword(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Olahraga"
                          fullWidth
                          margin="normal"
                          error={!!errors.sport_id}
                          helperText={errors?.sport_id?.message as string}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  )}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box sx={{ width: { xs: "100%", md: "50%" }, px: 1 }}>
                <Controller
                  control={control}
                  name="open"
                  render={({ field }) => (
                    <DateTimePicker
                      label="Open Pendaftaran"
                      placeholder="Pilih Tanggal"
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors.open}
                      helperText={errors?.open?.message as string}
                    />
                  )}
                />
              </Box>

              <Box sx={{ width: { xs: "100%", md: "50%" }, px: 1 }}>
                <Controller
                  control={control}
                  name="deadline"
                  render={({ field }) => (
                    <DateTimePicker
                      label="Batas Waktu Pendaftaran"
                      placeholder="Pilih Tanggal"
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors.deadline}
                      helperText={errors?.deadline?.message as string}
                    />
                  )}
                />
              </Box>

              <Box sx={{ width: { xs: "100%", md: "50%" }, px: 1 }}>
                <Controller
                  control={control}
                  name="start_date"
                  render={({ field }) => (
                    <DatePicker
                      label="Waktu Mulai Pertandingan"
                      placeholder="Pilih Tanggal"
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors.start_date}
                      helperText={errors?.start_date?.message as string}
                    />
                  )}
                />
              </Box>

              <Box sx={{ width: { xs: "100%", md: "50%" }, px: 1 }}>
                <Controller
                  control={control}
                  name="end_date"
                  render={({ field }) => (
                    <DatePicker
                      label="Waktu Berakhir Pertandingan"
                      placeholder="Pilih Tanggal"
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors.end_date}
                      helperText={errors?.end_date?.message as string}
                    />
                  )}
                />
              </Box>

              <Box sx={{ width: { xs: "100%", md: "50%" }, px: 1 }}>
                <Controller
                  control={control}
                  name="quota"
                  render={({ field }) => (
                    <TextFieldFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      value={field.value}
                      onChange={(values: any) =>
                        field.onChange(values.floatValue)
                      }
                      label="Quota"
                      placeholder="100"
                      margin="normal"
                      error={!!errors.quota}
                      helperText={errors?.quota?.message as string}
                    />
                  )}
                />
              </Box>

              <Box sx={{ width: { xs: "100%", md: "50%" }, px: 1 }}>
                <Controller
                  control={control}
                  name="prize_pool"
                  render={({ field }) => (
                    <TextFieldFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="Rp "
                      value={field.value}
                      onChange={(values: any) => field.onChange(values.value)}
                      label="Total Hadiah"
                      placeholder="Rp 100.000.000"
                      margin="normal"
                      error={!!errors.prize_pool}
                      helperText={errors?.prize_pool?.message as string}
                    />
                  )}
                />
              </Box>

              <Box sx={{ width: "100%", px: 1 }}>
                <TextField
                  multiline
                  rows={5}
                  label="Deskripsi pertandingan"
                  placeholder="Silakan jelaskan deskripsi singkat pertandingan"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors?.description?.message as string}
                />
              </Box>

              <Box sx={{ width: "100%", px: 1, mt: 2 }}>
                <Typography sx={{ mb: 1 }}>Peraturan Tournament</Typography>
                <Controller
                  control={control}
                  name="rules"
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={(data) => field.onChange(data)}
                    />
                  )}
                />
                {errors.rules && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    {errors.rules.message as string}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ mt: 5 }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                Lokasi Pertandingan
              </Typography>
              <FormControlLabel
                label="Pertandingan dilakukan secara online"
                control={
                  <Switch
                    color="primary"
                    checked={isOnline}
                    onChange={(e) => setIsOnline(e.target.checked)}
                    sx={{ ml: 1 }}
                  />
                }
              />

              {!isOnline && (
                <>
                  <Box sx={{ px: 1 }}>
                    <TextField
                      label="Alamat lengkap"
                      placeholder="Jl. Sukamanah 1 no. 41 Rt 02/15"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("location")}
                      error={!!errors.location}
                      helperText={errors?.location?.message as string}
                    />
                  </Box>

                  <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    <Box sx={{ width: { xs: "100%", md: "50%" }, px: 1 }}>
                      <Controller
                        control={control}
                        name="province"
                        render={({ field }) => (
                          <Autocomplete
                            options={provinces}
                            getOptionLabel={(option) => option.name ?? ""}
                            value={field.value}
                            onChange={(_, value) => field.onChange(value)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Provinsi"
                                fullWidth
                                margin="normal"
                                error={!!errors.province}
                                helperText={errors?.province?.message as string}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            )}
                          />
                        )}
                      />
                    </Box>

                    <Box sx={{ width: { xs: "100%", md: "50%" }, px: 1 }}>
                      <Controller
                        control={control}
                        name="city"
                        render={({ field }) => (
                          <Autocomplete
                            options={cities}
                            getOptionLabel={(option) => option.name ?? ""}
                            value={field.value}
                            onChange={(_, value) => field.onChange(value)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Kota/Kabupaten"
                                fullWidth
                                margin="normal"
                                error={!!errors.city}
                                helperText={errors?.city?.message as string}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            )}
                          />
                        )}
                      />
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Card>

          <Box sx={{ mt: 4 }}>
            <FormBanner setBanner={setBanner} setProposal={setProposal} />
          </Box>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              mt: 4,
              background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
              textTransform: "none",
              color: "#fff",
              fontWeight: "bold",
              py: 1.5,
              fontSize: "16px",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Buat Tournament"
            )}
          </Button>
        </form>

        <Snackbar
          open={alert.open}
          autoHideDuration={5000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={alert.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}
