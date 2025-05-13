import React, { useState, useEffect } from "react";
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
import {
  createClass,
  deleteClassTournament,
  getClass,
  getClassRules,
  storeClassTournament,
  updatePriceClassTournament,
} from "@/store/actions/classTournament";
import { useParams } from "next/navigation";
import {
  ClassMultiple,
  ClassRulesMultiple,
  CreateClassPayload,
  StoreClassTournamentPayload,
  UpdatePriceClassTournamentPayload,
} from "@/types/class.types";
import { EventData } from "@/types/event.type";

async function reqCreateClass(data: CreateClassPayload) {
  const response = await createClass(data);
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

async function reqDeleteClassTournament(eventID: string, classID: string) {
  const response = await deleteClassTournament(eventID, classID);
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

async function reqUpdatePriceClassTournament(eventID: string, classID: string, data: UpdatePriceClassTournamentPayload) {
  const response = await updatePriceClassTournament(eventID, classID, data);
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

async function reqGetClass(sportID: string, setData: (data: ClassMultiple) => void) {
  const response = await getClass(sportID);
  if (response.status === 200) {
    setData(response);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

async function reqGetClassRules(page: string, pageSize: string, setData: (data: ClassRulesMultiple) => void) {
  const response = await getClassRules(page, pageSize);
  if (response.status === 200) {
   setData(response); 

  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

async function reqStoreClassTournament(eventID: string, data: StoreClassTournamentPayload) {
  const response = await storeClassTournament(eventID, data);
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

interface CardClassTournamentProps {
  tournament: EventData | null
}

const CardClassTournament: React.FC<CardClassTournamentProps> = ({ tournament }) => {
  const params = useParams<{ id: string }>();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<{ class_id: string; price: number }>({
    shouldUnregister: false,
  });

  const [id, setId] = useState<string>("");
  const [classRule, setClassRule] = useState<ClassRulesMultiple | null>(null)
  const [classTournament, setClassTournament] = useState<ClassMultiple | null>()
  const [dialogCustom, setDialogCustom] = useState(false);
  const [dialogClass, setDialogClass] = useState({
    open: false,
    edit: false,
    data: null as null | {
      id: string;
      class_id: string;
      price: number;
    },
  });

  const closeDialogClass = () => {
    setDialogClass({
      open: false,
      edit: false,
      data: null,
    });
  };

  const openDialogClass = (edit: boolean, data: typeof dialogClass.data) => {
    setDialogClass({
      open: true,
      edit,
      data,
    });
  };

  const openDialogCustom = () => {
    closeDialogClass();
    setDialogCustom(true);
  };

  const handleDeleteClass = (class_id: string) => {
    closeDialogClass();
    reqDeleteClassTournament(params.id!, class_id);
  };

  const onSubmit = (formData: { class_id: string; price: number }) => {
    if (dialogClass.edit && dialogClass.data) {
      reqUpdatePriceClassTournament(params.id!, dialogClass.data.id, {
        price: formData.price,
      });
    } else {
      reqStoreClassTournament(params.id!, { data: [formData] });
    }
    closeDialogClass();
  };

  useEffect(() => {
    if (tournament) {
      const setData = (data: ClassMultiple) => {setClassTournament(data)}
      const setRule = (data: ClassRulesMultiple) => {setClassRule(data)}
      reqGetClass(tournament.sport_id, setData);
      reqGetClassRules("", "",setRule);
    }
  }, [tournament]);

  useEffect(() => {
    if (dialogClass.edit && dialogClass.data) {
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
              <Grid size={12}>
                {tournament?.class_events.map((value) => (
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
                        {value.class_name} <span style={{ fontWeight: 400, fontSize: "14px" }}>{`- ${value.match_type} elimination`}</span>
                      </Typography>
                      <NumericFormat
                        displayType="text"
                        prefix="Biaya daftar Rp "
                        value={value.price}
                        thousandSeparator="."
                        decimalSeparator="," />
                    </div>
                    {id === value.id && (
                      <div>
                        <IconButton
                          onClick={() =>
                            setDialogClass({
                              open: true,
                              edit: true,
                              data: { ...value, class_id: value.id },
                            })
                          }
                        >
                          <EditIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                      </div>
                    )}
                  </Box>
                ))}
                {tournament?.class_events.length === 0 && (
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
      <Dialog open={dialogClass.open} onClose={closeDialogClass} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledDialogTitle onClose={closeDialogClass}>
            {dialogClass.edit ? "Edit Biaya Kelas" : "Tambah Kelas Tournament"}
          </StyledDialogTitle>
          <DialogContent>
            <Controller
              control={control}
              name="class_id"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Kelas Pertandingan"
                  margin="normal"
                  {...field}
                  disabled={dialogClass.edit}
                  error={!!errors.class_id}
                  helperText={
                    !dialogClass.edit && (
                      <Typography sx={{ fontSize: "12px" }}>
                        Jika kelas tidak tersedia, anda bisa membuat custom kelas {" "}
                        <span
                          style={{
                            cursor: "pointer",
                            color: "blue",
                            fontWeight: 600,
                          }}
                          onClick={openDialogCustom}
                        >
                          DISINI
                        </span>
                      </Typography>
                    )
                  }
                >
                  {classTournament?.data.map((value) => (
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
              defaultValue={0}
              render={({ field }) => (
                <TextFieldFormat
                  thousandSeparator="."
                  decimalSeparator="," 
                  prefix="Rp "
                  {...field}
                  label="Biaya Daftar"
                  placeholder="Rp 50.000"
                  margin="normal"
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
                onClick={() => handleDeleteClass(dialogClass.data!.id)}
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
        rules={classTournament?.data || []}
        sportId={tournament?.sport_id || ""}
        action={(formData) => reqCreateClass(formData as CreateClassPayload)}
      />
    </>
  );
};

export default CardClassTournament;