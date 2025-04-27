/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import clsx from "clsx";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@material-ui/core";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import NumberFormat from "react-number-format";

import DialogRegister from "./DialogRegister";

const slobarColor = (bar, classes) => {
  if (bar <= 25) {
    return classes.colorbarAvailable;
  }
  if (bar <= 50) {
    return classes.colorbarMedium;
  }
  if (bar <= 75) {
    return classes.colorbarWarning;
  }
  if (bar <= 100) {
    return classes.colorbarFull;
  }
};

const useStyles = makeStyles((theme) => ({
  boxLeft: {
    padding: theme.spacing(3),
    height: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: "auto",
      padding: theme.spacing(2),
    },
  },
  boxRight: {
    padding: theme.spacing(3),
    height: "400px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      height: "auto",
      padding: theme.spacing(2),
    },
  },
  imageTournament: {
    width: "100%",
    aspectRatio: "16/9",
    objectFit: "cover",
    display: "block",
    [theme.breakpoints.down("md")]: {
      aspectRatio: "4/3",
    },
  },
  textTitle: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  contentBanner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    justifyContent: "space-between",
    height: "100%",
  },
  btnSubmit: {
    background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%);",
    color: "#fff",
    fontWeight: "bold",
    marginTop: theme.spacing(1),
  },
  boxShare: {
    display: "flex",
    marginTop: theme.spacing(1),
  },
  btnFacebook: {
    boxShadow: "none",
    backgroundColor: "#3C5A98",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#3C5A98",
    },
    marginRight: theme.spacing(1),
  },
  btnTwitter: {
    boxShadow: "none",
    backgroundColor: "#1EA1F2",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#1EA1F2",
    },
  },
  boxQoutaBar: {
    width: "100%",
    height: "3px",
    borderRadius: "1px",
    backgroundColor: "#DFDFDF",
    margin: "0 auto",
  },
  qoutaBar: {
    height: "3px",
  },
  colorbarAvailable: {
    backgroundColor: "#4AE56C",
  },
  colorbarMedium: {
    backgroundColor: "#FEEB21",
  },
  colorbarWarning: {
    backgroundColor: "#FFB864",
  },
  colorbarFull: {
    backgroundColor: "#FF6464",
  },
  textQouta: {
    fontSize: "14px",
    color: "#454545",
    marginTop: "2px",
  },
  price: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#F38C0C",
  },
  boxBannerBody: {
    alignItems: "center",
    height: "400px",
  },
  boxType: {
    background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%);",
    borderRadius: "2px",
    padding: theme.spacing(0.3, 2),
    display: "inline-block",
    marginTop: "5px",
  },
  textType: {
    textTransform: "lowercase",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
  },
}));

const ContentBannerTournament = ({ data, canRegister }) => {
  const classes = useStyles();
  const history = useHistory();
  const [dialogRegister, setDialogRegister] = useState(false);
  const [dialogReject, setDialogReject] = useState(false);

  const handleRegister = () => {
    if (!canRegister) {
      return setDialogReject(true);
    } else {
      return setDialogRegister(true);
    }
  };

  const arrayMin = (arr) => {
    return arr.reduce(function (p, v) {
      return p < v ? p : v;
    });
  };

  function arrayMax(arr) {
    return arr.reduce(function (p, v) {
      return p > v ? p : v;
    });
  }

  const LowestPrice = ({ data }) => {
    const arrayPrice = data.map((value) => value.price);
    const low = arrayMin(arrayPrice);
    return low === 0 ? (
      <span>Gratis</span>
    ) : (
      <NumberFormat
        displayType="text"
        prefix="Rp "
        value={low}
        thousandSeparator="."
        decimalSeparator=","
      />
    );
  };

  const HighestPrice = ({ data }) => {
    const arrayPrice = data.map((value) => value.price);
    const lowest = arrayMin(arrayPrice);
    const highest = arrayMax(arrayPrice);
    return highest !== lowest ? (
      <NumberFormat
        displayType="text"
        prefix=" - "
        value={highest}
        thousandSeparator="."
        decimalSeparator=","
      />
    ) : null;
  };

  return (
    <div>
      <Grid container>
        <Grid item md={6} xs={12}>
          <Box className={classes.boxLeft}>
            <img
              className={classes.imageTournament}
              src={data.data?.thumbnail}
            />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box className={classes.boxRight}>
            <div className={classes.contentBanner}>
              <div>
                <Typography className={classes.textTitle}>
                  {data.data?.name}
                </Typography>
                <div className={classes.boxType}>
                  <Typography className={classes.textType}>
                    #{data.data?.sport_name}
                  </Typography>
                </div>
              </div>
              <div>
                {data.data?.class_events.length > 0 && (
                  <Typography className={classes.price} noWrap>
                    <LowestPrice data={data.data?.class_events} />
                    <HighestPrice data={data.data?.class_events} />
                  </Typography>
                )}
                <div>
                  <div className={classes.boxQoutaBar}>
                    <div
                      className={clsx(
                        classes.qoutaBar,
                        slobarColor(
                          (data.data?.participants / data.data?.quota) * 100,
                          classes
                        )
                      )}
                      style={{
                        width: `${
                          (data.data?.participants / data.data?.quota) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <Typography
                    className={classes.textQouta}
                  >{`Tersisa ${data.data?.quota} qouta`}</Typography>
                </div>
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.btnSubmit}
                  onClick={handleRegister}
                  disabled={data.data?.remark !== "open"}
                >
                  Daftar Tanding
                </Button>
                <div className={classes.boxShare}>
                  <Button
                    className={classes.btnFacebook}
                    variant="contained"
                    size="small"
                    startIcon={<FaFacebookF />}
                  >
                    Share
                  </Button>
                  <Button
                    className={classes.btnTwitter}
                    variant="contained"
                    size="small"
                    startIcon={<FaTwitter />}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>

      {/* DIALOG REGISTER */}
      <DialogRegister
        open={dialogRegister}
        onClose={() => setDialogRegister(false)}
        dataTournament={data}
      />

      {/* DIALOG REJECT */}
      <Dialog
        maxWidth="xs"
        fullWidth
        open={dialogReject}
        onClose={() => setDialogReject(false)}
      >
        <DialogTitle>Opss Sorry</DialogTitle>
        <DialogContent>
          <Typography>
            Maaf anda harus mengisi data diri terlebih dahulu sebelum mengikiti
            pertandingan
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/profile")}
          >
            Update Profile
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContentBannerTournament;
