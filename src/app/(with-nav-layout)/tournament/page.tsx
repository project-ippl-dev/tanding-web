"use client"

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  Radio,
  FormControlLabel,
  RadioGroup,
  Skeleton, // Import Skeleton if needed for other parts, though our new component encapsulates its usage
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FilterListIcon from "@mui/icons-material/FilterList";
import { SportResponseMultiple } from "@/types/sport.type";
import { getSport } from "@/store/actions/sport";
import { getTournamentInfinity } from "@/store/actions/event";
import { EventInfinityResponse } from "@/types/event.type";
import SecondTournamentItem from "@/components/SecondTournamentItem";
import DialogFilter from "./_components/DialogFilter";
import SecondTournamentItemSkeleton from "./_components/SecondTournamentItemSkeleton"; // Import the skeleton component
import { useRouter, useSearchParams } from "next/navigation";

async function reqSport(
  setData: (data: SportResponseMultiple) => void,
  keyword: string = '',
  category: string = ''
) {
  const response = await getSport("", "", keyword, category);
  if ([200,201].includes(response.status)) {
    setData(response);
  } else {
    alert("Gagal mengambil data olahraga, dengan error: " + response.error);
  }
}

async function reqTournamentInfinity(
  limit: number = 100,
  type: string = "",
  sport_id: string = "",
  search: string = "",
  remark: string = "",
  setData: (data: EventInfinityResponse) => void
) {
  const response = await getTournamentInfinity({
    limit: limit,
    type: type,
    sport_id: sport_id,
    search: search,
    remark: remark,
  });
  if ([200, 201].includes(response.status)) {
    setData(response);
  } else {
    alert("Gagal mengambil data turnamen, dengan error: " + response.error);
  }
}

