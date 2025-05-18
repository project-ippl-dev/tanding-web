import React from "react";
import { Box, Skeleton, Divider } from "@mui/material";

const SecondTournamentItemSkeleton = () => {
  return (
    <div>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          margin: { xs: 2, md: "13.6px 16px" },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ position: "relative" }}>
          {/* Approximate size of the Image component in SecondTournamentItem */}
          <Skeleton variant="rectangular" width={267} height={150} />
        </Box>
        <Box pl={{ xs: 0, md: 2 }} sx={{ width: "100%", mt: { xs: 1, md: 0 } }}>
          <Skeleton variant="text" sx={{ fontSize: "15px", width: "80%" }} />
          
          <Box mt={0.5}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <Skeleton variant="circular" width={20} height={20} sx={{ marginRight: "5px" }} />
              <Skeleton variant="text" sx={{ fontSize: "13px", width: "50%" }} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <Skeleton variant="rectangular" width={15} height={15} sx={{ mr: "5px", borderRadius: "4px" }} />
              <Skeleton variant="text" sx={{ fontSize: "13px", width: "60%" }} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Skeleton variant="rectangular" width={15} height={15} sx={{ mr: "5px", borderRadius: "4px" }} />
              <Skeleton variant="text" sx={{ fontSize: "13px", width: "70%" }} />
            </Box>
          </Box>

          <Box marginTop={1.2}>
            <Skeleton variant="text" sx={{ fontSize: "12px", width: "40%" }} />
            <Skeleton variant="text" sx={{ fontSize: "17px", width: "60%", mt: "-3px" }} />
            <Skeleton variant="rectangular" width="100%" height={3} sx={{ my: 1, borderRadius: "1px" }} />
            <Skeleton variant="text" sx={{ fontSize: "13px", width: "30%" }} />
          </Box>
        </Box>
      </Box>
      <Divider />
    </div>
  );
};

export default SecondTournamentItemSkeleton;
