// src/pages/ViewTickets.jsx

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useEvent } from "../context/EventContext";

const ViewTickets = () => {
  const {
    events = [],
    selectedEvent,
    selectedSeats = [],
  } = useEvent();

  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  // Use the selected event from context, falling back to events.
  const event = selectedEvent || events?.[0] || null;

  // Create one ticket per seat, matching SwipeTickets.jsx.
  const tickets = useMemo(() => {
    if (!event) return [];

    if (event.seatMap?.length) {
      return event.seatMap.map((seat) => ({
        event,
        seat,
      }));
    }

    if (selectedSeats.length) {
      return selectedSeats.map((seat) => ({
        event,
        seat,
      }));
    }

    return [
      {
        event,
        seat: {
          sec: event.seating || "GA",
          row: "-",
          seat: "-",
        },
      },
    ];
  }, [event, selectedSeats]);

  // Reset the carousel when the event or ticket count changes.
  useEffect(() => {
    setActiveIndex(0);
    setShowInfo(false);

    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: 0,
        behavior: "instant",
      });
    }
  }, [event?.id, event?.name, tickets.length]);

  // Track the ticket closest to the center while scrolling.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId = null;

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const children = Array.from(el.children).filter(
          (child) =>
            child.getAttribute("data-ticket-card") === "true"
        );

        if (!children.length) return;

        const containerRect = el.getBoundingClientRect();
        const centerX =
          containerRect.left + containerRect.width / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        children.forEach((child, index) => {
          const rect = child.getBoundingClientRect();
          const childCenter = rect.left + rect.width / 2;
          const distance = Math.abs(childCenter - centerX);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex(closestIndex);
      });
    };

    el.addEventListener("scroll", onScroll, {
      passive: true,
    });

    onScroll();

    return () => {
      el.removeEventListener("scroll", onScroll);

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [tickets.length]);

  // Smoothly center a selected ticket.
  const scrollToIndex = useCallback((index) => {
    const el = containerRef.current;
    if (!el) return;

    const child = el.children[index];
    if (!child) return;

    const offset =
      child.offsetLeft -
      (el.clientWidth / 2 - child.clientWidth / 2);

    el.scrollTo({
      left: offset,
      behavior: "smooth",
    });
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    return date
      .replace(/\s*[—–-]\s*/g, " • ")
      .replace(/\s+/g, " ")
      .trim();
  };

  if (!event || !tickets.length) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner} />
        <p>Loading your tickets...</p>

        <style>{`
          @keyframes ticketSpin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const currentTicket = tickets[activeIndex] || tickets[0];
  const currentEvent = currentTicket.event;
  const seat = currentTicket.seat || {};

  const ticketTitle =
    currentEvent.title || "General admission Ticket";

  const currentSection =
    seat.sec ??
    seat.section ??
    currentEvent.seating ??
    "GA";

  const currentRow = seat.row ?? "-";
  const currentSeat = seat.seat ?? "-";

  const barcodePattern =
    "101101001110101100101101110010110100111010110010110111001011010011101011001011011100101101001110101100101101";

  return (
    <div style={styles.page}>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .ticket-carousel {
          display: flex;
          gap: 12px;
          padding: 0 12px;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-x: contain;
          scrollbar-width: none;
        }

        .ticket-carousel::-webkit-scrollbar {
          display: none;
        }

        .ticket-slide {
          flex: 0 0 100%;
          min-width: 0;
          display: flex;
          justify-content: center;
          scroll-snap-align: center;
          scroll-snap-stop: always;
        }

        .ticket-card {
          width: 100%;
          animation: ticketEnter 220ms ease-out;
        }

        @keyframes ticketEnter {
          from {
            opacity: 0.7;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ticketSpin {
          to {
            transform: rotate(360deg);
          }
        }

        .wallet-button:hover {
          background: #252525 !important;
        }

        .info-button:hover {
          background: #f4f4f4 !important;
        }

        button {
          -webkit-tap-highlight-color: transparent;
        }

        button:focus-visible {
          outline: 2px solid #3979FF;
          outline-offset: 3px;
        }

        .ticket-artwork img {
          -webkit-user-drag: none;
        }

        @keyframes barcodeScan {
          from {
            left: 0;
          }
          to {
            left: calc(100% - 2px);
          }
        }

        .barcode-scan-line {
          position: absolute;
          top: 0px;
          bottom: 0px;
          left: 0;
          width: 1px;
          height: 150;
          background: #168BFF;
          box-shadow: 0 0 6px 2px rgba(22, 139, 255, 0.45);
          animation: barcodeScan 1.2s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 2;
        }

        @media (min-width: 600px) {
          .ticket-page-inner {
            max-width: 460px !important;
          }

          .ticket-carousel {
            padding: 0 12px;
          }
        }

        @media (max-width: 350px) {
          .ticket-actions {
            gap: 7px !important;
          }

          .wallet-label,
          .ticket-info-label {
            font-size: 11px !important;
          }

          .ticket-artwork {
            height: 270px !important;
          }

          .ticket-carousel {
            padding: 0 8px;
            gap: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticket-card {
            animation: none;
          }

          .ticket-carousel {
            scroll-behavior: auto;
          }
        }
      `}</style>

      {/* Event header */}
      <header style={styles.header}>
        <button
          aria-label="Go back"
          onClick={() => window.history.back()}
          style={styles.backButton}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div style={styles.headerText}>
          <div style={styles.eventName}>
            {event.name || "Your Event"}
          </div>

          <div style={styles.eventSubtitle}>
            {formatDate(event.date)}
            {event.venue ? ` — ${event.venue}` : ""}
          </div>
        </div>
      </header>

      <main
        className="ticket-page-inner"
        style={styles.content}
      >
        {/* Swipeable ticket carousel */}
        <div
          ref={containerRef}
          className="ticket-carousel"
          aria-label="Your event tickets"
        >
          {tickets.map((item, index) => {
            const ticketEvent = item.event;
            const ticketSeat = item.seat || {};

            const section =
              ticketSeat.sec ??
              ticketSeat.section ??
              ticketEvent.seating ??
              "GA";

            const row = ticketSeat.row ?? "-";
            const seatNumber = ticketSeat.seat ?? "-";
            const isGeneralAdmission =
            ticketEvent.ticketType === "generalAdmission";

            const title =
              ticketEvent.title || "General admission Ticket";

            return (
              <div
                key={`${ticketEvent.id || ticketEvent.name}-${index}`}
                className="ticket-slide"
                data-ticket-card="true"
              >
                <div className="ticket-card" style={styles.ticketCard}>
                  {/* Event artwork */}
                  <div
                    className="ticket-artwork"
                    style={styles.artwork}
                  >
                    {ticketEvent.image ? (
                      <img
                        src={ticketEvent.image}
                        alt={ticketEvent.name || "Event artwork"}
                        draggable="false"
                        style={styles.artworkImage}
                      />
                    ) : (
                      <div style={styles.artworkFallback}>
                        {ticketEvent.name || "LIVE EVENT"}
                      </div>
                    )}

                    <div style={styles.artworkOverlay} />

                    {/* Demo barcode */}
                    <div style={styles.barcodeContainer}>
                      <div style={styles.barcodeHeading}>
                        <span>Screenshots won't get you in</span>
                        <span style={styles.refreshIcon}>↻</span>
                      </div>

                      <div
                        style={styles.barcode}
                        aria-label="Decorative demo barcode"
                      >
                        {barcodePattern.split("").map((bar, barIndex) => (
                          <span
                            key={barIndex}
                            style={{
                              ...styles.bar,
                              width: bar === "1" ? "2px" : "1px",
                              marginRight:
                                bar === "1" ? "1px" : "0px",
                              opacity:
                                barIndex % 7 === 0
                                  ? 0.6
                                  : barIndex % 5 === 0
                                    ? 0.8
                                    : 1,
                            }}
                          />
                        ))}
                        <span className="barcode-scan-line" />
                      </div>

                      <div style={styles.barcodeNotice}>

                      </div>
                    </div>
                  </div>

                  {/* Ticket title */}
                  <div style={styles.ticketHeading}>
                    <div style={styles.ticketTitle}>
                      {title}
                    </div>

                    <div style={styles.ticketSubtitle}>
                      {ticketEvent.saleType || ""}
                    </div>
                  </div>

                  {/* Seat details */}
                  <div style={styles.ticketDetails}>
                    <div
                      style={{
                        ...styles.seatGrid,
                        gridTemplateColumns: isGeneralAdmission
  ? "1fr 1.5fr"
  : "1fr 1fr 0.6fr",
                      }}
                    >
                      <div style={styles.seatItem}>
                        <span style={styles.seatLabel}>SECTION</span>
                        <span style={styles.seatValue}>{section}</span>
                      </div>

                      {isGeneralAdmission ? (
                        <div style={{ ...styles.seatItem, paddingTop: "16px" }}>
                          <span style={{ ...styles.seatValue, fontSize: "17px"}}>GENERAL ADMISSION</span>
                        </div>
                      ) : (
                        <>
                          <div style={styles.seatItem}>
                            <span style={styles.seatLabel}>ROW</span>
                            <span style={styles.seatValue}>{row}</span>
                          </div>

                          <div style={styles.seatItem}>
                            <span style={styles.seatLabel}>SEAT</span>
                            <span style={styles.seatValue}>{seatNumber}</span>
                          </div>
                        </>
                      )}
                    </div>

                    <button
                      style={styles.ticketTypeButton}
                      onClick={() => {
                        setActiveIndex(index);
                        setShowInfo((current) => !current);
                      }}
                    >
                      {title}
                    </button>

                    {/* Expanded information for the active ticket */}
                    {showInfo && activeIndex === index && (
                      <div style={styles.infoPanel}>
                        <div style={styles.infoRow}>
                          <span>Event</span>
                          <strong>{ticketEvent.name}</strong>
                        </div>

                        <div style={styles.infoRow}>
                          <span>Date</span>
                          <strong>
                            {ticketEvent.date || "Not specified"}
                          </strong>
                        </div>

                        <div style={styles.infoRow}>
                          <span>Venue</span>
                          <strong>
                            {ticketEvent.venue || "Not specified"}
                          </strong>
                        </div>

                        <div style={styles.infoRow}>
                          <span>Section</span>
                          <strong>{section}</strong>
                        </div>

                        <div style={styles.infoRow}>
                          <span>Row / Seat</span>
                          <strong>
                            {row} / {seatNumber}
                          </strong>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ticket count */}
        <div style={styles.pagination}>
          {activeIndex + 1} of {tickets.length}
        </div>


        {/* Compact action buttons */}
        <div
          className="ticket-actions"
          style={styles.actions}
        >
          <button
            className="wallet-button"
            style={styles.walletButton}
            onClick={() => {
              alert(
                "Apple Wallet integration is not configured yet."
              );
            }}
          >
            <span style={styles.walletIcon}>
              <svg
                width="25"
                height="22"
                viewBox="0 0 34 29"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="1"
                  y="1"
                  width="32"
                  height="27"
                  rx="4"
                  fill="#E5E5E5"
                />
                <rect x="2" y="4" width="30" height="6" fill="#E84C3D" />
                <rect x="2" y="10" width="30" height="5" fill="#F6C744" />
                <rect x="2" y="15" width="30" height="5" fill="#5CA66B" />
                <rect x="2" y="20" width="30" height="6" fill="#E5E5E5" />
                <rect
                  x="1"
                  y="1"
                  width="32"
                  height="27"
                  rx="4"
                  stroke="#888"
                />
              </svg>
            </span>

            <span style={styles.walletText}>
              <span style={styles.walletSmallText}>Add to</span>
              <strong className="wallet-label">
                Apple Wallet
              </strong>
            </span>
          </button>

          <button
            className="info-button"
            style={styles.infoButton}
            onClick={() => setShowInfo((current) => !current)}
          >
            <span style={styles.infoIcon}>i</span>
            <span className="ticket-info-label">
              Ticket Info
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100dvh",
    width: "100%",
    background: "#E9EDF3",
    color: "#111111",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    overflowX: "hidden",
    paddingBottom: "24px",
  },

  loading: {
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#E9EDF3",
    color: "#444444",
  },

  spinner: {
    width: "25px",
    height: "25px",
    border: "3px solid #D0D5DD",
    borderTopColor: "#1769FF",
    borderRadius: "50%",
    animation: "ticketSpin 0.8s linear infinite",
  },

  header: {
    minHeight: "86px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 10px",
    background: "#E9EDF3",
  },

  backButton: {
    width: "38px",
    minWidth: "30px",
    border: "none",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
    color: "#303744",
    cursor: "pointer",
  },

  headerText: {
    minWidth: 0,
    flex: 1,
  },

  eventName: {
    fontSize: "15px",
    lineHeight: 1.35,
    fontWeight: 800,
    letterSpacing: "-0.2px",
    textTransform: "uppercase",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  eventSubtitle: {
    marginTop: "4px",
    fontSize: "12px",
    lineHeight: 1.4,
    color: "#6E737D",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  content: {
    width: "100%",
    maxWidth: "460px",
    margin: "0 auto",
    padding: 0,
  },

  ticketCard: {
    width: "100%",
    minHeight: "auto",
    background: "#FFFFFF",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 4px 14px rgba(28, 37, 51, 0.08)",
    borderTop: "3px solid #3979FF",
    paddingBottom: "34px",
  },

  artwork: {
    height: "min(100vw, 340px)",
    maxHeight: "340px",
    width: "100%",
    position: "relative",
    background: "#353535",
  },

  artworkImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center center",
    inset: 0,
    pointerEvents: "none",
  },

  artworkFallback: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    textAlign: "center",
    background: "linear-gradient(145deg, #313846, #111318)",
    color: "#FFFFFF",
    fontSize: "23px",
    fontWeight: 800,
  },

  artworkOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0, 0, 0, 0.30)",
    pointerEvents: "none",
  },

  barcodeContainer: {
    position: "absolute",
    top: "4px",
    left: "15%",
    width: "70%",
    background: "#FFFFFF",
    borderRadius: "4px",
    padding: "6px 9px",
    boxShadow: "0 2px 7px rgba(0,0,0,0.14)",
    zIndex: 2,
  },

  barcodeHeading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    fontSize: "clamp(11px, 3.7vw, 15px)",
    color: "#858585",
    whiteSpace: "nowrap",
    letterSpacing: "-0.3px",
  },

  refreshIcon: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    border: "1px solid #E4E4E4",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    flexShrink: 0,
  },

  barcode: {
    marginTop: "14px",
    width: "100%",
    height: "34px",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    overflow: "hidden",
    background: "#FFFFFF",
    position: "relative",
  },

  bar: {
    height: "70%",
    background: "#333333",
    flexShrink: 0,
  },

  barcodeNotice: {
    marginTop: "8px",
    fontSize: "8px",
    color: "#888888",
    textAlign: "center",
  },

  ticketHeading: {
    position: "relative",
    zIndex: 3,
    width: "65%",
    minHeight: "auto",
    marginTop: "-72px",
    background: "#FFFFFF",
    padding: "13px 16px 10px",
    borderTopRightRadius: "8px",
  },

  ticketTitle: {
    fontSize: "15px",
    lineHeight: 1.3,
    fontWeight: 750,
    letterSpacing: "-0.1px",
    overflowWrap: "anywhere",
  },

  ticketSubtitle: {
    marginTop: "4px",
    fontSize: "13px",
    color: "#929292",
    lineHeight: 1.3,
  },

  ticketDetails: {
    position: "relative",
    zIndex: 3,
    background: "#FFFFFF",
    minHeight: "auto",
    padding: "18px 18px 18px",
  },

  seatGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 0.6fr",
    gap: "8px",
    alignItems: "start",
    marginBottom: "22px",
  },

  seatItem: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    minWidth: 0,
  },

  seatLabel: {
    fontSize: "10px",
    fontWeight: 750,
    color: "#727272",
    letterSpacing: "0.8px",
  },

  seatValue: {
    fontSize: "19px",
    lineHeight: 1,
    fontWeight: 800,
    color: "#080808",
    letterSpacing: "-0.5px",
    overflowWrap: "anywhere",
  },

  ticketTypeButton: {
    width: "100%",
    minHeight: "45px",
    border: "none",
    borderRadius: "4px",
    background: "#111111",
    color: "#FFFFFF",
    fontSize: "13px",
    fontWeight: 650,
    padding: "10px",
    cursor: "pointer",
  },

  infoPanel: {
    marginTop: "12px",
    padding: "12px",
    border: "1px solid #E5E5E5",
    borderRadius: "8px",
    background: "#FAFAFA",
  },

  infoRow: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "7px 0",
    fontSize: "12px",
    overflowWrap: "anywhere",
  },

  pagination: {
    height: "48px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "13px",
    fontWeight: 700,
    color: "#222222",
    paddingTop: "24px",
  },

  dots: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "9px",
    marginTop: "-3px",
    marginBottom: "17px",
  },

  dot: {
    width: "8px",
    height: "8px",
    minWidth: "8px",
    padding: 0,
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "background 200ms ease, transform 200ms ease",
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "24px",
    padding: "0 12px",
    paddingTop: "24px",
  },

  walletButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    minHeight: "38px",
    flex: "1 1 0",
    minWidth: 0,
    maxWidth: "135px",
    background: "#000000",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "9px",
    padding: "5px 7px",
    cursor: "pointer",
  },

  walletIcon: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },

  walletText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 0,
    fontSize: "12px",
    lineHeight: 1.15,
    whiteSpace: "nowrap",
  },

  walletSmallText: {
    fontSize: "10px",
    fontWeight: 500,
  },

  infoButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    minHeight: "40px",
    flex: "1 1 0",
    minWidth: 0,
    maxWidth: "155px",
    background: "#FFFFFF",
    color: "#111111",
    border: "1.5px solid #777777",
    borderRadius: "26px",
    padding: "5px 8px",
    fontSize: "12px",
    fontWeight: 650,
    whiteSpace: "nowrap",
    cursor: "pointer",
  },

  infoIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "#111111",
    color: "#FFFFFF",
    fontFamily: "Georgia, serif",
    fontSize: "16px",
    fontWeight: 700,
    fontStyle: "italic",
    flexShrink: 0,
  },
};

export default ViewTickets;

