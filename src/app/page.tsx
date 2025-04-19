// import { getBffApiUrl } from "@/utils/api";
import { Container, Typography } from "@mui/material";

// // Example of data fetching with server components
// async function fetchData() {
//   const response = await fetch(getBffApiUrl("/api"), {
//     method: "GET",
//   });
//   return response.json();
// }

export default async function Home() {
  // const data = await fetchData(); // Example Fetch data from the API

  return (
    <Container>
      <Typography>Welcome to Tanding!</Typography>
      <Typography>-Sedang dalam pengembangan-</Typography>
    </Container>
  );
}
