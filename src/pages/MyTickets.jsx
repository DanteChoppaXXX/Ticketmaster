import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link,
  IconButton,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../context/EventContext";
import SwipeTickets from "../components/SwipeTickets";
import TicketTransferFlow from "../components/TicketTransferFlow";

export default function MyTickets() {
  const navigate = useNavigate();
  const { events } = useEvent();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);


  // Redirect if no event exists
  useEffect(() => {
    if (!events || (Array.isArray(events) && events.length === 0)) {
      navigate("/myevents");
    }
  }, [events]);

  return (
    <Box sx={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* TOP BAR */}
      <AppBar
        position="sticky"
        elevation={1}
        sx={{ background: "#1f262d", top: 0, width: "100%" }}
      >
        <Toolbar sx={{ position: "relative" }}>
          {/* CLOSE BUTTON */}
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

          {/* TITLE */}
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
              My Tickets
            </Typography>
          </Box>

          {/* HELP */}
          <Box sx={{ ml: "auto", pt: 2 }}>
            <Link
              href="#"
              underline="none"
              sx={{ color: "#ffffff", fontWeight: 600, fontSize: 14 }}
            >
              Help
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* BODY */}
      <Box sx={{ pt: 0.5, ml: 1 }}>
        <SwipeTickets />

        {/* TRANSFER + SELL BUTTONS */}
        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          <Button
            variant="contained"
            onClick={handleDrawerOpen}
            sx={{
              flex: 1,
              background: "#026AE1",
              textTransform: "none",
              fontWeight: 600,
              color: "#fff",
              "&:hover": { background: "#025ac0" },
              ml: 1,
            }}
          >
            Transfer
          </Button>

          <Button
            variant="contained"
            sx={{
              flex: 1,
              background: "#dddddd",
              textTransform: "none",
              fontWeight: 600,
              color: "#ffffff",
              "&:hover": { background: "#cccccc" },
              mr: 2,
            }}
          >
            Sell
          </Button>
        </Box>
      </Box>

      <TicketTransferFlow
        open={open}
        onClose={() => setOpen(false)}
      />  
    </Box>
  );
}

