/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
  Dialog,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { NumericFormat } from "react-number-format";
import { useForm, Controller } from "react-hook-form";
import StyledDialogTitle from "@/components/dialog/StyledDialogTitle";
import TextFieldFormat from "@/components/TextFieldFormat/TextFieldFormat";
import DialogCustom from "./parts/CardClassTournamen/DialogCustom";
import { createClass, deleteClassTournament, getClass, getClassRules, storeClassTournament, updatePriceClassTournament } from "@/store/actions/classTournament";



async function reqCreateClass(data: unknown) {
  const response = await createClass(data);
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

async function reqDeleteClassTournament(data: unknown) {
  const response = await deleteClassTournament(data);
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

async function reqUpdatePriceClassTournament(data: unknown) {
  const response = await updatePriceClassTournament(data);
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

async function reqGetClass(data: unknown) {
  const response = await getClass(data)
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

async function reqGetClassRules(data: unknown) {
  const response = await getClassRules(data);
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

async function reqStoreClassTournament(data: unknown) {
  const response = await storeClassTournament(data);
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

async function reqStoreClassTournament(data: unknown) {
  const response = await storeClassTournament(data);  
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

const CardClassTournament = ({
  data,
  classTournament,
  // getClass,
  // getClassRules,
  // storeClassTournament,
  // updatePriceClassTournament,
  // deleteClassTournament,
  // createClass,
}) => {
  const params = useParams();
  const { handleSubmit, errors, control, setValue } = useForm({
    shouldUnregister: false,
  });

  const [id, setId] = useState("");
  const [dialogCustom, setDialogCustom] = useState(false);
  const [dialogClass, setDialogClass] = useState({
    open: false,
    edit: false,
    data: null,
  });

  const closeDialogClass = () => {
    setDialogClass({
      open: false,
      edit: false,
      data: null,
    });
  };

  const openDialogClass = (edit, data) => {
    setDialogClass({
      open: true,
      edit: edit,
      data: data,
    });
  };

  const openDialogCustom = () => {
    closeDialogClass();
    setDialogCustom(true);
  };

  const handleDeleteClass = (class_id) => {
    closeDialogClass();
    deleteClassTournament(params.id, class_id);
  };

  const onSubmit = (data) => {
    if (dialogClass.edit) {
      updatePriceClassTournament(params.id, dialogClass.data.id, {
        price: data.price,
      });
    } else {
      storeClassTournament(params.id, { data: [data] });
    }
    closeDialogClass();
  };

  useEffect(() => {
    getClass(data.data.sport_id);
    getClassRules("", "");
  }, []);

  useEffect(() => {
    if (dialogClass.edit) {
      setValue("class_id", dialogClass.data.class_id);
      setValue("price", dialogClass.data.price);
    }
  }, [dialogClass.edit, dialogClass.data, setValue]);

  return (
    <>
      <Card sx={{ padding: (theme) => theme.spacing(1, 3, 2, 3) }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Kelas Pertandingan
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "#666666" }}>
                  Silahkan atur kelas tournament yang ingin anda selenggarakan
                </Typography>
              </div>
              <div>
                <IconButton onClick={() => openDialogClass(false, null)}>
                  <AddIcon />
                </IconButton>
              </div>
            </Box>
          }
        />
        <CardContent>
          <Box>
            <Grid container alignItems="center">
              <Grid xs={12}>
                {data.data.class_events.map((value) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                    key={value.id}
                    onMouseEnter={() => setId(value.id)}
                    onMouseLeave={() => setId("")}
                  >
                    <div>
                      <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                        {value.class_name}{" "}
                        <span
                          style={{ fontWeight: 400, fontSize: "14px" }}
                        >{`- ${value.match_type} elimination`}</span>
                      </Typography>
                      <NumericFormat
                        displayType="text"
                        prefix="Biaya daftar Rp "
                        value={value.price}
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </div>
                    {id === value.id && (
                      <div>
                        <IconButton
                          onClick={() =>
                            setDialogClass({
                              open: true,
                              edit: true,
                              data: value,
                            })
                          }
                        >
                          <EditIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                      </div>
                    )}
                  </Box>
                ))}
                {data.data.class_events.length === 0 && (
                  <Box>
                    <Typography>Kelas Tournament Belum Diset</Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* DIALOG FOR ADD OR EDIT */}
      <Dialog
        open={dialogClass.open}
        onClose={closeDialogClass}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledDialogTitle onClose={closeDialogClass}>
            {dialogClass.edit ? "Edit Biaya Kelas" : "Tambah Kelas"} Tournament
          </StyledDialogTitle>
          <DialogContent>
            <Controller
              control={control}
              name="class_id"
              defaultValue=""
              render={({ onChange, value }) => (
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Kelas Pertandingan"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={value}
                  onChange={({ target: { value } }) => onChange(value)}
                  disabled={dialogClass.edit}
                  error={!!errors.class_id}
                  helperText={
                    !dialogClass.edit && (
                      <Typography sx={{ fontSize: "12px" }}>
                        Jika kelas tidak tersedia, anda bisa membuat custom
                        kelas{" "}
                        <span
                          style={{
                            cursor: "pointer",
                            color: "blue",
                            fontWeight: 600,
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                          onClick={openDialogCustom}
                        >
                          DISINI
                        </span>
                      </Typography>
                    )
                  }
                >
                  {classTournament.class.data.map((value) => (
                    <MenuItem key={value.id} value={value.id}>
                      {`${value.name} - ${value.match_type} elimination`}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              control={control}
              name="price"
              defaultValue=""
              render={({ onChange, value }) => (
                <TextFieldFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="Rp "
                  value={value}
                  onChange={({ floatValue }) => onChange(floatValue)}
                  label="Biaya Daftar"
                  placeholder="Rp 50.000"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.price}
                  helperText={errors?.price?.message}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            {dialogClass.edit && (
              <Button
                variant="contained"
                onClick={() => handleDeleteClass(dialogClass.data.id)}
              >
                Delete
              </Button>
            )}
            <Button variant="contained" color="primary" type="submit">
              {dialogClass.edit ? "update" : "simpan"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <DialogCustom
        open={dialogCustom}
        onClose={() => setDialogCustom(false)}
        rules={classTournament.rules}
        sportId={data.data.sport_id}
        action={createClass}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  classTournament: state.classTournament,
});

export default connect(mapStateToProps, {
  getClass,
  getClassRules,
  storeClassTournament,
  createClass,
  deleteClassTournament,
  updatePriceClassTournament,
})(CardClassTournament);
