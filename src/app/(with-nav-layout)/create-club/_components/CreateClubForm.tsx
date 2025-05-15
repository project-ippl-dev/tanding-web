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
import TextFieldNumeric from "../../../../components/input/TextFieldNumeric";
import { Controller, useForm } from "react-hook-form";
import { CreateClubFormData, CreateClubRequestBody } from "@/types/club.type";
import { useEffect, useState } from "react";
import { CloudUpload } from "@mui/icons-material";
import { SportBaseType } from "@/types/sport.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { createClubValidationSchema } from "../../../../validation/clubSchema";
import { getAllSports } from "@/store/actions/sport";
import { createClub } from "@/store/actions/club";

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
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateClubFormData>({
    resolver: yupResolver(createClubValidationSchema),
    defaultValues: {
      clubData: {
        name: "",
        short_name: "",
        logo: "",
      },
      phone: "",
      sports: [],
    },
  });

  const onSubmit = async (data: CreateClubFormData) => {
    // TODO: Actual implementation below (commented out for now)
    // const sportsIds = data.sports.map((value) => ({ sport_id: value.id }));
    // const formData: CreateClubRequestBody = {
    //   name: data.clubData.name,
    //   logo: 'http://google.com', //TODO: upload image
    //   short_name: data.clubData.short_name,
    //   phone: data.phone,
    //   sports: sportsIds,
    // };

    // MOCK DATA
    const formData: CreateClubRequestBody = {
      name: "Black Jaguar Taekwondo Club",
      logo: "http://google.com",
      phone: "081218437074",
      short_name: "BJTC",
      sports: [
        {
          sport_id: "07302ca3-0350-46ad-861e-f9bcb99668df",
        },
      ],
    };

    console.log(data);
    try {
      setLoading(true);
      await createClub(formData);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSports = async () => {
      try {
        setLoading(true);
        const response = await getAllSports({});
        setSportsOption(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  return (
    <>
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
                    allowLeadingZeros
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
              {errors.clubData?.logo ? (
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "red",
                  }}
                >
                  *logo club wajib diupload
                </Typography>
              ) : null}
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                Upload Logo Club
                <Controller
                  control={control}
                  name="clubData.logo"
                  render={({ field }) => (
                    <VisuallyHiddenInput
                      // multiple
                      accept="image/*"
                      style={{ display: "none" }}
                      id="upload-club-logo"
                      type="file"
                      onChange={(e) => field.onChange(e.target.files)}
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
    </>
  );
}
