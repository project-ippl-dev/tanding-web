/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import InfoIcon from "@material-ui/icons/Info";
import { useForm, Controller } from "react-hook-form";
import {
  Add as AddIcon,
  HighlightOff as HighlightOffIcon,
} from "@material-ui/icons";

import {
  getCommitte,
  createCommitte,
  updateRoleCommitte,
  deleteCommitte,
  getUser,
} from "../../../../../store/actions";
import { StyledDialogTitle } from "../../../../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 3, 2, 3),
  },
  title: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  subTitle: {
    fontSize: "14px",
    color: "#666666",
  },
  textBanner: {
    fontSize: "15px",
  },
  banner: {
    width: "60%",
    height: "auto",
    objectFit: "cover",
    margin: "0 auto",
  },
  iconBtn: {
    padding: 0,
    marginLeft: "3px",
  },
  icon: {
    fontSize: "18px",
  },
  username: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  flexCenter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const CardAssignRole = ({
  getCommitte,
  createCommitte,
  updateRoleCommitte,
  deleteCommitte,
  getUser,
  classTournament,
  user,
  committee,
}) => {
  const classes = useStyles();
  const params = useParams();
  const { handleSubmit, errors, control } = useForm({
    shouldUnregister: false,
  });

  const [userInput, setUserInput] = useState("");
  const [dialog, setDialog] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [dialogDelete, setDialogDelete] = useState({ open: false, id: "" });

  const handleDeleteUser = () => {
    deleteCommitte(params.id, dialogDelete.id);
    setDialogDelete({ open: false, id: "" });
  };

  const onSubmit = (data) => {
    const formData = { data: [{ user_id: data.user.id, role: data.role }] };
    createCommitte(params.id, formData);
    setDialog(false);
  };

  useEffect(() => {
    getUser(userInput, 5);
  }, [userInput]);

  useEffect(() => {
    getCommitte(params.id);
  }, []);

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          title={
            <Box className={classes.flexCenter}>
              <div>
                <Box display="flex">
                  <Typography className={classes.title}>
                    Panitia Pertandingan
                  </Typography>
                  <IconButton className={classes.iconBtn}>
                    <InfoIcon className={classes.icon} />
                  </IconButton>
                </Box>
                <Typography className={classes.subTitle}>
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
            {committee.data.map((value) => (
              <Grid
                item
                md={6}
                xs={12}
                key={value.id}
                onMouseEnter={() => setSelectedId(value.id)}
                onMouseLeave={() => setSelectedId("")}
              >
                <Box marginBottom={2} display="flex" alignItems="center">
                  <div>
                    <Typography className={classes.username}>
                      {value.name}
                    </Typography>
                    <Typography>{value.role}</Typography>
                  </div>
                  {selectedId === value.id && value.role !== "owner" && (
                    <IconButton
                      className={classes.iconBtn}
                      onClick={() =>
                        setDialogDelete({ open: true, id: value.user_id })
                      }
                    >
                      <HighlightOffIcon style={{ color: "red" }} />
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
                  options={user.data}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      label="Username"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
