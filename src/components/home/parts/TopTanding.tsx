"use client";

import { Sport } from "@/types/sport.type";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TopTanding({ data }: { data: Sport[] }) {
  const router = useRouter();
  return (
    <Box sx={{ display: "flex", overflowX: "auto", gap: 2, p: 2 }}>
      {data.map((value) => (
        <Box
          component={"div"}
          key={value.id}
          sx={(theme) => ({
            margin: theme.spacing(0, 1.5),
            cursor: "pointer",
            width: "180px",
          })}
          onClick={() => router.push(`/tournament?sport=${value.id}`)}
        >
          <Card
            sx={{
              width: "180px",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
            }}
          >
            <Image
              className="object-cover w-full h-auto aspect-video block"
              alt="image"
              src={value.thumbnail}
            />
          </Card>
          <Box width="100%">
            <Typography
              sx={(theme) => ({
                fontSize: "16px",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: theme.spacing(0.5),
              })}
              noWrap
            >
              {value.name}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
