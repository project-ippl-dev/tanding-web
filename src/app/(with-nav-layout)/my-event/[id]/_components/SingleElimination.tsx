"use client"
import React, { useState } from "react";
import { Typography, Avatar, Box, Button } from "@mui/material";
import { Bracket, Seed, SeedItem, SeedTeam, SeedTime } from "react-brackets";
import DialogDetail from "./parts/SingleElimination/DialogDetail";
import { BracketRound, BracketSeed, DialogState, SingleMatchScoreData } from "@/types/bracket.type";
import DialogScore from "./parts/SingleElimination/DialogScore";
import Table from "./Table";
import { useParams } from "next/navigation";
import { EventData } from "@/types/event.type";
import { lockBracketScore, storeBracketSingleScore } from "@/store/actions/bracket";


const RenderSeed = ({ breakpoint, seed }) => {
  const [openDetail, setOpenDetail] = useState({ open: false, data: null });

  return (
    <>
      <Seed mobileBreakpoint={breakpoint}>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => setOpenDetail({ open: true, data: seed })}
        >
          <SeedItem style={{ width: "100%" }}>
            <div>
              <SeedTeam>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={seed.teams?.[0]?.club_logo}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "5px",
                    }}
                  />
                  <Typography style={{ fontSize: "13px" }}>
                    {seed.teams?.[0]?.club_name || "-----------"}
                  </Typography>
                </div>
                <Typography style={{ fontSize: "13px" }}>
                  {seed.is_score && seed.teams?.[0]?.Score.total}
                </Typography>
              </SeedTeam>
              <div style={{ height: 1, backgroundColor: "#707070" }}></div>
              <SeedTeam>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={seed.teams?.[1]?.club_logo}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "5px",
                    }}
                  />
                  <Typography style={{ fontSize: "13px" }}>
                    {seed.teams?.[1]?.club_name.String || "-----------"}
                  </Typography>
                </div>
                <Typography style={{ fontSize: "13px" }}>
                  {seed.is_score && seed.teams?.[1]?.Score.total}
                </Typography>
              </SeedTeam>
            </div>
          </SeedItem>
        </div>
        <SeedTime mobileBreakpoint={breakpoint} style={{ fontSize: 9 }}>
          {seed.event_turn !== 0 && `Partai ${seed.event_turn}`}
        </SeedTime>
      </Seed>

      {/* DIALOG DETAIL */}
      <DialogDetail
        dialog={openDetail}
        onClose={() => setOpenDetail({ open: false, data: null })}
      />
    </>
  );
};


nterface SingleEliminationProps {
  data: BracketRound[];
  tournament?: EventData | null;
  selected?: string;
  lockScoreStatus?: boolean;
}


const SingleElimination: React.FC<SingleEliminationProps> = ({ 
  data, 
  tournament, 
  selected = "", 
  lockScoreStatus = false 
}) => {
  const params = useParams<{ id: string }>();
  const [scoring, setScoring] = useState<DialogState<BracketSeed>>({ open: false, data: null });

  const handleLockScoring = async () => {
    if (selected) {
      try {
        const result = await lockBracketScore({ eventID: params.id, classID: selected });
        if (result.status === 200) {
          alert(result.message || "Score has been locked");
          window.location.reload(); // Refresh to update UI
        } else {
          alert("Failed to lock score: " + (result.error || "Unknown error"));
        }
      } catch (error) {
        alert("Error locking score: " + error);
      }
    }
  };

  // Function to handle scoring
  const handleStoreBracketScore = async (
    eventID: string, 
    bracketID: string, 
    data: SingleMatchScoreData, 
    classID: string
  ) => {
    try {
      const result = await storeBracketSingleScore({ eventID, bracketID, classID, data });
      if (result.status === 200) {
        alert(result.message || "Score has been stored");
        window.location.reload(); // Refresh to update UI
      } else {
        alert("Failed to store score: " + (result.error || "Unknown error"));
      }
      return result;
    } catch (error) {
      alert("Error storing score: " + error);
      throw error;
    }
  };

  return (
    <div>
      <Bracket
        mobileBreakpoint={767}
        rounds={data}
        renderSeedComponent={RenderSeed}
        swipeableProps={{ enableMouseEvents: true, animateHeight: true }}
      />
      
      {tournament && (tournament.remark === "ongoing" || tournament.remark === "done") && selected && (
        <Box sx={{ marginTop: 5 }}>
          <Typography variant="h5" align="center">
            Scoring
          </Typography>
          <Table
            data={data}
            setScoring={setScoring}
            lockScoreStatus={lockScoreStatus}
          />
          {!lockScoreStatus && (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLockScoring}
              >
                Pertandingan Selesai
              </Button>
            </Box>
          )}
        </Box>
      )}

      {/* Dialog */}
      <DialogScore
        state={scoring}
        onClose={() => setScoring({ open: false, data: null })}
        action={handleStoreBracketScore}
        selected={selected}
      />
    </div>
  );
};


export default SingleElimination;
