"use client";
import { Container } from "@mui/material";
import ClubDetailPageContents from "./_components/ClubDetailPageContents";

export default function ClubDetailPage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingBottom: "50px",
        paddingTop: {
          md: "50px",
          xs: "40px",
        },
      }}
    >
      <ClubDetailPageContents />
    </Container>
  );
}
