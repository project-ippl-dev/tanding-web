import React from "react";
// Ganti import Material-UI ke versi @mui
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const CardSettingBracket = ({ random, lock, hasRandom }) => {
  return (
    <Card
      sx={{
        p: 2,
        px: 3,
        mb: 2,
      }}
    >
      <CardHeader
        title={
          <>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Setting Bagan Pertandingan
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#666666",
              }}
            >
              Bagan Pertandingan bisa di generate random atau custom
            </Typography>
          </>
        }
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <div>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={random}
              data-testid="random-bracket-button"
            >
              Random Bracket
            </Button>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              color="secondary"
              onClick={lock}
              disabled={!hasRandom}
              data-testid="lock-bracket-button"
            >
              Lock Bracket
            </Button>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardSettingBracket;
