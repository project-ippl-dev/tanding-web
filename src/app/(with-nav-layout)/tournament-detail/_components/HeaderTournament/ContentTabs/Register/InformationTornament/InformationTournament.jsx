import React from "react";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Button, Grid, Typography } from "@material-ui/core";
import { FaUserCircle, FaClipboardList, FaMapMarkerAlt } from "react-icons/fa";
import { MdUpdate, MdDateRange, MdGavel } from "react-icons/md";
import { FcSportsMode } from "react-icons/fc";
import NumberFormat from "react-number-format";
import parse from "html-react-parser";

const useStyles = makeStyles((theme) => ({
  bodyContent: {
    padding: theme.spacing(4, 5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2, 2, 0),
    },
  },
  icon: {
    fontSize: "23px",
    marginRight: "5px",
  },
  textBodyTitle: {
    fontSize: "18px",
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
  },
  boxBodyContent: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(1),
  },
  avatar: {
    width: "50px",
    height: "50px",
    marginRight: theme.spacing(1),
  },
  textOrganizerName: {
    fontWeight: "bold",
  },
  textFollower: {
    fontSize: "12px",
  },
  btnFollow: {
    background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%);",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "12px",
    padding: "2px 10px",
  },
  rootBoxContent: {
    marginTop: theme.spacing(3),
  },
  boxGift: {
    border: "5px solid #B84697",
    padding: theme.spacing(1),
  },
  textTotal: {
    fontSize: "20px",
  },
  totalGift: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#930E86",
    textAlign: "center",
    marginTop: "-5px",
  },
  capitalize: {
    textTransform: "capitalize",
  },
}));

const InformationTournament = ({ data }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.boxGift}>
            <Typography align="center">Total Hadiah</Typography>
            <Typography align="center">
              {data.data?.prize_pool === "0" ? (
                <span className={classes.totalGift}>-</span>
              ) : (
                <NumberFormat
                  displayType="text"
                  prefix="Rp "
                  value={data.data?.prize_pool}
                  className={classes.totalGift}
                  thousandSeparator="."
                  decimalSeparator=","
                />
              )}
            </Typography>
          </div>
        </Grid>
        <Grid item md={6} xs={12} className={classes.bodyContent}>
          <div>
            <Box display="flex" alignItems="center">
              <FaUserCircle className={classes.icon} />
              <Typography className={classes.textBodyTitle}>
                Pembuat Acara
              </Typography>
            </Box>
            <div className={clsx(classes.flexCenter, classes.boxBodyContent)}>
              <Avatar className={classes.avatar} src={data.data?.user_image} />
              <Box marginRight={2}>
                <Typography className={classes.textOrganizerName}>
                  {data.data?.user_name}
                </Typography>
                <Typography className={classes.textFollower}>
                  - Follower
                </Typography>
              </Box>
              <Button disabled className={classes.btnFollow}>
                Follow
              </Button>
            </div>
          </div>

          {/* Deskripsi Tournament */}
          <div className={classes.rootBoxContent}>
            <Box display="flex" alignItems="center">
              <FaClipboardList className={classes.icon} />
              <Typography className={classes.textBodyTitle}>
                Deskripsi Tournament
              </Typography>
            </Box>
            <div className={clsx(classes.flexCenter, classes.boxBodyContent)}>
              <Typography>{data.data?.description}</Typography>
            </div>
          </div>

          {/* Rules Tournament */}
          <div className={classes.rootBoxContent}>
            <Box display="flex" alignItems="center">
              <FaClipboardList className={classes.icon} />
              <Typography className={classes.textBodyTitle}>
                Peraturan Tournament
              </Typography>
            </Box>
            <div className={classes.boxBodyContent}>
              {!!data.data?.rules && parse(data.data?.rules)}
            </div>
          </div>
        </Grid>

        {/* =========================================== */}
        <Grid item md={6} xs={12} className={classes.bodyContent}>
          {/* Kategori */}
          <div className={classes.rootBoxContent}>
            <Box display="flex" alignItems="center">
              <FcSportsMode className={classes.icon} />
              <Typography className={classes.textBodyTitle}>
                Olahraga
              </Typography>
            </Box>
            <div className={classes.boxBodyContent}>
              <Typography>{data.data?.sport_name}</Typography>
            </div>
          </div>

          {/* System */}
          <div className={classes.rootBoxContent}>
            <Box display="flex" alignItems="center">
              <MdGavel className={classes.icon} />
              <Typography className={classes.textBodyTitle}>
                Kelas Tournament
              </Typography>
            </Box>
            <div className={classes.boxBodyContent}>
              {data.data?.class_events.map((value) => (
                <Typography
                  key={value.id}
                >{`${value.class_name} - (${value.match_type} elimination)`}</Typography>
              ))}
            </div>
          </div>

          {/* Due Register */}
          <div className={classes.rootBoxContent}>
            <Box display="flex" alignItems="center">
              <MdUpdate className={classes.icon} />
              <Typography className={classes.textBodyTitle}>
                Batas Waktu Daftar
              </Typography>
            </Box>
            <div className={classes.boxBodyContent}>
              <Typography>
                {moment(data.data?.deadline).format("DD MMMM YYYY, HH:mm")}
              </Typography>
            </div>
          </div>

          {/* Time */}
          <div className={classes.rootBoxContent}>
            <Box display="flex" alignItems="center">
              <MdDateRange className={classes.icon} />
              <Typography className={classes.textBodyTitle}>
                Waktu Tournament
              </Typography>
            </Box>
            <div className={classes.boxBodyContent}>
              <Typography>
                {`${data.data?.start_date} - ${data.data?.end_date}`}
              </Typography>
            </div>
          </div>

          {/* Location */}
          <div className={classes.rootBoxContent}>
            <Box display="flex" alignItems="center">
              <FaMapMarkerAlt className={classes.icon} />
              <Typography className={classes.textBodyTitle}>
                Lokasi Tournament
              </Typography>
            </Box>
            <div className={classes.boxBodyContent}>
              <Typography className={classes.capitalize}>{`${
                data.data?.location
              }, ${data.data?.city.toLowerCase()} - ${data.data?.province.toLowerCase()}`}</Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default InformationTournament;
