import React from "react";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConfirmationNumberSharpIcon from '@mui/icons-material/ConfirmationNumberSharp';
import { useEvent } from "../context/EventContext";

const ImgCard = () => {
  const { events } = useEvent(); // single event object
  const navigate = useNavigate();

  if (!events) return null; // safety check

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
        borderRadius: 0,
        overflow: "hidden",
        cursor: "pointer",
        minHeight: 220,
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.02)" },
        mb: 2,
      }}
    >
      {/* Event Image */}
      <CardMedia
        component="img"
        src={events.image}
        alt={events.name}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(6deg, rgba(0,0,0,0.85) 48%, rgba(22,22,23,0.5) 100%)",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: 16,
          color: "#fff",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          {events.name}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontSize: "0.875rem", mb: 1 }}>
          {events.date}
        </Typography>

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
            {events.tix} {events.tix > 1 ? "tickets" : "ticket"}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ImgCard;
