import React from "react";
import { useEvent } from "../context/EventContext";

const EventTicketView = () => {
  const { selectedEvent } = useEvent();

  if (!selectedEvent) {
    return (
      <div style={s.emptyWrap}>
        <p style={s.emptyText}>No event selected.</p>
      </div>
    );
  }

  const { name, image, date, venue, tix, seatMap = [] } = selectedEvent;

  const ticketCards = Array.from({ length: tix }, (_, i) => ({
    index: i,
    sec: seatMap[i]?.sec ?? "—",
    row: seatMap[i]?.row ?? "—",
    seat: seatMap[i]?.seat ?? "—",
  }));

  return (
    <div style={s.page}>

      {/* ── Hero image + top nav ─────────────────────────── */}
      <div style={s.heroWrap}>
        {image
          ? <img src={image} alt={name} style={s.heroImg} />
          : <div style={s.heroFallback} />
        }
        {/* dark gradient so nav buttons are legible */}
        <div style={s.heroGradientTop} />
        <div style={s.heroGradientBottom} />

        {/* top-left back button */}
        <button style={s.navBtnLeft} aria-label="Go back">
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path d="M8.5 1L1.5 8L8.5 15" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* top-right help */}
        <button style={s.navBtnRight}>
          <span style={s.helpText}>Help</span>
        </button>
      </div>

      {/* ── White content area ───────────────────────────── */}
      <div style={s.body}>

        {/* date line */}
        <p style={s.dateLine}>{date}</p>

        {/* event title */}
        <h1 style={s.title}>{name}</h1>

        {/* venue row */}
        <div style={s.venueRow}>
          <span style={s.venueName}>{venue}</span>
          <div style={s.ticketBadge}>
            <TicketIcon />
            <span style={s.ticketBadgeText}>x{tix}</span>
          </div>
        </div>

        {/* divider */}
        <div style={s.divider} />

        {/* View Tickets button */}
        <button style={s.viewBtn}>
          <BarcodeIcon />
          <span style={s.viewBtnText}>View Tickets</span>
        </button>

        {/* Tabs */}
        <div style={s.tabBar}>
          <div style={s.tabActive}>Tickets</div>
          <div style={s.tabInactive}>Extras</div>
        </div>

        {/* Order row */}
        <div style={s.orderRow}>
          <div>
            <p style={s.orderTitle}>Order #66, <span style={s.orderRedact}>████████</span></p>
            <p style={s.orderSub}>x{tix} Tickets</p>
          </div>
          <button style={s.dotsBtn} aria-label="More options">
            <DotsIcon />
          </button>
        </div>

        {/* Ticket cards */}
        <div style={s.cardList}>
          {ticketCards.map(({ index, sec, row, seat }) => (
            <div key={index} style={s.card}>
              <p style={s.cardHeader}>Standard Tickets</p>
              <div style={s.seatRow}>
                <div style={s.seatCell}>
                  <span style={s.seatLabel}>SECTION</span>
                  <span style={s.seatVal}>{sec}</span>
                </div>
                <div style={s.seatCell}>
                  <span style={s.seatLabel}>ROW</span>
                  <span style={s.seatVal}>{row}</span>
                </div>
                <div style={s.seatCell}>
                  <span style={s.seatLabel}>SEAT</span>
                  <span style={s.seatVal}>{seat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* spacer so content clears the floating bar */}
        <div style={{ height: 80 }} />
      </div>

      {/* ── Floating Transfer / Sell bar ─────────────────── */}
      <div style={s.floatBar}>
        <button style={s.floatBtnLeft}>
          <ArrowUpRightIcon />
          <span style={s.floatBtnText}>Transfer</span>
        </button>
        <div style={s.floatDivider} />
        <button style={s.floatBtnRight}>
          <TagIcon />
          <span style={s.floatBtnText}>Sell</span>
        </button>
      </div>

    </div>
  );
};

/* ── Inline SVG Icons ────────────────────────────────────────────── */

const TicketIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M13 5v2M13 17v2M13 11v2" />
  </svg>
);

const BarcodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 5v14M7 5v14M11 5v14M15 5v6M19 5v6M15 15h5v4h-5zM15 19v1M20 15v-1" />
  </svg>
);

const DotsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
);

const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

/* ── Styles ──────────────────────────────────────────────────────── */

