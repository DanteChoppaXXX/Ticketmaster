// components/SwipeTickets.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import { Box, IconButton } from "@mui/material";
import TicketCard from "./TicketCard";
import { useEvent } from "../context/EventContext"; // adjust path to your EventContext file

export default function SwipeTickets() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { events } = useEvent(); // your EventContext returns { events, updateEvent }

  // Normalize to array of ticket items (one per seat) so we can create multiple cards
  const tickets = (() => {
    // If events is an array already, use it. If it's a single object with seatMap, create one per seat.
    if (Array.isArray(events)) {
      // assume each event may also have seatMap; flatten into ticket items per seat
      return events.flatMap((ev) =>
        ev.seatMap && ev.seatMap.length
          ? ev.seatMap.map((s) => ({ event: ev, seat: s }))
          : [{ event: ev, seat: {} }]
      );
    } else {
      // single event object
      const ev = events;
      if (ev?.seatMap && ev.seatMap.length) {
        return ev.seatMap.map((s) => ({ event: ev, seat: s }));
      }
      return [{ event: ev, seat: {} }];
    }
  })();

  // Compute active index on scroll with requestAnimationFrame for smoothness
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId = null;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const children = Array.from(el.children).filter(
          (c) => c.getAttribute && c.getAttribute("data-ticket-card") === "true"
        );
        if (!children.length) return;

        // compute center of container
        const containerRect = el.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;

        // find child whose center is closest to container center
        let closestIndex = 0;
        let closestDist = Infinity;
        children.forEach((child, idx) => {
          const r = child.getBoundingClientRect();
          const childCenter = r.left + r.width / 2;
          const dist = Math.abs(childCenter - centerX);
          if (dist < closestDist) {
            closestDist = dist;
            closestIndex = idx;
          }
        });
        setActiveIndex(closestIndex);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    // call once to set initial
    onScroll();

    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [tickets.length]);

  // helper to scroll to index (center it)
  const scrollToIndex = useCallback(
    (index) => {
      const el = containerRef.current;
      if (!el) return;
      const child = el.children[index];
      if (!child) return;
      const childRect = child.getBoundingClientRect();
      const containerRect = el.getBoundingClientRect();
      const offset =
        child.offsetLeft -
        (containerRect.width / 2 - childRect.width / 2) +
        el.scrollLeft;
      el.scrollTo({ left: offset, behavior: "smooth" });
    },
    [containerRef]
  );

  // Allow tapping page dots to navigate
  const onDotClick = (i) => scrollToIndex(i);

  return (
    <Box sx={{ width: "100%", pb: 2 }}>
      {/* swipe container */}
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          gap: 2,
          px: 2,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch", // iOS momentum
          scrollBehavior: "smooth",
          // hide scrollbar (optional)
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {tickets.map((t, idx) => (
          <Box
            key={idx}
            sx={{
              flex: "0 0 97%", // match card width inside TicketCard
              display: "flex",
              justifyContent: "center",
              scrollSnapAlign: "center",
            }}
            data-ticket-card="true"
          >
            <TicketCard event={t.event} seatInfo={t.seat} />
          </Box>
        ))}
      </Box>

      {/* page dots */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1.2,
          mt: 2,
        }}
      >
        {tickets.map((_, i) => (
          <Box
            key={i}
            onClick={() => onDotClick(i)}
            sx={{
              width: i === activeIndex ? 8 : 8,
              height: i === activeIndex ? 8 : 8,
              borderRadius: "50%",
              bgcolor: i === activeIndex ? "#444" : "#cfcfcf",
              opacity: i === activeIndex ? 1 : 0.95,
              transition: "all 200ms ease",
              cursor: "pointer",
            }}
            aria-label={`Go to ticket ${i + 1}`}
            role="button"
          />
        ))}
      </Box>
    </Box>
  );
}

