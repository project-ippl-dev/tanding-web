/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  TextField,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import { Autocomplete } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useForm, Controller } from "react-hook-form";
import {
  Add as AddIcon,
  HighlightOff as HighlightOffIcon,
} from "@mui/icons-material";

import { useParams } from "next/navigation";
import StyledDialogTitle from "@/components/dialog/StyledDialogTitle";
import { CommitteeMember, CreateCommitteeRoleData,  } from "@/types/comittee";
import { createCommittee, deleteCommittee, getCommittee } from "@/store/actions/committee";
import { searchUser } from "@/store/actions/user";
import { UserData } from "@/types/user";




async function reqCreateComittee(eventID: string, data: CreateCommitteeRoleData) {
  // Create a committee
  const response = await createCommittee(eventID, data);
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}


async function reqDeleteComittee(eventID: string, committeeID: string) {
  // Delete a committee
  const response = await deleteCommittee(eventID, committeeID);
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}


const CardAssignRole = ({
}) => {
  const params = useParams();
  const { handleSubmit, errors, control } = useForm({
    shouldUnregister: false,
  });
  const [user, setUser] = useState<UserData[]>([]);
  const [committee, setCommitte] = useState<CommitteeMember[]>([]);
  const [userInput, setUserInput] = useState("");
  const [dialog, setDialog] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [dialogDelete, setDialogDelete] = useState({ open: false, id: "" });

  const handleDeleteUser = () => {
    reqDeleteComittee(params.id, dialogDelete.id);
    setDialogDelete({ open: false, id: "" });
  };

  const onSubmit = (data) => {
    const formData = { data: [{ user_id: data.user.id, role: data.role }] };
    reqCreateComittee(params.id, formData);
    setDialog(false);
  };

  useEffect(() => {
    async function fetchUserData() {
      const response = await searchUser(userInput, 5);
      // Handle the response as needed
      const userData: UserData[] = response.data;
      setUser(userData);
    }
    fetchUserData();
  }, [userInput]);

  useEffect(() => {
    async function fetchCommittee() {
      const response = await getCommittee(params.id);
      // Handle the response as needed
      const committeeData: CommitteeMember[] = response.data;
      setCommitte(committeeData);
    }
    fetchCommittee();
  }, []);

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
                <Box display="flex">
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                  >
                    Panitia Pertandingan
                  </Typography>
                  <IconButton sx={{ padding: 0, marginLeft: "3px" }}>
                    <InfoIcon sx={{ fontSize: "18px" }} />
                  </IconButton>
                </Box>
                <Typography sx={{ fontSize: "14px", color: "#666666" }}>
                  Panitia bertugas meng-update dan bertanggung jawab saat
                  pertandingan yang berlangsung
                </Typography>
              </div>
              <div>
                <IconButton onClick={() => setDialog(true)}>
                  <AddIcon />
                </IconButton>
              </div>
            </Box>
          }
        />
        <CardContent>
          <Grid container>
            {committee.map((value) => (
              <Grid
                size={{ md: 6, xs: 12 }}
                key={value.id}
                onMouseEnter={() => setSelectedId(value.id)}
                onMouseLeave={() => setSelectedId("")}
              >
                <Box marginBottom={2} display="flex" alignItems="center">
                  <div>
                    <Typography
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      {value.name}
                    </Typography>
                    <Typography>{value.role}</Typography>
                  </div>
                  {selectedId === value.id && value.role !== "owner" && (
                    <IconButton
                      sx={{ padding: 0, marginLeft: "3px" }}
                      onClick={() =>
                        setDialogDelete({ open: true, id: value.user_id })
                      }
                    >
                      <HighlightOffIcon sx={{ color: "red" }} />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* DIALOG FOR ADD OR EDIT */}
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledDialogTitle onClose={() => setDialog(false)}>
            Tambah Panitia Tournament
          </StyledDialogTitle>
          <DialogContent>
            <Controller
              control={control}
              name="user"
              defaultValue=""
              render={({ onChange, value }) => (
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  inputValue={userInput}
                  onInputChange={(event, newInputValue) => {
                    setUserInput(newInputValue);
                  }}
                  options={user}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      label="Username"
                      margin="normal"
                    />
                  )}
                />
              )}
            />
            <Controller
              control={control}
              name="role"
              defaultValue=""
              render={({ onChange, value }) => (
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Role Panitia"
                  margin="normal"
                  value={value}
                  onChange={({ target: { value } }) => onChange(value)}
                  error={!!errors.role}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="contributor">Contributor</MenuItem>
                </TextField>
              )}
            />
          </DialogContent>
          <DialogActions>
            {/* {dialogClass.edit && (
              <Button
                variant="contained"
                onClick={() => handleDeleteClass(dialogClass.data.id)}
              >
                Delete
              </Button>
            )} */}
            <Button variant="contained" color="primary" type="submit">
              {/* {dialogClass.edit ? "update" : "simpan"} */}
              simpan
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* DIALOG DELETE */}
      <Dialog
        open={dialogDelete.open}
        maxWidth="xs"
        onClose={() => setDialogDelete({ open: false, id: "" })}
      >
        <StyledDialogTitle
          onClose={() => setDialogDelete({ open: false, id: "" })}
        >
          Confirm Delete
        </StyledDialogTitle>
        <DialogContent>Anda yakin menghapus user ini ?</DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleDeleteUser}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CardAssignRole;

/*
const mapStateToProps = (state) => ({
  classTournament: state.classTournament,
  user: state.user,
  committee: state.committee,
});

export default connect(mapStateToProps, {
  getCommitte,
  createCommitte,
  updateRoleCommitte,
  deleteCommitte,
  getUser,
})(CardAssignRole);
*/
