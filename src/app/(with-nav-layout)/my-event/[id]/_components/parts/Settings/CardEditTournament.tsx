/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Box,
  Button,
  Switch,
  FormControlLabel,
  Backdrop,
  CircularProgress,
  TextFieldProps,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNotification } from "@/context/notification.context";

import { useParams } from "next/navigation";
import { EventData, EventUpdatePayload } from "@/types/event.type";
import ImageUploaderMui from "@/components/ImageUploaderMui";
import { getCities, getProvince } from "@/store/actions/address";
import { AddressCity, AddressProvince } from "@/types/address.types";
import { getSport } from "@/store/actions/sport";
import { Sport, SportResponseMultiple } from "@/types/sport.type";
import TextFieldFormat from "@/components/TextFieldFormat/TextFieldFormat";
import DateTimePickerComp from "@/components/DateTimePicker";
import DatePickerCustom from "@/components/DatePicker";
import { updateTournamentDetail } from "@/store/actions/event";
import { NotificationContextProps,  } from "@/types/notification.type";
import { handleImageChange, storeImage } from "@/utils/storeAsset";
import { useAuth } from "@/context/auth.context";
import { handleFetchClient } from "@/utils/fetctHandlerClient";

async function reqGetProvince(setData: (data: AddressProvince[]) => void, showNotification: (msg: string, type?: string) => void) {
  const response = await getProvince();
  if (response.status === 200) {
    setData(response.data);
  } else {
    showNotification("Gagal mengambil data provinsi, dengan error: " + response.error, "error");
  }
}

async function reqSport(setData: (data: SportResponseMultiple) => void, showNotification: (msg: string, type?: string) => void) {
  const response = await getSport();
  if ([200,201].includes(response.status)) {
    setData(response);
  } else {
    showNotification("Gagal mengambil data olahraga, dengan error: " + response.error, "error");
  }
}

async function reqUpdateTournamentDetail(
  eventID: string,
  data: EventUpdatePayload,
  showNotification: NotificationContextProps
): Promise<boolean> {
  const response = await updateTournamentDetail(
    eventID,
    data,
  );
  if ([200, 201].includes(response.status)) {
    showNotification("Berhasil mengupdate data", "success");
    return true;
  } else {
    showNotification("Gagal mengupdate data tournament detail, dengan error: " + response.error, "error");
    return false;
  }
}

async function reqGetCities(
  id_province: number,
  setData: (data: AddressCity[]) => void,
  showNotification: NotificationContextProps
) {
  const response = await getCities(id_province.toString());
  if (response.status === 200) {
    setData(response.data);
  } else {
    showNotification("Gagal mengambil data kota, dengan error: " + response.error, "error");
  }
}

interface TournamentAddress {
  province: AddressProvince[];
  city: AddressCity[];
  selected_province?: string;
}

interface CardEditTournamentProps {
  tournament: EventData | null;
  updateTournament: (id: string) => void;
}

type FormInputs = Omit<EventUpdatePayload, 'thumbnail'> & {
  proposal_link?: string;
};