const Tournament = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const [sportData, setSportData] = useState<SportResponseMultiple | null>(null);
  const alreadyFetch = useRef(false);

  const [tournamentInfinity, setTournamentInfinity] = useState<EventInfinityResponse | null>(null);

  const [dialogFilter, setDialogFilter] = useState(false);
  const [sportID, setSportID] = useState("");
  const [category, setCategory] = useState("");
  const [hideFilter, setHideFilter] = useState(false);

  const handleTypeChange = (value: string) => {
    const sportParam = searchParams.get("sport");
    const keywordParam = searchParams.get("keyword");
    const url = `/tournament?type=${value}&sport=${sportParam || ""}&keyword=${keywordParam || ""}`
    router.push(url);
  };

  const handleSportChange = (value: string) => {
    const keywordParam = searchParams.get("keyword");
    const url = `/tournament?type=${category || ""}&sport=${value}&keyword=${keywordParam || ""}`
    router.push(url);
  };
  const handleHideFilter = () => {
    setHideFilter((prev) => !prev);
  };

  useEffect(() => {
    const sportParam = searchParams.get("sport");
    const typeParam = searchParams.get("type");
    const keywordParam = searchParams.get("keyword");

    if (!!sportParam) {
      setSportID(sportParam);
    } else {
      setSportID("");
    }
    if (!!typeParam) {
      setCategory(typeParam as string);
    } else {
      setCategory("");
    }
    // Set tournamentInfinity to null before fetching to show skeleton
    setTournamentInfinity(null); 
    reqTournamentInfinity(
      100,
      typeParam || "",
      sportParam || "",
      keywordParam || "",
      "",
      (data) => {
        setTournamentInfinity(data);
      }
    );
  }, [searchParams]); // Add searchParams to dependency array to refetch when URL query changes

  useEffect(() => {
    if(!alreadyFetch.current) {
      alreadyFetch.current = true;
      reqSport(
        (data) => {
          setSportData(data);
        },
        "",
        ""
      );
    }
  }, []);

  return (
    <Box
      sx={{
        marginTop: { xs: 0, md: 10 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          paddingLeft: { xs: 2, md: 4 },
          paddingRight: { xs: 2, md: 4 },
        }}
      >
        {/* {keyword !== "" && (
          <Box marginTop={4}>
            <Typography className={classes.textResultSearch}>
              {`${tournament.infinity.total_item} hasil pencarian "${keyword}"`}
            </Typography>
          </Box>
        )} */}
        <Box marginTop={3}>
          <Box marginBottom={2}>
            {/* Gantikan Hidden mdDown */}
            {isMdUp && (
              <Button
                startIcon={<FilterListIcon />}
                sx={{ borderRadius: 0 }}
                variant="outlined"
                onClick={handleHideFilter}
              >
                Filter
              </Button>
            )}
            {/* Gantikan Hidden mdUp */}
            {isMdDown && (
              <Button
                startIcon={<FilterListIcon />}
                sx={{ borderRadius: 0 }}
                variant="outlined"
                onClick={() => setDialogFilter(true)}
              >
                Filter
              </Button>
            )}
          </Box>
          <Grid container >
            {/* Gantikan Hidden mdDown */}
            {!hideFilter && isMdUp && (
              <Grid
                size={3}
                sx={{ padding: (theme) => theme.spacing(0, 2) }}
              >
                <Divider />
                <div>
                  <Box marginY={2}>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 600,
                      }}
                    >
                      Tipe Olahraga
                    </Typography>
                  </Box>
                  <Box marginBottom={4}>
                    <RadioGroup
                      value={category}
                      onChange={(_, value) => handleTypeChange(value)}
                    >
                      <FormControlLabel
                        value="sport"
                        checked={searchParams.get("type") === "sport"}
                        control={<Radio color="primary" />}
                        label="Sport"
                      />
                      <FormControlLabel
                        value="e-sport"
                        checked={searchParams.get("type") === "e-sport"}
                        control={<Radio color="primary" />}
                        label="E-Sport"
                      />
                    </RadioGroup>
                  </Box>
                </div>
                <Divider />
                <div>
                  <Box marginY={2}>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 600,
                      }}
                    >
                      Olahraga
                    </Typography>
                  </Box>
                  <div>
                    {sportData === null ? (
                      <>
                        <Skeleton variant="text" width="80%" sx={{ mb: 1 }} />
                        <Skeleton variant="text" width="70%" sx={{ mb: 1 }} />
                        <Skeleton variant="text" width="90%" />
                      </>
                    ) : (
                      <RadioGroup
                        value={sportID}
                        onChange={(_, value) => handleSportChange(value)}
                      >
                        {sportData?.data.map((value) => (
                          <FormControlLabel
                            key={value.id}
                            value={value.id}
                            checked={searchParams.get("sport") === value.id}
                            control={<Radio color="primary" />}
                            label={value.name}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  </div>
                </div>
              </Grid>
            )}
            <Grid
              // size={hideFilter ? 12 : 9}
              size={isMdUp ? 9 : 12}
              sx={{
                padding: (theme) => theme.spacing(0, 2),
                minHeight: "700px",
              }}
            >
              {tournamentInfinity === null ? (
                <>
                  {[...Array(3)].map((_, index) => (
                    <SecondTournamentItemSkeleton key={index} />
                  ))}
                </>
              ) : tournamentInfinity.data.length === 0 ? (
                <Box marginY={5}>
                  <Typography align="center">Data tidak ditemukan</Typography>
                </Box>
              ) : (
                tournamentInfinity.data.map((value) => (
                  <SecondTournamentItem key={value.id} data={value} />
                ))
              )}
            </Grid>
          </Grid>
          <Box height="100px" />
        </Box>
      </Container>

      <DialogFilter
        open={dialogFilter}
        handleClose={() => setDialogFilter(false)}
        sportData={sportData}
        sportID={sportID}
        category={category}
        handleTypeChange={handleTypeChange}
        handleSportChange={handleSportChange}
      />
    </Box>
  );
};

export default Tournament;

// const mapStateToProps = (state) => ({
//   tournament: state.tournament,
//   sport: state.sport,
// });

// export default connect(mapStateToProps, { getTournamentInfinity, getSport })(
//   Tournament
// );
