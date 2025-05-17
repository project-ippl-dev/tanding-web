"use client";

import CardTournaments from "@/app/(with-nav-layout)/tournament/[id]/_components/CardTournaments";
import { EventInfinityData } from "@/types/event.type";
import { Box, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HomeTournamentsListSection({
  data,
  dataLoading,
}: {
  data: EventInfinityData[] | undefined;
  dataLoading: boolean;
}) {
  const router = useRouter();

  return (
    <Box
      component="div"
      sx={(theme) => ({
        marginTop: theme.spacing(5),
        padding: theme.spacing(0, 5),
        [theme.breakpoints.down("md")]: {
          padding: theme.spacing(0, 2),
        },
      })}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
        marginBottom={1.5}
      >
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
          noWrap
        >
          Daftar TournamentList!
        </Typography>
        <Typography
          sx={(theme) => ({
            background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "15px",
            cursor: "pointer",
            marginRight: theme.spacing(2.4),
          })}
          noWrap
          onClick={() => router.push("/tournament")}
        >
          Lihat Semua
        </Typography>
      </Box>
      {data && data.length > 0 ? (
        <CardTournaments data={data} />
      ) : dataLoading ? (
        <Skeleton sx={{ width: "100%", height: "100px" }} />
      ) : null}
    </Box>
  );
}
