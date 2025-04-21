import { Typography } from "@mui/material";

export default function PageTitleSection({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="py-10 px-50 text-white bg-[#1C1D1F]">
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
