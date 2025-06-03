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
import { createClub, uploadClubLogo } from "@/store/actions/club";
import { useNotification } from "@/context/notification.context";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const router = useRouter();
  const notification = useNotification();
  const [sportsOption, setSportsOption] = useState<SportBaseType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorImage, setErrorImage] = useState<boolean | string>(false);
  const [imageUploading, setImageUploading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [image, setImage] = useState<string>("");
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
        // logo: undefined,
      },
      phone: "",
      sports: [],
    },
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    try {
      setImageUploading(true);
      const imageUrl = await uploadClubLogo(file);
      setErrorImage(false);
      setImage(imageUrl);
      notification.showNotification("Upload logo berhasil", "success");
    } catch {
      setErrorImage("Gagal upload file logo. Cobalah upload file lain.");
      notification.showNotification("Gagal upload file logo", "error");
    } finally {
      setImageUploading(false);
    }
  };

  const onSubmit = async (data: CreateClubFormData) => {
    if (!image) {
      return setErrorImage('*Logo club wajib diupload.');
    }
    const sportsIds = data.sports.map((value) => ({ sport_id: value.id }));
    const formData: CreateClubRequestBody = {
      name: data.clubData.name,
      short_name: data.clubData.short_name,
      phone: data.phone,
      sports: sportsIds,
    };

    console.log(data);
    try {
      setLoading(true);
      const response = await createClub(formData, image);
      if (!response || response.error) {
        throw new Error();
      }
      notification.showNotification("Sukses membuat club!", "success");
      router.push(`/club/${response.data}`)
    } catch (error) {
      console.error(error);
      notification.showNotification("Gagal membuat club baru", "error");
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
                render={({ field, formState }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    onChange={(_, newValue) => {
                      field.onChange(newValue);
                      console.log(formState.errors);
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
            <Box
              marginTop={2}
              width="100%"
              display={'flex'}
              flexDirection={'column'}
              justifyContent="center"
              alignItems="center"
            >
              <Typography>Logo</Typography>
              {errorImage ? (
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "red",
                  }}
                >
                  *logo club wajib diupload
                </Typography>
              ) : null}
              {image ? (
                <Image
                  src={image}
                  alt="Preview"
                  width={100} // Ukuran tetap untuk lebar
                  height={100} // Ukuran tetap untuk tinggi
                />
              ) : null}
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
                disabled={imageUploading}
              >
                Upload Logo Club

                <VisuallyHiddenInput
                  // multiple
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-club-logo"
                  type="file"
                  onChange={handleImageChange}
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
