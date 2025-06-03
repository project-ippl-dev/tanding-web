/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { EventParticipantsResponse } from "@/types/event.type";
import { useParams } from "next/navigation";
import { getTournamentParticipants } from "@/store/actions/event";
import { useLoading } from "@/context/loading.context";
import { useNotification } from "@/context/notification.context";

const Participant = () => {
  const {id} = useParams();
  const {changeState: loading} = useLoading();
  const {showNotification} =  useNotification();
  const [expanded, setExpanded] = useState("");
  const [participants, setParticipants] = useState<EventParticipantsResponse | null>(null);
  const alreadyFetch = useRef(false);

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : "");
  };

  useEffect(() => {
    async function fetchParticipants() {
      try{
        loading(true);
        const serverResponse = await getTournamentParticipants({eventID: id || "" });
        if([200,201].includes(serverResponse.status) ) {
          setParticipants(serverResponse)
        } else{
          showNotification("Gagal mengambil data peserta, dengan error: " + (serverResponse.error || "Unknown error"), "error"); 
        }

      }
      catch (error) {
        showNotification("Terjadi Kesalaha dengan errror: " + (error instanceof Error ? error.message : "Unknown error"), "error");
        console.error("Error fetching participants:", error);
      }
      finally {
        loading(false);
      }
    }
    
    if(!alreadyFetch.current) {
      alreadyFetch.current = true;
      fetchParticipants();
    }
    
  }, []);

  return (
    <div>
      <Box sx={{ padding: { xs: 2, md: 10 }, marginTop: 3 }}>
        <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>
          Daftar Peserta
        </Typography>
      </Box>
      <Box sx={{ paddingTop: 3 }}>
        {participants?.data?.map((value, index) => (
          <Accordion
            data-testid={`club-participant`}
            key={index}
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                sx={{
                  padding: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography>{value.name}</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {`Tanding! Point ${value.total_point}`}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "block" }}>
              {value.members.map((data, idx) => (
                <Box
                  key={idx}
                  data-testid={`participant-${value.id}`}
                  sx={{
                    width: "100%",
                    padding: 3,
                    marginBottom: 0.5,
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography>{data.name}</Typography>
                    <Typography>{data.class_name}</Typography>
                  </Box>
                  <Divider />
                </Box>
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
      <Box sx={{ height: "300px" }} />
    </div>
  );
};

export default Participant;


// const mapStateToProps = (state) => ({
//   participants: state.participants,
// });

// export default connect(mapStateToProps, { getParticipants })(Participant);
