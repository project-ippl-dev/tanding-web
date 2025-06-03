/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, FormControl, InputLabel, NativeSelect } from "@mui/material";
import { styled } from "@mui/material/styles";

import OrderElimination from "./OrderElimination";
import FinalResult from "./parts/Bracket/FinalResult";
import { useParams } from "next/navigation";
import { EventData } from "@/types/event.type";
// import { fetchProxyApi } from "@/utils/request";
import {
  BracketResponse,
} from "@/types/bracket.type";
import SingleElimination from "./SingleElimination";
import { useLoading } from "@/context/loading.context";
import { getBracketDetails } from "@/store/actions/bracket";
import { useNotification } from "@/context/notification.context";


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
  const [selected, setSelected] = useState<string>("");
  const [bracket, setBracket] = useState<BracketResponse>({
    singleBracket: null,
    orderBracket: null,
    type: null,
  }); // Replace with actual type
  const loadingObj = useLoading();
  const notification = useNotification();

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


      if (serverResponse.error || ![200, 201].includes(serverResponse.status)) {
        notification.showNotification("Gagal mengambil data, dengan error: " + serverResponse.error, "error");
      } else {
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
    bracket?.type === "order" ? (
      <OrderElimination
        bracketData={bracket.orderBracket?.data || []}
        tournament={data}
        selected={selected}
        lockScoreStatus={currentBracket.lock_score}
      />
    ) : bracket?.type === "single" ? (
      <SingleElimination 
        data={bracket.singleBracket?.data || []} 
        tournament={data}
        selected={selected}
        lockScoreStatus={currentBracket.lock_score}
      />
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
    <StyledContainer 
      className="bracket-container"
    >
      <Box marginTop={3}>
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          Bagan Turnamen
        </Typography>
      </Box>
      <div>
        <Grid container justifyContent="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <FormControl fullWidth margin="normal" variant="standard">
              <InputLabel id="select-class-event-label">Pilih Kelas Pertandingan</InputLabel>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Pilih Kelas Pertandingan
              </InputLabel>
              <NativeSelect
                data-testid="select-class-event"
                value={selected}
                onChange={({ target: { value } }) => setSelected(value)}
                inputProps={{
                  name: "class_event",
                  id: "uncontrolled-native",
                }}
              >
                {["", ...(data?.class_events ?? [])].map((value) => (
                  <option value={value.id} key={value.id}>
                    {value.class_name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
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
