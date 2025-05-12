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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
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
}));

const DialogScore = ({ state, onClose, action, selected }) => {
  const classes = useStyles();
  const params = useParams();
  const [extraRound, setExtraRound] = useState(false);
  const { handleSubmit, control } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "round" });

  const onSubmit = (data) => {
    let arrayTotal = [];
    for (let i in data) {
      arrayTotal.push(data[i]);
    }
    const total = arrayTotal.reduce((a, b) => a + b);
    const newData = { ...data, total };
    action(params.id, state.data.id, newData, selected);
    onClose();
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={state.open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Store Nilai</DialogTitle>
        <DialogContent className={classes.contentDialog}>
          {fields.map((field, index) => (
            <Grid container className={classes.boxField} key={field.id}>
              <Grid item xs={index === 0 ? 12 : 11}>
                <Controller
                  control={control}
                  name={`round_${index + 1}`}
                  defaultValue=""
                  render={({ onChange, value }) => (
                    <TextFieldCustom
                      margin="normal"
                      variant="outlined"
                      placeholder="Isi nilai dari 0-100"
                      label={`Round ${index + 1}`}
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
              {index > 0 && (
                <Grid item xs={1}>
                  <IconButton
                    className={classes.iconBtn}
                    onClick={() => remove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          ))}
          {extraRound && (
            <Grid container className={classes.boxField}>
              <Grid item xs={11}>
                <Controller
                  control={control}
                  name="extra"
                  defaultValue=""
                  render={({ onChange, value }) => (
                    <TextFieldCustom
                      margin="normal"
                      variant="outlined"
                      placeholder="Isi nilai dari 0-100"
                      label="Extra Round"
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
              <Grid item xs={1}>
                <IconButton
                  className={classes.iconBtn}
                  onClick={() => setExtraRound(false)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
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
