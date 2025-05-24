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
import { ClubMemberData } from "@/types/club.type";
import { EventData } from "@/types/event.type";
import { useLoading } from "@/context/loading.context";
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
  const [clubMemberOption, setMemberOption] = useState<ClubMemberData | null>(
    null
  );
  const [members, setMembers] = useState<string[]>([]);
  const loadingObj = useLoading();
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
    // const url = `/api/event/register/${dataTournament?.id}`;
    // const serverResponse = await postProxyApi(url, authData.token.access_token, data)

    // if (loadingObj.changeState) loadingObj.changeState(false);

    // if (serverResponse.success){
    //   if (serverResponse.data?.message?.includes("forbidden")) {
    //     alert("Gagal mendaftar, Hanya user yang memiliki club yang dapat mendaftar");
    //   } else {
    //     alert("Berhasil mendaftar untuk tournament ini");
    //     emptyRegistrationForm()
    //   }
    // } else {
    //   alert("Terjadi kesalahan dengan error: " + serverResponse.error);
    // }
    try {
      if (!dataTournament){
        throw new Error("Tidak didapatkan id Event yang valid")
      }
      const serverResponse = await registerToTournament({eventID: dataTournament.id, payload: data})
      if (loadingObj.changeState) loadingObj.changeState(false);
      if (serverResponse.success){
        if (serverResponse.message?.includes("forbidden")) {
          // if (serverResponse.data?.message?.includes("forbidden")) {
          alert("Gagal mendaftar, Hanya user yang memiliki club yang dapat mendaftar");
        } else {
          alert("Berhasil mendaftar untuk tournament ini");
          emptyRegistrationForm()
        }
      } else {
        throw new Error("Terjadi kesalahan dengan error: " + serverResponse.error);
      }
    } catch (e) {
      alert(e)
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
  }, [dataTournament?.class_events, kelas]);

  useEffect(() => {
    async function getMemberClub(idClub: string) {
      if (loadingObj.changeState) loadingObj.changeState(true);
      // const url = `/api/club/member/${idClub}`
      try {
        // const serverResponse = await fetchProxyApi(url, authData.token.access_token)
        const serverResponse = await getMembersOfClub({ clubID: idClub });
        setMemberOption(serverResponse.data);
      } catch (error) {
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
          clubMemberOption?.data.participants.map((value) => ({
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
            selectedClass !== undefined && (
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
              {authData ? authData.clubs.map((value) => (
                <MenuItem key={value.id} value={value.id}>
                  {value.name}
                </MenuItem>
              )): null}
            </TextField>
          </Box>
          {memberInputElement}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister}
            disabled={loadingObj.state}
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
