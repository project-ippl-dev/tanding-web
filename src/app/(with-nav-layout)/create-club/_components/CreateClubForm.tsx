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
import { useState } from "react";
import { CloudUpload, MoodBad } from "@mui/icons-material";

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

export default function CreateClubForm({ sport, getSport, createClub }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorImage, setErrorImage] = useState<any>(false);
  const [image, setImage] = useState<any>([]);
  const { handleSubmit, register, errors, control } =
    useForm<CreateClubFormData>();

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
    try {
      if (!image[0]) {
        setErrorImage(true);
        throw new Error("No club picture provided");
      }
      setLoading(true);
      const sports = data.sports.map((value) => ({ sport_id: value.id }));
      const formData = { ...data, sports };
      // TODO:
      const response = await fetch(`api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error: any) {
      console.error("Create Club Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Buat Club
        </Typography>
        <Typography
          sx={{
            fontSize: "18px",
            color: "#666666",
          }}
        >
          Pastikan seluruh form terisi dengan lengkap dan jelas demi keaslian
          data
        </Typography>
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
            <TextField
              fullWidth
              label="Nama Club"
              placeholder="Team X"
              margin="normal"
              // inputRef={register}
              name="name"
              // error={!!errors.name}
              // helperText={errors?.name?.message}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Box>
          <Grid container>
            {/* <Grid size={{ xs: 12 }} className={classes.field}> */}
            <InputFieldGrid>
              <TextField
                label="Singkatan Club"
                placeholder="TMX"
                fullWidth
                margin="normal"
                // inputRef={register}
                name="short_name"
                // error={!!errors.short_name}
                // helperText={errors?.short_name?.message}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </InputFieldGrid>

            {/* </Grid> */}
            {/* <Grid item xs={12} className={classes.field}> */}
            <InputFieldGrid>
              <Controller
                control={control}
                name="phone"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextFieldNumeric
                    format="#### #### #####"
                    label="Phone"
                    placeholder="0812 3456 78900"
                    margin="normal"
                    value={value}
                    onChange={({ value }) => onChange(value)}
                    // error={!!errors.phone}
                    // helperText={errors?.phone?.message}
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
                render={({ field: {onChange, value} }) => (
                  <Autocomplete
                    multiple
                    // value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                      console.log(newValue)
                    }}
                    options={[{name: 'Basketball'}, {name: 'Soccer'}]}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Olahraga"
                        placeholder="TMX"
                        fullWidth
                        margin="normal"
                        // error={!!errors.sports}
                        // helperText={errors?.sports?.message}
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
              {/* <ImageUploader
                withIcon={true}
                buttonText="Upload Thumbnail"
                onChange={onDrop}
                imgExtension={[".jpg", ".jpeg", ".png"]}
                maxFileSize={2242880}
                withPreview={true}
                label="Max file size : 2 mb, Format : jpeg, png, jpg"
                accept="image/jpg,image/jpeg,image/png"
                singleImage={true}
                name="thumbnail"
              /> */}
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
          Simpan
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
