import React from "react";
import {
  Card,
  Grid,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import Image, { StaticImageData } from "next/image";

import BorderGold from "@/assets/images/border-gold.webp";
import BorderSilver from "@/assets/images/border-silver.webp";
import BorderBronze from "@/assets/images/border-bronze.webp";
import TournamentResultArray from "@/types/tournament.type";

interface WinnerCardProps {
  rank: number;
  borderSrc: StaticImageData;
  clubLogo: string;
  clubName: string;
  participants: string[];
  barColor: string;
}

const WinnerCard: React.FC<WinnerCardProps> = ({
  rank,
  borderSrc,
  clubLogo,
  clubName,
  participants,
  barColor,
}) => (
  <Grid
    size ={{
    md:4,
    xs:12
    }}
    sx={{
      marginTop: { md: 0, xs: 1 },
      order: rank === 1 ? { md: 0, xs: -1 } : undefined,
    }}
  >
    <Box marginX={1} sx={{ backgroundColor: "#3F4654" }}>
      <div
        style={{
          height: "5px",
          width: "100%",
          backgroundColor: barColor,
        }}
      />
      <Box paddingY={1} paddingX={5}>
        <div
          style={{
            position: "relative",
            minHeight: "100px",
          }}
        >
          <Image
            src={borderSrc}
            alt={`Border for Winner ${rank}`}
            style={{
              width: "auto",
              height: "90px",
              position: "absolute",
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
              zIndex: 10,
            }}
          />
          <Avatar
            src={clubLogo}
            sx={{
              width: "50px",
              height: "50px",
              position: "absolute",
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
            }}
          />
        </div>
        <div>
          <Typography
            sx={{
              textAlign: "center",
              color: "#fff",
            }}
          >
            Winner {rank}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "#fff",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            {clubName}
          </Typography>
        </div>
        <div>
          {participants.map((value, index) => (
            <Box
              key={index}
              sx={{
                padding: 1,
                backgroundColor: "#5b6475",
                color: "#fff",
              }}
            >
              <Typography align="center">{value}</Typography>
            </Box>
          ))}
        </div>
      </Box>
    </Box>
  </Grid>
);

export default function FinalResult({ data }:{data:TournamentResultArray[] | [] }){
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardHeader
        title={
          <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
            Final Result
          </Typography>
        }
      />
      <CardContent>
        <Grid container>
          {!!data[0] && (
            <WinnerCard
              rank={1}
              borderSrc={BorderGold}
              clubLogo={data[0].club_logo}
              clubName={data[0].club_name}
              participants={data[0].participants}
              barColor="#EFDA62"
            />
          )}
          {!!data[1] && (
            <WinnerCard
              rank={2}
              borderSrc={BorderSilver}
              clubLogo={data[1].club_logo}
              clubName={data[1].club_name}
              participants={data[1].participants}
              barColor="#BBCADC"
            />
          )}
          {!!data[2] && (
            <WinnerCard
              rank={3}
              borderSrc={BorderBronze}
              clubLogo={data[2].club_logo}
              clubName={data[2].club_name}
              participants={data[2].participants}
              barColor="#D6914F"
            />
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

