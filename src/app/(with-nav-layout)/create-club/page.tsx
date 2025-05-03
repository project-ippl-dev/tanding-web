import { Container } from "@mui/material";
import CreateClubForm from "./_components/CreateClubForm";

export default function CreateClubPage() {
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
      <CreateClubForm />
      {/* <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </Container>
  );
}
