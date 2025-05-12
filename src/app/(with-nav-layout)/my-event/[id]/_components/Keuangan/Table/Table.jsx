import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table as TableMui,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  colors,
  Grid,
  TextField,
  MenuItem,
  Card,
  Box,
  InputAdornment,
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import SearchIcon from "@material-ui/icons/Search";
import { Pagination } from "../../../../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 4),
  },
  boxStatusWaiting: {
    padding: theme.spacing(0, 2),
    display: "flex",
    alignItems: "center",
    height: "30px",
    width: "150px",
    justifyContent: "center",
    backgroundColor: colors.orange[50],
    color: colors.yellow[900],
  },
  boxStatusApproved: {
    padding: theme.spacing(0, 2),
    display: "flex",
    alignItems: "center",
    height: "30px",
    width: "150px",
    justifyContent: "center",
    backgroundColor: colors.green[50],
    color: colors.green[900],
  },
  boxStatusRejected: {
    padding: theme.spacing(0, 2),
    display: "flex",
    alignItems: "center",
    height: "30px",
    width: "150px",
    justifyContent: "center",
    backgroundColor: colors.red[50],
    color: colors.red[900],
  },
  boxStatusRefund: {
    padding: theme.spacing(0, 2),
    display: "flex",
    alignItems: "center",
    height: "30px",
    width: "150px",
    justifyContent: "center",
    backgroundColor: colors.grey[50],
    color: colors.grey[900],
  },
  dotWaiting: {
    width: "10px",
    height: "10px",
    borderRadius: "5px",
    backgroundColor: colors.orange[900],
    marginRight: "5px",
  },
  dotApproved: {
    width: "10px",
    height: "10px",
    borderRadius: "5px",
    backgroundColor: colors.green[900],
    marginRight: "5px",
  },
  dotRejected: {
    width: "10px",
    height: "10px",
    borderRadius: "5px",
    backgroundColor: colors.red[900],
    marginRight: "5px",
  },
  dotRefund: {
    width: "10px",
    height: "10px",
    borderRadius: "5px",
    backgroundColor: colors.grey[900],
    marginRight: "5px",
  },
}));

const Table = ({ data, page, setPage, status, setStatus }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={9}>
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
        <Grid item xs={3}>
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
          {data.data.map((value, index) => (
            <TableRow key={value.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{value.club_name}</TableCell>
              <TableCell>
                <NumberFormat
                  displayType="text"
                  prefix="Rp "
                  value={value.total}
                  thousandSeparator="."
                  decimalSeparator=","
                />
              </TableCell>
              <TableCell align="right">
                <div
                  className={
                    value.status === "waiting"
                      ? classes.boxStatusWaiting
                      : value.status === "approved"
                      ? classes.boxStatusApproved
                      : value.status === "rejected"
                      ? classes.boxStatusRejected
                      : classes.boxStatusRefund
                  }
                >
                  <div
                    className={
                      value.status === "waiting"
                        ? classes.dotWaiting
                        : value.status === "approved"
                        ? classes.dotApproved
                        : value.status === "rejected"
                        ? classes.dotRejected
                        : classes.dotRefund
                    }
                  />
                  <Typography style={{ fontWeight: 700 }}>
                    {value.status}
                  </Typography>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {data.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableMui>
      <Box marginTop={2}>
        <Pagination
          color="primary"
          page={page}
          onChange={(e, value) => setPage(value)}
          count={data.last_page}
        />
      </Box>
    </Card>
  );
};

export default Table;
