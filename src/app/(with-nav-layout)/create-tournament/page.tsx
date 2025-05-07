"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
  Typography,
  Paper,
  Divider,
  alpha,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import SettingDialog from "@/components/create-tournament/SettingDialog";
import PanitiaDialog from "@/components/create-tournament/PanitiaDialog";
import TournamentForm from "@/components/create-tournament/TournamentForm";
import { useAuth } from "@/context/auth.context";
import Link from "next/link";

// Type definitions
interface ISettingValues {
  groupName: string;
  eliminationType: "single" | "double";
  fee: number;
}

interface Panitia {
  name: string;
  role: string;
}

interface PanitiaSaveData {
  panitia: Panitia[];
}

interface TournamentFormData {
  [key: string]: any; // Replace with specific fields if known
}

interface CompleteFormData {
  settings: ISettingValues;
  panitia: Panitia[];
  tournament: TournamentFormData;
}

export default function TournamentSettingsPage() {
  const theme = useTheme();
  const router = useRouter(); // Initialize router
  const { authData } = useAuth();

  // All state declarations must be at the top level before any conditionals
  const [openSetting, setOpenSetting] = useState(false);
  const [openPanitia, setOpenPanitia] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [settingData, setSettingData] = useState<ISettingValues>({
    groupName: "Group of 5",
    eliminationType: "single",
    fee: 0,
  });

  const [panitiaData, setPanitiaData] = useState([
    { name: "Dytlan", role: "Admin" },
  ]);

  const [tournamentFormData, setTournamentFormData] =
    useState<TournamentFormData | null>(null);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsAuthLoaded(true);
    }, 1500); // 1.5 seconds loading simulation

    return () => clearTimeout(timer);
  }, []);

  // If loading, show loading spinner
  if (isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  // If not authenticated, don't render the component content
  if (isAuthLoaded && !authData) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error" variant="filled">
          Anda harus&nbsp;
          <Link href="/login" passHref>
            <Button color="inherit" size="small">
              login
            </Button>
          </Link>
          &nbsp;untuk mengakses halaman ini.
        </Alert>
      </Container>
    );
  }

  // Dialog submission
  const handleSettingSave = (data: ISettingValues) => {
    setSettingData(data);
    setOpenSetting(false);
  };

  const handlePanitiaSave = (data: PanitiaSaveData) => {
    setPanitiaData(data.panitia);
    setOpenPanitia(false);
  };

  const handleTournamentFormSubmit = async (data: TournamentFormData) => {
    setTournamentFormData(data);

    try {
      setIsSubmitting(true);

      // Prepare data for API
      const tournamentData = {
        name: data.clubName,
        type: "competition",
        description: data.description,
        prize_pool: data.prize || "0",
        location: data.online ? "Online" : `${data.location}, ${data.province}`,
        province: data.province || "Not specified",
        city: "Not specified",
        thumbnail: "http://placeholder.com/image", // Placeholder
        start_date: data.startDate,
        end_date: data.endDate,
        deadline: data.regClose,
        sport_id: "07302ca3-0350-46ad-861e-f9bcb99668df", // Placeholder
        rules: data.rules,
        proposal_link: "http://placeholder.com/proposal", // Placeholder
        quota: data.quota,
        open: data.regOpen,
      };

      // Send data to API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_TANDING_API_BASE_URL}/event`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${(authData as any)?.token.access_token}`,
          },
          body: JSON.stringify(tournamentData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create tournament");
      }

      // Show success message
      setAlertState({
        open: true,
        message: "Tournament created successfully!",
        severity: "success",
      });

      // You can redirect the user or clear the form here if needed
    } catch (error) {
      console.error("Error creating tournament:", error);
      setAlertState({
        open: true,
        message: "Failed to create tournament. Please try again.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAlert = () => {
    setAlertState({
      ...alertState,
      open: false,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight="500">
          Buat Tournament Baru
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Silakan lengkapi semua detail untuk membuat tournament baru
        </Typography>
      </Paper>

      <Box mb={3}>
        <Card elevation={2} sx={{ borderRadius: 2, overflow: "visible" }}>
          <CardHeader
            avatar={<SettingsIcon color="primary" />}
            title={
              <Typography variant="h6" fontWeight="500">
                Setting Pertandingan
              </Typography>
            }
            subheader="Silakan atur kelas tournament yang ingin anda selenggarakan"
            action={
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setOpenSetting(true)}
                size="small"
              >
                Edit
              </Button>
            }
            sx={{ pb: 1 }}
          />
          <Divider />
          <CardContent>
            <Typography variant="subtitle1" fontWeight="500">
              {settingData.groupName}
            </Typography>
            <Typography variant="body2">
              {settingData.eliminationType === "single"
                ? "Single Elimination"
                : "Double Elimination"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Biaya daftar: Rp {settingData.fee.toLocaleString("id-ID")}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box mb={4}>
        <Card elevation={2} sx={{ borderRadius: 2, overflow: "visible" }}>
          <CardHeader
            avatar={<GroupIcon color="primary" />}
            title={
              <Typography variant="h6" fontWeight="500">
                Panitia Pertandingan
              </Typography>
            }
            subheader="Panitia bertugas mengupdate dan bertanggung jawab saat pertandingan berjalan"
            action={
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setOpenPanitia(true)}
                size="small"
              >
                Edit
              </Button>
            }
            sx={{ pb: 1 }}
          />
          <Divider />
          <CardContent>
            {panitiaData.map((item, index) => (
              <Box key={index} mb={index !== panitiaData.length - 1 ? 1 : 0}>
                <Typography variant="subtitle1" fontWeight="500">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.role}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>

      <TournamentForm
        onSubmitComplete={handleTournamentFormSubmit}
        isSubmitting={isSubmitting}
      />

      <SettingDialog
        open={openSetting}
        onClose={() => setOpenSetting(false)}
        onSave={handleSettingSave}
        initialData={settingData}
      />

      <PanitiaDialog
        open={openPanitia}
        onClose={() => setOpenPanitia(false)}
        onSave={handlePanitiaSave}
        initialData={panitiaData}
      />

      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertState.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
