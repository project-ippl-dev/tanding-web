/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Tabs } from "@mui/material";

import { EventInfinityData } from "@/types/event.type";
import CardTournamentItem from "./parts/CardTournamentItem/CardTournamentItem";

const CardTournaments = ({ data }: {data:Array<EventInfinityData>}) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        style={{ width: "100%", paddingBottom: "5px" }}
      >
        {data.map((value, index) => (
          <CardTournamentItem 
          data-testid="card-tournament-item"
          key={index} 
          data={value} />
        ))}
      </Tabs>
    </>
  );
};

export default CardTournaments;
