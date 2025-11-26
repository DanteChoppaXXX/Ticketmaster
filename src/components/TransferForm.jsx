import React from "react";
import {
  Box,
  Container,
  Divider,
  Slide,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useEvent } from "../context/EventContext";

const TransferForm = ({ onClose, openTransferTo, open, selectedSeats }) => {
  const { selectedEvent } = useEvent();

  if (!selectedEvent || !selectedSeats) return null;

  // Extract section + row from the FIRST selected seat
  const section = selectedSeats[0]?.sec || "-";
  const row = selectedSeats[0]?.row || "-";

  // Total number selected
  const number = selectedSeats.length;

  // Format seat list like Ticketmaster: "1, 3, 7"
  const seatDisplay = selectedSeats
    .map((s) => s.seat)
    .sort((a, b) => a - b)
    .join(", ");

  // --- BACK BUTTON HANDLER ---
  const handleBack = () => {
    onClose();        // closes TransferForm slider
    openTransferTo(); // open step 2 again
  };

  return (
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
          zIndex: 3500,
          boxShadow: "0 -4px 18px rgba(0,0,0,0.28)",
          maxHeight: "88vh",
          overflowY: "auto",
          pb: "calc(env(safe-area-inset-bottom) + 12px)",
        }}
      >
        {/* HEADER */}
        <Box sx={{ textAlign: "center", mb: 1, mt: 1 }}>
          <Typography variant="h6" fontWeight={500} fontSize={14}>
            TRANSFER TICKETS
          </Typography>
        </Box>

        <Divider />

        <Container sx={{ mt: 2 }}>
          {/* TICKET INFO */}
          <Box mb={1}>
            <Typography>
              {number} Ticket{number > 1 ? "s" : ""} Selected
            </Typography>
            <Typography>
              <span style={{ color: "grey" }}>Sec</span> {section}{" "}
              <span style={{ color: "grey" }}>Row</span> {row}{" "}
              <span style={{ color: "grey" }}>Seat</span>{" "}
              {seatDisplay || "-"}
            </Typography>
          </Box>

          {/* FORM */}
          <form>
            <Box mb={1}>
              <Typography variant="body2">First Name</Typography>
              <TextField fullWidth size="small" placeholder="First Name" />
            </Box>

            <Box mb={1}>
              <Typography variant="body2">Last Name</Typography>
              <TextField fullWidth size="small" placeholder="Last Name" />
            </Box>

            <Box mb={1}>
              <Typography variant="body2">Email or Mobile Number</Typography>
              <TextField fullWidth size="small" placeholder="Email or Mobile Number" />
            </Box>

            <Box mb={1}>
              <Typography variant="body2">Note</Typography>
              <TextField fullWidth size="small" />
            </Box>
          </form>

          {/* FOOTER BUTTONS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              mb: 2,
              bgcolor: "#fafafa",
              p: 1,
              borderRadius: 1,
            }}
          >
            <Button onClick={handleBack} sx={{ textTransform: "none" }}>
              <ChevronLeftIcon />
              BACK
            </Button>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#026AE1",
                color: "#fff",
                textTransform: "capitalize",
              }}
            >
              Transfer {number} Ticket{number > 1 ? "s" : ""}
            </Button>
          </Box>
        </Container>
      </Box>
    </Slide>
  );
};

export default TransferForm;

