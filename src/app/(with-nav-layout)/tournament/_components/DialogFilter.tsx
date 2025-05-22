import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Slide,
  CardActions,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Corrected: Use default import
import { SportResponseMultiple } from "@/types/sport.type";

const Transition = React.forwardRef(function Transition(
  props: React.ComponentProps<typeof Slide>,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogFilter = ({
  open,
  handleClose,
  category,
  handleTypeChange,
  sportData,
  sportID,
  handleSportChange,
}:{
  sportData: SportResponseMultiple | null
  sportID: string
  category: string
  open: boolean
  handleClose: () => void
  handleTypeChange: (value: string) => void
  handleSportChange: (value: string) => void

}) => {
  return (
    <Dialog
      fullScreen
      open={open}
      scroll="body"
      onClose={handleClose}
      slots={{ transition: Transition }}
    >
      <AppBar
        sx={{
          position: "relative",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              ml: 2,
              flex: 1,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Filter
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Card>
        <CardContent>
          <Divider />
          <div>
            <Box marginY={2}>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Tipe Olahraga
              </Typography>
            </Box>
            <Box marginBottom={4}>
              <RadioGroup
                value={category}
                onChange={(_, value) => handleTypeChange(value)}
              >
                <FormControlLabel
                  value="sport"
                  control={<Radio color="primary" />}
                  label="Sport"
                />
                <FormControlLabel
                  value="e-sport"
                  control={<Radio color="primary" />}
                  label="E-Sport"
                />
              </RadioGroup>
            </Box>
          </div>
          <Divider />
          <div>
            <Box marginY={2}>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Olahraga
              </Typography>
            </Box>
            <div>
              <RadioGroup
                value={sportID}
                onChange={(_, value) => handleSportChange(value)}
              >
                {sportData?.data.map((value) => (
                  <FormControlLabel
                    key={value.id}
                    value={value.id}
                    control={<Radio color="primary" />}
                    label={value.name}
                  />
                ))}
              </RadioGroup>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default DialogFilter;
