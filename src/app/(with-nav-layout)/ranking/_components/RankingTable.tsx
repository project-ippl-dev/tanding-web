"use client";
import { RankingClubData, RankingUserData } from "@/types/ranking.types";
import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { NumericFormat } from "react-number-format";

export default function RankingTable({
  data,
  page,
  pageSize,
  lastPage,
  setPage,
}: {
  data: RankingClubData[] | RankingUserData[];
  page: number;
  pageSize: number;
  lastPage: number;
  setPage: (x: number) => void
}) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#3F4654",
              }}
            >
              <TableCell>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  Position
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  Total Pertandingan
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  Tanding! Point
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((value, index) => (
              <TableRow key={index}>
                <TableCell>{`Rank ${
                  (page - 1) * pageSize + (index + 1)
                }`}</TableCell>
                <TableCell>{value.name}</TableCell>
                <TableCell>
                  <NumericFormat
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                    value={value.total_participate}
                  />
                </TableCell>
                <TableCell>
                  <NumericFormat
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                    value={value.total_point}
                  />
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Tidak Ada Data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box marginY={3}>
        <Pagination
          count={lastPage}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </div>
  );
}
