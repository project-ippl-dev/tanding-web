/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUploader from "react-images-upload";
import CKEditor from "ckeditor4-react";

import {
  getCities,
  updateTournamentDetail,
} from "../../../../../store/actions";
import { DatePicker, DateTimePicker } from "../../../../../components";
import { TextFieldFormat } from "../../../../Components";
import { CKEditorToolbar } from "../../../../../utils";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  subTitle: {
    fontSize: "14px",
    color: "#666666",
  },
  boxField: {
    padding: theme.spacing(0, 1),
  },
  textBanner: {
    fontSize: "15px",
  },
  banner: {
    width: "50%",
    height: "auto",
    aspectRatio: "16/9",
    objectFit: "cover",
    margin: "0 auto",
  },
  textLocation: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  field: {
    padding: theme.spacing(0, 1),
  },
  boxLocationForm: {
    marginTop: theme.spacing(5),
  },
  titleLocation: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  boxBanner: {
    padding: theme.spacing(1),
    border: "2px solid #efefef",
    marginTop: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const validationSchema = yup.object().shape({
  name: yup.string().required("Data harus diisi"),
});

const CardEditTournament = ({
  data,
  getCities,
  sport,
  address,
  updateTournamentDetail,
}) => {
  const classes = useStyles();
  const params = useParams();
  const [formDisabled, setFormDisabled] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [banner, setBanner] = useState([]);
  const [oldBanner, setOldBanner] = useState();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register, errors, control, setValue } = useForm({
    shouldUnregister: false,
    resolver: yupResolver(validationSchema),
  });

  // const handleGetCity = (data) => {
  //   if (data !== null) {
  //     getCities(data);
  //   }
  // };

  const onSubmit = (value) => {
    setLoading(true);
    const formData = {
      ...value,
      start_date: moment(value.start_date).format("YYYY-MM-DD"),
      end_date: moment(value.end_date).format("YYYY-MM-DD"),
      deadline: moment
        .utc(moment(value.deadline))
        .format("YYYY-MM-DDTHH:mm:ss"),
      open: moment.utc(moment(value.open)).format("YYYY-MM-DDTHH:mm:ss"),
      location: data.data.location,
      city: data.data.city,
      province: data.data.province,
      type: "competition",
    };
    updateTournamentDetail(
      params.id,
      formData,
      !!banner[0] ? banner[0] : null,
      oldBanner,
      !!banner[0],
      setLoading
    );
    setFormDisabled(true);
  };

  useEffect(() => {
    if (data.data.location === "online") {
      setIsOnline(true);
      setValue("province", "");
      setValue("city", "");
    } else {
      setValue("province", data.data.province);
      setValue("city", data.data.city);
    }
    setValue("location", data.data.location);
    setValue("name", data.data.name);
    setValue("sport_id", data.data.sport_id);
    setValue("open", data.data.open);
    setValue("deadline", data.data.deadline);
    setValue("start_date", data.data.start_date);
    setValue("end_date", data.data.end_date);
    setValue("quota", data.data.quota);
    setValue("prize_pool", data.data.prize_pool);
    setValue("description", data.data.description);
    setValue("rules", data.data.rules);
    setOldBanner(data.data.thumbnail);
  }, []);

  return (
    <Card>
      <CardHeader
        title={
          <Box display="flex" justifyContent="space-between">
            <div>
              <Typography className={classes.title}>
                Data Pertandingan
              </Typography>
              <Typography className={classes.subTitle}>
                Owner bertanggung jawab atas keaslian data pertandingan
              </Typography>
            </div>
            {formDisabled && (
              <Button
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Box paddingX={1}>
              <Box display="flex" justifyContent="center">
                <img
                  className={classes.banner}
                  alt="banner"
                  src={data.data?.thumbnail}
                />
              </Box>
              {!formDisabled && (
                <Box className={classes.boxBanner}>
                  <Typography align="center">Update Banner</Typography>
                  <ImageUploader
                    withIcon={true}
                    buttonText="Update banner"
                    onChange={(value) => setBanner(value)}
                    imgExtension={[".jpg", ".jpeg", ".png"]}
                    maxFileSize={2242880}
                    withPreview={true}
                    label="Max file size : 2 mb, Format : jpeg, png, jpg"
                    accept="image/jpg,image/jpeg,image/png"
                    singleImage={true}
                    name="banner"
                  />
                </Box>
              )}
            </Box>
          </div>
          <div className={classes.field}>
            <TextField
              label="Nama Pertandingan"
              placeholder="Tournament Apex Legend Mobile 2th"
              fullWidth
              margin="normal"
              inputRef={register}
              name="name"
              error={!!errors.name}
              helperText={errors?.name?.message}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={formDisabled}
            />
          </div>
          <Grid container>
            <Grid item xs={12} className={classes.field}>
              <Controller
                control={control}
                name="sport_id"
                defaultValue={null}
                render={({ onChange, value }) => (
                  <TextField
                    select
                    id="standard-full-width"
                    label="Olahraga"
                    fullWidth
                    margin="normal"
                    value={value}
                    onChange={({ target: { value } }) => onChange(value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                  >
                    {sport.data.map((value) => (
                      <MenuItem key={value.id} value={value.id}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className={classes.field}>
              <Controller
                control={control}
                name="open"
                defaultValue={null}
                render={({ onChange, value }) => (
                  <DateTimePicker
                    size="small"
                    label="Open Pendaftaran"
                    placeholder="Pilih Tanggal"
                    format="dd LLLL yyyy,  HH:mm"
                    value={value}
                    onChange={onChange}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.open}
                    helperText={errors?.open?.message}
                    disabled={formDisabled}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} className={classes.field}>
              <Controller
                control={control}
                name="deadline"
                defaultValue={null}
                render={({ onChange, value }) => (
                  <DateTimePicker
                    size="small"
                    label="Batas Waktu Pendaftaran"
                    placeholder="Pilih Tanggal"
                    format="dd LLLL yyyy,  HH:mm"
                    value={value}
                    onChange={onChange}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.deadline}
                    helperText={errors?.deadline?.message}
                    disabled={formDisabled}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} className={classes.field}>
              <Controller
                control={control}
                name="start_date"
                defaultValue={null}
                render={({ onChange, value }) => (
                  <DatePicker
                    size="small"
                    label="Waktu Mulai Pertandingan"
                    placeholder="Pilih Tanggal"
                    format="dd MMMM yyyy"
                    value={value}
                    onChange={onChange}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.start_date}
                    helperText={errors?.start_date?.message}
                    disabled={formDisabled}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} className={classes.field}>
              <Controller
                control={control}
                name="end_date"
                defaultValue={null}
                render={({ onChange, value }) => (
                  <DatePicker
                    size="small"
                    label="Waktu Berakhir Pertandingan"
                    placeholder="Pilih Tanggal"
                    format="dd MMMM yyyy"
                    value={value}
                    onChange={onChange}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.end_date}
                    helperText={errors?.end_date?.message}
                    disabled={formDisabled}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} className={classes.field}>
              <Controller
                control={control}
                name="quota"
                defaultValue=""
                render={({ onChange, value }) => (
                  <TextFieldFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    value={value}
                    onChange={({ floatValue }) => onChange(floatValue)}
                    label="Qouta"
                    placeholder="100"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.quota}
                    helperText={errors?.quota?.message}
                    disabled={formDisabled}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} className={classes.field}>
              <Controller
                control={control}
                name="prize_pool"
                defaultValue=""
                render={({ onChange, value }) => (
                  <TextFieldFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="Rp "
                    value={value}
                    onChange={({ value }) => onChange(value)}
                    label="Total Hadiah"
                    placeholder="Rp 100.000.000"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.prize_pool}
                    helperText={errors?.prize_pool?.message}
                    disabled={formDisabled}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} className={classes.field}>
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
                inputRef={register}
                name="description"
                error={!!errors.description}
                helperText={errors?.description?.message}
                disabled={formDisabled}
              />
            </Grid>
            {!formDisabled && (
              <Grid item xs={12} className={classes.field}>
                <Box marginTop={1}>
                  <Typography>Peraturan Tournament</Typography>
                </Box>
                <Controller
                  control={control}
                  name="rules"
                  defaultValue=""
                  render={({ onChange, value }) => (
                    <CKEditor
                      config={{
                        extraPlugins: "justify,font,colorbutton",
                        toolbarGroups: CKEditorToolbar,
                      }}
                      data={value}
                      onChange={(e) => onChange(e.editor.getData())}
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>
          <div className={classes.boxLocationForm}>
            <Typography className={classes.titleLocation}>
              Lokasi Pertandingan
            </Typography>
            <FormControlLabel
              label="Pertandingan dilakukan secara online"
              control={
                <Switch
                  color="primary"
                  className={classes.switch}
                  checked={isOnline}
                  onChange={({ target: { checked } }) => setIsOnline(checked)}
                  disabled
                />
              }
            />
            {!isOnline && (
              <>
                <div className={classes.field}>
                  <TextField
                    id="standard-full-width"
                    label="Alamat lengkap"
                    placeholder="Jl. Sukamanah 1 no. 41 Rt 02/15"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputRef={register}
                    name="location"
                    error={!!errors.location}
                    helperText={errors?.location?.message}
                    disabled
                  />
                </div>
                <Grid container>
                  <Grid item xs={6} className={classes.field}>
                    <Controller
                      control={control}
                      name="province"
                      defaultValue={null}
                      render={({ onChange, value }) => (
                        <TextField
                          select
                          id="standard-full-width"
                          label="Provinsi"
                          fullWidth
                          margin="normal"
                          value={value}
                          onChange={({ target: { value } }) => onChange(value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          disabled
                        >
                          {address.province.map((value) => (
                            <MenuItem key={value.name} value={value.name}>
                              {value.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} className={classes.field}>
                    <Controller
                      control={control}
                      name="city"
                      defaultValue={null}
                      render={({ onChange, value }) => (
                        <TextField
                          select
                          id="standard-full-width"
                          label="Kota /Kabupaten"
                          fullWidth
                          margin="normal"
                          value={value}
                          onChange={({ target: { value } }) => onChange(value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          disabled
                        >
                          {address.city.map((value) => (
                            <MenuItem key={value.name} value={value.name}>
                              {value.name}
                            </MenuItem>
                          ))}
                          {!!value && address.city.length === 0 && (
                            <MenuItem key={value} value={value} disabled>
                              {value}
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
              <Button variant="contained" fullWidth type="submit">
                Simpan Perubahan
              </Button>
            )}
          </Box>
        </form>
      </CardContent>
      <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  address: state.address,
  sport: state.sport,
});

export default connect(mapStateToProps, { getCities, updateTournamentDetail })(
  CardEditTournament
);