const CardEditTournament: React.FC<CardEditTournamentProps> = ({
  tournament,
  updateTournament
}) => {
  const notification = useNotification();
  const {authData} = useAuth();
  const params = useParams();
  const [address, setAddress] = useState<TournamentAddress>({
    province: [],
    city: [],
  });
  const [sport,setSport] = useState<SportResponseMultiple | null>(null)
  const [formDisabled, setFormDisabled] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  const alreadyFetch = useRef(false)
  const [image, setImage] = useState<{url: string | null,file: File|null}>({
    url: typeof(tournament?.thumbnail) !== "string" ||  tournament?.thumbnail === "" ? null : tournament?.thumbnail,
    file: null
  }); // Annotate image as a File or null


  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
  } = useForm<FormInputs>({
    shouldUnregister: false,
    defaultValues: {
      name: tournament?.name || "",
      sport_id: tournament?.sport_id || "",
      open: tournament?.open || null,
      deadline: tournament?.deadline || "",
      start_date: tournament?.start_date || null,
      end_date: tournament?.end_date || null,
      quota: tournament?.quota || 0,
      prize_pool: tournament?.prize_pool || "",
      description: tournament?.description || "",
      rules: tournament?.rules || "",
      location: tournament?.location || "",
      province: tournament?.province || "",
      city: tournament?.city || "",
      type: tournament?.type || "competition",
      proposal_link: tournament?.proposal_link || "",
    }
  });


  const onSubmit = async (value: FormInputs): Promise<void> => {
    setLoading(true);
    let result: boolean = false; // Inisialisasi result sebagai boolean
    try {
        let profileURL: string | boolean | null = null; // Inisialisasi profileURL sebagai string atau booleanl
        // Mengirimkan gambar ke server
        if(image.file) {
          profileURL = await storeImage('banner',image.file as File, authData?.token.access_token || "");
        }

        if (profileURL === false) {
          // Jika ada kesalahan saat mengunggah gambar, hentikan proses
          notification.showNotification("Gagal mengunggah banner, silakan coba lagi", "error");
          return;
        }

    const formData: EventUpdatePayload = {
      ...value,
      start_date: value.start_date ? moment(value.start_date).format("YYYY-MM-DD") : "",
      end_date: value.end_date ? moment(value.end_date).format("YYYY-MM-DD") : "",
      deadline: value.deadline ? moment.utc(moment(value.deadline)).format("YYYY-MM-DDTHH:mm:ss") : null,
      open: value.open ? moment.utc(moment(value.open)).format("YYYY-MM-DDTHH:mm:ss") : null,
      location: value.location || tournament?.location || "",
      city: value.city || tournament?.city || "",
      province: value.province || tournament?.province || "",
      type: value.type || tournament?.type || "competition",
      thumbnail: typeof profileURL === "string" ? profileURL : tournament?.thumbnail || "",
    };
      // const serverResponse = await handleFetchClient({
      //   url: `/event/${params.id}`,
      //   method: "PUT",
      //   token: authData?.token.access_token || "",
      //   data: formData,
      // });

      // if ([200, 201].includes(serverResponse.status)) {
      //   notification.showNotification("Berhasil mengupdate data tournament", "success");
      //   result = true; // Set result to true if the update was successful
      // } else {
      //   notification.showNotification("Gagal mengupdate data tournament, dengan error: " + serverResponse.error, "error");
      // }

      reqUpdateTournamentDetail(
      params.id as string,
      formData,
      notification.showNotification
    );

  } catch (error) {
    notification.showNotification("Gagal mengupdate data tournament", "error");
    console.error("Error updating tournament:", error);
  } finally {
    if (result) {
      await updateTournament(params.id as string);
    }
    setLoading(false);
    setFormDisabled(true);
  }
};

  useEffect(() => {
    async function initialStage(){
      if (tournament?.location === "online") {
        setIsOnline(true);
        setValue("province", "");
        setValue("city", "");
      } else {
        setIsOnline(false);
        setValue("province", tournament?.province || "");
        setValue("city", tournament?.city || "");
      }
      setValue("location", tournament?.location || "");
      setValue("name", tournament?.name || "");
      setValue("sport_id", tournament?.sport_id || "");
      setValue("open", tournament?.open ? moment(tournament.open).toDate() : null);
      setValue("deadline", tournament?.deadline ? moment(tournament.deadline).toDate() : null);
      setValue("start_date", tournament?.start_date ? moment(tournament.start_date).toDate() : null);
      setValue("end_date", tournament?.end_date ? moment(tournament.end_date).toDate() : null);
      setValue("quota", tournament?.quota || 0);
      setValue("prize_pool", tournament?.prize_pool || "");
      setValue("description", tournament?.description || "");
      setValue("rules", tournament?.rules || "");
      setValue("type", (tournament?.type as "competition" | "training") || "competition");
      setValue("proposal_link", tournament?.proposal_link || "");

      const setSportData = (data: SportResponseMultiple) => {
        setSport(data)
      }
      const setProvinceData = (data: AddressProvince[]) => {
        setAddress((prevState) => ({
          ...prevState,
          province: data,
        }));
      };

      if (!alreadyFetch.current) {
        alreadyFetch.current = true;
        setLoading(true);
        await reqGetProvince(setProvinceData, notification.showNotification);
        await reqSport(setSportData, notification.showNotification);
        setLoading(false);

      }
    }

    initialStage();
    
  }, []);

  useEffect(() => {
    const empty = ["", null, undefined];
    if (!empty.includes(address.selected_province) && address.selected_province) {
      const setCityData = (data: AddressCity[]) => {
        setAddress((prevState) => ({
          ...prevState,
          city: data,
        }));
      };
      const foundProvince = address.province.find(
        (province) => province.name === address.selected_province
      );
      if (foundProvince) reqGetCities(foundProvince.id, setCityData, notification.showNotification);
    }
  }, [address.selected_province]);

  if (!tournament) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card>
      <CardHeader
        title={
          <Box display="flex" justifyContent="space-between">
            <div>
              <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                Data Pertandingan
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#666666" }}>
                Owner bertanggung jawab atas keaslian data pertandingan
              </Typography>
            </div>
            {formDisabled && (
              <Button
                data-testid="edit-tournament-data"
                variant="contained"
                size="small"
                color="primary"
                onClick={() => setFormDisabled(false)}
              >
                Edit Data
              </Button>
            )}
          </Box>
        }
      />
      <CardContent>
        <form 
          data-testid="form-edit-tournament"
          onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Box paddingX={1}>
              <Box
                display="flex"
                justifyContent="center"
                sx={{
                  width: "50%",
                  margin: "0 auto",
                  aspectRatio: "16/9",
                  position: "relative",
                }}
              >
                <Image
                  alt="banner"
                  src={tournament?.thumbnail || "/default-banner.png"}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Box>
              {!formDisabled && (
                <Box
                  sx={{
                    padding: 1,
                    border: "2px solid #efefef",
                    marginTop: 3,
                  }}
                >
                  <Typography align="center">Update Banner</Typography>
                  <ImageUploaderMui

                    buttonText="Update banner"
                    onChange={(file) => {handleImageChange(file,image,setImage)}}
                    imgExtension={[".jpg", ".jpeg", ".png"]}
                    maxFileSize={2242880}
                    withPreview={true}
                    label="Max file size: 2MB. Formats: JPG, JPEG, PNG"
                    accept="image/jpeg,image/png"
                    defaultImage={image.url || "/default-banner.png"}
                  />
                </Box>
              )}
            </Box>
          </div>
          <div>
            <TextField
              label="Nama Pertandingan"
              placeholder="Tournament Apex Legend Mobile 2th"
              fullWidth
              data-testid="tournament-name"
              margin="normal"
              {...register("name", { required: "Data harus diisi" })}
              error={!!errors.name}
              helperText={errors?.name?.message as string | undefined}
              disabled={formDisabled}
            />
          </div>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Controller
                control={control}
                name="sport_id"
                render={({ field }) => (
                  <TextField
                    select
                    id="standard-full-width"
                    label="Olahraga"
                    fullWidth
                    margin="normal"
                    value={field.value || ""}
                    onChange={field.onChange}
                    disabled
                  >
                    {sport?.data?.map((s: Sport) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.name}
                      </MenuItem>
                    )) || (
                      <MenuItem value={""}>
                        {"Data Olahraga tidak ditemukan"}
                      </MenuItem>
                    )}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                control={control}
                name="open"
                render={({ field: { onChange, value } }) => (
                  <DateTimePickerComp
                    label="Open Pendaftaran"
                    format="DD MMMM YYYY, HH:mm"
                    value={value || null}
                    onChange={onChange}
                    slotProps={{ textField: { 
                      size: "small", 
                      margin: "normal",
                      fullWidth: true,
                      error: !!errors.open,
                      helperText: errors?.open?.message as string | undefined,
                      InputLabelProps: { shrink: true }
                    } }}
                    disabled={formDisabled}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                control={control}
                name="deadline"
                render={({ field: { onChange, value } }) => (
                  <DateTimePickerComp
                    label="Batas Waktu Pendaftaran"
                    format="DD MMMM YYYY, HH:mm"
                    value={value || null}
                    onChange={onChange}
                    slotProps={{ textField: { 
                      size: "small", 
                      margin: "normal",
                      fullWidth: true,
                      error: !!errors.deadline,
                      helperText: errors?.deadline?.message as string | undefined,
                      InputLabelProps: { shrink: true }
                    } }}
                    disabled={formDisabled}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                control={control}
                name="start_date"
                render={({ field: { onChange, value } }) => (
                  <DatePickerCustom
                    label="Waktu Mulai Pertandingan"
                    format="DD MMMM YYYY"
                    value={value || null}
                    onChange={onChange}
                    slotProps={{ textField: { 
                      size: "small", 
                      margin: "normal",
                      fullWidth: true,
                      error: !!errors.start_date,
                      helperText: errors?.start_date?.message as string | undefined,
                      InputLabelProps: { shrink: true }
                    } }}
                    disabled={formDisabled}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                control={control}
                name="end_date"
                render={({ field: { onChange, value } }) => (
                  <DatePickerCustom
                    label="Waktu Berakhir Pertandingan"
                    format="DD MMMM YYYY"
                    value={value || null}
                    onChange={onChange}
                    slotProps={{ textField: { 
                      size: "small", 
                      margin: "normal",
                      fullWidth: true,
                      error: !!errors.end_date,
                      helperText: errors?.end_date?.message as string | undefined,
                      InputLabelProps: { shrink: true }
                    } }}
                    disabled={formDisabled}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                control={control}
                name="quota"
                render={({ field: { onChange, value } }) => (
                  <TextFieldFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    value={value || 0}
                    onChange={(values) => onChange(values.floatValue)}
                    label="Qouta"
                    placeholder="100"
                    margin="normal"
                    fullWidth
                    size="small"
                    error={!!errors.quota}
                    helperText={errors?.quota?.message as string | undefined}
                    disabled={formDisabled}
                    customInput={TextField as React.ElementType<TextFieldProps>}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                control={control}
                name="prize_pool"
                render={({ field: { onChange, value } }) => (
                  <TextFieldFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="Rp "
                    value={value || ""}
                    onChange={(values) => onChange(values.value)}
                    label="Total Hadiah"
                    placeholder="Rp 100.000.000"
                    margin="normal"
                    fullWidth
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.prize_pool}
                    helperText={errors?.prize_pool?.message as string | undefined}
                    disabled={formDisabled}
                    customInput={TextField as React.ElementType<TextFieldProps>}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
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
                helperText={errors?.description?.message as string | undefined}
                disabled={formDisabled}
              />
            </Grid>
            {!formDisabled && (
              <Grid size={{ xs: 12 }}>
                <Box marginTop={1}>
                  <Typography>Peraturan Tournament</Typography>
                </Box>
                <Controller
                  control={control}
                  name="rules"
                  render={({ field }) => (
                    <TextField
                      multiline
                      rows={8} // You can adjust the number of rows
                      label="Peraturan Tournament"
                      placeholder="Masukkan peraturan tournament di sini"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...field} // Use field to connect to react-hook-form
                      error={!!errors.rules}
                      helperText={errors?.rules?.message as string | undefined}
                      disabled={formDisabled} // Keep disabled state consistent
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>
          <div>
            <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
              Lokasi Pertandingan
            </Typography>
            <FormControlLabel
              label="Pertandingan dilakukan secara online"
              control={
                <Switch
                  color="primary"
                  checked={isOnline}
                  onChange={({ target: { checked } }) => {
                    setIsOnline(checked);
                    if (checked) {
                      setValue("location", "online");
                      setValue("province", "");
                      setValue("city", "");
                    } else {
                      setValue("location", tournament?.location === "online" ? "" : tournament?.location || "");
                      setValue("province", tournament?.province || "");
                      setValue("city", tournament?.city || "");
                    }
                  }}
                  disabled={formDisabled}
                />
              }
            />
            {!isOnline && (
              <>
                <div>
                  <TextField
                    id="standard-full-width"
                    label="Alamat lengkap"
                    placeholder="Jl. Sukamanah 1 no. 41 Rt 02/15"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("location")}
                    error={!!errors.location}
                    helperText={(errors?.location?.message as string | undefined) || (typeof errors?.location === 'string' ? errors.location : undefined)}
                    disabled={formDisabled}
                  />
                </div>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      control={control}
                      name="province"
                      render={({ field }) => (
                        <TextField
                          select
                          id="standard-full-width-province"
                          label="Provinsi"
                          fullWidth
                          margin="normal"
                          value={field.value || ""}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setAddress(prev => ({...prev, selected_province: e.target.value as string, city: [] }));
                            setValue("city", "");
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          disabled={formDisabled}
                        >
                          {address.province?.map((p) => (
                            <MenuItem key={p.id} value={p.name}>
                              {p.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      control={control}
                      name="city"
                      render={({ field }) => (
                        <TextField
                          select
                          id="standard-full-width-city"
                          label="Kota /Kabupaten"
                          fullWidth
                          margin="normal"
                          value={field.value || ""}
                          onChange={field.onChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          disabled={formDisabled || !address.selected_province || !address.city || address.city.length === 0}
                        >
                          {address.city?.map((c) => (
                            <MenuItem key={c.id} value={c.name}>
                              {c.name}
                            </MenuItem>
                          ))}
                          {!!field.value && address.city?.length === 0 && address.selected_province && (
                            <MenuItem key={field.value as string} value={field.value as string} disabled>
                              {field.value}
                            </MenuItem>
                          )}
                        </TextField>
                      )}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </div>
          <Box marginY={2}>
            {!formDisabled && (
              <Button 
                data-testid="submit-edit-tournament"
                variant="contained" fullWidth type="submit">
                Simpan Perubahan
              </Button>
            )}
          </Box>
        </form>
      </CardContent>
      <Backdrop
        open={loading}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: "#fff",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Card>
  );
};

export default CardEditTournament;