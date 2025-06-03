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
  Divider,
  Paper,
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

// Icons for better visual hierarchy
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";

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
        console.log("Provinces response:", response);

        // Handle different response formats
        let provincesData: Province[] = [];

        if (Array.isArray(response)) {
          // If response is directly an array
          provincesData = response;
        } else if (response && response.data && Array.isArray(response.data)) {
          // If response has a data property that is an array
          provincesData = response.data;
        } else if (response && Array.isArray(response.results)) {
          // If response has a results property that is an array
          provincesData = response.results;
        }

        // Ensure each province has the required id and name properties
        const formattedProvinces = provincesData.map((province: any) => ({
          id: province.id ? String(province.id) : "",
          name: province.name || province.nama || "",
        }));

        setProvinces(formattedProvinces);
      } catch (error) {
        console.error("Error fetching provinces:", error);
        showAlert("Error fetching province data", "error");
        setProvinces([]); // Set empty array on error
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince && selectedProvince.id) {
      const fetchCities = async () => {
        try {
          const response = await getCities(selectedProvince.id as string);
          console.log("Cities response:", response);

          // Handle different response formats
          let citiesData: City[] = [];

          if (Array.isArray(response)) {
            // If response is directly an array
            citiesData = response;
          } else if (
            response &&
            response.data &&
            Array.isArray(response.data)
          ) {
            // If response has a data property that is an array
            citiesData = response.data;
          } else if (response && Array.isArray(response.results)) {
            // If response has a results property that is an array
            citiesData = response.results;
          }

          // Ensure each city has the required id and name properties
          const formattedCities = citiesData.map((city: any) => ({
            id: city.id ? String(city.id) : "",
            name: city.name || city.nama || "",
          }));

          setCities(formattedCities);
        } catch (error) {
          console.error("Error fetching cities:", error);
          showAlert("Error fetching city data", "error");
          setCities([]); // Set empty array on error
        }
      };

      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedProvince]);

  // Form submission
  const onSubmit = async (data: any) => {
    console.log("Step 1: Form submitted");
    console.log("Step 1 Data:", data);

    if (!isOnline && (!data.location || !data.province || !data.city)) {
      console.log("Step 2: Location validation failed");
      showAlert("Lokasi tournament harus diisi", "error");
      return;
    }

    if (!banner) {
      console.log("Step 3: Banner validation failed");
      showAlert("Banner tournament belum diupload", "error");
      return;
    }

    console.log("Step 4: Passed validation, preparing data for submission");
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

      console.log("Step 5: Prepared formData:", formData);

      const result = await createTournament({
        data: formData,
        bannerFile: banner,
        proposalFile: proposal || undefined,
      });

      console.log("Step 6: createTournament result:", result);

      if (result.error) {
        console.log("Step 7: Error from createTournament:", result.error);
        showAlert(result.error, "error");
      } else {
        console.log("Step 8: Tournament created successfully");
        showAlert("Tournament berhasil dibuat", "success");

        // Redirect to event page
        if (result.data) {
          console.log("Step 9: Redirecting to event page:", `/my-event/${result.data}`);
          setTimeout(() => {
            router.push(`/my-event/${result.data}`);
          }, 1500);
        }
      }
    } catch (error: any) {
      console.error("Step 10: Exception caught:", error);
      showAlert(
        error.message || "Terjadi kesalahan saat membuat tournament",
        "error"
      );
    } finally {
      setLoading(false);
      console.log("Step 11: Loading set to false");
    }
  };

  // Helper to show alerts
  const showAlert = (message: string, severity: "success" | "error") => {
    console.log("ShowAlert called:", message, severity);
    setAlert({
      open: true,
      message,
      severity,
    });
  };

  // Handle alert closing
  const handleCloseAlert = () => {
    console.log("Alert closed");
    setAlert({
      ...alert,
      open: false,
    });
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header Section */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              background: "linear-gradient(135deg, #CB4492 0%, #384FB9 100%)",
              color: "white",
              borderRadius: 3,
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Buat Pertandingan
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Pastikan seluruh form terisi dengan lengkap dan jelas demi
              keaslian data
            </Typography>
          </Paper>

          {/* Tournament Data Section */}
          <Card
            sx={{
              p: 4,
              mb: 4,
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              borderRadius: 3,
            }}
          >
            {/* Basic Information */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                fontWeight="600"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", mb: 3 }}
              >
                <SportsSoccerIcon sx={{ mr: 1.5 }} color="primary" />
                Data Pertandingan
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Silahkan isi dengan benar
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {/* Tournament Name */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Nama Pertandingan"
                  placeholder="Tournament Apex Legend Mobile 2th"
                  fullWidth
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors?.name?.message as string}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>

              {/* Category and Sport */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 3,
                  mb: 3,
                }}
              >
                <TextField
                  select
                  label="Kategori Olahraga"
                  fullWidth
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value="sport">Sport</MenuItem>
                  <MenuItem value="e-sport">E-Sport</MenuItem>
                </TextField>

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
                          error={!!errors.sport_id}
                          helperText={errors?.sport_id?.message as string}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  )}
                />
              </Box>
            </Box>

            {/* Date & Time Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                fontWeight="600"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", mb: 3 }}
              >
                <EventIcon sx={{ mr: 1.5 }} color="primary" />
                Waktu dan Tanggal
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {/* Registration Dates */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 3,
                  mb: 3,
                }}
              >
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

              {/* Tournament Dates */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 3,
                }}
              >
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
            </Box>

            {/* Tournament Details */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                fontWeight="600"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", mb: 3 }}
              >
                <GroupsIcon sx={{ mr: 1.5 }} color="primary" />
                Detail Pertandingan
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {/* Quota and Prize */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 3,
                  mb: 3,
                }}
              >
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
                      error={!!errors.quota}
                      helperText={errors?.quota?.message as string}
                    />
                  )}
                />

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
                      error={!!errors.prize_pool}
                      helperText={errors?.prize_pool?.message as string}
                    />
                  )}
                />
              </Box>

              {/* Description */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  multiline
                  rows={5}
                  label="Deskripsi pertandingan"
                  placeholder="Silakan jelaskan deskripsi singkat pertandingan"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors?.description?.message as string}
                />
              </Box>

              {/* Rules */}
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="600"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                >
                  <DescriptionIcon sx={{ mr: 1 }} color="primary" />
                  Peraturan Tournament
                </Typography>
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

            {/* Location Section */}
            <Box>
              <Typography
                variant="h6"
                fontWeight="600"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", mb: 3 }}
              >
                <LocationOnIcon sx={{ mr: 1.5 }} color="primary" />
                Lokasi Pertandingan
              </Typography>
              <Divider sx={{ mb: 3 }} />

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
                sx={{ mb: isOnline ? 0 : 3 }}
              />

              {!isOnline && (
                <>
                  {/* Full Address */}
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      label="Alamat lengkap"
                      placeholder="Jl. Sukamanah 1 no. 41 Rt 02/15"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      {...register("location")}
                      error={!!errors.location}
                      helperText={errors?.location?.message as string}
                    />
                  </Box>

                  {/* Province and City */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                      gap: 3,
                    }}
                  >
                    <Controller
                      control={control}
                      name="province"
                      render={({ field }) => (
                        <Autocomplete
                          options={provinces || []}
                          getOptionLabel={(option) => option?.name ?? ""}
                          value={field.value}
                          onChange={(_, value) => {
                            field.onChange(value);
                            // Reset city when province changes
                            setValue("city", null);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Provinsi"
                              fullWidth
                              error={!!errors.province}
                              helperText={errors?.province?.message as string}
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                          isOptionEqualToValue={(option, value) =>
                            option?.id === value?.id
                          }
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="city"
                      render={({ field }) => (
                        <Autocomplete
                          options={cities || []}
                          getOptionLabel={(option) => option?.name ?? ""}
                          value={field.value}
                          onChange={(_, value) => field.onChange(value)}
                          disabled={!selectedProvince}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Kota/Kabupaten"
                              fullWidth
                              error={!!errors.city}
                              helperText={errors?.city?.message as string}
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                          isOptionEqualToValue={(option, value) =>
                            option?.id === value?.id
                          }
                        />
                      )}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Card>

          {/* Banner Upload Section */}
          <Box sx={{ mb: 4 }}>
            <FormBanner setBanner={setBanner} setProposal={setProposal} />
          </Box>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              size="large"
              sx={{
                px: 6,
                py: 2,
                background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
                textTransform: "none",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: 2,
                minWidth: 200,
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #B23A82 0%, #2F42A3 100%)",
                },
                "&:disabled": {
                  background:
                    "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
                  opacity: 0.7,
                },
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
                  Membuat Tournament...
                </>
              ) : (
                "Buat Tournament"
              )}
            </Button>
          </Box>
        </form>

        {/* Alert Snackbar */}
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
    </Box>
  );
}
