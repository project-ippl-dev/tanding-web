import React, { useMemo } from "react";
import { Box, Container, Typography } from "@mui/material";

import { EventSingleResponse } from "@/types/event.type";
import { sendFinishTournament } from "@/store/actions/event";
import FinishTournament from "./parts/Settings/FinishTournament";
import CardAssignRole from "./parts/Settings/CardAssignRole";
import CardClassTournament from "./CardClassTournament";
import CardEditTournament from "./parts/Settings/CardEditTournament";
import { NotificationType } from "@/types/notification.type";


async function reqFinishTournament(
  eventID: string,
  notification: (message:string,status?:NotificationType) => void
) {
  // Finish the tournament
  const response = await sendFinishTournament({ eventID });
  if (response.status === 200) {
    notification("Turnamen berhasil diselesaikan", "success");
  } else {
    notification("Gagal menyelesaikan turnamen, dengan error: " + response.error, "error");
  }
}



const Setting = ({ tournament, updateTournament }:{
  tournament: EventSingleResponse | null;
  updateTournament: (id: string) => void;
}) => {
  
  const MemoizedFinishTournament = useMemo(() => (
    <FinishTournament finishTournament={reqFinishTournament} />
  ), []);

  const MemoizedCardAssignRole = useMemo(() => (
    <CardAssignRole />
  ),[])

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <Container maxWidth="lg">
        <Box paddingTop={3}>
          <Typography sx={{ fontSize: "23px", fontWeight: "bold" }}>
            Setting Pertandingan
          </Typography>
          {tournament?.data?.remark === "ongoing" && (
            <Box marginTop={3}>
              {MemoizedFinishTournament}
            </Box>
          )}
          <Box marginTop={3}>
            <CardClassTournament 
              updateTournament={updateTournament || null}
              tournament={tournament?.data || null} />
          </Box>
          {tournament?.data?.user_privilege.role === "owner" && (
            <Box marginTop={3}>
              {MemoizedCardAssignRole}
            </Box>
          )}
          <Box marginTop={3} paddingBottom={5}>
            <CardEditTournament tournament={tournament?.data || null} />
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