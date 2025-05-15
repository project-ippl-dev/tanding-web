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
import { useParams } from "next/navigation";
import { getPaymentForOwner, getPaymentTotalForOwner } from "@/store/actions/payment";
import { PaymentOwner, PaymentSummary } from "@/types/payment";
import Table from "./parts/Keuangan/Table";


async function reqGetPayementForOwner(eventID: string, status: string = "", setData: (data: PaymentOwner)=> void) {
  // const response = PAYMENT_OWNER
  // response.status = 200
  const response = await getPaymentForOwner(eventID,status)
  if (response.status === 200) {
    setData(response);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}


async function reqGetPaymentTotalForOwner(eventID: string, setData: (data: PaymentSummary)=> void) {
  // const response = PAYMENT_SUMMARY
  // response.status = 200
  const response = await getPaymentTotalForOwner(eventID);
  if (response.status === 200) {
    setData(response);
  } else {
    alert("Gagal membuat data respon, dengan error: " + response.error);
  }
}


interface PaymentOwnerResponse {
  payment:PaymentOwner | null
  summary:PaymentSummary | null
}



const Keuangan = () => {
  const params = useParams<{id: string}>();

  const [payment, setPaymentData] = useState<PaymentOwnerResponse>({
    payment: null,
    summary: null,
  });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const setPaymentOwnerData = (data: PaymentOwner) => {
      setPaymentData(prevState => ({
        ...prevState,
        payment: data,
      })
    )}
    reqGetPayementForOwner(params.id, status, setPaymentOwnerData);
  }, [params.id, status]);

  useEffect(() => {
    const setPaymentSummaryData = (data: PaymentSummary) => {
      setPaymentData(prevState => ({
        ...prevState,
        summary: data,
      })
    )}
    reqGetPaymentTotalForOwner(params.id, setPaymentSummaryData);
  }, [params.id]);

  return (
    <Box padding={5} paddingTop={3}>
      <Typography sx={{ fontSize: "23px", fontWeight: "bold" }}>
        Laporan Keuangan
      </Typography>
      <Box marginTop={4}>
        <Grid container>
          <Grid size={{ xs: 12, sm: 12 , md: 8 }}>
            <Card sx={{ padding: 2, paddingX: 2 }}>
              <Grid container>
                <Grid size={{ xs: 12, sm: 7 }}
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
                    <Typography sx={(theme) => ({
                      fontWeight: 700,
                      fontSize: "2rem", 
                      [theme.breakpoints.down('md')]: {
                        fontSize: "1.75rem",
                      }
                    })
                  }>
                      <NumericFormat
                        displayType="text"
                        value={payment?.summary?.data.approved}
                        suffix=",00"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 5 }}
                >
                  <Box>
                    <Box sx={{ display: "flex",alignItems: "center" }}>
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
                        value={payment.summary?.data.waiting}
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
                        value={payment.summary?.data.refund}
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
          payment={payment.payment}
          page={page}
          setPage={(data: number) => setPage(data)}
          status={status}
          setStatus={setStatus}
        />
      </Box>
    </Box>
  );
};

export default Keuangan;

/*
const mapStateToProps = (state) => ({
  payment: state.payment,
});

export default connect(mapStateToProps, {
  getPaymentForOwner,
  getPaymentTotalForOwner,
})(Keuangan);
*/