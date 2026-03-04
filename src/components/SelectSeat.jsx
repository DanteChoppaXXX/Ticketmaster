import React from "react";
import {
  Box,
  Typography,
  Slide,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmationNumberSharpIcon from "@mui/icons-material/ConfirmationNumberSharp";
import { useEvent } from "../context/EventContext";

export default function SelectSeat({ open, onClose, onContinue }) {
  const { selectedEvent, selectedSeats, setSelectedSeats } = useEvent();

  const seatMap = selectedEvent?.seatMap || [];
  const sec = seatMap[0]?.sec || "—";
  const row = seatMap[0]?.row || "—";

  const selectedCount = selectedSeats.length;

  // MULTI-SELECT toggle
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
            !(s.sec === seatObj.sec && s.row === seatObj.row && s.seat === seatObj.seat)
        )
      );
    } else {
      setSelectedSeats([...selectedSeats, seatObj]);
    }
  };

  return (
    <>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            bgcolor: "white",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            zIndex: 3000,
            boxShadow: "0 -4px 18px rgba(0,0,0,0.28)",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1.5,
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Typography fontWeight={500} fontSize={14}>
              SELECT TICKETS TO TRANSFER
            </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          </Box>

          <Divider />
        {/* INFO BANNER */}
        <Box
          sx={{
            mx: 2,
            mt: 2,
            p: 1.5,
            border: "2.5px solid #a0a0a0",
            borderRadius: "3px",
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            bgcolor: "#fff",
          }}
        >
          <InfoIcon sx={{ fontSize: "1.5rem", color: "#777", mt: "1px", flexShrink: 0 }} />
          <Typography fontSize="0.89rem" color="#333" lineHeight={1.45}>
            Only transfer tickets to people you know and trust to ensure everyone stays safe and
            socially distanced
          </Typography>
        </Box>

          {/* Sec / Row Summary */}
          <Box
              sx={{
                px: 2.5,
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "nowrap", // prevent wrapping
              }}
            >
              {/* Section & Row */}
              <Typography fontWeight={500} sx={{ opacity: 0.8, whiteSpace: "nowrap" }}>
                Sec {sec}, Row {row}
              </Typography>

              {/* Ticket Icon + Count */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, whiteSpace: "nowrap" }}>
                <ConfirmationNumberSharpIcon
                  fontSize="small"
                  sx={{
                    transform: "rotate(-45deg) scaleY(0.7) scaleX(0.9)",
                    opacity: 0.7,
                  }}
                />
                <Typography sx={{ opacity: 0.6 }}>
                  {seatMap.length} ticket{seatMap.length > 1 ? "s" : ""}
                </Typography>
              </Box>
            </Box>

          {/* Seat Chips */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              px: 2.5,
              mt: 2,
              flexWrap: "wrap",
              pb: 1,
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
                  key={index}
                  onClick={() => toggleSeat(seatObj)}
                  sx={{
                    width: 75,
                    height: 80,
                    borderRadius: "2px 2px 8px 8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
                    border: "1px solid #e3e3e3",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    userSelect: "none",
                  }}
                >
                  {/* TOP BLUE */}
                  <Box
                    sx={{
                      height: "40%",
                      backgroundColor: "#0077e3",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: 500,
                        fontSize: "14px",
                        letterSpacing: 0.3,
                      }}
                    >
                      SEAT {seatObj.seat}
                    </Typography>
                  </Box>

                  {/* BOTTOM SELECT INDICATOR */}
                  <Box
                    sx={{
                      height: "50%",
                      backgroundColor: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {isSelected ? (
                      <CheckCircleIcon sx={{ color: "#0077e3", fontSize: 28 }} />
                    ) : (
                      <Box
                        sx={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          border: "0.1px solid #cfffff",
                        }}
                      />
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ mb: 24 }} />

          {/* BOTTOM ACTION BAR */}
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: "#fafafa",
              p: 2.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: "calc(env(safe-area-inset-bottom) + 16px)",
            }}
          >
            <Typography fontWeight={500}>{selectedCount} Selected</Typography>

            <Button
              variant="text"
              disabled={selectedCount === 0}
              endIcon={<ChevronRightIcon />}
              onClick={() => onContinue(selectedSeats)}  // ⬅️ send array NOT single seat
              sx={{
                color: selectedCount === 0 ? "#bdbdbd" : "#0077e3",
                fontWeight: 600,
                fontSize: "16px",
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

