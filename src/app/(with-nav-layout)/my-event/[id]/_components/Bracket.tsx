/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  NativeSelect,
  InputLabel,
} from "@mui/material";

import SingleElimination from "./SingleElimination";
import OrderElimination from "./OrderElimination";
import FinalResult from "./parts/Bracket/FinalResult";
import { EventData } from "@/types/event.type";
import { useParams } from "next/navigation";
import { BracketParticipant, BracketResponse, LockOrderBracketData, LockSingleBracketData } from "@/types/bracket.type";
import { FetchResponse } from "@/types/global";
import { generateBracket, getBracketDetails, getBracketRandom, lockBracketOrder, lockBracketSingle, lockTurnBracketSingle } from "@/store/actions/bracket";
import CardSettingBracket from "./parts/Bracket/CardSettingBracket";
import { useNotification } from "@/context/notification.context";
import { NotificationContextProps } from "@/types/notification.type";
import { useLoading } from "@/context/loading.context";

async function reqLockBracketOrder(classID: string, eventID: string, data: LockOrderBracketData, showNotification: NotificationContextProps['showNotification']) {
  try {
    const response: FetchResponse = await lockBracketOrder({eventID, classID, data});
    if ([200, 201].includes(response.status)) {
      showNotification("Berhasil melakukan lock bracket order: " + response.message, "success");
    } else {
      showNotification(`Gagal melakukan lockBracketOrder: ${response.error || 'Error tidak diketahui'}`, "error");
    }
  } catch (error) {
    showNotification(`Gagal melakukan lockBracketOrder: ${error instanceof Error ? error.message : String(error)}`, "error");
  }
}

async function reqLockBracketSingle(id: string, eventID: string, data: LockSingleBracketData, showNotification: NotificationContextProps['showNotification']) {
  try {
    const response: FetchResponse = await lockBracketSingle({eventID, classID: id, data});
    if ([200, 201].includes(response.status)) {
      showNotification("Berhasil melakukan lock bracket single: "+response.message, "success");
    } else {
      showNotification(`Gagal melakukan lockBracketSingle: ${response.error || 'Error tidak diketahui'}`, "error");
    }
  } catch (error) {
    showNotification(`Gagal melakukan lockBracketSingle: ${error instanceof Error ? error.message : String(error)}`, "error");
  }
}

async function reqRandomBracket(
  eventID: string, 
  classID: string, 
  showNotification: NotificationContextProps['showNotification'],
  setData: (data: BracketResponse) => void // Optional callback to set data after randomization
) {
  try {
    const response = await getBracketRandom({eventID, classID});
    if ([200, 201].includes(response.status)) {
      setData(response)
      showNotification(response.message || "Berhasil melakukan random bracket", "success");
      return response // Assuming response.data is of type BracketResponse
    } else {
      showNotification(`Gagal melakukan getBracketRandom: ${response.error || 'Error tidak diketahui'}`, "error");
    }
  } catch (error) {
    showNotification(`Gagal melakukan getBracketRandom: ${error instanceof Error ? error.message : String(error)}`, "error");
  }
}

async function reqLockTurnBracketSingle(eventID: string, showNotification: NotificationContextProps['showNotification']) {
  try {
    const response: FetchResponse = await lockTurnBracketSingle({eventID});
    if ([200, 201].includes(response.status)) {
      showNotification(response.message || "Berhasil lock semua turnamen", "success");
    } else {
      showNotification(`Gagal melakukan lockTurnBracketSingle: ${response.error || 'Error tidak diketahui'}`, "error");
    }
  } catch (error) {
    showNotification(`Gagal melakukan lockTurnBracketSingle: ${error instanceof Error ? error.message : String(error)}`, "error");
  }
}

async function reqGenerateBracket(
    eventID: string, 
    classID: string, 
    showNotification: NotificationContextProps['showNotification'],
    updateBracketData: () => void // Optional callback to update bracket data after generation
  ) {
  try{
    const response: FetchResponse = await generateBracket({eventID, classID});
    if ([200, 201].includes(response.status)) {
      await updateBracketData(); // Call the callback to update bracket data
      showNotification(response.message || "Berhasil generate bracket", "success");
    } else {
      showNotification(`Gagal melakukan generateBracket: ${response.error || 'Error tidak diketahui'}`, "error");
    }
  } catch (error) {
    showNotification(`Gagal melakukan generateBracket: ${error instanceof Error ? error.message : String(error)}`, "error");
  }
}

