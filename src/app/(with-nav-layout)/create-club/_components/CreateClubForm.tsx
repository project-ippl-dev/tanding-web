"use client";
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
  styled,
  Autocomplete,
} from "@mui/material";
import TextFieldNumeric from "../../user-profile/_component/parts/DialogProfileBasic/TextFieldNumeric";
import { Controller, useForm } from "react-hook-form";
import { CreateClubFormData } from "@/types/club.type";
import { useEffect, useState } from "react";
import { CloudUpload, MoodBad } from "@mui/icons-material";
import { SportAllResponse, SportBaseType } from "@/types/sport.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { createClubValidationSchema } from "../../../../validation/clubSchema";

const InputFieldGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  xs: 12,
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CreateClubForm() {
  const [sportsOption, setSportsOption] = useState<SportBaseType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorImage, setErrorImage] = useState<any>(false);
  const [image, setImage] = useState<any>([]);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
    control,
  } = useForm<CreateClubFormData>({
    resolver: yupResolver(createClubValidationSchema),
    defaultValues: {
      clubData: {
        name: "",
        short_name: "",
      },
      phone: "",
      sports: [],
    },
  });

  const onDrop = (picture) => {
    setErrorImage(MoodBad);
    setImage(picture);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Simpan file gambar
      // setPreview(URL.createObjectURL(file)); // Buat URL pratinjau
    }
  };

  const onSubmit = async (data: CreateClubFormData) => {
    const sportsIds = data.sports.map((value) => ({ sport_id: value.id }));
    const formData = { ...data, sport: sportsIds };

    console.log(data);
    console.log(errors);
    // try {
    //   if (!image[0]) {
    //     setErrorImage(true);
    //     throw new Error("No club picture provided");
    //   }
    //   setLoading(true);
    //   const sports = data.sports.map((value) => ({ sport_id: value.id }));
    //   const formData = { ...data, sports };
    //   // TODO:
    //   // const response = await fetch(`api/auth/login`, {
    //   //   method: "POST",
    //   //   headers: { "Content-Type": "application/json" },
    //   //   body: JSON.stringify(data),
    //   // });
    // } catch (error: any) {
    //   console.error("Create Club Error: ", error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    const fetchSports = async () => {
      try {
        setLoading(true);
        const token = ""; // Replace with actual token retrieval logic
        const response = await fetch(`/api/sport`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const res: SportAllResponse = await response.json();
        console.log(res);
        setSportsOption(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          sx={(theme) => ({
            padding: theme.spacing(2, 3),
            marginTop: theme.spacing(2),
          })}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Data Club
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#666666",
            }}
          >
            Silahkan isi dengan benar
          </Typography>
          <Box
            sx={(theme) => ({
              padding: theme.spacing(0, 1),
            })}
          >
            <Controller
              control={control}
              name="clubData.name"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Nama Club"
                  placeholder="Team X"
                  margin="normal"
                  // inputRef={register}
                  // name="name"
                  error={!!errors.clubData?.name}
                  helperText={errors?.clubData?.name?.message}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              )}
            />
          </Box>
          <Grid container>
            {/* <Grid size={{ xs: 12 }} className={classes.field}> */}
            <InputFieldGrid>
              <Controller
                control={control}
                name="clubData.short_name"
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Singkatan Club"
                    placeholder="TMX"
                    fullWidth
                    margin="normal"
                    // inputRef={register}
                    // name="short_name"
                    error={!!errors.clubData?.short_name}
                    helperText={errors?.clubData?.short_name?.message}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                )}
              />
            </InputFieldGrid>

            {/* </Grid> */}
            {/* <Grid item xs={12} className={classes.field}> */}
            <InputFieldGrid>
              <Controller
                control={control}
                name="phone"
                // defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <TextFieldNumeric
                    // {...field}
                    format="#### #### #####"
                    label="Phone"
                    placeholder="0812 3456 78900"
                    margin="normal"
                    value={value}
                    onChange={({ value }: { value: string }) => onChange(value)}
                    error={!!errors.phone}
                    helperText={errors?.phone?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </InputFieldGrid>
            {/* </Grid> */}
            {/* <Grid item xs={12} className={classes.field}> */}
            <InputFieldGrid>
              <Controller
                control={control}
                name="sports"
                defaultValue={undefined}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    onChange={(_, newValue) => {
                      field.onChange(newValue);
                      // console.log(field.value)
                    }}
                    value={field.value}
                    fullWidth
                    options={sportsOption}
                    getOptionLabel={(option) => option.name}
                    getOptionKey={(option) => option.id}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // {...field}
                        label="Olahraga"
                        placeholder="Pilih Cabang Olahraga untuk Club"
                        fullWidth
                        margin="normal"
                        error={!!errors.sports}
                        helperText={errors?.sports?.message}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    )}
                  />
                )}
              />
            </InputFieldGrid>
            {/* </Grid> */}
            <Box marginTop={2} width="100%">
              <Typography>Logo</Typography>
              {errorImage && (
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "red",
                  }}
                >
                  *logo club wajib diupload
                </Typography>
              )}
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                Upload Logo Club
                <Controller
                  render={({ field }) => (
                    <VisuallyHiddenInput
                      multiple
                      accept="image/*"
                      style={{ display: "none" }}
                      id="upload-photo"
                      type="file"
                      onChange={handleImageChange}
                    />
                  )}
                />
              </Button>
            </Box>
          </Grid>
        </Card>
        <Box marginTop={5} />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%);",
            textTransform: "none",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Buat Club Baru
        </Button>
      </form>
      <Backdrop
        open={loading}
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
          color: "#fff",
        })}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
