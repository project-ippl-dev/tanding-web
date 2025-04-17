"use client";
// import { useRouter } from "next/router";
import { useState } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import StyledMenu from "./StyledMenu";
import { ArrowForwardIos } from "@mui/icons-material";

// TODO: DUMMY DATA
const SPORTS_DUMMY = [
  {
    id: 1,
    name: "Sport",
  },
  {
    id: 2,
    name: "E-Sport",
  },
];

export default function KategoriMenuList({
  anchorEl,
  id,
  open,
  onClose,
}: // TODO: Connect to actual logout and profile
// onLogout,
// profile,
{
  anchorEl: null | HTMLElement;
  id: string;
  open: boolean;
  onClose: () => void;
}) {
  // const router = useRouter();
  const [sportState, setSportState] = useState<{
    open: boolean | null;
    type: string | null;
  }>({ open: false, type: null });

  return (
    <StyledMenu
      anchorEl={anchorEl}
      id={id}
      keepMounted
      open={open}
      onClose={onClose}
      slotProps={{
        list: {
          onMouseLeave: () => {
            onClose();
            setSportState({ open: false, type: null });
          },
        },
      }}
      // onClick={handleClick}
    >
      <Box
        sx={{
          width: "100vw",
          py: 1,
          px: 2,
        }}
      >
        <Grid container>
          <Grid
            size={{
              xs: 3,
            }}
          >
            <List
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  style={{ fontWeight: "bold" }}
                >
                  Tipe Olahraga
                </ListSubheader>
              }
            >
              <ListItem
                onMouseEnter={() => {
                  setSportState({ open: true, type: "sport" });
                  // TODO: Fetch sport data
                }}
              >
                <ListItemText primary="Sport" />
                {sportState.open && sportState.type === "sport" ? (
                  <ArrowForwardIos />
                ) : null}
              </ListItem>
              <ListItem
                onMouseEnter={() => {
                  setSportState({ open: true, type: "e-sport" });
                  // TODO: Fetch e-sport data
                }}
              >
                <ListItemText primary="E-Sport" />
                {sportState.open && sportState.type === "e-sport" ? (
                  <ArrowForwardIos />
                ) : null}
              </ListItem>
            </List>
          </Grid>
          <Grid size={{ xs: 3 }}>
            <Box visibility={sportState.open ? "visible" : "hidden"}>
              <List
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    style={{ fontWeight: "bold" }}
                  >
                    Olahraga
                  </ListSubheader>
                }
              >
                {SPORTS_DUMMY.map((value, index) => (
                  <ListItem
                    key={index}
                    onClick={() => {
                      onClose();
                      // TODO: Redirect to sport page
                    }}
                  >
                    <ListItemText primary={value.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </StyledMenu>
  );
}
