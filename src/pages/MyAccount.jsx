import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function MyAccount() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // redirect to login page after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* STICKY TOP BAR */}
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          background: "#1f262d",
          top: 0,
          width: "100%",
        }}
      >
        <Toolbar sx={{ position: "relative" }}>
          {/* LEFT CLOSE BUTTON */}
          <Box sx={{ mr: "auto", pt: 2 }}>
            <IconButton
              edge="start"
              aria-label="close"
              onClick={() => navigate("/myevents")}
              sx={{ color: "white" }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* CENTER TITLE */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              pt: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: 15,
                color: "#ffffff",
                textAlign: "center",
                pt: 1,
              }}
            >
              My Account
            </Typography>
          </Box>

          {/* RIGHT LOGOUT BUTTON */}
          <Box sx={{ ml: "auto", pt: 1 }}>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={handleLogout}
              sx={{
                borderColor: "white",
                color: "white",
                textTransform: "none",
                fontSize: 12,
                "&:hover": {
                  borderColor: "#f5f5f5",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* EMPTY BODY */}
      <Box sx={{ p: 3 }}></Box>
    </Box>
  );
}

