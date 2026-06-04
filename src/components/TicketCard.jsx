import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useEvent } from "../context/EventContext";

import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import barcodeIcon from "../icons/barcode-scan-icon.png";
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
        borderRadius: 1,
        overflow: "hidden",
        mb: 0.5,
        mt: 1,
      }}
    >
      {/* Top Grey Bar */}
        <Box
          sx={{
            height: 30,
            background: "#d0d0d0",
            borderTopLeftRadius: 1,
            borderTopRightRadius: 1,
            color: "#000000",
            display: "flex",
            alignItems: "center",
            px: 1,
            position: "relative",
          }}
        >

          {/* Center title */}
          <Typography sx={{ fontSize: 14, fontWeight: 700, textAlign: "center" }}>
            {ticket.title}
          </Typography>

          {/* Right icon */}
      {/*<Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <InfoOutlineIcon sx={{opacity: 0.7}}/>
          </Box> */}
        </Box>


        {/* DIVIDER */}
        <Box sx={{ width: "40%", height: "0px", bgcolor: "rgba(255,255,255,0.25)", mb: 0.24 }} />

      {/* SEC/ROW/SEAT */}
      <Box
        sx={{
          background: "#d0d0d0",
          color: "white",
          mt: 0,
          pb: 2,
          pt: 1,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "#000000",
            px: 3,
            mt: 1,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ opacity: 0.7, fontSize: 13, fontWeight: 600 }}>SEC</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
              {seat.sec}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ opacity: 0.7, fontSize: 13, fontWeight: 600}}>ROW</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
              {seat.row}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ opacity: 0.7, fontSize: 13, fontWeight: 600 }}>SEAT</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
              {seat.seat}
            </Typography>
          </Box>
        </Box>
      </Box>

    </Box>
  );
}

