import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  Avatar,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import ImgCard from "../components/ImgCard";
import { useEvent } from "../context/EventContext";
import RefreshIcon from '@mui/icons-material/Refresh';

const MyEvents = () => {
  const { loading, selectedEvent, events } = useEvent();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

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
          {/* CENTER TITLE */}
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

        {/* TABS */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: "#fff" } }}
          sx={{
              "& .MuiTab-root": {
                textTransform: "none",
              },
            background: "#1f262d",
            color: "#fff",
            mt: 0.5,
            mr: 14,
          }}
        >
          <Tab label="Upcoming Events" />
          <Tab label="Past Events" />
        </Tabs>
      </AppBar>

      {/* BODY CONTENT */}
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
          <>
            {/* -------- UPCOMING EVENTS TAB -------- */}
            {tabValue === 0 && (
              <Box sx={{ width: "100%", mt: 1 }}>
                <ImgCard event={selectedEvent} />
              </Box>
            )}

            {/* -------- PAST EVENTS TAB -------- */}
            {tabValue === 1 && (
              <Box sx={{ width: "100%", mt: 1 }}>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#666",
                    mt: 4,
                    fontSize: 14,
                  }}
                >
                  No past events yet.
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default MyEvents;

