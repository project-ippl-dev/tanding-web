import { Pagination, styled } from "@mui/material";

const CustomPagination = styled(Pagination)(({ /*theme*/ }) => ({
  "& .MuiPagination-ul": {
    justifyContent: "center",
  },
}));

export default CustomPagination;
