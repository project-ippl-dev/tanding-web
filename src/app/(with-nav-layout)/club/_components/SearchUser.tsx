"use client";
import { inviteToClub } from "@/store/actions/club";
import { searchUser } from "@/store/actions/user";
import { ClubFetchOneData } from "@/types/club.type";
import { UserData } from "@/types/user";
import { Autocomplete, Button, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function SearchUser({
  // clubId,
  club,
}: {
  // clubId: string;
  club: ClubFetchOneData;
}) {
  const [keyword, setKeyword] = useState<string>("");
  const [userSelected, setUserSelected] = useState<UserData | null>(null);
  const [sportSelected, setSportSelected] = useState("");
  const searchUserRef = useRef([]);

  const onSubmit = () => {
    if (userSelected) {
      const data = {
        participants: [
          {
            user_id: userSelected?.id,
            sport_id: sportSelected,
          },
        ],
      };
      inviteToClub(club?.id, data);
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await searchUser(keyword, 5);
      if (response.status === 200) {
        searchUserRef.current = response.data;
      } else {
        alert(
          "Gagal mendapatkan data pengguna, dengan error: " + response.error
        );
      }
    };
    fetchOptions();
  }, [keyword]);

  return (
    <Grid
      container
      alignItems="center"
      sx={(theme) => ({ gap: theme.spacing(2) })}
      data-testid="search-user-member"
    >
      <Grid size={{ md: 5, xs: 12 }}>
        <Autocomplete
          data-testid="invite-new-member-autocomplete"
          fullWidth
          getOptionLabel={(option) => option.name}
          options={searchUserRef.current}
          inputValue={keyword}
          onInputChange={(_, newInputValue) => {
            setKeyword(newInputValue);
          }}
          value={userSelected}
          onChange={(_, newValue) => setUserSelected(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              data-testid="invite-new-member-text-field"
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
          onClick={onSubmit}
          disabled={!userSelected || sportSelected === ""}
        >
          Invite
        </Button>
      </Grid>
    </Grid>
  );
}
