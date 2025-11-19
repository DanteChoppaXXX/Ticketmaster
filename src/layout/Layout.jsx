import React from "react";
import Logo from "../assets/image 1.png";
import UserProfile from "../assets/user.png";

import { AppBar, Toolbar, Box, IconButton, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, Link, useLocation } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";

const Layout = ({ navbar = true }) => {
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden", width: "100%" }}>
      {/* Plain AppBar */}
      {navbar && (
        <AppBar
          position="static"
          sx={{
            bgcolor: "#1C1C1C", // Charcoal black
            boxShadow: "none",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/">
              <img src={Logo} alt="logo" width={24} />
            </Link>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: 1 }}>
                <img src={UserProfile} alt="user icon" width={36} />
              </Box>
              <IconButton sx={{ color: "#fff", mr: 1 }}>
                <SearchIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* Main content */}
      <Box sx={{ my: 3 }}>
        <Container>
          <Outlet />
        </Container>
      </Box>

      {/* Bottom Navigation */}
      {!(location.pathname === "/ticket" || location.pathname === "/update-details") && (
        <BottomNavBar />
      )}
    </Box>
  );
};

export default Layout;
