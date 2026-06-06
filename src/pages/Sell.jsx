// src/components/EmailConfirmation.jsx

import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@mui/material";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

import { useEvent } from "../context/EventContext";

import Ticketmaster from "../assets/emaillogo.png";
import OrderNumber from "../assets/ticketnumber.jpeg";
import { useNavigate } from "react-router-dom";

export default function EmailConfirmation() {
  const { selectedEvent } = useEvent();
  const navigate = useNavigate();

  if (!selectedEvent) return null;

  const {
    name,
    image,
    date,
    venue,
    seatMap = [],
    tix = 0,
  } = selectedEvent;

  return (
    <Box
      sx={{
        bgcolor: "#222",
        color: "#fff",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          maxWidth: 420,
          mx: "auto",
          px: 2,
          py: 3,
        }}
      >
        <Divider
          sx={{
            height: 4,
            bgcolor: "#0560C9",
            mb: 1,
          }}
        />

        {/* Ticketmaster Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={Ticketmaster}
            alt="Ticketmaster"
            sx={{
              width: 120,
              objectFit: "contain",
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <IconButton
              size="small"
              sx={{
                color: "#0560C9",
              }}
            >
              <AccountCircleOutlinedIcon />
            </IconButton>

            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              My Account
            </Typography>
          </Box>
        </Box>

        {/* Order Banner */}
        <Box>
          <Box
            component="img"
            src={OrderNumber}
            alt="Order Number"
            sx={{
              width: "100%",
              display: "block",
            }}
          />

          <Box
            component="img"
            src={image}
            alt={name}
            sx={{
              width: "100%",
              display: "block",
              mt: "-8px",
            }}
          />
        </Box>

        {/* Event Name */}
        <Box sx={{ mt: 3, px: 1 }}>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            {name}
          </Typography>
        </Box>

        {/* Event Details */}
        <Box
          sx={{
            mt: 3,
            px: 1,
          }}
        >
          {/* Date */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <CalendarTodayOutlinedIcon
              sx={{
                color: "#818080",
                fontSize: 20,
              }}
            />

            <Typography
              sx={{
                ml: 1.5,
                color: "#f9f5f5",
                fontSize: 15,
              }}
            >
              {date}
            </Typography>
          </Box>

          {/* Venue */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <LocationOnOutlinedIcon
              sx={{
                color: "#818080",
                fontSize: 20,
              }}
            />

            <Typography
              sx={{
                ml: 1.5,
                color: "#f9f5f5",
                fontSize: 15,
              }}
            >
              {venue}
            </Typography>
          </Box>

          {/* Tickets */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <ConfirmationNumberOutlinedIcon
              sx={{
                color: "#818080",
                mt: "2px",
                fontSize: 20,
              }}
            />

            <Box>
              
              {seatMap.map((seat, index) => (
                <Typography
                  key={index}
                  sx={{
                    ml: 1.5,
                    color: "#f9f5f5",
                    mb: 0.5,
                    fontSize: 15,
                  }}
                >
                  SEC {seat.sec}, ROW {seat.row}
                  {seat.seat !== "-" ? ` SEAT ${seat.seat}` : ""}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* CTA */}
          <Box sx={{ mt: 3 }}>
            <Button
              onClick={() => navigate("/myevents")}
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#0560C9",
                textTransform: "none",
                py: 1.2,
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#0452ac",
                },
              }}
            >
              View Mobile Ticket
            </Button>
          </Box>
        </Box>

        {/* Important Information */}
        <Box sx={{ mt: 5 }}>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              mb: 2,
            }}
          >
            Important Information
          </Typography>

          <Box
            sx={{
              border: "1px solid #8cbee7",
              bgcolor: "#f6fbff",
              color: "#000",
              p: 2,
              borderRadius: 1,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                mb: 1,
              }}
            >
              Important Event Info
            </Typography>

            <Typography
              sx={{
                fontSize: 14,
              }}
            >
              NO REFUNDS, EXCHANGES OR CANCELLATIONS.
            </Typography>
          </Box>
        </Box>

        {/* Footer Notice */}
        <Box
          sx={{
            bgcolor: "#ebebeb",
            color: "#000",
            mt: 4,
            p: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
            }}
          >
            <strong>Please Note:</strong> As official health guidelines evolve,
            the venue may shift seating configurations and increase capacity.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
