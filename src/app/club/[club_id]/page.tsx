"use client";
import { CLUB_JOIN_DATA, CLUB_MEMBER_DATA, CLUB_ONE_DATA } from "@/store/club";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { notFound } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import TabPanel from "../_components/TabPanel";
import { Cancel, CheckCircle } from "@mui/icons-material";
import SearchUser from "../_components/SearchUser";
import DialogJoinClub from "../_components/DialogJoinClub";

export default function ClubDetailPage() {
  // const params = useParams<{ club_id: string }>();
  // TODO: Connect to BE
  const club = CLUB_ONE_DATA;
  const club_member = CLUB_MEMBER_DATA;
  const club_join = CLUB_JOIN_DATA;

  const [tabValue, setTabValue] = useState<number>(0);
  const [dialogJoin, setDialogJoin] = useState<boolean>(false);

  const handleTab = (e: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!club) {
    notFound();
  }

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
      <Grid container>
        <Grid size={{ xs: 12, md: 3 }}>
          <Box padding={1}>
            <Card
              sx={(theme) => ({
                padding: theme.spacing(2, 3),
                marginTop: theme.spacing(2),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              })}
            >
              {club ? (
                <>
                  <Avatar
                    src={club?.data.logo}
                    sx={{
                      width: "130px",
                      height: "130px",
                    }}
                  />
                  <Box marginTop={2}>
                    <Typography variant="h6" align="center">
                      {club?.data.short_name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: 700,
                        textAlign: "center",
                      }}
                    >
                      {club?.data.name}
                    </Typography>
                  </Box>
                  {!club?.data.joined && (
                    <Box marginTop={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setDialogJoin(true)}
                        sx={{
                          background:
                            "linear-gradient(90deg, #CB4492 0%, #384FB9 100%);",
                          textTransform: "none",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        Join Club
                      </Button>
                    </Box>
                  )}
                </>
              ) : null}
            </Card>
          </Box>
        </Grid>

        {/* GRID RIGHT */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Box padding={1}>
            <Card
              sx={(theme) => ({
                padding: theme.spacing(2, 3),
                marginTop: theme.spacing(2),
              })}
            >
              <Tabs value={tabValue} onChange={handleTab}>
                <Tab label="Member" />
                {club?.data.privilege ? <Tab label="Join Request" /> : null}
              </Tabs>
              <TabPanel value={tabValue} index={0}>
                {club.data?.privilege ? <SearchUser club={club.data} /> : null}
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>NO</TableCell>
                      <TableCell>Member</TableCell>
                      <TableCell>Tanding Points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {club_member.data?.participants.map((value, index) => (
                      <TableRow key={value.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{value.name}</TableCell>
                        <TableCell>{value.point}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {club_join.data?.map((value, index) => (
                      <TableRow key={value.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{value.name}</TableCell>
                        <TableCell>
                          <IconButton
                          // TODO: Connect to BE
                          // onClick={() => handleJoinApprove(value.id, true)}
                          >
                            <CheckCircle style={{ color: "green" }} />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                          // TODO: Connect to BE
                          // onClick={() => handleJoinApprove(value.id, false)}
                          >
                            <Cancel style={{ color: "red" }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {club_join.data?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          Tidak ada request join
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </TabPanel>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Dialog JOIN */}
      <DialogJoinClub
        open={dialogJoin}
        onClose={() => setDialogJoin(false)}
        data={club.data}
      />
    </Container>
  );
}
