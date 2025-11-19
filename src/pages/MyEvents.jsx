import React from "react";
import { AppBar, Toolbar, Typography, Box, Link, Avatar } from "@mui/material";

export default function MyEvents() {
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
                width: 16,
                height: 16,
                marginLeft: 0.5,
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

      {/* EMPTY BODY */}
      <Box sx={{ p: 2 }}></Box>
    </Box>
  );
}

