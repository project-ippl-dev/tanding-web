import React from "react";
import { Box, Container, Typography } from "@mui/material";

import { EventSingleResponse } from "@/types/event.type";
import { sendFinishTournament } from "@/store/actions/event";
import FinishTournament from "./parts/Settings/FinishTournament";
import CardAssignRole from "./parts/Settings/CardAssignRole";


async function reqFinishTournament(eventID: string) {
  // Finish the tournament
  const response = await sendFinishTournament({ eventID });
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}


const Setting = ({ tournament }:{
  tournament: EventSingleResponse | null;
}) => {
  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <Container maxWidth="lg">
        <Box paddingTop={3}>
          <Typography sx={{ fontSize: "23px", fontWeight: "bold" }}>
            Setting Pertandingan
          </Typography>
          {tournament?.data?.remark === "ongoing" && (
            <Box marginTop={3}>
              <FinishTournament finishTournament={reqFinishTournament} />
            </Box>
          )}
          <Box marginTop={3}>
            <CardClassTournament data={tournament} />
          </Box>
          {tournament?.data?.user_privilege.role === "owner" && (
            <Box marginTop={3}>
              <CardAssignRole />
            </Box>
          )}
          <Box marginTop={3} paddingBottom={5}>
            <CardEditTournament data={tournament} />
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Setting;

/*
const mapStateToProps = (state) => ({
  tournament: state.tournament,
});

export default connect(mapStateToProps, { finishTournament })(Setting);
*/