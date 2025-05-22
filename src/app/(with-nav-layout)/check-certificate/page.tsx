"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Backdrop,
  CircularProgress,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getDetailCertificate } from "@/store/actions/certificate";
import LayoutCertificate from "./_components/LayoutCertificate";

export default function CertificateVerificationPage() {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [certificateID, setCertificateID] = useState("");
  const [certificateData, setCertificateData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!certificateID) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getDetailCertificate({
        certificate_id: certificateID,
      });

      if (response.error) {
        setError(response.error);
        setCertificateData(null);
      } else {
        setCertificateData({ certificate: response.data.certificate });
        setError(null);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memproses permintaan");
      setCertificateData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "700px",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: theme.spacing(3),
          [theme.breakpoints.down("md")]: {
            paddingTop: theme.spacing(9),
            minHeight: "500px",
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            borderRadius: "10px",
            overflow: "hidden",
            py: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "500px",
                px: 2,
                mb: 3,
              }}
            >
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    fontSize: "20px",
                  }}
                >
                  Cek Sertifikat
                </Typography>
              </Box>

              <TextField
                fullWidth
                placeholder="Masukkan ID Sertifikat"
                value={certificateID}
                onChange={(e) => setCertificateID(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <Button
                  variant="contained"
                  disabled={!certificateID || loading}
                  onClick={handleSubmit}
                  sx={{
                    background:
                      "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
                    textTransform: "none",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "0",
                    padding: theme.spacing(0.5, 3),
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #CB4492 0%, #384FB9 80%)",
                    },
                  }}
                >
                  Kirim
                </Button>
              </Box>

              {error && (
                <Box
                  sx={{
                    mt: 3,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "error.main",
                    }}
                  >
                    Sertifikat Tidak Ditemukan
                  </Typography>
                </Box>
              )}
            </Box>

            {certificateData && !!certificateID && !error && (
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "800px",
                  mt: 3,
                  px: 2,
                }}
              >
                <LayoutCertificate data={certificateData} />
              </Box>
            )}
          </Box>
        </Paper>
      </Container>

      <Backdrop
        open={loading}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          color: "#fff",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
