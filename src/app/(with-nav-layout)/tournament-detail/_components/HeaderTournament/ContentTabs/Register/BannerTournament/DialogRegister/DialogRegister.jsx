/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
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
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import { Autocomplete } from "@material-ui/lab";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

import {
  getMemberClub,
  registerTournament,
} from "../../../../../../../../store/actions";

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
  getMemberClub,
  club,
  profile,
  registerTournament,
}) => {
  const params = useParams();
  const [kelas, setKelas] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [inputUser, setInputUser] = useState("");
  const [selectedClub, setSelectedClub] = useState("");
  const [members, setMembers] = useState([]);
  // const {handleSubmit, control, } = useForm({
  //   resolver: yupResolver(validationSchema)
  // });

  const handleRegister = () => {
    const data = {
      class_event_id: dataTournament.data?.class_events[selectedClass].id,
      club_id: selectedClub,
      members: members.map((value) => ({ user_id: value.user_id })),
    };
    registerTournament(data, params.id);
    setKelas("");
    setSelectedClass("");
    setInputUser("");
    setSelectedClub("");
    setMembers([]);
    onClose();
  };

  useEffect(() => {
    if (kelas !== "") {
      const index = dataTournament.data.class_events.findIndex(
        (obj) => obj.id === kelas
      );
      setSelectedClass(index);
    }
  }, [kelas]);

  useEffect(() => {
    if (selectedClub !== "") {
      getMemberClub(selectedClub);
    }
  }, [selectedClub]);

  return (
    <div>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
        <DialogTitle>Register {dataTournament.data?.name}</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            margin="normal"
            label="Pilih Kelas Pertandingan"
            InputLabelProps={{
              shrink: true,
            }}
            value={kelas}
            onChange={({ target: { value } }) => setKelas(value)}
          >
            {dataTournament.data?.class_events.map((value) => (
              <MenuItem key={value.id} value={value.id}>
                {`${value.class_name} - ${value.match_type} elimination`}
              </MenuItem>
            ))}
          </TextField>
          {kelas !== "" && selectedClass !== "" && (
            <Box marginTop={1}>
              <Typography>Rules :</Typography>
              <Typography>
                <NumberFormat
                  displayType="text"
                  prefix="Biaya Daftar Rp "
                  value={dataTournament.data?.class_events[selectedClass].price}
                  thousandSeparator="."
                  decimalSeparator=","
                />
              </Typography>
              <Typography>
                {`${dataTournament.data?.class_events[selectedClass].class_rule_total} vs ${dataTournament.data?.class_events[selectedClass].class_rule_total} | `}
                <span>
                  {`Putra ${
                    dataTournament.data?.class_events[selectedClass]
                      .class_rule_male || "-"
                  }, Putri ${
                    dataTournament.data?.class_events[selectedClass]
                      .class_rule_female || "-"
                  }, Campur ${
                    dataTournament.data?.class_events[selectedClass]
                      .class_rule_male === 0 &&
                    dataTournament.data?.class_events[selectedClass]
                      .class_rule_female === 0
                      ? dataTournament.data?.class_events[selectedClass]
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
              InputLabelProps={{
                shrink: true,
              }}
              value={selectedClub}
              onChange={({ target: { value } }) => setSelectedClub(value)}
            >
              {profile.club.map((value) => (
                <MenuItem key={value.id} value={value.id}>
                  {value.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box>
            <Autocomplete
              fullWidth
              multiple
              filterSelectedOptions
              getOptionLabel={(option) => option.name}
              options={club.member.data}
              inputValue={inputUser}
              onInputChange={(event, newInputValue) => {
                setInputUser(newInputValue);
              }}
              value={members}
              onChange={(e, newValue) => setMembers(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Member club"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  club: state.club,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getMemberClub, registerTournament })(
  DialogRegister
);
