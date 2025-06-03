/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
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
  Skeleton, // Added Skeleton for loading state
} from "@mui/material";
import { Autocomplete } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useForm, Controller, SubmitHandler, set} from "react-hook-form";
import {
  Add as AddIcon,
  HighlightOff as HighlightOffIcon,
} from "@mui/icons-material";

import { useParams } from "next/navigation";
import StyledDialogTitle from "@/components/dialog/StyledDialogTitle";
import { CommitteeMember, CreateCommitteeRoleData,  } from "@/types/comittee";
import { createCommittee, deleteCommittee, getCommittee } from "@/store/actions/committee";

import { UserData } from "@/types/user";
import { searchUser } from "@/store/actions/user";
import { useLoading } from "@/context/loading.context";
import { useNotification } from "@/context/notification.context";


async function reqGetUser(userInput: string, setData:(data: UserData[])=>void, showNotification: (msg: string, type?: string) => void, limit: number = 5) {
  // Get user data
  const response = await searchUser(userInput, limit);
  if (response.status === 200) {
    setData(response.data);
  } else {
    showNotification("Gagal mendapatkan data pengguna untuk komite, dengan error: " + response.error, "error");
  }
}

async function reqGetComittee(eventID: string, setData:(data: CommitteeMember[])=>void, showNotification: (msg: string, type?: string) => void) {
  // Get committee members
  const response = await getCommittee(eventID);
  if (response.status === 200) {
    setData(response.data);
  } else {
    showNotification("Gagal mengambil data komite, dengan error: " + response.error, "error");
  }
}


async function reqCreateComittee(eventID: string, data: CreateCommitteeRoleData, showNotification: (msg: string, type?: string) => void) {
  // Create a committee
  const response = await createCommittee(eventID, data);
  if (response.status === 200) {
    showNotification(response.message, "success");
  } else {
    showNotification("Gagal membuat data komite, dengan error: " + response.error, "error");
  }
}


async function reqDeleteComittee(eventID: string, committeeID: string, showNotification: (msg: string, type?: string) => void) {
  // Delete a committee
  const response = await deleteCommittee(eventID, committeeID);
  if (response.status === 200) {
    showNotification(response.message, "success");
  } else {
    showNotification("Gagal menghapus data komite, dengan error: " + response.error, "error");
  }
}


