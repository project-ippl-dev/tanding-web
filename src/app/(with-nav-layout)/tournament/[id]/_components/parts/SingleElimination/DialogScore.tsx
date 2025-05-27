import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Typography,
  Avatar,
  Box,
  InputAdornment,
  Stack,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import TextFieldCustom from "@/components/TextFieldCustom";
import {
  BracketSeed,
  DialogState,
  SingleMatchScoreData,
} from "@/types/bracket.type";
import { useParams } from "next/navigation";

interface DialogScoreProps {
  state: DialogState<BracketSeed>;
  onClose: () => void;
  action: (
    eventID: string,
    bracketID: string,
    data: SingleMatchScoreData,
    classID: string
  ) => Promise<any>;
  selected: string;
}

const DialogScore: React.FC<DialogScoreProps> = ({
  state,
  onClose,
  action,
  selected,
}) => {
  const params = useParams<{ id: string }>();
  const [extraRound, setExtraRound] = useState(false);
  const { handleSubmit, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "home_round",
  });

  const onSubmit = async (data: any) => {
    await action(params.id, state.data?.id || "", data, selected);
    onClose();
  };

  if (!state.data) return null;

  const teamSection = (isHome: boolean) => {
    const teamIndex = isHome ? 0 : 1;
    const prefix = isHome ? "home" : "away";
    const title = isHome ? "Home" : "Away";

    return (
      <Box
        sx={{
          width: "50%",
          padding: (theme) => theme.spacing(0, 1),
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
          {title}
        </Typography>
        <Avatar src={state.data?.teams[teamIndex].club_logo} />
        <Typography>{state.data?.teams[teamIndex].club_name.String}</Typography>
        <Stack width="100%">
          {state.data?.teams[teamIndex].participants.map((value, index) => (
            <Box
              key={index}
              sx={{
                padding: (theme) => theme.spacing(1, 5),
                backgroundColor: "#f3e5f5",
              }}
            >
              <Typography>{value}</Typography>
            </Box>
          ))}
        </Stack>
        <Box width="100%">
          {fields.map((field, index) => (
            <Controller
              key={field.id}
              control={control}
              name={`${prefix}_round${index + 1}`}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextFieldCustom
                  margin="normal"
                  variant="outlined"
                  placeholder="Isi nilai dari 0-100"
                  label={`${title} Round ${index + 1}`}
                  size="small"
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
            name={`${prefix}_extra`}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextFieldCustom
                margin="normal"
                variant="outlined"
                placeholder="Isi nilai dari 0-100"
                label={`${title} Extra Round`}
                size="small"
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
          name={`${prefix}_total`}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextFieldCustom
              margin="normal"
              variant="outlined"
              placeholder="Isi nilai dari 0-100"
              label={`${title} Total Point`}
              size="small"
              value={value}
              onChange={({ floatValue }) => onChange(floatValue)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
      </Box>
    );
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={state.open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{`Store Nilai Partai ${state.data?.event_turn}`}</DialogTitle>
        <DialogContent sx={{ paddingBottom: 3 }}>
          <Box display="flex" flexDirection="row" width="100%">
            {teamSection(true)}
            {teamSection(false)}
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box>
            <Button
              variant="outlined"
              onClick={() => append({ round: "round" })}
            >
              Add Round
            </Button>
            <Button variant="outlined" onClick={() => setExtraRound(true)}>
              Extra Round
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "0",
              }}
              type="submit"
            >
              Simpan
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogScore;
