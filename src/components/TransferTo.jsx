import React from "react";
import { Box, Button, Typography, Slide, Divider } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AddIcon from "@mui/icons-material/Add";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const outlinedBtnSx = {
  height: 44,
  borderRadius: "4px",
  border: "1px solid #dcdcdc",
  color: "#111",
  fontSize: 14,
  fontWeight: 700,
  textTransform: "none",
  position: "relative",
  justifyContent: "center",
  bgcolor: "#fff",
  "&:hover": { border: "1px solid #c8c8c8", bgcolor: "#fafafa" },
  // keep the label centered and pin the icon to the right edge
  "& .MuiButton-endIcon": {
    position: "absolute",
    right: 16,
    margin: 0,
  },
};

export default function TransferTo({ open, onClose, onManualEntry, onBack }) {
  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit timeout={300}>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "#fff",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
          zIndex: 2000,
          overflow: "hidden",
        }}
      >
        {/* Content area */}
        <Box sx={{ px: 2, pt: 1.2 }}>
          {/* Drag handle */}
          <Box
            sx={{
              width: 44,
              height: 5,
              borderRadius: 3,
              bgcolor: "#3a4047",
              mx: "auto",
              mb: 1.5,
            }}
          />


          {/* Header */}
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: 700,
              color: "#111",
              letterSpacing: 0.2,
              mb: 1,
            }}
          >
            TRANSFER TO
          </Typography>

          <Divider sx={{ borderColor: "#eef1f3" }} />

          {/* Buttons */}
          <Box mt={1.5} display="flex" flexDirection="column" gap={1} pb={3}>
            <Button
              fullWidth
              variant="outlined"
              endIcon={<PeopleOutlineIcon sx={{ fontSize: 24, color: "#111" }} />}
              sx={outlinedBtnSx}
            >
              Select From Contacts
            </Button>

            <Button
              fullWidth
              variant="outlined"
              endIcon={<AddIcon sx={{ fontSize: 24, color: "#111" }} />}
              sx={outlinedBtnSx}
              onClick={() => {
                // Don't call onClose() here — that would close the whole flow.
                onManualEntry && onManualEntry();
              }}
            >
              Manually Enter A Recipient
            </Button>
          </Box>

          {/* Icon + text */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mt: 3,
              pb: 6,
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                bgcolor: "#f1f1f1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NearMeOutlinedIcon
                sx={{
                  fontSize: 28,
                  color: "#666",
                }}
              />
            </Box>

            <Typography
              mt={2}
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: "#111",
                lineHeight: 1.35,
                maxWidth: 260,
              }}
            >
              Transfer Tickets Via Email or Text Message
            </Typography>

            <Typography
              mt={0.8}
              sx={{
                fontSize: 13,
                color: "#7a7a7a",
                lineHeight: 1.5,
                maxWidth: 300,
              }}
            >
              Select an Email or mobile number to transfer tickets to your
              recipient.
            </Typography>
          </Box>
        </Box>

        {/* Footer with Back button */}
        <Box
          sx={{
            bgcolor: "#f2f2f4",
            borderTop: "1px solid #e6e6e8",
            px: 1,
            pt: 0.5,
            pb: 2.5, // room for the iOS home indicator
          }}
        >
          <Button
            onClick={() => onBack && onBack()}
            startIcon={<ChevronLeftIcon sx={{ ml: 0.5 }} />}
            sx={{
              textTransform: "none",
              color: "#1f4fb2",
              fontSize: 16,
              fontWeight: 600,
              "& .MuiButton-startIcon": { mr: 0 },
            }}
          >
            Back
          </Button>
        </Box>
      </Box>
    </Slide>
  );
}
