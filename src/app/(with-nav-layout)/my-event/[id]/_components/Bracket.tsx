/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";

import SingleElimination from "./SingleElimination";
import OrderElimination from "./OrderElimination";
import FinalResult from "./parts/Bracket/FinalResult";
import { EventData } from "@/types/event.type";
import { useParams } from "next/navigation";
import { BracketResponse, LockOrderBracketData, LockSingleBracketData } from "@/types/bracket.type";
import { FetchResponse } from "@/types/global";
import { generateBracket, getBracketDetails, getBracketRandom, lockBracketOrder, lockBracketSingle, lockTurnBracketSingle } from "@/store/actions/bracket";
import CardSettingBracket from "./parts/Bracket/CardSettingBracket";

async function reqLockBracketOrder(classID: string, eventID: string, data: LockOrderBracketData) {
  // Lock the bracket order
  const response: FetchResponse = await lockBracketOrder({eventID, classID, data});
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

async function reqLockBracketSingle(id: string, eventID: string, data: LockSingleBracketData) {
  // Lock the bracket single
  const response: FetchResponse = await lockBracketSingle({eventID, classID: id, data});
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

async function reqRandomBracket(eventID: string, classID: string) {
  const response: FetchResponse = await getBracketRandom({eventID, classID});
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

async function reqLockTurnBracketSingle(eventID: string) {
  const response: FetchResponse = await lockTurnBracketSingle({eventID});
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

async function reqGenerateBracket(eventID: string, classID: string) {
  const response: FetchResponse = await generateBracket({eventID, classID});
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}

const Bracket = ({
  data,
  // randomBracket,
  //cancelBracket,
  // generateBracket,
  // lockTurnBracketSingle,
  // lockBracketScore,
  // storeBracketOrderScore,
  // storeBracketSingleScore,
}: {
  data: EventData | null;
}) => {
  const params = useParams<{ id: string }>();
  const [selected, setSelected] = useState("");
  const [bracket, setBracket] = useState<BracketResponse | null>();

  const handleLock = (type: string) => {
    if (type === "order") {
      const data = {
        status: true,
        participants: bracket?.orderBracket?.data.map((value, index) => ({
          event_registration_id: value.event_registration_id,
          iteration: index + 1, // Gak tau attributnya seperti apa
        })),
      };
      reqLockBracketOrder(selected, params?.id || "", data);
    } else if (type === "single") {
      const data = { status: true, data: bracket?.singleBracket?.data[0] };
      reqLockBracketSingle(selected, params.id, data);
    }
  };

  useEffect(() => {
    async function fetchBracketDetail() {
      const eventid = params.id;
      // const token = authData.token.access_token; // Replace with actual token retrieval logic
      // const url = `/api/event/bracket/${eventid || ""}/${selected || ""}`;

      // if (loadingObj.changeState) loadingObj.changeState(true);

      // const serverResponse = await fetchProxyApi(url, token)
      const serverResponse = await getBracketDetails({
        eventID: eventid || "",
        classID: selected || "",
      });

      console.log('serverResponse:', serverResponse)

      if (!serverResponse) {
        alert("Gagal mengambil data, dengan error: " + serverResponse.error);
      } else {
        setBracket((prevState) => {
          const result : BracketResponse= { ...prevState
            , singleBracket: null, orderBracket: null, type: null };
          if (serverResponse.match_type === "single") {
            result.singleBracket = serverResponse;
          } else if (serverResponse.match_type === "order") {
            result.orderBracket = serverResponse;
          }
          result.type = serverResponse.match_type;
          return result;
        });
      }

      // if (loadingObj.changeState) loadingObj.changeState(false);
    }

    if (selected !== "") {
      fetchBracketDetail();
    }
  }, [selected]);


  
  const currentBracket =
    bracket?.type === "order"
      ? bracket?.orderBracket
      : bracket?.type === "single"
      ? bracket?.singleBracket
      : null;

  console.log(selected);
  console.log('currentBrack:', bracket?.type );

  const BracketDetailContent = currentBracket?.generate_status ? (
    bracket?.type === "order" ? (
      <OrderElimination
        bracketData={bracket.orderBracket?.data || []}
        tournament={data}
        lockScoreStatus={currentBracket.lock_score}
        selected={selected}
      />
    ) : bracket?.type === "single" ? (
      <SingleElimination
        data={bracket.singleBracket?.data || []}
        tournament={data}
        lockScoreStatus={currentBracket.lock_score}
        selected={selected}
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

      {BracketDetailContent}
    </Box>
  );
  return (
    <div>
      <Box sx={{ padding: { xs: 2, md: 10 }, marginTop: 3 }}>
        <Typography sx={{ fontSize: "23px", fontWeight: "bold" }}>
          Bagan Tournament
        </Typography>
      </Box>
      <div>
        <Grid sx={{ padding: { xs: 2, md: 10 }}} container justifyContent="center">
          <Grid size={{md:5,xs:12}}>
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
      {selected !== "" && (
        <Box sx={{ marginTop: 3 }}>
          <Box
            sx={{
              minHeight: "200px",
              width: "100%",
              border: "1px solid #efefef",
              marginTop: 4,
              padding: 2,
            }}
          >
            {currentBracket?.generate_status && data?.remark === "closed" && !currentBracket.lock_status && (
              <CardSettingBracket
                random={() => reqRandomBracket(params.id, selected)}
                lock={() => handleLock(currentBracket?.match_type || "")}
                hasRandom={currentBracket?.random || false // random gak ada attributnya
                }
              />
            )}
            {!currentBracket?.generate_status && data?.remark === "closed" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                }}
              >
                <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => reqGenerateBracket(params.id, selected)}
                  >
                    Generate Bracket
                  </Button>
                </div>
              </Box>
            )}
            {data?.remark === "done" && (
              <FinalResult
                data={
                  bracket?.type === "order"
                    ? bracket?.orderBracket?.summary || []
                    : bracket?.type === "single"
                    ? bracket?.singleBracket?.summary || []
                    : []
                }
              />
            )}
            {BracketDetailElement}
          </Box>
          {data?.remark === "closed" && !data?.event_turn_lock && (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
              <Button
                variant="outlined"
                onClick={() => reqLockTurnBracketSingle(params.id)}
              >
                Lock All Tournament Turn
              </Button>
            </Box>
          )}
        </Box>
      )}
      <Box sx={{ height: "300px" }} />
    </div>
  );
};

export default Bracket;

// const mapStateToProps = (state) => ({
//   tournament: state.tournament,
//   bracket: state.bracket,
// });

// export default connect(mapStateToProps, {
//   getBracketDetail,
//   lockBracketOrder,
//   lockBracketSingle,
//   randomBracket,
//   cancelBracket,
//   generateBracket,
//   lockTurnBracketSingle,
//   storeBracketOrderScore,
//   lockBracketScore,
//   storeBracketSingleScore,
// })(Bracket);
