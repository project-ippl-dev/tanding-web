"use client";

import React, { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HeaderTournament from "./_components/HeaderTournament";
import { EventInfinityResponse } from "@/types/event.type";
import CardTournaments from "./_components/CardTournaments";
import { useParams } from "next/navigation";
import { getTournamentInfinity } from "@/store/actions/event";
import { useNotification } from "@/context/notification.context";
import { useLoading } from "@/context/loading.context";

// TODO: mengatasi rerendering yang sering, gunakan useMemo

export default function TournamentDetailPage() {
  const { id: eventID } = useParams<{ id: string }>();
  const tournamentInfinityData = useRef<EventInfinityResponse>(null);
  const theme = useTheme();
  const { changeState: setLoading } = useLoading();
  const notification = useNotification();

  useEffect(() => {
    async function fetchTournamentInfinityData() {
      setLoading(true);
      // const token = authData?.token.access_token; // Replace with actual token retrieval logic
      //   const url = `/api/event/infinity?limit=10&type=all&sport_id=1&search=&remark=ongoing`;
      // const serverResponse = await fetchProxyApi(url, token);
      try {
        const serverResponse = await getTournamentInfinity({
            limit: 10,
            type: "",
            sport_id: "",
            search: "",
            remark: "",
          });

          if (serverResponse.error || ![200, 201].includes(serverResponse.status)) {
            // if(serverResponse.data.error) {
            notification.showNotification(
              `Gagal mengambil data: ${serverResponse.error || 'Error tidak diketahui'}`,
              "error"
            );
          } else {
            // tournamentInfinityData.current = serverResponse.data;
            tournamentInfinityData.current = serverResponse;
          }
      }
      catch (error) {
        let message = "Error tidak diketahui";
        if (error instanceof Error) {
          message = error.message;
        }
        notification.showNotification(
          `Gagal mengambil data: ${message}`,
          "error"
        );
      }
      finally {
        setLoading(false);
      }
    }
    fetchTournamentInfinityData();
  }, []);


  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: theme.spacing(0),
      }}
    >
      <HeaderTournament eventID={eventID} />
      <Box
        sx={{
          padding: theme.spacing(7, 10, 5),
          [theme.breakpoints.down("md")]: {
            padding: theme.spacing(7, 2, 5),
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: theme.spacing(2),
          }}
        >
          Rekomendasi Tournament
        </Typography>
        <CardTournaments data={tournamentInfinityData.current?.data || []} />
      </Box>
      {/* {<FinalResult data={exampleTournamentResults} />} */}
    </Container>
  );
}
