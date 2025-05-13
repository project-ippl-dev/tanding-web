/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, Card, Grid, Typography } from "@mui/material"; // Updated Material-UI imports
import { NumericFormat } from "react-number-format";

/*
import {
  getPaymentForOwner,
  getPaymentTotalForOwner,
} from "../../../../store/actions";
*/


async function reqCreateClass(data: CreateClassPayload) {
  const response = await createClass(data);
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}


async function reqCreateClass(data: CreateClassPayload) {
  const response = await createClass(data);
  if (response.status === 200) {
    alert(response.message);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}


import Table from "./Table";
import { useParams } from "next/navigation";

const Keuangan = ({ payment, getPaymentForOwner, getPaymentTotalForOwner }) => {
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
      <Typography sx={{ fontSize: "23px", fontWeight: "bold" }}>
        Laporan Keuangan
      </Typography>
      <Box marginTop={4}>
        <Grid container>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card sx={{ padding: 2, paddingX: 4 }}>
              <Grid container>
                <Grid
                  size={{ xs: 12, sm: 8 }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "18px", color: "grey" }}>
                    Total Pendapatan
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <Typography>Rp</Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: "35px" }}>
                      <NumericFormat
                        displayType="text"
                        value={payment.owner.approved}
                        suffix=",00"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: "15px",
                          height: "15px",
                          borderRadius: "7px",
                          backgroundColor: "#FFB300", // Replaced colors.yellow[800]
                          marginRight: 1,
                        }}
                      />
                      <Typography sx={{ color: "#FFB300" }}>
                        Waiting
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "20px",
                        marginLeft: "20px",
                        color: "#757575", // Replaced colors.grey[600]
                      }}
                    >
                      <NumericFormat
                        displayType="text"
                        value={payment.owner.waiting}
                        prefix="Rp"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </Typography>
                  </Box>
                  <Box marginTop={1}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: "15px",
                          height: "15px",
                          borderRadius: "7px",
                          backgroundColor: "#D32F2F", // Replaced colors.red[700]
                          marginRight: 1,
                        }}
                      />
                      <Typography sx={{ color: "#D32F2F" }}>Refund</Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "20px",
                        marginLeft: "20px",
                        color: "#757575", // Replaced colors.grey[600]
                      }}
                    >
                      <NumericFormat
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

/*
const mapStateToProps = (state) => ({
  payment: state.payment,
});

export default connect(mapStateToProps, {
  getPaymentForOwner,
  getPaymentTotalForOwner,
})(Keuangan);
*/