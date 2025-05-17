"use client";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Skeleton,
} from "@mui/material";
import StyledMenu from "./StyledMenu";
import { ArrowForwardIos } from "@mui/icons-material";
import { Sport } from "@/types/sport.type";
import { getSport } from "@/store/actions/sport";
import { useRouter } from "next/navigation";

// TODO: Caching option in fetchHandler

export default function KategoriMenuList({
  anchorEl,
  id,
  open,
  onClose,
}:
{
  anchorEl: null | HTMLElement;
  id: string;
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [sportState, setSportState] = useState<{
    open: boolean | null;
    type: string | null;
  }>({ open: false, type: null });
  const [sportLoading, setSportLoading] = useState<boolean>(true);
  const [sportData, setSportData] = useState<Sport[]>([]);

  useEffect(() => {
    async function fetchSport(type: string) {
      setSportLoading(true);
      const response = await getSport("", "", "", type);
      if ([200, 201].includes(response.status)) {
        setSportData(response.data);
      } else {
        alert("Gagal mengambil data olahraga, dengan error: " + response.error);
      }
      setSportLoading(false);
    }

    if (sportState.type) {
      fetchSport(sportState.type);
    }
  }, [sportState.type]);

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
                {sportLoading
                  ? Array(2)
                      .fill("a")
                      .map((value, index) => (
                        <ListItem key={index}>
                          <Skeleton
                            width={"100%"}
                            variant="text"
                            animation="wave"
                          />
                          ;
                        </ListItem>
                      ))
                  : sportData.map((value, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => {
                          onClose();
                          router.push(`/tournament?sport=${value.id}`);
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
