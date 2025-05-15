import { Container } from "@mui/material";
import ClubPageContents from "./_components/ClubPageContents";

export default function ClubPage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingBottom: "50px",
        paddingTop: {
          md: "50px",
          xs: "40px",
        },
      }}
    >
      <ClubPageContents />
    </Container>
  );
}
