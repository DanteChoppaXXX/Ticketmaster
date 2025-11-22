import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Slide,
  Divider,
} from "@mui/material";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import SlideUpForm from "../components/SlideUpForm";
import TransferForm from "../components/TransferForm";

export default function TransferBottomSlider({ open, onClose }) {
  // State for "Manually Enter Recipient" slide-up
  const [formOpen, setFormOpen] = useState(false);

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
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" fontSize={16}>
              TRANSFER TO
            </Typography>
          </Box>

          <Divider />

          {/* Buttons */}
          <Box mt={2} display="flex" flexDirection="column" gap={1}>
            <Button
              fullWidth
              variant="outlined"
              endIcon={<ContactsOutlinedIcon />}
              sx={{ py: 1.1, borderRadius: "3px", borderWidth: "2px", fontSize: "12px" }}
            >
              Select From Contacts
            </Button>

            <Button
              fullWidth
              variant="outlined"
              endIcon={<PersonAddAltIcon />}
              sx={{ py: 1.1, borderRadius: "3px", borderWidth: "2px", fontSize: "12px" }}
              onClick={() => { 
                onClose();       // close TransferTo slider
                setFormOpen(true); // open TransferForm slider
              }}
            >
              Manually Enter A Recipient
            </Button>
          </Box>

          {/* Airplane + text */}
          <Box textAlign="center" mt={8}>
            <SendOutlinedIcon sx={{ fontSize: 45, opacity: 0.5 }} />
            <Typography mt={4} color="text.secondary" fontSize={15} fontWeight={600}>
              Transfer Tickets Via Email or Text Message
            </Typography>
            <Typography mt={0.3} mb={8} color="text.secondary" fontSize={14}>
              Select an Email or mobile number to transfer tickets to your recipient.
            </Typography>
          </Box>

          {/* Back Button */}
          <Box mt={4} mb={2} textAlign="left">
            <Button onClick={onClose} sx={{ textTransform: "none" }}>
              <ChevronLeftIcon />
              BACK
            </Button>
          </Box>
        </Box>
      </Slide>

      {/* SLIDE-UP FORM (SECOND BOTTOM SHEET) */}
      <SlideUpForm open={formOpen} onClose={() => setFormOpen(false)}>
        <TransferForm 
            onClose={() => setFormOpen(false)} 
            openTransferTo={onClose}   // <-- 🔥 THIS FIXES YOUR ISSUE
        />
      </SlideUpForm>
    </>
  );
}

