import React from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";

const Layout = () => {
  const location = useLocation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        width: "100vw",
      }}
    >
      {/* Content Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          width: "100%",        // ensures full width
        }}
      >
        <Outlet />
      </Box>

      {/* Bottom Navigation */}
      {!(location.pathname === "/mytickets" || location.pathname === "/foryou") && (
        <BottomNavBar />
      )}
    </Box>
  );
};

export default Layout;

