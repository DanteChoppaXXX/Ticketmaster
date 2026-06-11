import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Link,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../context/EventContext";
import TixCard from "../components/TixCard";
import TicketCard from "../components/TicketCard";
import ListTickets from "../components/ListTickets";
import OrderHeader from "../components/OrderHeader";
import TicketTransferFlow from "../components/TicketTransferFlow";
import SyncIcon from "@mui/icons-material/Loop";

export default function MyTickets() {
  const navigate = useNavigate();
  const { events, selectedEvent } = useEvent();
  const event = selectedEvent || (Array.isArray(events) ? events[0] : events);

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const handleDrawerOpen = () => setOpen(true);

  useEffect(() => {
    if (!events || (Array.isArray(events) && events.length === 0)) {
      navigate("/myevents");
    }
  }, [events]);

  return (
    <Box sx={{ minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── Hero Section ───────────────────────────────── */}
      <Box sx={{ position: "relative", width: "100%", height: 200, overflow: "hidden", flexShrink: 0 }}>

        {/* Hero Image */}
        <Box
          component="img"
          src={event?.image}
          alt={event?.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
          }}
        />

        {/* Dark gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 40%, rgba(0,0,0,0.9) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Top-left close button */}
        <IconButton
          onClick={() => navigate("/myevents")}
          aria-label="close"
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            backgroundColor: "rgba(50,50,50,0.65)",
            borderRadius: "16px",
            padding: "6px",
            color: "#fff",
            backdropFilter: "blur(4px)",
            "&:hover": { backgroundColor: "rgba(50,50,50,0.85)" },
          }}
        >
          <ArrowBack fontSize="small" />
        </IconButton>

        {/* Top-right Help button */}
        <Box
          sx={{
            position: "absolute",
            top: 14,
            right: 14,
            backgroundColor: "rgba(50,50,50,0.65)",
            borderRadius: "16px",
            backdropFilter: "blur(4px)",
            px: 1.50,
            py: 0.50,
            cursor: "pointer",
            "&:hover": { backgroundColor: "rgba(50,50,50,0.85)" },
          }}
        >
          <Link underline="none" sx={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>
            Help
          </Link>
        </Box>
      </Box>

      {/* ── Content Area ───────────────────────────────── */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: "20px" }}>

        <TixCard event={selectedEvent} />

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          variant="fullWidth"
          sx={{
            background: "#ffffff",
            "& .MuiTab-root": {
              color: "#808080",
              textTransform: "none",
              fontWeight: 500,
            },
            "& .Mui-selected": {
              color: "#000000 !important",
              fontWeight: 600,
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#000000",
            },
          }}
        >
          <Tab label="TICKETS" />
          <Tab label="EXTRAS" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ pt: 0.2 }}>
          {tab === 0 && (
            <>
              <OrderHeader/>
              <ListTickets/>
              {/* Map Section */}
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
                  src={`https://www.google.com/maps?q=${encodeURIComponent(event?.venue || "")}&output=embed`}
                />

                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    bgcolor: "rgba(0,0,0,0.0)",
                    color: "#fff",
                    px: 4,
                    py: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: "#505050", fontSize: 24, fontWeight: 500 }}>
                    {event?.venue || ""}
                  </Typography>
                </Box>
              </Box>
            </>
          )}

          {tab === 1 && (
            <Box sx={{ p: 3, textAlign: "center", color: "#777" }}>
              <Typography sx={{ fontSize: 14 }}>No Add-ons available.</Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* ── Floating Transfer / Sell bar ───────────────── */}
      <Box
        sx={{
          position: "fixed",
          bottom: 64,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "stretch",
          backgroundColor: "#ffffff",
          borderRadius: "32px",
          boxShadow: "0 4px 18px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.09)",
          overflow: "hidden",
          zIndex: 1300,
        }}
      >
        {/* Transfer */}
        <Button
          onClick={handleDrawerOpen}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1px",
            minWidth: 70,
            padding: "4px 8px",
            background: "none",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "11.5px",
            color: "#111",
            borderRadius: 0,
            "&:hover": { background: "#f5f5f5" },
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
          Transfer
        </Button>

        {/* Divider */}
        <Box sx={{ width: "1.1px", backgroundColor: "#e0e0e0", my: "8px" }} />

        {/* Sell */}
        <Button
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
            minWidth: 70,
            padding: "1px 8px",
            background: "none",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "11.5px",
            color: "#111",
            borderRadius: 0,
            "&:hover": { background: "#f5f5f5" },
          }}
        >
          <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1976d2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 4v6h-6" />
          <path d="M1 20v-6h6" />
          <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10" />
          <path d="M20.49 15a9 9 0 0 1-14.13 3.36L1 14" />
        </svg>
          Sell
        </Button>
      </Box>

      <TicketTransferFlow open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
