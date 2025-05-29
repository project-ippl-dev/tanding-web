import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";

// import { useAuth } from "@/context/auth.context";
// import { fetchProxyApi } from "@/utils/request";
import { useLoading } from "@/context/loading.context";
import { useParams } from "next/navigation";
import { EventParticipantsResponse } from "@/types/event.type";
import { getTournamentParticipants } from "@/store/actions/event";
import { useNotification } from "@/context/notification.context";

const StyledContainer = styled("div")({
  padding: "0 80px",
  "@media (max-width: 960px)": {
    padding: "0 16px",
  },
});

const StyledDetail = styled("div")({
  width: "100%",
  padding: "0 24px 4px",
  "@media (max-width: 960px)": {
    padding: "0",
  },
});

export default function Participant() {
  // const { authData } = useAuth();
  const loadingObj = useLoading();
  const notification = useNotification();
  const { id } = useParams();

  const [expanded, setExpanded] = useState<string | false>(false);
  const [participants, setParticipants] = useState<
    EventParticipantsResponse | null
  >(null);

  useEffect(() => {
    async function getParticipants() {
      // const token = authData.token.access_token;
      const eventid = id;

      // const url = `/api/event/participants/${eventid || ""}`;

      if (loadingObj.changeState) loadingObj.changeState(true);

      // const serverResponse = await fetchProxyApi(url, token)
      const serverResponse = await getTournamentParticipants({
        eventID: eventid || "",
      });

      if (![200,201].includes(serverResponse.status || serverResponse.error)) {
        // if (!serverResponse.success) {
        // alert(`Gagal mengambil data, dengan error: ` + serverResponse.message);
        notification.showNotification(`Gagal mengambil data, dengan error: ` + serverResponse.error, "error");
      } else {
        // setParticipants(serverResponse.data);
        setParticipants(serverResponse);
      }

      if (loadingObj.changeState) loadingObj.changeState(false);
    }

    getParticipants();
  }, []);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <StyledContainer>
      <Box marginTop={3}>
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          Daftar Peserta
        </Typography>
      </Box>
      <Box paddingTop={3}>
        {!participants ? "" :
          participants?.data?.map((value, index) => (
            <Accordion
              key={`peserta${index + 1}`}
              expanded={expanded === `panel${index + 1}` ? true : false}
              onChange={handleChange(`panel${index + 1}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                padding: "0 24px",
                "@media (max-width: 960px)": { padding: "0" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <Typography>{value.name}</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {`Tanding! Point ${value.total_point}`}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "block" }}>
              {value.members.map((data, index) => (
                <StyledDetail key={`detailPeserta${index + 1}`}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>{data.name}</Typography>
                    <Typography>{data.class_name}</Typography>
                  </Box>
                  <Divider />
                </StyledDetail>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
        {participants?.data?.length === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50px",
            }}
          >
            <Typography>Belum ada peserta yang mendaftar</Typography>
          </Box>
        )}
      </Box>
      <Box height="100px" />
    </StyledContainer>
  );
}

/*
const mapStateToProps = (state) => ({
  participants: state.participants,
});

export default connect(mapStateToProps, { getParticipants })(Participant);
*/
