import { Avatar, Box, Typography } from "@mui/material";

export default function AvatarBoxButton({
  onClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event: any) => void;
}) {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        margin: "0 40px 0 14px",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#e1ebff",
        },
      }}
      onClick={onClick}
    >
      <Avatar
        sx={{
          width: "30px",
          height: "30px",
        }}
        alt="image"
      />
      <Typography
        sx={{
          color: "black",
          marginLeft: "10px",
        }}
        noWrap
      >
        username
      </Typography>
    </Box>
  );
}
