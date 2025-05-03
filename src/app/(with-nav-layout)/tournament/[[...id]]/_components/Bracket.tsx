/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";

import OrderElimination from "./OrderElimination";
import FinalResult from "./parts/Bracket/FinalResult";
import { useParams } from "next/navigation";
import { EventData } from "@/types/event.type";
import { fetchProxyApi } from "@/utils/request";
import { useAuth } from "@/context/auth.context";

const StyledContainer = styled("div")(({ theme }) => ({
  padding: "0 80px",
  [theme.breakpoints.down("md")]: {
    padding: "0 16px",
  },
}));


export default function Bracket({
  data
}:{
  data: EventData | null; // Replace with actual type
}) {
  const params = useParams()
  const auth = useAuth()
  const [selected, setSelected] = useState<string>("");
  const [bracket, setBracket] = useState<any>([]); // Replace with actual type

  useEffect(() => {
    async function getBracketDetail() {
      const eventid = params.id
      const token = auth.data.token.access_token // Replace with actual token retrieval logic
      const url = `/api/event/bracket/${eventid || ''}/${selected ||''}`

      const serverResponse = await fetchProxyApi(url, token)

      if (!serverResponse.success) {
        alert("Gagal mengambil data, dengan error: " + serverResponse.error)
      } else {
        console.log(serverResponse)
        setBracket(serverResponse.data)
      }
    }

    if (selected !== "") {
      getBracketDetail()
    }
  }, [selected]);


  const BracketDetailElement = (
        <Box sx={(theme)=>({
            border: "1px solid #efefef",
            padding: theme.spacing(2),
            [theme.breakpoints.down("md")]: {
              padding: 0,
            },
        })}>

        </Box>
  )

  return (
    <StyledContainer>
      <Box marginTop={3}>
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          Bagan Tournament
        </Typography>
      </Box>
      <div>
        <Grid container justifyContent="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <TextField
              fullWidth
              select
              margin="normal"
              variant="outlined"
              label="Pilih Kelas Pertandingan"
              value={selected}
              onChange={({ target: { value } }) => setSelected(value)}
            >
              {data?.class_events.map((value) => (
                <MenuItem value={value.id} key={value.id}>
                  {value.class_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </div>
      {selected !== "" ? BracketDetailElement : ""}
    </StyledContainer>
  );
};


/*
const mapStateToProps = (state) => ({
  bracket: state.bracket,
  tournament: state.tournament,
});

export default connect(mapStateToProps, { getBracketDetail })(Bracket);
*/