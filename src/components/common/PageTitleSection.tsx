import { Typography } from "@mui/material";

export default async function PageTitleSection({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 600,
          lineHeight: "32px",
        }}
      >
        {title ? title : "Page Title"}
      </Typography>
      {children ? (
        <Typography
          sx={{
            fontSize: "18px",
          }}
        >
          {children}
        </Typography>
      ) : null}
    </div>
  );
}
