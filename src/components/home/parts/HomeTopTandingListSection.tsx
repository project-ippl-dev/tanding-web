"use client";

import { Sport } from "@/types/sport.type";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import TopTanding from "./TopTanding";

export default function HomeTopTandingListSection({
  data,
  dataLoading,
}: {
  data: Sport[];
  dataLoading: boolean;
}) {
  return (
    <Box
      component={"div"}
      sx={(theme) => ({
        marginTop: theme.spacing(5),
        padding: theme.spacing(0, 5),
        [theme.breakpoints.down("md")]: {
          padding: theme.spacing(0, 2),
        },
      })}
    >
      <Box marginBottom={1.5}>
        <Typography
          sx={(theme) => ({
            fontSize: "24px",
            fontWeight: "bold",
            marginLeft: theme.spacing(2.4),
            [theme.breakpoints.down("md")]: {
              fontSize: "18px",
              marginLeft: theme.spacing(1),
            },
          })}
        >
          Top Tanding!
        </Typography>
      </Box>
      <Container maxWidth="lg">
        {data && data.length > 0 ? (
          <TopTanding data={data} />
        ) : dataLoading ? (
          <Skeleton sx={{ width: "100%", height: "100px" }} />
        ) : null}
      </Container>
    </Box>
  );
}
