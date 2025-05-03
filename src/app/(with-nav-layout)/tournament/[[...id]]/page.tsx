"use client"

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth.context";
import { Backdrop, Box, CircularProgress, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HeaderTournament from "./_components/HeaderTournament";
import { EventInfinityResponse } from "@/types/event.type";
import { LoadingProvider } from "@/context/loading.context";
import CardTournaments from "./_components/CardTournaments";
import { fetchProxyApi } from "@/utils/request";
import { useParams } from "next/navigation";

// TODO: mengatasi rerendering yang sering, gunakan useMemo

export default function TournamentDetailPage() {
    const [eventID, changeID] = useState<string | undefined>(undefined);
    const authData = useAuth();
    const tournamentInfinityData = useRef<EventInfinityResponse>(null);
    const theme = useTheme();
    const [loading, setLoading] = useState<boolean>(false);
    const params = useParams();

    useEffect(() => {
        async function fetchTournamentInfinityData() {
            setLoading(true);
            const token = authData.data.token.access_token; // Replace with actual token retrieval logic
            const url = `/api/event/infinity?limit=10&type=all&sport_id=1&search=&remark=ongoing`;
            const serverResponse = await fetchProxyApi(url, token);

            setLoading(false);
            if (!serverResponse.success) {
                alert("Gagal mengambil data, dengan error: " + serverResponse.error);
            } else {
                tournamentInfinityData.current = serverResponse.data;
            }
        }

        fetchTournamentInfinityData();
    }, [authData?.data?.token?.access_token]);

    useEffect(() => {
        if (params?.id) {
            changeID(params.id[0]);
        }
    }, [params]);

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
                {loadingElement}
            </Container>
        </LoadingProvider>
    );
}