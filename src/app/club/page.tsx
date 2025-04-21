import PageTitleSection from "@/components/common/PageTitleSection";
import { Container, Typography } from "@mui/material";

export default async function Home() {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#1C1D1F" }}>
      <div className="py-10 px-50 text-white">
        <PageTitleSection title="Bergabung dengan Club">
          Buat atau bergabung dengan club terbaik untukmu dan bermainlah
          bersama!
        </PageTitleSection>
      </div>
    </Container>
  );
}
