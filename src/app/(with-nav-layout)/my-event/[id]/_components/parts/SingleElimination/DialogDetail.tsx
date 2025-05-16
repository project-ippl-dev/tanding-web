import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Grid,
  Avatar,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  colors,
} from "@mui/material";

import StyledDialogTitle from "@/components/dialog/StyledDialogTitle";

const DialogDetail = ({ dialog, onClose }) => {
  return (
    <Dialog maxWidth="sm" fullWidth open={dialog.open} onClose={onClose}>
      <StyledDialogTitle onClose={onClose}>Match Detail</StyledDialogTitle>
      <DialogContent>
        <Grid container>
          <Grid
            xs={6}
            sx={{
              padding: (theme) => theme.spacing(0, 1),
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              Home
            </Typography>
            <Avatar src={dialog.data?.teams[0].club_logo} />
            <Typography>{dialog.data?.teams[0].club_name.String}</Typography>
            <div>
              {dialog.data?.teams[0].participants.map((value, index) => (
                <div
                  key={index}
                  style={{
                    padding: "8px 40px",
                    backgroundColor: colors.purple[50],
                  }}
                >
                  <Typography>{value}</Typography>
                </div>
              ))}
            </div>
            {!!dialog.data?.teams[0].Score && (
              <Box
                sx={{
                  width: "100%",
                  marginTop: "10px",
                  border: "1px solid #efefef",
                  borderRadius: "5px",
                }}
              >
                <Table>
                  <TableBody>
                    {Object.keys(dialog.data?.teams[0].Score).map((key) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{dialog.data.teams[0].Score[key]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Grid>

          {/* AWAY */}
          <Grid
            xs={6}
            sx={{
              padding: (theme) => theme.spacing(0, 1),
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              Away
            </Typography>
            <Avatar src={dialog.data?.teams[1].club_logo} />
            <Typography>{dialog.data?.teams[1].club_name.String}</Typography>
            <div>
              {dialog.data?.teams[1].participants.map((value, index) => (
                <div
                  key={index}
                  style={{
                    padding: "8px 40px",
                    backgroundColor: colors.purple[50],
                  }}
                >
                  <Typography>{value}</Typography>
                </div>
              ))}
            </div>
            {!!dialog.data?.teams[1].Score && (
              <Box
                sx={{
                  width: "100%",
                  marginTop: "10px",
                  border: "1px solid #efefef",
                  borderRadius: "5px",
                }}
              >
                <Table>
                  <TableBody>
                    {Object.keys(dialog.data?.teams[1].Score).map((key) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{dialog.data.teams[1].Score[key]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetail;
