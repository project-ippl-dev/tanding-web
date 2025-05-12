/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Card, colors, Grid, Typography } from "@material-ui/core";
import NumberFormat from "react-number-format";

import {
  getPaymentForOwner,
  getPaymentTotalForOwner,
} from "../../../../store/actions";
import Table from "./Table";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "23px",
    fontWeight: "bold",
  },
  boxTotal: {
    display: "flex",
    alignItems: "flex-start",
  },
  textTotal: {
    fontWeight: 700,
    fontSize: "35px",
  },
  card: {
    padding: theme.spacing(2, 4),
  },
  textPendapatan: {
    fontSize: "18px",
    color: "grey",
  },
  boxFlex: {
    display: "flex",
    alignItems: "center",
  },
  dotPending: {
    width: "15px",
    height: "15px",
    borderRadius: "7px",
    backgroundColor: colors.yellow[800],
    marginRight: theme.spacing(1),
  },
  dotRefund: {
    width: "15px",
    height: "15px",
    borderRadius: "7px",
    backgroundColor: colors.red[700],
    marginRight: theme.spacing(1),
  },
  textMoney: {
    fontWeight: 700,
    fontSize: "20px",
    marginLeft: "20px",
    color: colors.grey[600],
  },
  textPending: {
    color: colors.yellow[800],
  },
  textRefund: {
    color: colors.red[700],
  },
  boxLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const Keuangan = ({ payment, getPaymentForOwner, getPaymentTotalForOwner }) => {
  const classes = useStyles();
  const params = useParams();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getPaymentForOwner(params.id, status);
  }, [params.id, status]);

  useEffect(() => {
    getPaymentTotalForOwner(params.id);
  }, [params.id]);

  return (
    <Box padding={5} paddingTop={3}>
      <Typography className={classes.title}>Laporan Keuangan</Typography>
      <Box marginTop={4}>
        <Grid container>
          <Grid item xs={6}>
            <Card className={classes.card}>
              <Grid container>
                <Grid item xs={8} className={classes.boxLeft}>
                  <Typography className={classes.textPendapatan}>
                    Total Pendapatan
                  </Typography>
                  <Box className={classes.boxTotal}>
                    <Typography>Rp</Typography>
                    <Typography className={classes.textTotal}>
                      <NumberFormat
                        displayType="text"
                        value={payment.owner.approved}
                        suffix=",00"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <div className={classes.boxFlex}>
                      <div className={classes.dotPending} />
                      <Typography className={classes.textPending}>
                        Waiting
                      </Typography>
                    </div>
                    <Typography className={classes.textMoney}>
                      <NumberFormat
                        displayType="text"
                        value={payment.owner.waiting}
                        prefix="Rp"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </Typography>
                  </Box>
                  <Box marginTop={1}>
                    <div className={classes.boxFlex}>
                      <div className={classes.dotRefund} />
                      <Typography className={classes.textRefund}>
                        Refund
                      </Typography>
                    </div>
                    <Typography className={classes.textMoney}>
                      <NumberFormat
                        displayType="text"
                        value={payment.owner.refund}
                        prefix="Rp"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box marginTop={3}>
        <Table
          data={payment.owner}
          page={page}
          setPage={setPage}
          status={status}
          setStatus={setStatus}
        />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  payment: state.payment,
});

export default connect(mapStateToProps, {
  getPaymentForOwner,
  getPaymentTotalForOwner,
})(Keuangan);
