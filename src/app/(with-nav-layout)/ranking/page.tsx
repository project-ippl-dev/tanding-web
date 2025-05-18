import { Container } from "@mui/material";
import RankingPageContents from "./_components/RankingPageContents";

export default async function RankingPage() {

  return (
    <Container
      maxWidth="lg">
      <RankingPageContents />
    </Container>
  );
}
