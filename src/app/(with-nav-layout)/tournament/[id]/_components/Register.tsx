/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { styled } from "@mui/system"; // Import styled from MUI
import BannerTournament from "./BannerTournament";
import InformationTournament from "./InformationTournament";
import { EventData } from "@/types/event.type";


// Styled component for the container
const StyledContainer = styled("div")(({ theme }) => ({
  padding: "0 10px",
  [theme.breakpoints.down("md")]: {
    padding: "0",
  },
}));

const Register = (
  { data, canRegister } : {
    data: EventData | null; // Replace with actual type
    canRegister: boolean;
  }
) => {
  return (
    <StyledContainer>
      <BannerTournament data={data} canRegister={canRegister} />
      <InformationTournament data={data} />
    </StyledContainer>
  );
};

export default Register;
