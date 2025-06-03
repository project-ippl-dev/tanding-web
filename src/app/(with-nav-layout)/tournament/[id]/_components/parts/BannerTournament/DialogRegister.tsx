/* eslint-disable react-hooks/exhaustive-deps */
// TODO : Notifikasi Masih Pakai alert

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  MenuItem,
  TextField,
  Box,
  Autocomplete,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// import { fetchProxyApi, postProxyApi } from "@/utils/request";
import { useAuth } from "@/context/auth.context";
import { ClubMember } from "@/types/club.type";
import { EventData } from "@/types/event.type";
import { useLoading } from "@/context/loading.context";
import { useNotification } from "@/context/notification.context";
import { getMembersOfClub } from "@/store/actions/club";
import { registerToTournament } from "@/store/actions/event";

// const validationSchema = yup.object().shape({
//   name: yup.string().required("Data harus diisi"),
//   short_name: yup.string().required("Data harus diisi"),
//   phone: yup.string().required("Data harus diisi"),
//   sports: yup
//     .array()
//     .of(
//       yup.object().shape({
//         id: yup.string(),
//         name: yup.string(),
//       })
//     )
//     .typeError("Data wajib diisi")
//     .required("Data wajib diisi"),
// });

const DialogRegister = ({
  open,
  onClose,
  dataTournament,
}: {
  dataTournament: EventData | null;
  open: boolean;
  onClose: () => void;
}) => {
  const { authData } = useAuth();
  const [kelas, setKelas] = useState("");
  const [selectedClass, setSelectedClass] = useState<number>(0);
  const [inputUser, setInputUser] = useState("");
  const [selectedClub, setSelectedClub] = useState<string>("");
  const [clubMemberOption, setMemberOption] = useState<ClubMember[] | null>(
    null
  );
  const [members, setMembers] = useState<string[]>([]);
  const loadingObj = useLoading();
  const { showNotification } = useNotification();
  // const {handleSubmit, control, } = useForm({
  //   resolver: yupResolver(validationSchema)
  // });

  async function handleRegister() {
    if (loadingObj.changeState) loadingObj.changeState(true);

    const data = {
      class_event_id: dataTournament?.class_events[selectedClass].id,
      club_id: selectedClub,
      members: members.map((value) => ({ user_id: value })),
    };

    try {
      if (!dataTournament) {
        showNotification("Tidak didapatkan id Event yang valid", "error");
        if (loadingObj.changeState) loadingObj.changeState(false); // Reset loading state
        return;
      }
      const serverResponse = await registerToTournament({
        eventID: dataTournament.id,
        payload: data,
      });
      if (loadingObj.changeState) loadingObj.changeState(false);
      
      if ([200, 201].includes(serverResponse.status)) {
        if (serverResponse.message?.includes("forbidden")) {
          showNotification(
            "Gagal mendaftar, Hanya user yang memiliki club yang dapat mendaftar",
            "error"
          );
        } else {
          showNotification(
            "Berhasil mendaftar untuk tournament ini",
            "success"
          );
          emptyRegistrationForm();
        }
      } else {
        showNotification(
          `Gagal melakukan pendaftaran tournament registerToTournament: ${serverResponse.error}`,
          "error"
        );
      }
    } catch (e: unknown) {
      if (loadingObj.changeState) loadingObj.changeState(false);
      let errorMessage = "Terjadi kesalahan saat melakukan pendaftaran tournament";
      if (e instanceof Error) {
        errorMessage = `Terjadi kesalahan saat melakukan pendaftaran tournament: ${e.message}`;
      }
      showNotification(errorMessage, "error");
    }
  }

  function emptyRegistrationForm() {
    setKelas("");
    setSelectedClass(0);
    setInputUser("");
    setSelectedClub("");
    setMembers([]);
    onClose();
  }

  useEffect(() => {
    if (kelas !== "") {
      let index = -1; // Default tidak ketemu

      if (dataTournament?.class_events) {
        index = dataTournament?.class_events.findIndex(
          (obj) => obj.id === kelas
        );
      }
      setSelectedClass(index);
    }
  }, [kelas]);

  useEffect(() => {
    async function getMemberClub(idClub: string) {
      if (loadingObj.changeState) loadingObj.changeState(true);
      try {
        const serverResponse = await getMembersOfClub({ clubID: idClub });
        setMemberOption(serverResponse.data?.participants || null);
      } catch (error: unknown) {
        let errorMessage = "Gagal mengambil data member club";
        if (error instanceof Error) {
            errorMessage = `Gagal mengambil data member club getMembersOfClub: ${error.message}`;
        }
        showNotification(errorMessage, "error");
        console.error(error);
      } finally {
        if (loadingObj.changeState) loadingObj.changeState(false);
      }
    }

    if (selectedClub && selectedClub !== "") {
      getMemberClub(selectedClub);
    }
  }, [selectedClub]);

  const memberInputElement = (
    <Box>
      <Autocomplete
        fullWidth
        multiple
        filterSelectedOptions
        options={
          clubMemberOption?.map((value) => ({
            label: value.name,
            id: value.user_id,
          })) || []
        }
        inputValue={inputUser}
        onInputChange={(event, newInputValue) => {
          setInputUser(newInputValue);
        }}
        onChange={(e, newValue: { label: string; id: string }[]) =>
          setMembers(newValue.map((item) => item.id))
        }
        renderInput={(params) => (
          <TextField {...params} label="Member club" margin="normal" />
        )}
      />
    </Box>
  );

  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={() => {
          emptyRegistrationForm();
          onClose();
        }}
      >
        <DialogTitle>Register {dataTournament?.name}</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            margin="normal"
            label="Pilih Kelas Pertandingan"
            value={kelas}
            onChange={({ target: { value } }) => setKelas(value)}
          >
            {dataTournament?.class_events.map((value) => (
              <MenuItem key={value.id} value={value.id}>
                {`${value.class_name} - ${value.match_type} elimination`}
              </MenuItem>
            ))}
          </TextField>
          {kelas !== "" &&
            selectedClass !== null &&
            selectedClass !== undefined && selectedClass !== -1 && (
              <Box marginTop={1}>
                <Typography>Rules :</Typography>
                <Typography>
                  <NumericFormat
                    displayType="text"
                    prefix="Biaya Daftar Rp "
                    value={dataTournament?.class_events[selectedClass]?.price}
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                </Typography>
                <Typography>
                  {`${dataTournament?.class_events[selectedClass].class_rule_total} vs ${dataTournament?.class_events[selectedClass].class_rule_total} | `}
                  <span>
                    {`Putra ${
                      dataTournament?.class_events[selectedClass]
                        .class_rule_male || "-"
                    }, Putri ${
                      dataTournament?.class_events[selectedClass]
                        .class_rule_female || "-"
                    }, Campur ${
                      dataTournament?.class_events[selectedClass]
                        .class_rule_male === 0 &&
                      dataTournament?.class_events[selectedClass]
                        .class_rule_female === 0
                        ? dataTournament?.class_events[selectedClass]
                            .class_rule_total
                        : "-"
                    }`}
                  </span>
                </Typography>
              </Box>
            )}
          <Box>
            <TextField
              select
              fullWidth
              margin="normal"
              label="Pilih Club Yang Ingin Mendaftar"
              value={selectedClub}
              onChange={({ target: { value } }) => setSelectedClub(value)}
            >
              {authData && Array.isArray(authData.clubs) ? authData.clubs.map((value) => (
                <MenuItem key={value.id} value={value.id}>
                  {value.name}
                </MenuItem>
              )): []}
            </TextField>
          </Box>
          {memberInputElement}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister}
            disabled={loadingObj.state || !selectedClub || members.length === 0 || kelas === ""}
          >
            {loadingObj.state ? "Loading..." : "Register"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogRegister;

/*
const mapStateToProps = (state) => ({
  club: state.club,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getMemberClub, registerTournament })(
  DialogRegister
);
*/
