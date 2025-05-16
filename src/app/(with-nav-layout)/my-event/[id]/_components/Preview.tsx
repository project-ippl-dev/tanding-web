import React from "react";
import { EventSingleResponse } from "@/types/event.type";
import { styled } from "@mui/material/styles";
import ContentBannerTournament from "./ContentBannerTournament";
import InformationTournament from "./parts/Preview/InformationTournament";

const StyledBox = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 10),
  [theme.breakpoints.down("md")]: {
    padding: 0,
  },
}));

const Preview = ({ data }: { data: EventSingleResponse | null }) => {
  return (
    <StyledBox>
      <ContentBannerTournament data={data?.data || null} />
      <InformationTournament data={data?.data || null} />
    </StyledBox>
  );
};

export default Preview;
