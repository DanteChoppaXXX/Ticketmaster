import React from "react";
import { SwipeableDrawer } from "@mui/material";
import CustomForm from "./Form";

const Swipeable = ({ handleClose, handleOpen, open }) => {
  // Detect iOS for swipeable drawer behavior
  const iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <CustomForm />
    </SwipeableDrawer>
  );
};

export default Swipeable;

