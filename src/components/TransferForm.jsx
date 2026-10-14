import React, { useState } from "react";
import {
  Box,
  Divider,
  Slide,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import { useEvent } from "../context/EventContext";

const labelSx = {
  fontSize: 12.5,
  fontWeight: 700,
  color: "#111",
  mb: 0.4,
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    bgcolor: "#fff",
    fontSize: 14,
    "& .MuiOutlinedInput-input": { py: "8px" },
    "& fieldset": { borderColor: "#b9bcc0", borderWidth: "1px" },
    "&:hover fieldset": { borderColor: "#8b8f94" },
    "&.Mui-focused fieldset": { borderColor: "#1f4fb2", borderWidth: "1px" },
  },
};

const TransferForm = ({ onClose, openTransferTo, open, selectedSeats }) => {
  const { selectedEvent } = useEvent();
  const [useMobile, setUseMobile] = useState(false);

  if (!selectedEvent || !selectedSeats) return null;

  // Total number selected
  const number = selectedSeats.length;

  // --- BACK BUTTON HANDLER ---
  const handleBack = () => {
    onClose(); // closes TransferForm slider
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
          bgcolor: "#fff",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          zIndex: 3500,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.25)",
          maxHeight: "95vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* SCROLLABLE CONTENT */}
        <Box sx={{ flex: 1, overflowY: "auto", px: 2, pt: 1, pb: 1.5 }}>
          {/* Drag handle */}
          <Box
            sx={{
              width: 44,
              height: 5,
              borderRadius: 3,
              bgcolor: "#3a4047",
              mx: "auto",
              mb: 1,
            }}
          />

          {/* HEADER */}
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: 700,
              color: "#111",
              mb: 1,
            }}
          >
            Recipient Details
          </Typography>

          <Divider sx={{ borderColor: "#eef1f3" }} />

          {/* TICKET INFO */}
          <Typography
            sx={{
              textAlign: "center",
              color: "#1f4fb2",
              fontSize: 13,
              fontWeight: 600,
              mt: 1.2,
              mb: 1.2,
            }}
          >
            {number} ticket{number !== 1 ? "s" : ""} selected for transfer
          </Typography>

          {/* FORM */}
          <form onSubmit={(e) => e.preventDefault()}>
            <Box mb={1.2}>
              <Typography sx={labelSx}>First Name</Typography>
              <TextField fullWidth size="small" sx={fieldSx} />
            </Box>

            <Box mb={1.2}>
              <Typography sx={labelSx}>Last Name</Typography>
              <TextField fullWidth size="small" sx={fieldSx} />
            </Box>

            <Box mb={0.4}>
              <Typography sx={labelSx}>
                {useMobile ? "Mobile Number" : "Email"}
              </Typography>
              <TextField
                fullWidth
                size="small"
                sx={fieldSx}
                type={useMobile ? "tel" : "email"}
              />
            </Box>

            <Typography
              component="button"
              type="button"
              onClick={() => setUseMobile((v) => !v)}
              sx={{
                background: "none",
                border: "none",
                p: 0,
                mb: 1.2,
                cursor: "pointer",
                color: "#1f4fb2",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "underline",
                fontFamily: "inherit",
              }}
            >
              {useMobile ? "Use Email Instead" : "Use Mobile Number Instead"}
            </Typography>

            <Box mb={1.5}>
              <Typography sx={labelSx}>
                Note{" "}
                <Box
                  component="span"
                  sx={{ color: "#9a9a9a", fontWeight: 400 }}
                >
                  (optional)
                </Box>
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={1}
                size="small"
                sx={fieldSx}
              />
            </Box>
          </form>

          {/* SAFETY NOTICE */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              bgcolor: "#eaf6fd",
              border: "1px solid #cfe6f5",
              borderRadius: "6px",
              px: 1.5,
              py: 0.8,
            }}
          >
            <GppGoodOutlinedIcon sx={{ fontSize: 20, color: "#1f4fb2" }} />
            <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#1b2a3a" }}>
              Only transfer tickets to people you know and trust to keep
              everyone safe.
            </Typography>
          </Box>
        </Box>

        {/* FOOTER BAR */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#f2f2f4",
            borderTop: "1px solid #e6e6e8",
            px: 1,
            pt: 0.5,
            pb: "calc(env(safe-area-inset-bottom) + 12px)",
          }}
        >
          <Button
            onClick={handleBack}
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

          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "#1a1d26",
              color: "#fff",
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "6px",
              px: 3,
              py: 1.1,
              mr: 1,
              "&:hover": { bgcolor: "#2a2e3a" },
            }}
          >
            Transfer {number} Ticket{number !== 1 ? "s" : ""}
          </Button>
        </Box>
      </Box>
    </Slide>
  );
};

export default TransferForm;
