import React from "react";
import {
  Box,
  Button,
  Typography,
  Slide,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

export default function TransferBottomSlider({ open, onClose }) {
  return (
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
      <Box sx={{ textAlign: "center", }}>
        <Typography variant="h6" fontSize={16} >TRANSFER TO</Typography>
      </Box>

      
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
          >
            Manually Enter A Recipient
          </Button>
        </Box>

        {/* Airplane Icon Section */}
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
            <ArrowBackIosOutlinedIcon />
            BACK
          </Button>
        </Box>
      </Box>
    </Slide>
  );
}

