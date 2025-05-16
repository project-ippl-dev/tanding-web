import React, { useState } from "react";
import { Typography, Avatar } from "@mui/material";
import { Bracket, Seed, SeedItem, SeedTeam, SeedTime } from "react-brackets";
import DialogDetail from "./parts/SingleElimination/DialogDetail";
import { BracketRound } from "@/types/bracket.type"; 


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



const SingleElimination = ({ data }:{ data: BracketRound[] | []}) => {
  return (
    <Bracket
      mobileBreakpoint={767}
      rounds={data}
      renderSeedComponent={RenderSeed}
      swipeableProps={{ enableMouseEvents: true, animateHeight: true }}
    />
  );
};



export default SingleElimination;
