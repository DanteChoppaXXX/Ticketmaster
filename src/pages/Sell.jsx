import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Link,
  IconButton,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import Add from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function MyTickets() {
  const navigate = useNavigate();

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
              Manage Tickets
            </Typography>
          </Box>

          {/* RIGHT RESET BUTTON */}
          <Box sx={{ ml: "auto", pt: 1 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: 10,
                  textTransform: "none",
                  minWidth: "auto",
                  px: 1,
                  py: 0.5,
                  borderRadius: "6px",
                  "&:hover": {
                    backgroundColor: "",
                  },
                }}
                onClick={() => navigate("/foryou")}
              >
                <Add />
              </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* EMPTY BODY */}
      <Box sx={{ p: 3 }}></Box>
    </Box>
  );
}


