import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useEvent } from "../context/EventContext";

import walletIcon from "../icons/icon_wallet.svg";
import verified from "../assets/ver.png";

export default function TicketCard({ event, seatInfo }) {
  const { events } = useEvent();

  // If a specific event was passed from SwipeTickets, use it.
  // Otherwise fall back to global event.
  const ticket = event || events;

  // Seat details passed from SwipeTickets
  const seat = seatInfo || ticket?.seatMap?.[0] || {};

  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        background: "white",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.12)",
        mb: 0.5,
      }}
    >
      {/* Top Blue Bar */}
      <Box
        sx={{
          height: 30,
          background: "#0064ca",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        <Typography sx={{ pt: 0.5, fontSize: 13, fontWeight: 500 }}>
          {ticket.title}
        </Typography>
      </Box>

      {/* SEC/ROW/SEAT */}
      <Box
        sx={{
          background: "#0071e3",
          color: "white",
          p: 2,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 3,
            mt: 1,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ opacity: 0.7, fontSize: 12 }}>SEC</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
              {seat.sec}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ opacity: 0.7, fontSize: 12 }}>ROW</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
              {seat.row}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ opacity: 0.7, fontSize: 12 }}>SEAT</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
              {seat.seat}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* EVENT IMAGE */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 220,
          overflow: "hidden",
        }}
      >
        <img
          src={ticket.image}
          alt={ticket.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "80%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            p: 0.5,
            color: "white",
          }}
        >
          <Typography sx={{ textAlign: "center", fontWeight: 500, fontSize: 18 }}>
            {ticket.name}
          </Typography>

          <Typography sx={{ textAlign: "center", fontSize: 14, opacity: 0.9 }}>
            {ticket.date} {ticket.location}
          </Typography>
        </Box>
      </Box>

      {/* SECTION LABEL */}
      <Typography
        sx={{
          textAlign: "center",
          mt: 4,
          fontWeight: 500,
          fontSize: 15,
        }}
      >
        {ticket.seating}
      </Typography>

      {/* Add to Apple Wallet */}
      <Box sx={{ p: 2, mt: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          sx={{
            background: "#1a1a1a",
            width: "70%",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            py: 1,
            ml: "auto",
            mr: "auto",
          }}
        >
          <img
            src={walletIcon}
            alt="Apple Wallet"
            style={{ width: 22, height: 22 }}
          />
          Add to Apple Wallet
        </Button>
      </Box>

      {/* Footer Links */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          pb: 4,
          mt: 2,
        }}
      >
        <Typography sx={{ color: "#0071e3", fontWeight: 700, fontSize: 13 }}>
          View Barcode
        </Typography>

        <Typography sx={{ color: "#0071e3", fontWeight: 700, fontSize: 13 }}>
          Ticket Details
        </Typography>
      </Box>

      {/* Bottom Verified Badge */}
      <Box
        sx={{
          height: 30,
          background: "#0064ca",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 1,
        }}
      >
        <img
          src={verified}
          alt="ticketmaster verified"
          style={{ height: 24 }}
        />
      </Box>
    </Box>
  );
}

