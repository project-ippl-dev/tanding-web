"use client";
import PageTitleSection from "@/components/common/PageTitleSection";
import { CLUB_DUMMY, CLUB_INVITE_DUMMY } from "@/store/club";
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
import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function ClubPage() {
  const [page, setPage] = useState<number>(1);
  const [tabValue, setTabValue] = useState<number>(0);
  const handleTab = (e, newValue: number) => {
    setTabValue(newValue);
  };

  // TODO: Connect to BE
  // const handleApproveInvite = (approval_id, status) => {
  //   
  // };

  // useEffect(() => {
  //   getAllClub(page, page_size); //Need user context later
  // }, [getAllClub, page]);

  // useEffect(() => {
  //   getInviteRequest(); //Need user context later
  // }, [getInviteRequest]);

  const club = CLUB_DUMMY;
  const club_invite = CLUB_INVITE_DUMMY;

  return (
    <div>
      <PageTitleSection title="Bergabung dengan Club">
        Buat atau bergabung dengan club terbaik untukmu dan bermainlah bersama!
      </PageTitleSection>
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
                  {club.map((value, index) => (
                    <TableRow
                      key={value.id}
                      sx={{
                        cursor: "pointer",
                      }}
                      // TODO: Connect to club detail
                      // onClick={() => router.push(`/club/${value.id}`)}
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
                  {club.length === 0 && (
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
              // count={club.all.last_page}
              count={10}
              color="primary"
              onChange={(e, newValue) => setPage(newValue)}
            />
          </Box>
        </Card>
      </Container>
    </div>
  );
}
