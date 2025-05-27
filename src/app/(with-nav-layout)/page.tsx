import HomeEventsCarousel from "@/components/home/HomeEventsCarousel";
import HomePageContents from "@/components/home/HomePageContents";
import { Container } from "@mui/material";

export default async function Home() {

  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: {
          xs: 0,
          md: 10,
        },
      }}
    >
      <HomeEventsCarousel />
      {/* <Typography>Welcome to Tanding!</Typography>
      <Typography>-Sedang dalam pengembangan-</Typography> */}
      <HomePageContents />
    </Container>
  );
}
