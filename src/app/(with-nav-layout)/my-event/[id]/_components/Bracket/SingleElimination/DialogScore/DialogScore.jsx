import React, { useState } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  Button,
  Typography,
  Avatar,
  Box,
  InputAdornment,
  colors,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import { TextFieldCustom } from "../../../../../../components";

const useStyles = makeStyles((theme) => ({
  boxBtn: {
    display: "flex",
    justifyContent: "space-between",
  },
  btnSubmit: {
    background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%);",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "0",
  },
  contentDialog: {
    paddingBottom: theme.spacing(3),
  },
  boxField: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gridPad: {
    padding: theme.spacing(0, 1),
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  textTitle: {
    fontWeight: 600,
    fontSize: "18px",
  },
  boxParticipant: {
    padding: theme.spacing(1, 5),
    backgroundColor: colors.purple[50],
  },
}));

const DialogScore = ({ state, onClose, action, selected }) => {
  const classes = useStyles();
  const params = useParams();
  const [extraRound, setExtraRound] = useState(false);
  const { handleSubmit, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "home_round",
  });

  const onSubmit = (data) => {
    action(params.id, state.data.id, data, selected);
    onClose();
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={state.open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{`Store Nilai Partai ${state.data?.event_turn}`}</DialogTitle>
        <DialogContent className={classes.contentDialog}>
          <Grid container>
            <Grid item xs={6} className={classes.gridPad}>
              <Typography className={classes.textTitle}>Home</Typography>
              <Avatar src={state.data?.teams[0].club_logo} />
              <Typography>{state.data?.teams[0].club_name.String}</Typography>
              <div>
                {state.data?.teams[0].participants.map((value, index) => (
                  <div key={index} className={classes.boxParticipant}>
                    <Typography>{value}</Typography>
                  </div>
                ))}
              </div>
              <Box width="100%">
                {fields.map((field, index) => (
                  <Controller
                    control={control}
                    name={`home_round${index + 1}`}
                    defaultValue=""
                    render={({ onChange, value }) => (
                      <TextFieldCustom
                        margin="normal"
                        variant="outlined"
                        placeholder="Isi nilai dari 0-100"
                        label={`Home Round ${index + 1}`}
                        size="small"
                        format="###"
                        value={value}
                        onChange={({ floatValue }) => onChange(floatValue)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {index >= 1 && (
                                <IconButton onClick={() => remove(index)}>
                                  <CancelIcon />
                                </IconButton>
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                ))}
              </Box>
              {extraRound && (
                <Controller
                  control={control}
                  name="home_extra"
                  defaultValue=""
                  render={({ onChange, value }) => (
                    <TextFieldCustom
                      margin="normal"
                      variant="outlined"
                      placeholder="Isi nilai dari 0-100"
                      label="Home Extra Round"
                      size="small"
                      format="###"
                      value={value}
                      onChange={({ floatValue }) => onChange(floatValue)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setExtraRound(false)}>
                              <CancelIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              )}
              <Controller
                control={control}
                name={`home_total`}
                defaultValue=""
                render={({ onChange, value }) => (
                  <TextFieldCustom
                    margin="normal"
                    variant="outlined"
                    placeholder="Isi nilai dari 0-100"
                    label={`Home Total Point`}
                    size="small"
                    format="###"
                    value={value}
                    onChange={({ floatValue }) => onChange(floatValue)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Grid>

            {/* AWAY */}
            <Grid item xs={6} className={classes.gridPad}>
              <Typography className={classes.textTitle}>Away</Typography>
              <Avatar src={state.data?.teams[1].club_logo} />
              <Typography>{state.data?.teams[1].club_name.String}</Typography>
              <div>
                {state.data?.teams[1].participants.map((value, index) => (
                  <div key={index} className={classes.boxParticipant}>
                    <Typography>{value}</Typography>
                  </div>
                ))}
              </div>
              <Box width="100%">
                {fields.map((field, index) => (
                  <Controller
                    control={control}
                    name={`away_round${index + 1}`}
                    defaultValue=""
                    render={({ onChange, value }) => (
                      <TextFieldCustom
                        margin="normal"
                        variant="outlined"
                        placeholder="Isi nilai dari 0-100"
                        label={`Away Round ${index + 1}`}
                        size="small"
                        format="###"
                        value={value}
                        onChange={({ floatValue }) => onChange(floatValue)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {index >= 1 && (
                                <IconButton onClick={() => remove(index)}>
                                  <CancelIcon />
                                </IconButton>
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                ))}
              </Box>
              {extraRound && (
                <Controller
                  control={control}
                  name="away_extra"
                  defaultValue=""
                  render={({ onChange, value }) => (
                    <TextFieldCustom
                      margin="normal"
                      variant="outlined"
                      placeholder="Isi nilai dari 0-100"
                      label="Away Extra Round"
                      size="small"
                      format="###"
                      value={value}
                      onChange={({ floatValue }) => onChange(floatValue)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setExtraRound(false)}>
                              <CancelIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              )}
              <Controller
                control={control}
                name={`away_total`}
                defaultValue=""
                render={({ onChange, value }) => (
                  <TextFieldCustom
                    margin="normal"
                    variant="outlined"
                    placeholder="Isi nilai dari 0-100"
                    label={`Away Total Point`}
                    size="small"
                    format="###"
                    value={value}
                    onChange={({ floatValue }) => onChange(floatValue)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.boxBtn}>
          <div>
            <Button
              variant="outlined"
              onClick={() => append({ round: "round" })}
            >
              Add Round
            </Button>
            <Button variant="outlined" onClick={() => setExtraRound(true)}>
              Extra Round
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              className={classes.btnSubmit}
              type="submit"
            >
              Simpan
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogScore;
