import React from "react";
import { Card, CardMedia, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConfirmationNumberSharpIcon from "@mui/icons-material/ConfirmationNumberSharp";

const ImgCard = ({ event }) => {
  const navigate = useNavigate();

  if (!event) return null;

  const eventImage =
    event.image && typeof event.image === "string"
      ? event.image
      : "https://via.placeholder.com/600x300?text=No+Image";

  const handleClick = () => navigate("/mytickets");

  return (
    <Card
      onClick={handleClick}
      elevation={2}
      sx={{
        width: "100%",
        borderRadius: "0px 0px 8px 8px",
        overflow: "hidden",
        cursor: "pointer",
        bgcolor: "#111",
        mb: 2,
        transition: "transform 0.18s ease",
        "&:hover": { transform: "scale(1.01)" },
      }}
    >
      {/* IMAGE SECTION */}
      <Box sx={{ position: "relative", width: "100%", aspectRatio: "16/8" }}>
        <CardMedia
          component="img"
          image={eventImage}
          alt={event.name}
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
        />

        {/* DATE BADGE — flush left, sitting on top of black section */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            bgcolor: "#000000",
            borderTopRightRadius: "4px",
            px: 1.25,
            py: 0.5,
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.01em",
              lineHeight: 1.3,
            }}
          >
            {event.date}
          </Typography>
        </Box>
      </Box>

      {/* BLACK INFO SECTION */}
      <Box sx={{ bgcolor: "#000000", px: 2, pt: 1.25, pb: 1 }}>
        {/* EVENT NAME */}
        <Typography
          sx={{
            color: "#fff",
            fontSize: "1.05rem",
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
        <Box
          sx={{
            width: "40%",
            height: "1px",
            bgcolor: "rgba(255,255,255,0.25)",
            mb: 1,
          }}
        />

        {/* VENUE ROW */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.25,
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: "0.82rem",
              fontWeight: 400,
            }}
          >
            {event.venue || ""}
          </Typography>

          {/* TICKET COUNT */}
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
      <Button
        fullWidth
        disableElevation
        onClick={(e) => { e.stopPropagation(); handleClick(); }}
        sx={{
          bgcolor: "#024ddf",
          color: "#fff",
          borderRadius: 0,
          py: 1.25,
          fontSize: "0.92rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          textTransform: "none",
          "&:hover": { bgcolor: "#024ddf" },
        }}
      >
        View Tickets
      </Button>
    </Card>
  );
};

export default ImgCard;
