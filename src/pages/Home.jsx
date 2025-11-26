import React from "react";
import { Box } from "@mui/material";
import DiscoverImage from "../assets/Discover.png";

const Discover = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#000",
      }}
    >
      <img
        src={DiscoverImage}
        alt="Ticketmaster Discover"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </Box>
  );
};

export default Discover;

