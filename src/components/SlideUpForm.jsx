import React from "react";
import { Box, Modal } from "@mui/material";

export default function SlideUpForm({ open, onClose, children }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <Box
        sx={{
          width: "100%",
          background: "white",
          borderTopLeftRadius: 1,
          borderTopRightRadius: 1,
          p: 0,
          pb: 1,
          animation: "slideUp 0.33s ease-out",
        }}
      >
        {children}

        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </Box>
    </Modal>
  );
}

