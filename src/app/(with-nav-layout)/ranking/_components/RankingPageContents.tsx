"use client";
import {
  Box,
  Card,
  FormControlLabel,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import Big3Section from "./Big3Section";
import { useEffect, useRef, useState } from "react";
import RankingTable from "./RankingTable";
import { getSport } from "@/store/actions/sport";
import { Sport } from "@/types/sport.type";
import { getPowerListClub, getPowerListUser } from "@/store/actions/ranking";
import { RankingClubData, RankingUserData } from "@/types/ranking.types";
import { useNotification } from "@/context/notification.context";

export default function RankingPageContents() {
  const notification = useNotification();
  const [typeRank, setTypeRank] = useState<string>("user");
  const [sport, setSport] = useState<Sport[]>([]);
  const [chosenSport, setChosenSport] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [sportLoading, setSportLoading] = useState<boolean>(true);
  const rankingList = useRef<RankingClubData[] | RankingUserData[]>([]);
  const [rankLoading, setRankLoading] = useState<boolean>(true);
  const [lastPage, setLastPage] = useState<number>(1);

  useEffect(() => {
    async function fetchSport() {
      setSportLoading(true);
      const response = await getSport();
      if ([200, 201].includes(response.status)) {
        setSport(response.data);
      } else {
        console.error(
          "Gagal mengambil data olahraga, dengan error: " + response.error
        );
        notification.showNotification("Gagal memuat daftar olahraga", "error");
      }
      setSportLoading(false);
    }

    fetchSport();
  }, [notification]);

  const PAGE_SIZE = 25;

  useEffect(() => {
    const query = {
      id: chosenSport,
      page: page,
      page_size: PAGE_SIZE,
    };
    async function fetchRank() {
      setRankLoading(true);
      let result = undefined;
      if (typeRank === "user") {
        result = await getPowerListUser(query);
      }
      if (typeRank === "club") {
        result = await getPowerListClub(query);
      }

      

      if (
        !result ||
        !result.status ||
        !result.data ||
        result.last_page === undefined
      ) {
        throw new Error("Gagal mengambil daftar ranking.");
      }
      if (result.error) {
        throw new Error(result.error);
      }

      if ([200, 201].includes(result.status)) {
        // setRangkingList(result.data);
        rankingList.current = result.data;
        setLastPage(result.last_page);
      } else {
        console.error(
          "Gagal mengambil data ranking, dengan error: " + result.error
        );
        notification.showNotification("Gagal memuat data ranking", "error");
      }
      setRankLoading(false);
      setSportLoading(false);
    }
    fetchRank();
  }, [chosenSport, page, typeRank, notification]);

  return (
    <div>
      <Grid container>
        <Grid
          size={{
            md: 3,
            xs: 12,
          }}
          sx={(theme) => ({
            padding: theme.spacing(0, 1),
          })}
        >
          <div>
            <Card
              variant="outlined"
              sx={(theme) => ({
                padding: theme.spacing(1, 2),
                marginTop: theme.spacing(10),
                [theme.breakpoints.down("md")]: {
                  marginTop: theme.spacing(2),
                },
              })}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                Ranking
              </Typography>
              <RadioGroup
                value={typeRank}
                onChange={(e, newValue) => setTypeRank(newValue)}
              >
                <FormControlLabel
                  value="user"
                  control={
                    <Radio
                      data-testid="user-ranking-radio"
                      color="primary"
                      sx={{
                        padding: "5px",
                      }}
                    />
                  }
                  label={<Typography>Atlet</Typography>}
                />
                <FormControlLabel
                  value="club"
                  control={
                    <Radio
                      data-testid="club-ranking-radio"
                      color="primary"
                      sx={{
                        padding: "5px",
                      }}
                    />
                  }
                  label={<Typography>Club</Typography>}
                />
              </RadioGroup>
            </Card>
          </div>
          <Box marginTop={3}>
            <Card
              variant="outlined"
              sx={(theme) => ({
                padding: theme.spacing(1, 2),
              })}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                Olahraga
              </Typography>
              <RadioGroup
                value={chosenSport}
                onChange={(_, newValue) => setChosenSport(newValue)}
              >
                {sportLoading ? (
                  <Skeleton sx={{ width: "100%", height: "500px" }} />
                ) : sport && sport.length > 0 ? (
                  sport.map((value) => (
                    <FormControlLabel
                      key={value.id}
                      value={value.id}
                      control={
                        <Radio
                          color="primary"
                          sx={{
                            padding: "5px",
                          }}
                        />
                      }
                      label={<Typography>{value.name}</Typography>}
                    />
                  ))
                ) : (
                  <Typography>Oops! Tidak ada data.</Typography>
                )}
              </RadioGroup>
            </Card>
          </Box>
        </Grid>
        <Grid
          size={{
            md: 9,
            xs: 12,
          }}
          sx={(theme) => ({
            padding: theme.spacing(0, 1),
          })}
        >
          <Box marginTop={3}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Tanding! Ranking
            </Typography>
          </Box>
          {rankLoading ? (
            <Skeleton sx={{ width: "100%", height: "500px" }} />
          ) : rankingList.current && rankingList.current.length > 0 ? (
            <>
              <div className="hidden sm:block">
                <Box>
                  <Big3Section data={rankingList.current} />
                </Box>
              </div>
              <Box marginTop={3} paddingX={1}>
                <RankingTable
                  data={rankingList.current}
                  page={page}
                  pageSize={PAGE_SIZE}
                  setPage={setPage}
                  lastPage={lastPage}
                />
              </Box>
            </>
          ) : (
            <Typography>
              Oops! Tidak ada data ranking yang tercatat untuk kategori ini.
            </Typography>
          )}
        </Grid>
      </Grid>
      <Box height="100px" />
    </div>
  );
}