const Bracket = ({
  data,
}: {
  data: EventData | null;
}) => {
  const params = useParams<{ id: string }>();
  const [selected, setSelected] = useState("");
  const [bracket, setBracket] = useState<BracketResponse | null>();
  const  { showNotification } = useNotification();
  const  {changeState: loading}= useLoading();

  const handleLock = async (type: string) => {
    loading(true);
    try{
        if (type === "order") {
          const participants = bracket?.orderBracket?.data.map((value, index) => ({
            event_registration_id: value.event_registration_id,
            iteration: index + 1,
            name: value.name, 
            club_name: value.club_name,
            final_score: value.final_score,
            image: value.image,
            is_winner: value.is_winner,
            participant_no: value.participant_no,
            score: value.score,
            seed: value.seed,
            status: value.status,
          }));

          if(participants){
            const dataLock: LockOrderBracketData = {
              status: true,
              participants: participants,
            };
            await reqLockBracketOrder(selected, params?.id || "", dataLock, showNotification);
          } else {
            showNotification("Gagal memproses data partisipan untuk lockBracketOrder", "error");
          }
        } else if (type === "single") {
          const bracketData = bracket?.singleBracket?.data[0];
          if(bracketData){
            const dataLock: LockSingleBracketData = { status: true, data: bracketData };
            await reqLockBracketSingle(selected, params.id, dataLock, showNotification);
          } else {
            showNotification("Gagal memproses data bracket untuk lockBracketSingle", "error");
          }
        }
    } catch (error) {
      showNotification(`Gagal melakukan lock bracket: ${error instanceof Error ? error.message : String(error)}`, "error");
    } finally{
      loading(false);
    }
  };

  useEffect(() => {

    if (selected !== "") {
      fetchBracketDetail();
    }
  }, [selected, params.id]);

  function setBracketData(data) {
    setBracket((prevState) => {
        const result : BracketResponse= { ...prevState
          , singleBracket: null, orderBracket: null, type: null };
        if (data.match_type === "single") {
          result.singleBracket = {...prevState?.singleBracket, ...data};
        } else if (data.match_type === "order") {
          result.orderBracket = {...prevState?.orderBracket, ...data};
        }
        result.type = data.match_type;
        return result;
      });
  }

  async function fetchBracketDetail() {
    const eventid = params.id;
    try {
      loading(true);
      const serverResponse = await getBracketDetails({
        eventID: eventid || "",
        classID: selected || "",
      });
      if (!serverResponse) {
        showNotification("Gagal mengambil detail bracket: Respon tidak valid dari getBracketDetails", "error");
      } else if (serverResponse.error) { 
        showNotification(`Gagal mengambil detail bracket (getBracketDetails): ${serverResponse.error}`, "error");
      } else {
        setBracketData(serverResponse);
      }
    } catch (error) {
      showNotification(`Gagal mengambil detail bracket (getBracketDetails): ${error instanceof Error ? error.message : String(error)}`, "error");
    } finally {
      loading(false);
    }
  }
  const currentBracket =
    bracket?.type === "order"
      ? bracket?.orderBracket
      : bracket?.type === "single"
      ? bracket?.singleBracket
      : null;


  const BracketDetailContent = currentBracket?.generate_status ? (
    bracket?.type === "order" ? (
      <OrderElimination
        bracketData={bracket.orderBracket?.data || []}
        tournament={data}
        lockScoreStatus={currentBracket.lock_score}
        selected={selected}
      />
    ) : bracket?.type === "single" && bracket?.singleBracket?.data ? (
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
    <>
      <Box sx={{ padding: { xs: 2, md: 4 }, marginTop: 3 }}>
        <Typography sx={{ fontSize: "23px", fontWeight: "bold" }}>
          Bagan Turnamen
        </Typography>
      </Box>
      <div>
        <Grid sx={{ padding: { xs: 2, md: 2 }}} container justifyContent="center">
          <Grid size={{md:5,xs:12}}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Pilih Kelas Pertandingan
              </InputLabel>
            <NativeSelect
              fullWidth
              variant="filled"
              inputProps={{
                name: "class_event",
                id: "uncontrolled-native",
              }}
              value={selected}
              onChange={({ target: { value } }) => setSelected(value)}
            >
                {[{
                  id: "",
                  class_name: "",
                }, ...(data?.class_events ?? [])].map((value) => (
                  <option value={value.id} key={value.id}>
                    {value.class_name}
                  </option>
                ))}
            </NativeSelect>
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
                random={() => reqRandomBracket(params.id, selected, showNotification,(data) => setBracketData(data))}
                lock={() => handleLock(currentBracket?.match_type || "")}
                hasRandom={currentBracket?.random || false}
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
                    data-testid="generate-bracket-button"
                    variant="outlined"
                    color="primary"
                    onClick={async() => {
                      await reqGenerateBracket(params.id, selected, showNotification,fetchBracketDetail)
                      }}
                  >
                    Generate Bracket
                  </Button>
                </div>
              </Box>
            )}
            {data?.remark !== "closed" && data?.remark !== "pending" && data?.remark !== "open" && (
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
                data-testid="lock-turn-bracket-button"
                variant="outlined"
                onClick={() => reqLockTurnBracketSingle(params.id, showNotification)}
              >
                Lock All Tournament Turn
              </Button>
            </Box>
          )}
        </Box>
      )}
      <Box sx={{ height: "300px" }} />
    </>
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
