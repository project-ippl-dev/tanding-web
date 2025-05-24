"use client"
import React, { useEffect, useState } from "react";
import { styled, Theme } from "@mui/material/styles";
import { Container, Tabs, Typography, Tab, Box, TabsProps, TabProps, Backdrop, CircularProgress } from "@mui/material";

// import { Pagination } from "../../components";

import { a11yProps } from "@/utils/a11yProps";
import { EventOwnResponse } from "@/types/event.type";
import { getOwnTournament } from "@/store/actions/event";
import CustomPagination from "@/components/common/CustomPagination";
import SecondTournamentItem from "@/components/SecondTournamentItem";
import { useNotification } from "@/context/notification.context";
import { NotificationContextProps } from "@/types/notification.type";

const StyledTabs = styled((props: TabsProps) => (
  <Tabs {...props} 
  />
))(({ /*theme*/ }) => ({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: "#B84697",
    },
  },
}));

const StyledTab = styled((props: TabProps) => <Tab disableRipple {...props} />)(
  ({ theme }: { theme: Theme }) => ({
    textTransform: "none",
    color: "#fff",
    fontWeight: "bold",
    fontSize: theme.typography.pxToRem(14),
    "&.Mui-focusVisible": {
      opacity: 1,
      color: "#11B0FE",
    },
    "&.Mui-selected": {
      color: "#11B0FE",
    },
  })
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
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
        <Box sx={{ minHeight: "700px", marginTop: "40px" }}>{children}</Box>
      )}
    </div>
  );
};

const RootStyle = styled("div")(({ theme }: { theme: Theme }) => ({
  backgroundColor: "#fff",
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(7),
  },
}));

const page_size = 10;

async function reqTournamentDetailData(
  page:number, 
  page_size:number,
  setData:(data:EventOwnResponse)=>void,
  notification?: NotificationContextProps
) {
  try {
    const response = await getOwnTournament({page,page_size});
    if (response.status === 200) {
      setData(response);
    } else {
      throw new Error("Failed to fetch tournament data");
    }
  } catch (error) {
    notification?.showNotification("Gagal dalam mengambil data turnamen", "error");
  }
}

export default function OwnTournament () {
  const [tabs, setTabs] = useState(0);
  const [page, setPage] = useState(1);
  const notification = useNotification();
  const [loading, setLoading] = useState(false);
  const [tournamentOwn, setTournamentOwn] = useState<EventOwnResponse | null>(null);

  const handleTabs = ( _event: React.SyntheticEvent, newValue: number) => {
    setTabs(newValue);
  };

  useEffect(() => {
    async function fetchData() {
      const saveTournamentData = (data: EventOwnResponse) => {
        setTournamentOwn(data);
      }
      setLoading(true);
      await reqTournamentDetailData(page, page_size, saveTournamentData,notification);
      setLoading(false);
    }
    fetchData();
  }, [page]);


  return (
    <RootStyle>
      <Box
        sx={{
          height: "120px",
          width: "100%",
          backgroundColor: "#1C1D1F",
          color: "#fff",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "flex-end",
            justifyContent: "flex-end",
            height: "100%",
          }}
        >
          <Typography variant="h4" color="inherit">
            My TournamentList!
          </Typography>
          <div>
            <StyledTabs
              value={tabs}
              onChange={handleTabs}
            >
              <StyledTab label="Tournament" {...a11yProps(0)} />
            </StyledTabs>
          </div>
        </Container>
      </Box>
      <div>
        <Container maxWidth="lg">
          <TabPanel value={tabs} index={0}>
            <Box display="flex" flexDirection="column" justifyContent="center">
              {tournamentOwn?.data.map((value) => (
                <SecondTournamentItem 
                  key={value.id}
                  data-testid="tournament-own-item"
                  data={value} targetEventUrl="my-event" />
              ))}
            </Box>
            <Box marginY={7}>
              <CustomPagination
                color="primary"
                page={page}
                onChange={(_e, value) => setPage(value)}
                count={tournamentOwn?.last_page || 0}
              />
            </Box>
          </TabPanel>
        </Container>
      </div>
      <Backdrop
        open={loading}
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
          color: "#fff",
        })}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </RootStyle>
  );
};

/*

const mapStateToProps = (state) => ({
  tournament: state.tournament,
});

export default connect(mapStateToProps, { getOwnTournament })(OwnTournament);

*/
