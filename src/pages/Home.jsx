import React from "react";
import { Box, Divider, Typography, Avatar } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SearchIcon from "@mui/icons-material/Search";
import TicketmasterLogo from "../assets/ticketmaster.png"; 
import DiscoverScreenshot from "../assets/Discover.png"; 

const Discover = () => {
  return (
    <Box sx={{ width: "100%", height: "100vh", overflowY: "auto" }}>
      {/* TOP DARK SECTION */}
      <Box
        sx={{
          backgroundColor: "#1a262d",
          paddingBottom: "45px",
          paddingTop: "20px",
        }}
      >
        {/* HEADER */}
        <Box sx={{ textAlign: "center", position: "relative", mb:2.5 }}>
          <Box
            component="img"
            src={TicketmasterLogo}
            alt="ticketmaster logo"
            sx={{
              width: 120,
              height: "auto",
              mx: "auto",
              display: "block",
              objectFit: "contain",
            }}
          />
      {/* FLAG ICON */}
          <Box sx={{ position: "absolute", right: 20, top: 1 }}>
            <Avatar
              src="https://flagcdn.com/us.svg"
              alt="US Flag"
              sx={{
                width: 20,
                height: 20,
                marginLeft: 1,
                borderRadius: "50%",
              }}
            />
          </Box>
        </Box>

        {/* FILTER BOX */}
        <Box
          sx={{
            backgroundColor: "#29343d",
            padding: "15px",
            borderRadius: "4px",
            width: "90%",
            margin: "0 auto",
            marginTop: "15px",
          }}
        >
          {/* Location + Date */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationOnOutlinedIcon
                sx={{ fontSize: 20, color: "#1a92e7", mr: 1 }}
              />
              <Typography sx={{ color: "#B8C0CC", fontSize: 14 }}>
                City or Zip Code
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
              <CalendarMonthOutlinedIcon
                sx={{ fontSize: 20, color: "#1a92e7", mr: 1 }}
              />
              <Typography sx={{ color: "#B8C0CC", fontSize: 14 }}>
                All Dates
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ bgColor: "#ffffff"}} />
          {/* SEARCH BAR */}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchIcon sx={{ color: "#a6a6a6" }} />

            <input
              placeholder="Search for artists, venues, and events"
              style={{
                border: "none",
                outline: "none",
                marginLeft: "8px",
                width: "100%",
                fontSize: "15px",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* WHITE BODY SECTION */}
      <Box
          sx={{
            backgroundColor: "white",
            paddingBottom: "120px",
            height: "calc(100vh - 120px)", // full screen minus bottom nav
            overflowY: "auto",             // scrollable
          }}
        >
          <Box
            component="img"
            src={DiscoverScreenshot}
            alt="Discover page screenshot"
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
              userSelect: "none",
              pointerEvents: "none", // prevents accidental dragging
            }}
          />
        </Box>
    </Box>
  );
};

export default Discover;

