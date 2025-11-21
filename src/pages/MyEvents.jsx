import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  Avatar,
  Grid,
  CircularProgress,
} from "@mui/material";
import ImgCard from "../components/ImgCard";
import { useEvent } from "../context/EventContext";

const MyEvents = () => {
  const { event, loading } = useEvent();

  // Ensure events is an array
 // const eventList = Array.isArray(events) ? events : [events];

  return (
    <Box sx={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* STICKY TOP BAR */}
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          background: "#1f262d",
          top: 0,
          width: "100%",
        }}
      >
        <Toolbar sx={{ position: "relative" }}>
          {/* CENTER TITLE + FLAG AVATAR */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              pt: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: 15,
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              My Events
            </Typography>

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

          {/* RIGHT HELP LINK */}
          <Box sx={{ ml: "auto", pt: 2 }}>
            <Link
              href="#"
              underline="none"
              sx={{ color: "#ffffff", fontWeight: 600, fontSize: 14 }}
            >
              Help
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* BODY */}
      <Box sx={{ p: 0.7 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 5,
            }}
          >
            <CircularProgress size={40} />
          </Box>
        ) : (
             <ImgCard event={event} />
        )}
      </Box>
    </Box>
  );
};

export default MyEvents;

