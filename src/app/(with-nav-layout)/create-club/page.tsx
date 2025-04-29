import { Container } from "@mui/material";
import CreateClubForm from "./_components/CreateClubForm";

export default function CreateClubPage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        // paddingTop: "50px",
        paddingBottom: "50px",
        // [theme.breakpoints.down("md")]: {
        //   paddingTop: theme.spacing(10),
        // },
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
