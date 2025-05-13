"use client";
import {
  Avatar,
  Backdrop,
  Box,
  Card,
  CircularProgress,
  IconButton,
  Pagination,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import TabPanel from "./TabPanel";
import { approveInviteRequest, getAllClubs, getInviteRequest } from "@/store/actions/club";
import { ClubFetchAllData, ClubFetchInviteRequestData } from "@/types/club.type";

export default function ClubPageContents() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [tabValue, setTabValue] = useState<number>(0);
  const [club, setClub] = useState<ClubFetchAllData[]>([]);
  // const club = CLUB_ALL_DATA;
  const [clubInvite, setClubInvite] = useState<ClubFetchInviteRequestData[]>([])
  // const club_invite = CLUB_INVITE_DUMMY;

  const handleTab = (e: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const fetchInviteRequests = async () => {
      try {
        setLoading(true)
        const response = await getInviteRequest();
        if (!response || !response.data) {
          throw new Error("No club invite data found");
        }
        setClubInvite(response.data);
      } catch (error) {
        console.error("Error fetching invite data:", error);
      } finally {
        setLoading(false);
      }
    }

  const handleApproveInvite = async (approval_id: number, status: boolean) => {
    try {
      setLoading(true);
      await approveInviteRequest(approval_id, status);
    } catch (error) {
      console.error("Error approving invite:", error);
    } finally {
      await fetchInviteRequests();
      setLoading(false)
    }
  };

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        const response = await getAllClubs({
          page,
          page_size: 25,
          sport_id: "07302ca3-0350-46ad-861e-f9bcb99668df", //TODO: Add actual data (this is mock)
        });
        if (!response || !response.data || !response.last_page) {
          throw new Error("No club data found");
        }
        setClub(response.data);
        setLastPage(response.last_page);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [page]);

  useEffect(() => {
    fetchInviteRequests();
  }, []);

  return (
    <>
      <Card>
        <Tabs value={tabValue} onChange={handleTab}>
          <Tab label="Club" />
          <Tab label="Invitation" />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Club</TableCell>
                  <TableCell>Leaders</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {club.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Tidak ada data club
                    </TableCell>
                  </TableRow>
                ): club.map((value, index) => (
                  <TableRow
                    key={value.id}
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => router.push(`/club/${value.id}`)}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          src={value.logo}
                          sx={{
                            marginRight: "10px",
                          }}
                        />
                        <Typography>{value.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{value.owner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Club</TableCell>
                <TableCell>Olahraga</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clubInvite.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Tidak ada undangan club
                  </TableCell>
                </TableRow>
              ): clubInvite.map((value, index) => (
                <TableRow key={value.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.sport_name}</TableCell>
                  <TableCell>
                    <IconButton
                      sx={{
                        "&:hover": {
                          color: "green",
                        },
                      }}
                      onClick={() => handleApproveInvite(value.id, true)}
                    >
                      <CheckCircle />
                    </IconButton>
                    <IconButton
                      sx={{
                        "&:hover": {
                          color: "red",
                        },
                      }}
                      onClick={() => handleApproveInvite(value.id, false)}
                    >
                      <Cancel />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabPanel>
        <Box marginBottom={2}>
          <Pagination
            page={page}
            count={lastPage}
            color="primary"
            onChange={(_, newValue) => setPage(newValue)}
          />
        </Box>
      </Card>
      <Backdrop
        open={loading}
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
          color: "#fff",
        })}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
