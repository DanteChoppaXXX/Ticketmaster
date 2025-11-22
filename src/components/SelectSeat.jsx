import React, { useState } from "react";
import {
  Box,
  Typography,
  Slide,
  Divider,
  IconButton,
  Paper,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEvent } from "../context/EventContext";
import TransferTo from "../components/TransferTo";

export default function TransferTicketSelector({ open, onClose }) {
  const { selectedEvent } = useEvent();
  const seatMap = selectedEvent?.seatMap || [];

  const sec = seatMap[0]?.sec || "—";
  const row = seatMap[0]?.row || "—";

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [transferOpen, setTransferOpen] = useState(false);

  const toggleSeat = (index) => {
    setSelectedSeats((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const selectedCount = selectedSeats.length;

  return (
    <>
      {/* Main Slide Drawer */}
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
              sx={{ position: "absolute", right: 8, top: 6 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Sec / Row Summary */}
          <Box
            sx={{
              px: 2.5,
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight={500} sx={{ opacity: 0.8 }}>
              Sec {sec}, Row {row}
            </Typography>

            <Typography sx={{ opacity: 0.6 }}>
              {seatMap.length} tickets
            </Typography>
          </Box>

          {/* Seat Chips */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              px: 2.5,
              mt: 2,
              flexWrap: "wrap",
              pb: 14,
            }}
          >
            {seatMap.map((seatObj, index) => {
              const isSelected = selectedSeats.includes(index);

              return (
                <Box
                  key={index}
                  onClick={() => toggleSeat(index)}
                  sx={{
                    width: 75,
                    height: 80,
                    borderRadius: "12px",
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
                  {/* TOP (BLUE SECTION) */}
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
                          border: "2.5px solid #cfcfcf",
                        }}
                      />
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              px: 2.5,
              mt: 2,
              flexWrap: "wrap",
              pb: 21,
            }}
          />

          {/* BOTTOM ACTION BAR */}
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: "#f0f0f0",
              p: 2.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: "calc(env(safe-area-inset-bottom) + 16px)",
            }}
          >
            <Typography fontWeight={500}>
              {selectedCount} Selected
            </Typography>

            <Button
              variant="text"
              disabled={selectedCount === 0}
              endIcon={<ChevronRightIcon />}
              onClick={() => {
                onClose();            // CLOSE MAIN SLIDER
                setTransferOpen(true); // OPEN TRANSFER-TO SLIDER
              }}
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

      {/* SECOND DRAWER */}
      <TransferTo
        open={transferOpen}
        onClose={() => setTransferOpen(false)}
      />
    </>
  );
}

