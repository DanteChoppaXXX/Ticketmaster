import React from "react";
import {
  Box,
  Button,
  Typography,
  Slide,
  Divider,
} from "@mui/material";
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function TransferTo({ open, onClose, onManualEntry, onBack }) {
  return (
    <>
      {/* MAIN BOTTOM SLIDER */}
      <Slide
        direction="up"
        in={open}
        mountOnEnter
        unmountOnExit
        timeout={300}
      >
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            bgcolor: "white",
            borderTopLeftRadius: "1px",
            borderTopRightRadius: "1px",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
            zIndex: 2000,
            p: 1,
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center" , mb: 1}}>
            <Typography variant="h6" fontSize={14}>
              TRANSFER TO
            </Typography>
          </Box>

          <Divider />

          {/* Buttons */}
          <Box mt={2} display="flex" flexDirection="column" gap={1}>
            <Button
              fullWidth
              variant="outlined"
              endIcon={<PermContactCalendarOutlinedIcon />}
              sx={{ py: 1.1, borderRadius: "3px", borderWidth: "2px", fontSize: "12px" }}
            >
              Select From Contacts
            </Button>

            <Button
              fullWidth
              variant="outlined"
              endIcon={<AddCircleOutlineRoundedIcon sx={{ fontSize: "large", opacity: 0.9 }} />}
              sx={{ py: 1.1, borderRadius: "3px", borderWidth: "2px", fontSize: "12px" }}
              onClick={() => {
                // DO NOT call onClose() here — that closes the whole flow.
                // Instead tell the controller to advance to the manual entry step.
                onManualEntry && onManualEntry();
              }}
            >
              Manually Enter A Recipient
            </Button>
          </Box>

          {/* Airplane + text */}
          <Box textAlign="center" mt={6} mb={0}>
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                backgroundColor: "#fafafa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotate(-40deg)",
                ml: 18
              }}
            >
              <SendRoundedIcon sx={{ fontSize: 35, opacity: 0.8 }} />
            </Box>

            <Typography mt={2} color="text.secondary" fontSize={15} fontWeight={600}>
              Transfer Tickets Via Email or Text Message
            </Typography>
            <Typography mt={0.3} mb={10} color="text.secondary" fontSize={14}>
              Select an Email or mobile number to transfer tickets to your recipient.
            </Typography>
          </Box>

          {/* Back Button */}
          <Box mt={4} mb={2} textAlign="left" bgcolor="#fafafa">
            <Button onClick={() => { onBack && onBack(); }} sx={{ textTransform: "none" }}>
              <ChevronLeftIcon />
              BACK
            </Button>
          </Box>
        </Box>
      </Slide>
    </>
  );
}

