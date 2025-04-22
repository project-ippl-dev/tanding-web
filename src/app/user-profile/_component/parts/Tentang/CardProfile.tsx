"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";

function customStyles(theme: Theme | null) {
  const result = {
    card: {
      marginTop: theme ? theme.spacing(3) : undefined,
      borderRadius: "10px",
    },
  };

  return result;
}

const CardProfile = ({ title, content }) => {
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  const parameter = isClient ? theme : null;
  const style = customStyles(parameter);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Card style={style.card}>
      <CardHeader title={title} />
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default CardProfile;
