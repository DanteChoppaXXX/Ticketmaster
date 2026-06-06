import React from "react";
import { Card, CardMedia, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConfirmationNumberSharpIcon from "@mui/icons-material/ConfirmationNumberSharp";
import barcodeIcon from "../icons/barcode-scan-icon.png";

const ImgCard = ({ event }) => {
  const navigate = useNavigate();

  if (!event) return null;

  const handleClick = () => navigate("/mytickets");

  return (
    <Card
      onClick={handleClick}
      elevation={2}
      sx={{
        width: "100%",           // 👈 matches image-era width
        borderRadius: "0px 0px 0px 0px",
        overflow: "hidden",
        cursor: "pointer",
        bgcolor: "transparent",
        mb: 0,
        mt: -8,
        position: "relative",  // 👈 needed for zIndex to work
        zIndex: 10,            // 👈 brings card in front of hero image
        transition: "transform 0.18s ease",
        "&:hover": { transform: "scale(1.01)" },
        backgroundImage: "none",
        boxShadow: "none",
      }}
    >
      {/* DATE SECTION */}
      <Box sx={{ width: "60%", bgcolor: "#000000", px: 1.25, py: 0.5 }}>
        <Typography
          sx={{
            color: "#fff",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.01em",
            lineHeight: 1.3,
          }}
        >
          {event.date}
        </Typography>
      </Box>

      {/* BLACK INFO SECTION */}
      <Box sx={{ bgcolor: "#000000", px: 2, pt: 0.5, pb: 0.5 }}>
        {/* EVENT NAME */}
        <Typography
          sx={{
            color: "#fff",
            fontSize: "1.10rem",
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: "0.01em",
            textTransform: "uppercase",
            mb: 2,
            mt: 1.5,
          }}
        >
          {event.name}
        </Typography>

        {/* DIVIDER */}
        <Box sx={{ width: "40%", height: "2px", bgcolor: "rgba(255,255,255,0.25)", mb: 1 }} />

        {/* VENUE ROW */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.25,
          }}
        >
          <Typography sx={{ color: "#fff", fontSize: "0.78rem", fontWeight: 400 }}>
            {event.venue || ""}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <ConfirmationNumberSharpIcon
              sx={{
                color: "#fff",
                fontSize: "1rem",
                transform: "rotate(-45deg) scaleY(0.65) scaleX(0.8)",
              }}
            />
            <Typography sx={{ color: "#fff", fontSize: "0.82rem", fontWeight: 500 }}>
              x{event.tix}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* BLUE VIEW TICKETS BUTTON */}
      {/* Add to Apple Wallet */}
      <Box sx={{ p: 0, mt: 0, textAlign: "center" }}>
        <Button
          variant="contained"
          sx={{
            background: "#024ddf",
            width: "100%",
            borderRadius: 0,
            textTransform: "none",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            py: 1,
            ml: "auto",
            mr: "auto",
          }}
        >
          <img
            src={barcodeIcon}
            alt="Apple Wallet"
            style={{ filter: "invert(1)", width: 22, height: 22 }}
          />
          View Ticket
        </Button>
      </Box>

    </Card>
  );
};

export default ImgCard;

