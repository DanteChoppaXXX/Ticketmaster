import React from "react";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConfirmationNumberSharpIcon from "@mui/icons-material/ConfirmationNumberSharp";

const ImgCard = ({ event }) => {
  const navigate = useNavigate();

  // No event → don’t render
  if (!event) return null;

  // Resolve event image (handles blob, file, asset, or invalid)
  const eventImage =
    event.image && typeof event.image === "string"
      ? event.image
      : "https://via.placeholder.com/600x300?text=No+Image";

  const handleClick = () => {
    navigate("/mytickets");
  };

  return (
    <Card
      onClick={handleClick}
      elevation={3}
      sx={{
        position: "relative",
        width: "100%",
        borderRadius: 1,
        overflow: "hidden",
        cursor: "pointer",
        minHeight: 220,
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.02)" },
        mb: 2,
      }}
    >
      {/* EVENT IMAGE */}
      <CardMedia
        component="img"
        image={eventImage}
        alt={event.name}
        loading="lazy"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* DARK OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(6deg, rgba(0,0,0,0.85) 48%, rgba(22,22,23,0.5) 100%)",
        }}
      />

      {/* TEXT OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: 16,
          color: "#fff",
        }}
      >
        {/* EVENT NAME */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 0.5 }}
        >
          {event.name}
        </Typography>

        {/* EVENT DATE */}
        <Typography variant="subtitle1" sx={{ fontSize: "0.875rem", mb: 1 }}>
          {event.date}
        </Typography>

        {/* TICKET COUNT */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            fontSize: "0.75rem",
          }}
        >
          <ConfirmationNumberSharpIcon
            fontSize="small"
            sx={{ transform: "rotate(-45deg) scaleY(0.7)" }}
          />
          <Typography>
            {event.tix} {event.tix > 1 ? "tickets" : "ticket"}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ImgCard;
