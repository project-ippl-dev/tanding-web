"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Container,
  Typography,
  Box,
  Button,
  Avatar,
  Paper,
  CircularProgress,
} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { getDetailCertificate } from "@/store/actions/certificate";
import TournamentItem from "@/components/TournamentItem";

interface CertificateDetailPageProps {
  params: {
    id: string;
  };
}

export default function CertificateDetailPage({
  params,
}: CertificateDetailPageProps) {
  const theme = useTheme();
  const [certificateData, setCertificateData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificateDetails = async () => {
      try {
        setLoading(true);
        const response = await getDetailCertificate({
          certificate_id: params.id,
        });

        if (response.error) {
          setError(response.error);
          setCertificateData(null);
        } else {
          setCertificateData(response);
          setError(null);
        }
      } catch (err) {
        setError("Terjadi kesalahan saat memuat data sertifikat");
        setCertificateData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateDetails();
  }, [params.id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !certificateData?.data) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Sertifikat Tidak Ditemukan
        </Typography>
        <Typography color="text.secondary">
          Sertifikat dengan ID tersebut tidak tersedia atau telah dihapus.
        </Typography>
      </Box>
    );
  }

  const certificate = certificateData.data;

  return (
    <div
      style={{
        backgroundColor: "#fff",
        [theme.breakpoints.down("md") as string]: {
          marginTop: theme.spacing(9),
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            pt: 3,
            pb: 6,
          }}
        >
          <Box
            sx={{
              flex: { xs: "1 1 auto", md: "2 1 0" },
              p: { xs: 0, md: 2 },
            }}
          >
            <Box
              sx={{
                border: "1px solid #efefef",
                padding: 1,
              }}
            >
              <div style={{ position: "relative" }}>
                <Image
                  src="../../../../assets/layout-certificate.jpg" 
                  alt="certificate"
                  width={1000}
                  height={700}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover",
                  }}
                />

                {/* Certificate ID and URL */}
                <Box
                  sx={{
                    position: "absolute",
                    left: "3%",
                    top: "5%",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.8vw",
                      color: "grey",
                      [theme.breakpoints.down("md") as string]: {
                        fontSize: "1.3vw",
                      },
                    }}
                  >
                    {`Certificate ID : ${certificate.id}`}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.8vw",
                      color: "grey",
                      [theme.breakpoints.down("md") as string]: {
                        fontSize: "1.3vw",
                      },
                    }}
                  >
                    {`Certificate URL : tanding.live/certificate/${certificate.id}`}
                  </Typography>
                </Box>

                {/* Certificate Title */}
                <Box
                  sx={{
                    width: "100%",
                    position: "absolute",
                    left: "3%",
                    top: "17%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "3.5vw",
                      fontWeight: 600,
                      lineHeight: "3vw",
                      [theme.breakpoints.down("md") as string]: {
                        lineHeight: "3.5vw",
                        fontSize: "4vw",
                      },
                    }}
                  >
                    CERTIFICATE
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.2vw",
                      fontWeight: 600,
                      lineHeight: "1.5vw",
                      color: "#575757",
                      [theme.breakpoints.down("md") as string]: {
                        lineHeight: "2vw",
                        fontSize: "1.7vw",
                      },
                    }}
                  >
                    OF APPRECIATION
                  </Typography>
                </Box>

                {/* Recipient */}
                <Box
                  sx={{
                    width: "100%",
                    position: "absolute",
                    left: "3%",
                    top: "35%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1vw",
                      fontWeight: 300,
                      color: "#575757",
                      [theme.breakpoints.down("md") as string]: {
                        fontSize: "1.5vw",
                      },
                    }}
                  >
                    Diberikan Kepada:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.5vw",
                      color: "#D84F91",
                      lineHeight: "1.5vw",
                      marginLeft: "2%",
                      [theme.breakpoints.down("md") as string]: {
                        lineHeight: "2vw",
                        fontSize: "2vw",
                      },
                    }}
                  >
                    {certificate.name}
                  </Typography>
                </Box>

                {/* Reward As */}
                <Box
                  sx={{
                    width: "100%",
                    position: "absolute",
                    left: "3%",
                    top: "45%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1vw",
                      fontWeight: 300,
                      color: "#575757",
                      [theme.breakpoints.down("md") as string]: {
                        fontSize: "1.5vw",
                      },
                    }}
                  >
                    Sebagai:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.5vw",
                      color: "#575757",
                      lineHeight: "1.5vw",
                      marginLeft: "2%",
                      [theme.breakpoints.down("md") as string]: {
                        lineHeight: "2vw",
                        fontSize: "1.8vw",
                      },
                    }}
                  >
                    {certificate.reward_as}
                  </Typography>
                </Box>

                {/* Event */}
                <Box
                  sx={{
                    width: "100%",
                    paddingRight: "35%",
                    position: "absolute",
                    left: "3%",
                    top: "55%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1vw",
                      fontWeight: 300,
                      color: "#575757",
                      [theme.breakpoints.down("md") as string]: {
                        fontSize: "1.5vw",
                      },
                    }}
                  >
                    Pada Acara:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.5vw",
                      color: "#575757",
                      lineHeight: "1.5vw",
                      marginLeft: "2%",
                      [theme.breakpoints.down("md") as string]: {
                        lineHeight: "2vw",
                        fontSize: "1.8vw",
                      },
                    }}
                  >
                    {certificate.event_name}
                  </Typography>
                </Box>

                {/* Date */}
                <Box
                  sx={{
                    width: "100%",
                    position: "absolute",
                    left: "3%",
                    top: "80%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.8vw",
                      color: "grey",
                      [theme.breakpoints.down("md") as string]: {
                        fontSize: "1.3vw",
                      },
                    }}
                  >
                    Tanding!
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.8vw",
                      color: "grey",
                      [theme.breakpoints.down("md") as string]: {
                        fontSize: "1.3vw",
                      },
                    }}
                  >
                    {moment(certificate.created_at).format(
                      "dddd, DD MMMM YYYY"
                    )}
                  </Typography>
                </Box>
              </div>
            </Box>
          </Box>

          {/* Certificate Details Sidebar */}
          <Box
            sx={{
              flex: { xs: "1 1 auto", md: "1 1 0" },
              p: { xs: 2, md: 2 },
              mt: { xs: 3, md: 0 },
            }}
          >
            <Paper elevation={0} sx={{ p: 2 }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "19px",
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Penerima:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar src={certificateData.recipient || ""} />
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: 600,
                      ml: 1,
                    }}
                  >
                    {certificate.name}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    fontSize: "19px",
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Dari TournamentList!:
                </Typography>
                {certificateData.event && (
                  <TournamentItem data={certificateData.event} />
                )}
              </Box>

              <Box sx={{ mt: 3 }}>
                <Button variant="outlined" startIcon={<GetAppIcon />} disabled>
                  Download
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
