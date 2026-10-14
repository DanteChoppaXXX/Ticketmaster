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
import VenueLayout from "../assets/venue.jpeg";

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
              {/* Get Directions */}
              <Box sx={{ textAlign: "center", mt: 1.5, mb: 3 }}>
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event?.venue || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="always"
                  sx={{
                    color: "#333",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Get Directions
                </Link>
              </Box>

              {/* Seat Map Section */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#222",
                    letterSpacing: 0.5,
                    mb: 0.5,
                  }}
                >
                  SEAT MAP
                </Typography>

                <Typography
                  sx={{
                    fontSize: 14,
                    color: "#888",
                    mb: 2,
                  }}
                >
                  Venue layout for this event
                </Typography>

                <Box
                  component="img"
                  src={
                    VenueLayout
                  }
                  alt="Venue seating layout"
                  sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderRadius: "12px",
                    display: "block",
                    boxShadow: "0 3px 12px rgba(0,0,0,0.10)",
                  }}
                />
              </Box>

              {/* Ticket Sharing Graphic */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  minHeight: 210,
                  display: "flex",
                  overflow: "hidden",
                  bgcolor: "#30212d",
                  mb: 4,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.10)",
                }}
              >
                {/* Event image */}
                <Box
                  sx={{
                    width: "62%",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      overflow: "hidden",
                      bgcolor: "#171717",
                    }}
                  >
                    <Box
                      component="img"
                      src={event?.image}
                      alt={event?.name || "Event"}
                      sx={{
                        width: "100%",
                        height: 90,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    <Box sx={{ px: 1.5, py: 1.25 }}>
                      <Typography
                        sx={{
                          fontSize: 10,
                          color: "#ddd",
                          mb: 0.5,
                        }}
                      >
                        {event?.date || "Event date"}
                        {event?.time ? ` · ${event.time}` : ""}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: "#fff",
                          lineHeight: 1.4,
                        }}
                      >
                        {(event?.name || "YOUR EVENT").toUpperCase()}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 11,
                          color: "#aaa",
                          mt: 0.5,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {event?.venue || "Event venue"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Ticket confirmation */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: 1,
                    color: "#fff",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 17, sm: 21 },
                      fontWeight: 500,
                      lineHeight: 1.35,
                      letterSpacing: 1,
                    }}
                  >
                    YOU GOT
                    <br />
                    TICKETS!
                  </Typography>

                  <Box
                    sx={{
                      width: 45,
                      height: 2,
                      bgcolor: "#fff",
                      my: 1.5,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 11,
                      letterSpacing: 2,
                      color: "#ddd",
                    }}
                  >
                    X {event?.ticketCount || 4} TICKETS
                  </Typography>
                </Box>
              </Box>

              {/* Social Sharing Section */}
              <Box
                sx={{
                  mx: -2.5,
                  px: 2.5,
                  py: 3,
                  bgcolor: "#ededed",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#171717",
                    mb: 1,
                  }}
                >
                  Post on social
                </Typography>

                <Typography
                  sx={{
                    fontSize: 14,
                    color: "#666",
                    lineHeight: 1.6,
                    mb: 2,
                  }}
                >
                  Build hype for your event and share your tickets with
                  friends and family.
                </Typography>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: event?.name || "My event tickets",
                        text: `I'm going to ${event?.name || "this event"}!`,
                        url: window.location.href,
                      }).catch(() => {});
                    } else {
                      navigator.clipboard?.writeText(window.location.href);
                    }
                  }}
                  sx={{
                    borderColor: "#ccc",
                    color: "#222",
                    borderRadius: 3,
                    py: 1.2,
                    fontWeight: 700,
                    textTransform: "none",
                    bgcolor: "#fff",
                    "&:hover": {
                      bgcolor: "#f8f8f8",
                      borderColor: "#999",
                    },
                  }}
                >
                  Share You're Going ↗
                </Button>
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
            minWidth: 90,
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
            minWidth: 90,
            minHeight: 60,
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
