import { Box, Typography } from "@mui/material";

function TabPanel({
  children,
  value,
  index,
  ...props
}: {
  children?: React.ReactNode;
  value: number;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...props}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default TabPanel;