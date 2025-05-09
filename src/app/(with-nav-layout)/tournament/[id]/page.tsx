"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth.context";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HeaderTournament from "./_components/HeaderTournament";
import { EventInfinityResponse } from "@/types/event.type";
import { LoadingProvider } from "@/context/loading.context";
import CardTournaments from "./_components/CardTournaments";
import { fetchProxyApi } from "@/utils/request";
import { useParams } from "next/navigation";
import { getTournamentInfinity } from "@/store/actions/event";

// TODO: mengatasi rerendering yang sering, gunakan useMemo

export default function TournamentDetailPage() {
  const params = useParams();
  const { authData } = useAuth();
  const tournamentInfinityData = useRef<EventInfinityResponse>(null);
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTournamentInfinityData() {
      setLoading(true);
      // const token = authData?.token.access_token; // Replace with actual token retrieval logic
    //   const url = `/api/event/infinity?limit=10&type=all&sport_id=1&search=&remark=ongoing`;
      // const serverResponse = await fetchProxyApi(url, token);
      const serverResponse = await getTournamentInfinity({
        limit: 10,
        type: "all",
        sport_id: "1",
        search: '',
        remark: "ongoing",
      });
      if (!serverResponse) {
        // if (!serverResponse.success) {
        alert("Gagal mengambil data, dengan error: " + serverResponse.error);
      } else {
        if (serverResponse.error) {
          // if(serverResponse.data.error) {
          alert(
            "Gagal mengambil data, dengan error: " +
              serverResponse.error.header
            //   serverResponse.data.error.header
          );
          /*
                        if(process.env.NODE_ENV === "development") {
                            tournamentInfinityData.current = EVENT_INFINITY;
                            changeID(EVENT_INFINITY.data[0].id)
                        }
                    */
        } else {
          // tournamentInfinityData.current = serverResponse.data;
          tournamentInfinityData.current = serverResponse;
        }
      }
      setLoading(false);
    }

    fetchTournamentInfinityData();
  }, [authData?.token?.access_token]);

  const loadingElement = (
    <Backdrop
      open={loading}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1000,
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Transparent background
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return (
    <LoadingProvider initialValue={loading} changeState={setLoading}>
      <Container
        maxWidth="xl"
        sx={{
          padding: theme.spacing(0),
        }}
      >
        <HeaderTournament eventID={params.id} />
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
        {loadingElement}
      </Container>
    </LoadingProvider>
  );
}
