import React, { useState } from "react";
import { useParams } from "react-router";
import { Typography, Avatar, Box, Button } from "@material-ui/core";
import { Bracket, Seed, SeedItem, SeedTeam, SeedTime } from "react-brackets";

import DialogScore from "./DialogScore";
import DialogDetail from "./DialogDetail";
import Table from "./Table";

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
                    {seed.teams?.[0]?.club_name.String || "-----------"}
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

const SingleElimination = ({
  data,
  storeBracketScore,
  selected,
  lockScoreStatus,
  lockScore,
  tournament,
}) => {
  const params = useParams();
  const [scoring, setScoring] = useState({ open: false, data: null });

  const handleLockScoring = () => {
    lockScore(params.id, selected);
  };

  return (
    <div>
      <Bracket
        mobileBreakpoint={767}
        rounds={data}
        renderSeedComponent={RenderSeed}
        swipeableProps={{ enableMouseEvents: true, animateHeight: true }}
      />
      {(tournament.detail.data?.remark === "ongoing" ||
        tournament.detail.data?.remark === "done") && (
        <Box marginTop={5}>
          <Typography variant="h5" align="center">
            Scoring
          </Typography>
          <Table
            data={data}
            setScoring={setScoring}
            lockScoreStatus={lockScoreStatus}
            tournament={tournament}
          />
          {!lockScoreStatus && (
            <Box display="flex" justifyContent="center" padding={1}>
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
        action={storeBracketScore}
        selected={selected}
      />
    </div>
  );
};

export default SingleElimination;
