import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../context/EventContext";
import SwipeTickets from "../components/SwipeTickets";
import TicketTransferFlow from "../components/TicketTransferFlow";

export default function MyTickets() {
  const navigate = useNavigate();
  const { events, selectedEvent } = useEvent(); // use selectedEvent if available
  const event = selectedEvent || (Array.isArray(events) ? events[0] : events); // fallback to first event

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const ticketCount = event?.tix|| 0;

  useEffect(() => {
    if (!events || (Array.isArray(events) && events.length === 0)) {
      navigate("/myevents");
    }
  }, [events]);

  return (
    <Box sx={{ minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column", overflow: "hidden", }}>
      {/* TOP BAR */}
      <AppBar
        position="sticky"
        elevation={1}
        sx={{ background: "#1f262d", top: 0, width: "100%" }}
      >
        <Toolbar sx={{ position: "relative" }}>
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

          <Box sx={{ ml: "auto", pt: 2 }}>
            <Link
              underline="none"
              sx={{ color: "#ffffff", fontWeight: 600, fontSize: 14 }}
            >
              Help
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* TABS */}
      <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          variant="fullWidth"
          sx={{
            background: "#024ddf",
            color: "#ffffff",

            // inactive tab text
            "& .MuiTab-root": {
              color: "#d0d0d0",
              textTransform: "none",
              fontWeight: 500,
            },

            // active tab text
            "& .Mui-selected": {
              color: "#ffffff !important",
              fontWeight: 600,
            },

            // indicator bar color
            "& .MuiTabs-indicator": {
              backgroundColor: "#ffffff",
            },
          }}
        >
          <Tab label={`MY TICKETS (${ticketCount})`} />
          <Tab label="ADD-ONS" />
        </Tabs>

      {/* TAB CONTENT */}
      <Box sx={{ pt: 0.2 }}>
        {tab === 0 && (
          <>
            <SwipeTickets />

            {/* TRANSFER + SELL BUTTONS */}
            <Box sx={{ display: "flex", gap: 2, mt: 1, ml: 1 }}>
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
           {/* MAP SECTION */}
            <Box
              sx={{
                mt: 3,
                width: "100%",
                height: 120,
                borderRadius: 6,
                overflow: "hidden",
                position: "relative",
                mb: 1,
              }}
            >
              {/* Map iframe */}
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  event?.venue || ""
                )}&output=embed`}
              ></iframe>

              {/* Venue overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.0)", // keep transparent
                  color: "#fff",
                  px: 4,
                  py: 0,
                  display: "flex",
                  alignItems: "center",
                  borderBottomLeftRadius: 6,
                  borderBottomRightRadius: 6,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#505050", fontSize: 24, fontWeight: 500 }}
                >
                  {event?.venue || ""}
                </Typography>
              </Box>
            </Box>

          </>
        )}

        {tab === 1 && (
          <Box sx={{ p: 3, textAlign: "center", color: "#777" }}>
            <Typography sx={{ fontSize: 14 }}>
              No Add-ons available.
            </Typography>
          </Box>
        )}
      </Box>

      <TicketTransferFlow open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

