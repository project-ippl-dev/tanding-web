import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Box,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useParams } from "next/navigation";
import TextFieldCustom from "@/components/TextFieldCustom";
import { BracketOrderData, DialogState, ScoreData } from "@/types/bracket.type";

interface DialogScoreProps {
  state: DialogState<BracketOrderData>;
  onClose: () => void;
  action: (
    eventID: string,
    bracketID: string,
    data: ScoreData,
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
  const { fields, append, remove } = useFieldArray({ control, name: "round" });

  const onSubmit = async (data: any) => {
    let arrayTotal: number[] = [];
    for (let i in data) {
      if (typeof data[i] === "number") {
        arrayTotal.push(data[i]);
      }
    }
    const total = arrayTotal.reduce((a, b) => a + b, 0);
    const newData = { ...data, total };
    await action(params.id, state.data?.id || "", newData, selected);
    onClose();
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={state.open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Store Nilai</DialogTitle>
        <DialogContent sx={{ paddingBottom: 3 }}>
          <Stack spacing={1} width="100%">
            {fields.map((field, index) => (
              <Box
                key={field.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    flex: index === 0 ? 1 : "0 0 calc(100% - 48px)",
                    width: index === 0 ? "100%" : "calc(100% - 48px)",
                  }}
                >
                  <Controller
                    control={control}
                    name={`round_${index + 1}`}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <TextFieldCustom
                        margin="normal"
                        variant="outlined"
                        placeholder="Isi nilai dari 0-100"
                        label={`Round ${index + 1}`}
                        size="small"
                        value={value}
                        onChange={({ floatValue }) => onChange(floatValue)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    )}
                  />
                </Box>
                {index > 0 && (
                  <Box
                    sx={{
                      flex: "0 0 48px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton onClick={() => remove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            ))}
            {extraRound && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    flex: "0 0 calc(100% - 48px)",
                    width: "calc(100% - 48px)",
                  }}
                >
                  <Controller
                    control={control}
                    name="extra"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <TextFieldCustom
                        margin="normal"
                        variant="outlined"
                        placeholder="Isi nilai dari 0-100"
                        label="Extra Round"
                        size="small"
                        value={value}
                        onChange={({ floatValue }) => onChange(floatValue)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    flex: "0 0 48px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <IconButton onClick={() => setExtraRound(false)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Stack>
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
