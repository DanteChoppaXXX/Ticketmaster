import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import CustomizeTicket from "../components/CustomizeTicket"

export default function Customize({events, onUpdate}) {
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
              onClick={() => navigate("/sell")}
              sx={{ color: "white" }}
            >
              <ArrowBack />
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
                pr: 2,
              }}
            >
              Customize Ticket
            </Typography>
          </Box>

          {/* RIGHT RESET BUTTON */}
          <Box sx={{ ml: "auto", pt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff2b00",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: 10,
                  textTransform: "none",
                  minWidth: "auto",
                  px: 1.5,
                  py: 0.7,
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#cc0000",
                  },
                }}
              >
                Reset App
              </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* EMPTY BODY */}
      <CustomizeTicket events={events} onUpdate={onUpdate} />   
    </Box>
  );
}