const CardAssignRole = ({
}) => {
  const params = useParams<{id:string}>();
  const notification = useNotification();
  const { register, handleSubmit, control, formState: { errors } } = useForm<{ user: UserData; role: string }>({
    shouldUnregister: false,
  });
  const loading = useLoading();
  const [userData, setUser] = useState<UserData[]>([]);
  const [committee, setCommitte] = useState<CommitteeMember[]>([]);
  const [userInput, setUserInput] = useState("");
  const [dialog, setDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | undefined>(); // Type selectedId
  const [dialogDelete, setDialogDelete] = useState({ open: false, id: "" });

  // Loading states
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isCommitteeLoading, setIsCommitteeLoading] = useState(true); // Start true for initial load
  const alreadyFetch = useRef({
    user: false,
    committee: false,
  });

  function setLoading(value: boolean) {
    if(loading?.changeState){
      loading.changeState(value);
    }
  }

  useEffect(() => {
    async function fetchUserData(){
      setIsUserLoading(true);
      await reqGetUser(userInput, setUser, notification.showNotification);
      setIsUserLoading(false);
    }
    if (!alreadyFetch.current.user) {
      alreadyFetch.current.user = true;
      fetchUserData();
    }

  }, []);

  useEffect(() => {
    async function fetchCommittee() {
      setIsCommitteeLoading(true);
      await reqGetComittee(params.id, setCommitte, notification.showNotification);
      setIsCommitteeLoading(false);
    }

    if (!alreadyFetch.current.committee) {
      alreadyFetch.current.committee = true;
      fetchCommittee();
    }

  }, []); // Add params.id as dependency

  // Function to refetch committee after create/delete
  const refetchCommittee = async () => {
    setIsCommitteeLoading(true);
    try {
      const response = await getCommittee(params.id);
      const committeeData: CommitteeMember[] = response.data || [];
      setCommitte(committeeData);
    } catch (error) {
      console.error("Failed to refetch committee data:", error);
      setCommitte([]);
    } finally {
      setIsCommitteeLoading(false);
    }
  };

  const onSubmit: SubmitHandler<{ user: string; role: string }> = async (data) => { // Explicitly type onSubmit
    const selectedUser = userData.find((dataUser) => dataUser.name === data.user);
    const formData = { 
        data: [{ 
            user_id: selectedUser?.id || "", // Find user ID from userData
            role: data.role as "reviewer" | "contributor" | "admin" // Explicitly cast role
        }] 
    };
    setLoading(true);
    await reqCreateComittee(params.id, formData, notification.showNotification);
    await refetchCommittee(); // Refetch committee list
    setLoading(false);
    //setDialog(false);
  };

  const handleDeleteUserAndRefetch = async () => {
    setLoading(true);
    await reqDeleteComittee(params.id, dialogDelete.id, notification.showNotification);
    await refetchCommittee(); // Refetch committee list
    setLoading(false);
    setDialogDelete({ open: false, id: "" });
  };


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
                <IconButton 
                  data-testid="add-committee-button"
                  onClick={() => setDialog(true)}>
                  <AddIcon />
                </IconButton>
              </div>
            </Box>
          }
        />
        <CardContent>
          <Grid container>
            {isCommitteeLoading ? (
              // Skeleton loading for committee members
              Array.from(new Array(3)).map((_, index) => (
                <Grid size={{ md: 6, xs: 12 }} key={`skeleton-${index}`}>
                  <Box marginBottom={2} display="flex" alignItems="center">
                    <div>
                      <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                        <Skeleton width={150} />
                      </Typography>
                      <Typography>
                        <Skeleton width={100} />
                      </Typography>
                    </div>
                  </Box>
                </Grid>
              ))
            ) : committee.length === 0 ? (
              <Grid size={{ xs: 12 }}>
                <Typography sx={{ textAlign: 'center', color: 'text.secondary', padding: 2}}>
                  Belum ada panitia yang ditugaskan.
                </Typography>
              </Grid>
            ) : (
              committee.map((value,index) => (
                <Grid
                  size={{ md: 6, xs: 12 }}
                  key={`value.id-${index}`}
                  onMouseEnter={() => setSelectedId(value.id)}
                  onMouseLeave={() => setSelectedId(undefined)} // Set to undefined
                >
                  <Box 
                  data-testid={`committee-member-info`}
                  marginBottom={2} display="flex" alignItems="center">
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
              ))
            )}
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
        <form 
          data-testid="form-assign-role"
          onSubmit={handleSubmit(onSubmit)}>
          <StyledDialogTitle onClose={() => setDialog(false)}>
            Tambah Panitia Tournament
          </StyledDialogTitle>



          <DialogContent>
                <Autocomplete
                  options={userData.map((data)=>({
                    id: data.id,
                    name:  data.name,
                  }))} // Your autocomplete options
                  getOptionLabel={(option) => option.name} // Customize how options are displayed
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => (
                    <TextField {...params}
                      {...register("user", { required: true })} // Register the field
                      size="small"
                      label="Username"
                      margin="normal" />
                  )}
                />
            <Controller
              control={control}
              name="role"
              defaultValue=""
              render={({ field:{onChange, value} }) => (
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Role Panitia"
                  margin="normal"
                  value={value}
                  onChange={onChange}
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
            <Button 
            data-testid="committee-assign-button"
            variant="contained" color="primary" type="submit">
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
            onClick={handleDeleteUserAndRefetch} // Use the new handler
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
