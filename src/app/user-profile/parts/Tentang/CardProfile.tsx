"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";


function customStyles(theme: Theme) {
  const result = {
    card: {
      marginTop: theme.spacing(3),
      borderRadius: "10px",
    }
  }

  return result
};

const CardProfile = ({ title, content }) => {
  const theme = useTheme()
  const style = customStyles(theme);

  return (
    <Card style={style.card}>
      <CardHeader title={title} />
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default CardProfile;