const s = {
  /* Page shell */
  page: {
    position: "relative",
    maxWidth: 430,
    margin: "0 auto",
    backgroundColor: "#fff",
    minHeight: "100vh",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
    overflowX: "hidden",
  },

  /* Hero */
  heroWrap: {
    position: "relative",
    width: "100%",
    height: 260,
    overflow: "hidden",
    backgroundColor: "#111",
  },
  heroImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top center",
    display: "block",
  },
  heroFallback: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1c1c1e",
  },
  heroGradientTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)",
    pointerEvents: "none",
  },
  heroGradientBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)",
    pointerEvents: "none",
  },

  /* Nav buttons on hero */
  navBtnLeft: {
    position: "absolute",
    top: 14,
    left: 14,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(60,60,60,0.75)",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 10,
  },
  navBtnRight: {
    position: "absolute",
    top: 14,
    right: 14,
    height: 34,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 17,
    backgroundColor: "rgba(60,60,60,0.75)",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 10,
  },
  helpText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 500,
  },

  /* White body */
  body: {
    backgroundColor: "#fff",
    padding: "16px 16px 0",
  },

  dateLine: {
    fontSize: 13,
    fontWeight: 500,
    color: "#6b6b6b",
    margin: "0 0 6px",
    letterSpacing: 0.1,
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    color: "#000",
    margin: "0 0 10px",
    lineHeight: 1.2,
    letterSpacing: -0.4,
  },
  venueRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  venueName: {
    fontSize: 14,
    color: "#333",
    fontWeight: 400,
  },
  ticketBadge: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  ticketBadgeText: {
    fontSize: 13,
    color: "#555",
    fontWeight: 500,
  },
  divider: {
    height: "0.5px",
    backgroundColor: "#e0e0e0",
    marginBottom: 14,
  },

  /* View Tickets button */
  viewBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    width: "100%",
    padding: "14px 0",
    backgroundColor: "#2563EB",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    marginBottom: 20,
  },
  viewBtnText: {
    color: "#fff",
    fontSize: 15.5,
    fontWeight: 600,
  },

  /* Tabs */
  tabBar: {
    display: "flex",
    gap: 28,
    borderBottom: "1px solid #e5e5e5",
    marginBottom: 16,
  },
  tabActive: {
    fontSize: 15,
    fontWeight: 700,
    color: "#000",
    paddingBottom: 10,
    borderBottom: "2px solid #000",
    marginBottom: "-1px",
    cursor: "pointer",
  },
  tabInactive: {
    fontSize: 15,
    fontWeight: 400,
    color: "#aaa",
    paddingBottom: 10,
    cursor: "pointer",
  },

  /* Order row */
  orderRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  orderTitle: {
    margin: 0,
    fontSize: 14,
    fontWeight: 700,
    color: "#000",
    lineHeight: 1.4,
  },
  orderRedact: {
    color: "#000",
    letterSpacing: 1,
  },
  orderSub: {
    margin: "2px 0 0",
    fontSize: 13,
    color: "#777",
    fontWeight: 400,
  },
  dotsBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#555",
    padding: 2,
    marginTop: 2,
  },

  /* Ticket cards */
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    overflow: "hidden",
  },
  cardHeader: {
    margin: 0,
    padding: "11px 14px",
    fontSize: 14,
    fontWeight: 700,
    color: "#000",
    backgroundColor: "#f2f2f2",
    borderBottom: "0.5px solid #e0e0e0",
  },
  seatRow: {
    display: "flex",
    padding: "12px 14px",
    gap: 32,
  },
  seatCell: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  seatLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: "#888",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  seatVal: {
    fontSize: 28,
    fontWeight: 700,
    color: "#000",
    lineHeight: 1,
  },

  /* Floating bottom bar */
  floatBar: {
    position: "fixed",
    bottom: 24,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#fff",
    borderRadius: 32,
    boxShadow: "0 4px 20px rgba(0,0,0,0.15), 0 0 0 0.5px rgba(0,0,0,0.08)",
    overflow: "hidden",
    zIndex: 100,
    minWidth: 220,
  },
  floatBtnLeft: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "13px 22px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#111",
  },
  floatDivider: {
    width: "0.5px",
    backgroundColor: "#ddd",
    alignSelf: "stretch",
    margin: "8px 0",
  },
  floatBtnRight: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "13px 22px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#111",
  },
  floatBtnText: {
    fontSize: 14.5,
    fontWeight: 600,
    color: "#111",
  },

  /* Empty state */
  emptyWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
  },
  emptyText: {
    color: "#aaa",
    fontSize: 15,
  },
};

export default EventTicketView;
