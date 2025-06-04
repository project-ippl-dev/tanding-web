import { Box } from "@mui/material";
import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flex: 1,
          backgroundColor: "#e3f2fd",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="/login-illustration.png"
          alt="Illustration"
          width={600}
          height={600}
          className="max-w-full h-auto object-contain"
          // style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          p: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RegisterForm />
      </Box>
    </Box>
  );
}
