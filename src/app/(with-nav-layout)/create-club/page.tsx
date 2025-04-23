"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import TextFieldNumeric from "../user-profile/_component/parts/DialogProfileBasic/TextFieldNumeric";

export default function CreateClubPage() {
  return (
    <Container
      maxWidth="lg"
      sx={(theme) => ({
        paddingTop: "50px",
        paddingBottom: "50px",
        [theme.breakpoints.down("md")]: {
          paddingTop: theme.spacing(10),
        },
      })}
    >
      <form>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Buat Club
        </Typography>
        <Typography
          sx={{
            fontSize: "18px",
            color: "#666666",
          }}
        >
          Pastikan seluruh form terisi dengan lengkap dan jelas demi keaslian
          data
        </Typography>
        <Card
          sx={(theme) => ({
            padding: theme.spacing(2, 3),
            marginTop: theme.spacing(2),
          })}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Data Club
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#666666",
            }}
          >
            Silahkan isi dengan benar
          </Typography>
          <div className="py-1">
            <TextField
              fullWidth
              label="Nama Club"
              placeholder="Team X"
              margin="normal"
              name="name"
              // error={!!errors.name}
              // helperText={errors?.name?.message}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </div>
          <Grid container>
            <Grid
              size={{ xs: 12 }}
              sx={(theme) => ({
                padding: theme.spacing(0, 1),
              })}
            >
              <TextField
                label="Singkatan Club"
                placeholder="TMX"
                fullWidth
                margin="normal"
                name="short_name"
                // error={!!errors.short_name}
                // helperText={errors?.short_name?.message}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid
              size={{ xs: 12 }}
              sx={(theme) => ({
                padding: theme.spacing(0, 1),
              })}
            >
              {/* TODO: Format Phone Number */}
              <TextFieldNumeric
                margin="normal"
                label="Nomor Telepon"
                placeholder="1234-5678-00000"
                format="####-####-#####"
                value={""}
                onChange={() => (true)}
                // error={!!errors.phone}
                // helperText={errors.phone}
              />
            </Grid>
            <Grid
              size={{ xs: 12 }}
              sx={(theme) => ({
                padding: theme.spacing(0, 1),
              })}
            >
              <TextField
                label="Olahraga"
                placeholder="TMX"
                fullWidth
                margin="normal"
                // error={!!errors.sports}
                // helperText={errors?.sports?.message}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Box marginTop={2} width="100%">
              <Typography>Logo</Typography>
              {/* TODO: Conditional */}
              <Typography
                sx={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                *logo club wajib diupload
              </Typography>

              {/* TODO: Image Uploader */}
            </Box>
          </Grid>
        </Card>
        <Box marginTop={5} />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%);",
            textTransform: "none",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Simpan
        </Button>
      </form>
      {/* <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </Container>
  );
}
