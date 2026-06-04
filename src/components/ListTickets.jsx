// components/TicketList.jsx
import React from "react";
import { Box } from "@mui/material";
import TicketCard from "./TicketCard";
import { useEvent } from "../context/EventContext";

export default function TicketList() {
  const { events } = useEvent();

  // Create one ticket card per seat
  const tickets = (() => {
    if (Array.isArray(events)) {
      return events.flatMap((ev) =>
        ev.seatMap?.length
          ? ev.seatMap.map((seat) => ({
              event: ev,
              seat,
            }))
          : [{ event: ev, seat: {} }]
      );
    }

    const ev = events;

    if (ev?.seatMap?.length) {
      return ev.seatMap.map((seat) => ({
        event: ev,
        seat,
      }));
    }

    return ev ? [{ event: ev, seat: {} }] : [];
  })();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        px: 0,
        pb: 0,
      }}
    >
      {tickets.map((ticket, index) => (
        <TicketCard
          key={`${ticket.seat?.seatId || index}`}
          event={ticket.event}
          seatInfo={ticket.seat}
        />
      ))}
    </Box>
  );
}
