"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Pagination as MuiPagination,
  Paper,
  Backdrop,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getListCertificateUser } from "@/store/actions/certificate";
import CertificateItem from "./_components/CertificateItem";
import { useAuth } from "@/context/auth.context";
import { UserCertificate, PaginationData } from "@/types/certificate.types";

export default function CertificatePage() {
  const theme = useTheme();
  const { authData } = useAuth();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [certificates, setCertificates] = useState<UserCertificate[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    current_page: 1,
    last_page: 1,
    has_next_page: false,
    has_previous_page: false,
    previous_page: 0,
    next_page: 0,
    total_item: 0,
  });
  const [loading, setLoading] = useState(false);
  const [loadingCertificates, setLoadingCertificates] = useState(true);

  const fetchCertificates = async () => {
    if (!authData?.user_id) return;

    try {
      setLoadingCertificates(true);

      const response = await getListCertificateUser({
        user_id: authData.user_id,
        page,
        page_size: pageSize,
      });

      if (!response.error) {
        setCertificates(
          Array.isArray(response.data)
            ? (response.data as UserCertificate[])
            : [response.data as UserCertificate]
        );

        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoadingCertificates(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, [page, authData?.user_id]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: theme.spacing(3),
          [theme.breakpoints.down("md")]: {
            paddingTop: theme.spacing(9),
          },
        }}
      >
        <Paper sx={{ borderRadius: "10px" }}>
          <div
            style={{
              width: "100%",
              height: "180px",
              position: "relative",
              borderRadius: "10px 10px 0 0",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, #384FB9 0%, #CB4492 50%, #FF69B4 100%)",
              }}
            />
            <Typography
              variant="h4"
              sx={{
                position: "absolute",
                bottom: "30px",
                left: "40px",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Sertifikat
            </Typography>
          </div>

          <Box sx={{ padding: theme.spacing(3) }}>
            {loadingCertificates ? (
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Skeleton variant="rectangular" height={150} />
                    <Skeleton width="60%" height={30} sx={{ mt: 1 }} />
                    <Skeleton width="40%" height={20} sx={{ mt: 1 }} />
                  </Box>
                ))
            ) : certificates.length > 0 ? (
              certificates.map((cert) => (
                <CertificateItem key={cert.id} data={cert} />
              ))
            ) : (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <Typography variant="h6" color="text.secondary">
                  Tidak ada sertifikat yang ditemukan
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Sertifikat akan muncul setelah Anda berpartisipasi dan menang
                  dalam turnamen
                </Typography>
              </Box>
            )}

            {certificates.length > 0 && (
              <Box
                sx={{ marginTop: 4, display: "flex", justifyContent: "center" }}
              >
                <MuiPagination
                  count={pagination.last_page}
                  page={pagination.current_page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </Box>
        </Paper>

        <Box height="200px" />
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
