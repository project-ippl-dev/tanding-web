/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  Hidden,
} from "@material-ui/core";
import { MdGavel } from "react-icons/md";
import { FaMapMarkerAlt, FaRegCalendarCheck } from "react-icons/fa";

import { getTournamentDetail } from "../../../../store/actions";
import { Register, Bracket, Participant } from "./ContentTabs";
import BannerTanding from "../../../../assets/images/banner-desktop.jpg";

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: "#B84697",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#fff",
    fontWeight: "bold",
    fontSize: theme.typography.pxToRem(14),
    "&:focus": {
      opacity: 1,
      color: "#11B0FE",
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(7),
    },
  },
  bgImage: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    display: "block",
  },
  headerContent: {
    backgroundColor: "#001641",
    color: "#fff",
    padding: theme.spacing(3, 10, 0),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(3, 3, 0),
    },
  },
  titleTournament: {
    fontSize: "25px",
    fontWeight: "bold",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      fontSize: "20px",
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
    fontSize: "14px",
  },
  textHeader: {
    marginRight: theme.spacing(1.6),
    textTransform: "capitalize",
  },
  avatar: {
    width: "50px",
    height: "50px",
    marginRight: theme.spacing(1),
  },
  btnFollow: {
    background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%);",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "12px",
    padding: "2px 10px",
  },
  nameOrganizer: {
    fontWeight: "bold",
  },
  textFollower: {
    fontSize: "12px",
  },
  flex: {
    display: "flex",
    alignItems: "flex-end",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  flex2: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  boxTabs: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
      marginTop: 0,
    },
  },
}));

const HeaderTournament = ({
  tournament,
  getTournamentDetail,
  auth,
  profile,
}) => {
  const classes = useStyles();
  const params = useParams();

  const [tabs, setTabs] = useState(0);

  const handleTabs = (event, newValue) => {
    setTabs(newValue);
  };

  useEffect(() => {
    getTournamentDetail(params.id);
    setTabs(0);
  }, [params.id]);

  return (
    <div className={classes.root}>
      <Hidden mdDown>
        <img
          className={classes.bgImage}
          alt="Background Image"
          src={BannerTanding}
        />
      </Hidden>
      <div className={classes.headerContent}>
        <Grid container>
          <Grid item md={9} xs={12}>
            <Box className={classes.flex}>
              <Typography className={classes.titleTournament}>
                {tournament.detail.data?.name}
              </Typography>
            </Box>
            <Box className={classes.flex2} marginTop={0.5}>
              <Box display="flex">
                <MdGavel className={classes.icon} />
                <Typography className={classes.textHeader}>
                  {tournament.detail.data?.sport_name}
                </Typography>
              </Box>
              <Box display="flex">
                <FaMapMarkerAlt className={classes.icon} />
                <Typography className={classes.textHeader}>
                  {tournament.detail.data?.city
                    ? tournament.detail.data?.city.toLowerCase()
                    : tournament.detail.data?.location}
                </Typography>
              </Box>
              <Box display="flex">
                <FaRegCalendarCheck className={classes.icon} />
                <Typography className={classes.textHeader}>
                  {tournament.detail.data?.start_date}
                </Typography>
              </Box>
            </Box>
            <Box className={classes.boxTabs}>
              <StyledTabs
                value={tabs}
                onChange={handleTabs}
                textColor="#fff"
                indicatorColor="primary"
              >
                <StyledTab label="DAFTAR" {...a11yProps(0)} />
                <StyledTab label="PESERTA" {...a11yProps(1)} />
                {(tournament.detail.data?.remark === "closed" ||
                  tournament.detail.data?.remark === "ongoing" ||
                  tournament.detail.data?.remark === "done") && (
                  <StyledTab label="BRAKET" {...a11yProps(2)} />
                )}
              </StyledTabs>
            </Box>
          </Grid>
          <Hidden mdDown>
            <Grid item md={3} xs={12}>
              <Box marginTop={1}>
                <Typography>Organized by</Typography>
                <Box display="flex" marginTop={1} alignItems="center">
                  <Avatar
                    className={classes.avatar}
                    src={tournament.detail.data?.user_image}
                  />
                  <Box marginRight={3}>
                    <Typography className={classes.nameOrganizer}>
                      {tournament.detail.data?.user_name}
                    </Typography>
                    <Typography className={classes.textFollower}>
                      - Follower
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    className={classes.btnFollow}
                    disabled
                  >
                    Follow
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </div>
      <TabPanel value={tabs} index={0}>
        <Register
          data={tournament.detail}
          canRegister={profile.data?.can_participate}
        />
      </TabPanel>
      <TabPanel value={tabs} index={1}>
        <Participant />
      </TabPanel>
      <TabPanel value={tabs} index={2}>
        <Bracket />
      </TabPanel>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tournament: state.tournament,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getTournamentDetail })(
  HeaderTournament
);
