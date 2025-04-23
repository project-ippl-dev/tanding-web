"use client";
import { CLUB_ALL_DATA, CLUB_INVITE_DUMMY } from "@/store/club";
import { Cancel, CheckCircle } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Container,
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
import { SyntheticEvent, useState } from "react";
import TabPanel from "./_components/TabPanel";
import { useRouter } from "next/navigation";

export default function ClubPage() {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [tabValue, setTabValue] = useState<number>(0);
  const handleTab = (e: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // TODO: Connect to BE
  // const handleApproveInvite = (approval_id, status) => {
  //
  // };

  // useEffect(() => {
  //   getAllClub(page, page_size); //Need the actual fetching logic
  // }, [getAllClub, page]);

  // useEffect(() => {
  //   getInviteRequest(); //Need the actual fetching logic
  // }, [getInviteRequest]);

  const club = CLUB_ALL_DATA;
  const club_invite = CLUB_INVITE_DUMMY;

  return (
    <Container
      maxWidth="lg"
      sx={(theme) => ({
        paddingTop: "50px",
        paddingBottom: "50px",
        [theme.breakpoints.down("md")]: {
          paddingTop: theme.spacing(10),
        },
      })}
    >
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
                {club.data?.map((value, index) => (
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
                {club.data?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Tidak ada data club
                    </TableCell>
                  </TableRow>
                )}
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
              {club_invite.map((value, index) => (
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
                      // onClick={() => handleApproveInvite(value.id, true)}
                    >
                      <CheckCircle />
                    </IconButton>
                    <IconButton
                      sx={{
                        "&:hover": {
                          color: "red",
                        },
                      }}
                      // onClick={() => handleApproveInvite(value.id, false)}
                    >
                      <Cancel />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {club_invite.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Tidak ada undangan club
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabPanel>
        <Box marginBottom={2}>
          <Pagination
            page={page}
            count={club.last_page}
            color="primary"
            onChange={(e, newValue) => setPage(newValue)}
          />
        </Box>
      </Card>
    </Container>
  );
}
