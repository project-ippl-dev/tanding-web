"use client";

import { Box } from "@mui/material";
import BannerEvent from "../banner/BannerEvent";
import HomeTopTandingListSection from "./parts/HomeTopTandingListSection";
import HomeTournamentsListSection from "./parts/HomeTournamentsListSection";
import { useEffect, useRef, useState } from "react";
import { getTournamentInfinity } from "@/store/actions/event";
import { EventInfinityResponse } from "@/types/event.type";
import { Sport } from "@/types/sport.type";
import { getSport } from "@/store/actions/sport";

export default function HomePageContents() {
  const [sportLoading, setSportLoading] = useState<boolean>(true);
  const [tournamentLoading, setTournamentLoading] = useState<boolean>(true);
  const [sportData, setSportData] = useState<Sport[]>([]);
  const tournamentInfinityData = useRef<EventInfinityResponse>(null);

  useEffect(() => {
    async function fetchTournamentInfinityData() {
      setTournamentLoading(true);

      const serverResponse = await getTournamentInfinity({
        limit: 10,
        type: "",
        sport_id: "",
        search: "",
        remark: "",
      });
      if (!serverResponse) {
        alert("Gagal mengambil data, dengan error: " + serverResponse.error);
      } else {
        if (serverResponse.error) {
          alert(
            "Gagal mengambil data, dengan error: " + serverResponse.error.header
          );
        } else {
          tournamentInfinityData.current = serverResponse;
        }
      }
      setTournamentLoading(false);
    }

    async function fetchSport() {
      setSportLoading(true);
      const response = await getSport();
      if ([200, 201].includes(response.status)) {
        setSportData(response.data);
      } else {
        alert("Gagal mengambil data olahraga, dengan error: " + response.error);
      }
      setSportLoading(false);
    }

    fetchSport();
    fetchTournamentInfinityData();
  }, []);
  return (
    <>
      <HomeTournamentsListSection
        data={tournamentInfinityData.current?.data}
        dataLoading={tournamentLoading}
      />
      <HomeTopTandingListSection data={sportData} dataLoading={sportLoading} />
      <div className="hidden sm:block">
        <Box
          sx={(theme) => ({
            marginTop: theme.spacing(5),
            padding: theme.spacing(0, 3),
          })}
        >
          <BannerEvent />
        </Box>
      </div>
      <Box height="50px" />
    </>
  );
}
