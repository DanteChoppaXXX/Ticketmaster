import React from "react";
import {
  Box,
  Container,
  Divider,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useEvent } from "../context/EventContext";

const CustomForm = ({ onClose, openTransferTo }) => {
  const { selectedEvent } = useEvent();

  if (!selectedEvent) return null;

  const seatMap = selectedEvent.seatMap || [];
  const number = seatMap.length;

  const section = seatMap[0]?.sec || "-";
  const row = seatMap[0]?.row || "-";

  const seatList = seatMap.map((s) => s.seat);
  const seatDisplay =
    seatList.length === 1
      ? seatList[0]
      : seatList.length > 1
      ? `${seatList[0]} - ${seatList[seatList.length - 1]}`
      : "-";

  // HANDLES BACK BUTTON
  const handleBack = () => {
    onClose();          // close current slide
    openTransferTo();   // open TransferTo slide
  };

  return (
    <Box sx={{ p: 0 }}>
      <Box sx={{ textAlign: "center", mb: 0.5, mt: 0.5 }}>
        <Typography variant="h6">TRANSFER TICKETS</Typography>
      </Box>
      <Divider />

      <Container sx={{ mt: 2 }}>
        <Box mb={2}>
          <Typography>{number} Ticket(s) Selected</Typography>
          <Typography>
            <span style={{ color: "grey" }}>Sec</span> {section}{" "}
            <span style={{ color: "grey" }}>Row</span> {row}{" "}
            <span style={{ color: "grey" }}>Seat</span> {seatDisplay}
          </Typography>
        </Box>

        <form>
          <Box mb={2}>
            <Typography variant="body2">First Name</Typography>
            <TextField fullWidth size="small" placeholder="First Name" />
          </Box>

          <Box mb={2}>
            <Typography variant="body2">Last Name</Typography>
            <TextField fullWidth size="small" placeholder="Last Name" />
          </Box>

          <Box mb={2}>
            <Typography variant="body2">Email or Mobile Number</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Email or Mobile Number"
            />
          </Box>

          <Box mb={2}>
            <Typography variant="body2">Note</Typography>
            <TextField fullWidth size="small" />
          </Box>
        </form>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={handleBack} sx={{ textTransform: "none" }}>
            <ChevronLeftIcon />
            BACK
          </Button>

          <Button
            variant="contained"
            sx={{ bgcolor: "#026AE1", color: "#fff", textTransform: "capitalize" }}
          >
            Transfer {number} Ticket(s)
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CustomForm;

