"use client";
import { ClubFetchOneData } from "@/types/club.type";
import { Autocomplete, Button, Grid, MenuItem, TextField } from "@mui/material";
import { useState } from "react";

export default function SearchUser({
  // clubId,
  club,
}: {
  // clubId: string;
  club?: ClubFetchOneData; // TODO: Make Club type
}) {
  const [keyword, setKeyword] = useState<string>("");
  const [userSelected, setUserSelected] = useState(null);
  const [sportSelected, setSportSelected] = useState("");

  return (
    <Grid
      container
      alignItems="center"
      sx={(theme) => ({ gap: theme.spacing(2) })}
    >
      <Grid size={{ md: 5, xs: 12 }}>
        <Autocomplete
          fullWidth
          // getOptionLabel={(option) => option.name}
          options={[]} //TODO: User List for autocomplete
          inputValue={keyword}
          onInputChange={(_, newInputValue) => {
            setKeyword(newInputValue);
          }}
          value={userSelected}
          onChange={(e, newValue) => setUserSelected(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Invite new member"
              variant="outlined"
            />
          )}
        />
      </Grid>
      <Grid size={{ md: 5, xs: 12 }}>
        <TextField
          select
          fullWidth
          variant="outlined"
          label="olahraga"
          value={sportSelected}
          onChange={({ target: { value } }) => setSportSelected(value)}
        >
          {club?.sports.map((value, index) => (
            <MenuItem key={`club-sport-${index}`} value={value.sport_id}>
              {value.sport_name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={{ md: 1, xs: 12 }}>
        <Button
          style={{ height: "100%" }}
          fullWidth
          variant="contained"
          color="primary"
          // onClick={onSubmit}
          disabled={userSelected === null || sportSelected === ""}
        >
          Invite
        </Button>
      </Grid>
    </Grid>
  );
}
