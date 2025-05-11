/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";

import OrderElimination from "./OrderElimination";
import FinalResult from "./parts/Bracket/FinalResult";
import { useParams } from "next/navigation";
import { EventData } from "@/types/event.type";
// import { fetchProxyApi } from "@/utils/request";
import { useAuth } from "@/context/auth.context";
import {
  BracketOrderResponse,
  BracketSingleResponse,
} from "@/types/bracket.type";
import { AuthData } from "@/types/auth.type";
import SingleElimination from "./SingleElimination";
import { useLoading } from "@/context/loading.context";
import { getBracketDetails } from "@/store/actions/bracket";

interface BracketResponse {
  singleBracket: BracketSingleResponse | null;
  orderBracket: BracketOrderResponse | null;
  type: string | null;
}

const StyledContainer = styled("div")(({ theme }) => ({
  padding: "0 80px",
  [theme.breakpoints.down("md")]: {
    padding: "0 16px",
  },
}));

export default function Bracket({
  data,
}: {
  data: EventData | null; // Replace with actual type
}) {
  const params = useParams();
  const { authData }: AuthData = useAuth();
  const [selected, setSelected] = useState<string>("");
  const [bracket, setBracket] = useState<BracketResponse>({
    singleBracket: null,
    orderBracket: null,
    type: null,
  }); // Replace with actual type
  const loadingObj = useLoading();

  useEffect(() => {
    async function getBracketDetail() {
      const eventid = params.id;
      // const token = authData.token.access_token; // Replace with actual token retrieval logic
      // const url = `/api/event/bracket/${eventid || ""}/${selected || ""}`;

      if (loadingObj.changeState) loadingObj.changeState(true);

      // const serverResponse = await fetchProxyApi(url, token)
      const serverResponse = await getBracketDetails({
        eventID: eventid || "",
        classID: selected || "",
      });

      console.log('serverResponse:', serverResponse)

      if (!serverResponse) {
        alert("Gagal mengambil data, dengan error: " + serverResponse.error);
      } else {
        console.log('masuk ga', serverResponse);
        setBracket((prevState) => {
          const result = { ...prevState };
          // if (serverResponse.data.match_type === "single") {
          if (serverResponse.match_type === "single") {
            // result.singleBracket = serverResponse.data;
            result.singleBracket = serverResponse;
          // } else if (serverResponse.data.match_type === "order") {
          } else if (serverResponse.match_type === "order") {
            // result.orderBracket = serverResponse.data;
            result.orderBracket = serverResponse;
          }
          result.type = serverResponse.match_type;
          return result;
        });
      }

      if (loadingObj.changeState) loadingObj.changeState(false);
    }

    if (selected !== "") {
      getBracketDetail();
    }
  }, [selected]);

  const currentBracket =
    bracket.type === "order"
      ? bracket?.orderBracket
      : bracket.type === "single"
      ? bracket?.singleBracket
      : null;

  const BracketDetailContent = currentBracket?.generate_status ? (
    bracket.type === "order" ? (
      <OrderElimination
        bracketData={bracket.orderBracket?.data || []}
        tournament={data}
      />
    ) : bracket.type === "single" ? (
      <SingleElimination data={bracket.singleBracket?.data || []} />
    ) : null
  ) : null;

  const BracketDetailElement = (
    <Box
      sx={(theme) => ({
        border: "1px solid #efefef",
        padding: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
          padding: 0,
        },
      })}
    >
      {data?.remark === "done" && (
        <FinalResult
          data={
            bracket.type === "order"
              ? bracket?.orderBracket?.summary || []
              : bracket.type === "single"
              ? bracket?.singleBracket?.summary || []
              : []
          }
        />
      )}

      {BracketDetailContent}
    </Box>
  );

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
}

/*
const mapStateToProps = (state) => ({
  bracket: state.bracket,
  tournament: state.tournament,
});

export default connect(mapStateToProps, { getBracketDetail })(Bracket);
*/
