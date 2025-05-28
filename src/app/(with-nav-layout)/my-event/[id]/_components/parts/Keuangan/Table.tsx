import React from "react";
import {
  Table as TableMui,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Card,
  Box,
  TableContainer,
  Tab,
} from "@mui/material";
import { orange, yellow, green, red, grey } from "@mui/material/colors";
import { NumericFormat } from "react-number-format";


import { styled, Theme } from "@mui/system";
import { PaymentOwner, PaymentStatus } from "@/types/payment";
import CustomPagination from "@/components/common/CustomPagination";

interface TableProps {
  payment: PaymentOwner | null;
  page: number;
  setPage: ( page: number) => void;
  status: string;
  setStatus: (status: string) => void;
}

interface BoxStatusProps {
  status: PaymentStatus;
  theme?: Theme;
}

interface DotProps {
  status: PaymentStatus;
}

const BoxStatus = styled(Box)<BoxStatusProps>(({ theme, status }) => ({
  padding: theme.spacing(0, 2),
  display: "flex",
  alignItems: "center",
  height: "30px",
  width: "150px",
  justifyContent: "center",
  backgroundColor:
    status === "waiting"
      ? orange[50]
      : status === "approved"
      ? green[50]
      : status === "rejected"
      ? red[50]
      : grey[50],
  color:
    status === "waiting"
      ? yellow[900]
      : status === "approved"
      ? green[900]
      : status === "rejected"
      ? red[900]
      : grey[900],
}));

const Dot = styled("div")<DotProps>(({ status }) => ({
  width: "10px",
  height: "10px",
  borderRadius: "5px",
  marginRight: "5px",
  backgroundColor:
    status === "waiting"
      ? orange[900]
      : status === "approved"
      ? green[900]
      : status === "rejected"
      ? red[900]
      : grey[900],
}));

const Table: React.FC<TableProps> = ({ payment, page, setPage, status, setStatus }) => {
  return (
    <Card sx={{ padding: 2 }}>
      <Grid container>
        <Grid size={{xs:9}}>
          {/* <Box paddingX={1} marginY={2}>
            <TextField
              fullWidth
              size="small"
              label="club name"
              variant="outlined"
              placeholder="cari club"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box> */}
        </Grid>
        <Grid size={{xs:3}}>
          <Box paddingX={1} marginY={2}>
            <TextField
              select
              fullWidth
              size="small"
              label="status"
              variant="outlined"
              value={status}
              onChange={({ target: { value } }) => setStatus(value)}
            >
              <MenuItem value="waiting">Waiting</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="refund">Refund</MenuItem>
            </TextField>
          </Box>
        </Grid>
      </Grid>
      <TableContainer
        data-testid="payment-table"
      >
        <TableMui>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Club</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payment?.data?.map((value, index) => (
              <TableRow 
                data-testid={`payment-row-data`}
                key={value.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{value.club_name}</TableCell>
                <TableCell>
                  <NumericFormat
                    displayType="text"
                    prefix="Rp "
                    value={value.total}
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                </TableCell>
                <TableCell align="right">
                  <BoxStatus status={value.status}>
                    <Dot status={value.status} />
                    <Typography sx={{ fontWeight: 700 }}>
                      {value.status}
                    </Typography>
                  </BoxStatus>
                </TableCell>
              </TableRow>
            ))}
            {payment?.data.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableMui>
      </TableContainer>
      <Box marginTop={2}>
        <CustomPagination
          color="primary"
          page={page}
          onChange={(_, value) => setPage(value)} // Removed unused 'event' parameter
          count={payment?.last_page}
        />
      </Box>
    </Card>
  );
};

export default Table;
