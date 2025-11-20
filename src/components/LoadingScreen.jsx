// src/components/LoadingScreen.jsx
import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
}

