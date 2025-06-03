import React, { useState, useEffect, useRef, useCallback } from "react";
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
  deleteClassTournament,
  getClass,
  getClassRules,
  storeClassTournament,
  updatePriceClassTournament,
} from "@/store/actions/classTournament";
import { useParams } from "next/navigation";
import {
  ClassAssignmentItem,
  ClassMultiple,
  ClassRulesMultiple,
  StoreClassTournamentPayload,
  UpdatePriceClassTournamentPayload,
} from "@/types/class.types";
import { useLoading } from "@/context/loading.context";
import { useNotification } from "@/context/notification.context";
import { EventData } from "@/types/event.type";
import { NotificationType } from "@/types/notification.type";

// Helper functions OUTSIDE the component, accept showNotification as parameter
async function reqDeleteClassTournament(eventID: string, classID: string, showNotification: (msg: string, type?: NotificationType) => void) {
  const response = await deleteClassTournament(eventID, classID);
  if ([200, 201].includes(response.status)) {
    showNotification("Berhasil menghapus kelas turnamen", "success");
    return true;
  } else {
    showNotification(
      "Gagal menghapus kelas turnamen, dengan error: " + (response.error || response.message),
      "error"
    );
    return false;
  }
}

async function reqUpdatePriceClassTournament(
  eventID: string,
  classID: string,
  data: UpdatePriceClassTournamentPayload,
  showNotification: (msg: string, type?: NotificationType) => void
) {
  const response = await updatePriceClassTournament(eventID, classID, data);
  if (response.status === 200) {
    showNotification("Berhasil mengupdate harga kelas turnamen", "success");
    return true
  } else {
    showNotification(
      "Gagal membuat data respon, dengan error: " + (response.error || response.message),
      "error"
    );
    return false
  }
}

async function reqGetClass(
  sportID: string,
  setData: (data: ClassMultiple) => void,
  showNotification: (msg: string, type?: NotificationType) => void
) {
  const response = await getClass(sportID);
  if (response.status === 200) {
    setData(response);
  } else {
    showNotification(
      "Gagal membuat data respon, dengan error: " + (response.error || response.message),
      "error"
    );
  }
}

async function reqGetClassRules(
  page: string,
  pageSize: string,
  setData: (data: ClassRulesMultiple) => void,
  showNotification: (msg: string, type?: NotificationType) => void
) {
  const response = await getClassRules(page, pageSize);
  if (response.status === 200) {
    setData(response);
  } else {
    showNotification(
      "Gagal membuat data respon, dengan error: " + (response.error || response.message),
      "error"
    );
  }
}

async function reqStoreClassTournament(
  eventID: string,
  data: StoreClassTournamentPayload,
  showNotification: (msg: string, type?: NotificationType) => void
) {
  const response = await storeClassTournament(eventID, data);
  if ([200, 201].includes(response.status)) {
    showNotification("Berhasil membuat kelas turnamen", "success");
    return true;
  } else {
    showNotification(
      "Gagal membuat data respon, dengan error: " + (response.error || response.message),
      "error"
    );
    return false;
  }
}

