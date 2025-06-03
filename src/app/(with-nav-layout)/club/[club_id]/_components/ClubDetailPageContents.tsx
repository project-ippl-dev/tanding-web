"use client";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  Skeleton,
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
import { useParams, useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import TabPanel from "../../_components/TabPanel";
import {
  approveJoinRequest,
  getJoinRequest,
  getMembersOfClub,
  getOneClub,
} from "@/store/actions/club";
import {
  ClubFetchJoinRequestData,
  ClubFetchMemberData,
  ClubFetchOneData,
} from "@/types/club.type";
import DialogJoinClub from "./DialogJoinClub";
import SearchUser from "../../_components/SearchUser";
import { useNotification } from "@/context/notification.context";

export default function ClubDetailPageContents() {
  const router = useRouter();
  const { club_id } = useParams<{ club_id: string }>();
  const notification = useNotification();
  const [loading, setLoading] = useState<boolean>(true);
  const [club, setClub] = useState<ClubFetchOneData | undefined>(undefined);
  const [clubMember, setClubMember] = useState<ClubFetchMemberData | undefined>(
    undefined
  );
  const [clubJoin, setClubJoin] = useState<
    ClubFetchJoinRequestData[] | undefined
  >(undefined);

  // const club = CLUB_ONE_DATA;
  // const club_member = CLUB_MEMBER_DATA;
  // const club_join = CLUB_JOIN_DATA;

  const [tabValue, setTabValue] = useState<number>(0);
  const [dialogJoin, setDialogJoin] = useState<boolean>(false);

  const handleTab = (e: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleJoinApprove = async (approval_id: number, status: boolean) => {
    try {
      setLoading(true);
      const result = await approveJoinRequest(club_id, approval_id, status);
      if (!result) {
        throw new Error("Gagal memproses permintaan bergabung");
      }
      if (result.error) {
        throw new Error(result.error);
      }
      notification.showNotification(
        "Berhasil memproses permintaan.",
        "success"
      );
      const joinRequestData = await getJoinRequest(club_id);
      setClubJoin(joinRequestData.data);
    } catch (error) {
      console.error(error);
      notification.showNotification(
        "Gagal memproses permintaan bergabung",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        setLoading(true);
        const clubData = await getOneClub(club_id);
        if (!clubData || !clubData.data) {
          throw new Error("Club tidak ditemukan");
        }
        setClub(clubData.data);

        const memberData = await getMembersOfClub({ clubID: club_id });
        setClubMember(memberData.data);

        const joinRequestData = await getJoinRequest(club_id);
        setClubJoin(joinRequestData.data);
      } catch (error) {
        notification.showNotification("Gagal mengambil data club", "error");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchClubDetails();
  }, [club_id, notification, router]);

  return (
    <>
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
                    src={club?.logo}
                    sx={{
                      width: "130px",
                      height: "130px",
                    }}
                  />
                  <Box marginTop={2}>
                    <Typography variant="h6" align="center">
                      {club?.short_name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: 700,
                        textAlign: "center",
                      }}
                    >
                      {club?.name}
                    </Typography>
                  </Box>
                  {!club?.joined && (
                    <Box marginTop={2}>
                      <Button
                        data-testid="join-club-button"
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
              ) : loading ? (
                <Skeleton width={1} height={130} />
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
                {club?.privilege ? (
                  <Tab label="Join Request" data-testid="join-club-tab" />
                ) : null}
              </Tabs>
              <TabPanel value={tabValue} index={0}>
                {club?.privilege ? <SearchUser club={club} /> : null}
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>NO</TableCell>
                      <TableCell>Member</TableCell>
                      <TableCell>Tanding Points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clubMember ? (
                      clubMember.participants.map((value, index) => (
                        <TableRow key={value.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{value.name}</TableCell>
                          <TableCell>{value.point}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3}>
                          Belum ada anggota terdaftar
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Table data-testid="join-request-list">
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clubJoin?.map((value, index) => (
                      <TableRow key={value.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{value.name}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleJoinApprove(value.id, true)}
                          >
                            <CheckCircle style={{ color: "green" }} />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleJoinApprove(value.id, false)}
                          >
                            <Cancel style={{ color: "red" }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {clubJoin?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          Tidak ada permintaan join
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
        clubId={club_id}
        open={dialogJoin}
        onClose={() => setDialogJoin(false)}
        data={club}
      />
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
