
import React from "react";
import {
  Box,
  Typography,
  Slide,
  Divider,
  Button,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ConfirmationNumberSharpIcon from "@mui/icons-material/ConfirmationNumberSharp";
import { useEvent } from "../context/EventContext";

export default function SelectSeat({ open, onClose, onContinue }) {
  const { selectedEvent, selectedSeats, setSelectedSeats } = useEvent();

  const seatMap = selectedEvent?.seatMap || [];
  const sec = seatMap[0]?.sec || "—";
  const row = seatMap[0]?.row || "—";

  const selectedCount = selectedSeats.length;

  const toggleSeat = (seatObj) => {
    const exists = selectedSeats.some(
      (s) =>
        s.sec === seatObj.sec &&
        s.row === seatObj.row &&
        s.seat === seatObj.seat
    );

    if (exists) {
      setSelectedSeats(
        selectedSeats.filter(
          (s) =>
            !(
              s.sec === seatObj.sec &&
              s.row === seatObj.row &&
              s.seat === seatObj.seat
            )
        )
      );
    } else {
      setSelectedSeats([...selectedSeats, seatObj]);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <Box
          onClick={onClose}
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.55)",
            zIndex: 2999,
          }}
        />
      )}

      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "75vh",
            height: "75dvh",
            maxHeight: "90dvh",
            minHeight: 340,
            bgcolor: "#fff",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
            zIndex: 3000,
            boxShadow: "0 -4px 20px rgba(0,0,0,0.12)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            color: "#171717",
          }}
        >
          {/* Drag handle */}
          <Box
            onClick={onClose}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: 1,
              pb: 0.5,
              flexShrink: 0,
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 5,
                borderRadius: 10,
                bgcolor: "#d2d2d7",
              }}
            />
          </Box>

          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 2,
              pt: 0.5,
              pb: 1.25,
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 0.25,
                textAlign: "center",
                color: "#171717",
              }}
            >
              SELECT TICKETS TO TRANSFER
            </Typography>
          </Box>

          <Divider sx={{ mx: 3, borderColor: "#ededed" }} />

          {/* Section, row and ticket count */}
          <Box
            sx={{
              px: { xs: 2.5, sm: 3.5 },
              mt: 2,
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: "#292929",
                whiteSpace: "nowrap",
              }}
            >
              Sec: {sec}, Row {row}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                flexShrink: 0,
              }}
            >
              <ConfirmationNumberSharpIcon
                sx={{
                  fontSize: 21,
                  color: "#353535",
                  transform: "rotate(-35deg)",
                }}
              />

              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#555",
                  whiteSpace: "nowrap",
                }}
              >
                {seatMap.length} Ticket{seatMap.length !== 1 ? "s" : ""}
              </Typography>
            </Box>
          </Box>

          {/* Seat cards */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: { xs: 1, sm: 1.5 },
              px: { xs: 1.5, sm: 3.5 },
              flexShrink: 0,
            }}
          >
            {seatMap.map((seatObj, index) => {
              const isSelected = selectedSeats.some(
                (s) =>
                  s.sec === seatObj.sec &&
                  s.row === seatObj.row &&
                  s.seat === seatObj.seat
              );

              return (
                <Box
                  key={`${seatObj.sec}-${seatObj.row}-${seatObj.seat}-${index}`}
                  onClick={() => toggleSeat(seatObj)}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleSeat(seatObj);
                    }
                  }}
                  sx={{
                    flex: "1 1 55px",
                    maxWidth: 80,
                    minWidth: 0,
                    height: 90,
                    borderRadius: "24px",
                    overflow: "hidden",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    border: "1px solid #e5e5e5",
                    boxShadow: isSelected
                      ? "0 5px 12px rgba(0,0,0,0.16)"
                      : "0 4px 10px rgba(0,0,0,0.10)",
                    display: "flex",
                    flexDirection: "column",
                    userSelect: "none",
                    transition:
                      "box-shadow 180ms ease, transform 180ms ease",
                    "&:active": {
                      transform: "scale(0.97)",
                    },
                    "&:focus-visible": {
                      outline: "2px solid #1048d5",
                      outlineOffset: 2,
                    },
                  }}
                >
                  {/* Blue seat label */}
                  <Box
                    sx={{
                      height: 32,
                      flexShrink: 0,
                      bgcolor: "#1048d5",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: { xs: 11, sm: 13 },
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      SEAT {seatObj.seat}
                    </Typography>
                  </Box>

                  {/* Selection indicator */}
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        bgcolor: isSelected ? "#1048d5" : "#fff",
                        border: isSelected
                          ? "none"
                          : "2px solid #e3e5e9",
                        boxSizing: "border-box",
                        transition: "all 180ms ease",
                      }}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Empty space beneath seats */}
          <Box sx={{ flex: 1, minHeight: 24 }} />

          {/* Bottom action bar */}
          <Box
            sx={{
              flexShrink: 0,
              bgcolor: "#fff",
              borderTop: "1px solid #dedede",
              px: 2.5,
              pt: 1.25,
              pb: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: 64,
              boxSizing: "border-box",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: "#555",
                whiteSpace: "nowrap",
              }}
            >
              {selectedCount} Selected
            </Typography>

            <Button
              variant="text"
              disabled={selectedCount === 0}
              endIcon={<ChevronRightIcon sx={{ fontSize: 23 }} />}
              onClick={() => onContinue(selectedSeats)}
              sx={{
                color: "#1048b8",
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: 0.1,
                whiteSpace: "nowrap",
                px: 0,
                "&.Mui-disabled": {
                  color: "#bdbdbd",
                },
              }}
            >
              TRANSFER TO
            </Button>
          </Box>
        </Box>
      </Slide>
    </>
  );
}