const CardClassTournament = ({
  updateTournament,
  tournament,
}:{
  updateTournament: ((id: string) => void);
  tournament: EventData | null
}) => {
  const loading = useLoading();
  const params = useParams<{ id: string }>();
  const notification = useNotification();
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<{ class_id: string; price: number }>({
    shouldUnregister: false,
  });

  const alreadyFetch = useRef(false);

  const [classRule, setClassRule] = useState<ClassRulesMultiple | null>(null);
  const [classTournament, setClassTournament] =
    useState<ClassMultiple | null>();
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

  const setLoading = useCallback(
    (state: boolean) => {
      if (loading?.changeState) {
        loading.changeState(state);
      }
    },
    [loading]
  );

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

  const handleDeleteClass = async (class_id: string) => {
    setLoading(true);
    try {
    const result = await reqDeleteClassTournament(params.id!, class_id, notification.showNotification);
      if (result) {
        // Fetch data turnament baru
        await updateTournament(params.id!);
      }
    } catch (error) {
      notification.showNotification("Gagal menghapus kelas turnamen", "error");
      console.error("Error deleting class tournament:", error);
    } finally {
      setLoading(false);
      closeDialogClass();
    }
  };

  const onSubmit = async (formData: { class_id: string; price: number }) => {
    setLoading(true);
    let result = false;
    if (dialogClass.edit && dialogClass.data) {
      result = await reqUpdatePriceClassTournament(
        params.id!,
        dialogClass.data.id,
        { price: formData.price.floatValue },
        notification.showNotification
      );
    } else {
      result = await reqStoreClassTournament(
        params.id!,
        { data:[{ class_id: formData.class_id, price: formData.price.floatValue }]}, 
        notification.showNotification
      );
    }
      if (result) {
        // Fetch data turnament baru
       await updateTournament(params.id!);
      }
    
      closeDialogClass();
    setValue("class_id", "");
    setValue("price", 0);
    setLoading(false);
  };



  useEffect(() => {
    if (!alreadyFetch.current) {
      alreadyFetch.current = true;
      setLoading(true);
      const setData = (data: ClassMultiple) => {
        setClassTournament(data);
      };
      const setRule = (data: ClassRulesMultiple) => {
        setClassRule(data);
      };
      reqGetClass(tournament?.sport_id || "", setData, notification.showNotification);
      reqGetClassRules("", "", setRule, notification.showNotification);
      setLoading(false);
    }
  }, [tournament?.sport_id, setLoading, notification.showNotification]);

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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Kelas Pertandingan
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "#666666" }}>
                  Silahkan atur kelas tournament yang ingin anda selenggarakan
                </Typography>
              </div>
              <div>
                <IconButton 
                  data-testid="add-class-tournament"
                  onClick={() => openDialogClass(false, null)}>
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
                    data-testid="class-tournament-item"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                    key={value.id}
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
                      <div>
                        <IconButton
                          data-testid="edit-class-tournament"
                          onClick={() =>{
                            setDialogClass({
                              open: true,
                              edit: true,
                              data: { ...value, class_id: value.id },
                            })}
                          }
                        >
                          <EditIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                      </div>
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
      <Dialog
        open={dialogClass.open}
        onClose={closeDialogClass}
        maxWidth="sm"
        fullWidth
      >
        <form 
        data-testid="dialog-class-tournament"
        onSubmit={handleSubmit(onSubmit)}>
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
                    !dialogClass.edit ? (
                      <Typography sx={{ fontSize: "12px" }} component={'span'}>
                        Jika kelas tidak tersedia, anda bisa membuat custom
                        kelas{" "}
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
                    ) : null
                  }
                >
                  {classTournament ? (
                    classTournament.data.map((value) => (
                      <MenuItem key={value.id} value={value.id}>
                        {`${value.name} - ${value.match_type} elimination`}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>{`Loading...`}</MenuItem>
                  )}
                </TextField>
              )}
            />
            <Controller
              control={control}
              name="price"
              render={({ field: { onChange } }) => (
                <TextFieldFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="Rp "
                  onChange={onChange}
                  defaultValue={getValues("price")}
                  // {...field}
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
                data-testid="delete-class-tournament"
                variant="contained"
                onClick={() => handleDeleteClass(dialogClass.data!.id)}
              >
                Delete
              </Button>
            )}
            <Button 
            data-testid="dialog-class-tournament-submit"
            variant="contained" color="primary" type="submit">
              {dialogClass.edit ? "update" : "simpan"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <DialogCustom
        open={dialogCustom}
        onClose={() => setDialogCustom(false)}
        rules={classRule?.data || []}
        sportId={tournament?.sport_id || ""}
      />
    </>
  );
};

export default CardClassTournament;
