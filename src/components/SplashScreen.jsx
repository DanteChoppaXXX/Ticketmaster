import React from "react";
import { Box } from "@mui/material";
import SplashVideoFile from "../assets/splashscreen.mp4"; // your splash video

const SplashVideo = ({ onFinish }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        src={SplashVideoFile}
        autoPlay
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        onEnded={onFinish} // call when video ends
      />
    </Box>
  );
};

export default SplashVideo;


