import React, { useState, useEffect } from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import discoverIcon from "../icons/icon_discover.png";
import forYouIcon from "../icons/icon_favorite.png";
import myEventIcon from "../icons/icon_ticket.png";
import sellIcon from "../icons/icon_sell.png";
import accountIcon from "../icons/icon_account.png";

import activeDiscoverIcon from "../icons/icon_discover_active.png";
import activeForYouIcon from "../icons/icon_favorite_active.png";
import activeMyEventIcon from "../icons/icon_ticket_active.png";
import activeSellIcon from "../icons/icon_sell_active.png";
import activeAccountIcon from "../icons/icon_account_active.png";

const BottomNavBar = () => {
  const location = useLocation();

  const pathToValue = {
    "/home": "discover",
    "/foryou": "for-you",
    "/myevents": "my-tickets",
    "/sell": "sell",
    "/myaccount": "account",
  };

  const [value, setValue] = useState(pathToValue[location.pathname] || "discover");

  useEffect(() => {
    setValue(pathToValue[location.pathname] || "discover");
  }, [location.pathname]);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 100,
        bgcolor: "#ffffff",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <BottomNavigation
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          showLabels
          sx={{
            height: 60,

            // REMOVE label zoom animation
            "& .MuiBottomNavigationAction-label": {
              fontSize: 8,
              pt: 0.5,
              transition: "none !important",
            },

            // REMOVE selected zoom + color shift
            "& .Mui-selected .MuiBottomNavigationAction-label": {
              fontSize: "8px !important",
              opacity: 1,
            },

            "& .MuiBottomNavigationAction-root": {
              minWidth: "auto",
            },
          }}
      >
        <BottomNavigationAction
          label="Discover"
          value="discover"
          icon={<img src={value === "discover" ? activeDiscoverIcon : discoverIcon} style={{ width: 18 }} />}
          component={Link}
          to="/home"
          sx={{ "& .MuiBottomNavigationAction-label": { fontSize: 8 } }}
        />

        <BottomNavigationAction
          label="For You"
          value="for-you"
          icon={<img src={value === "for-you" ? activeForYouIcon : forYouIcon} style={{ width: 18 }} />}
          component={Link}
          to="/foryou"
          sx={{ "& .MuiBottomNavigationAction-label": { fontSize: 8 } }}
        />

        <BottomNavigationAction
          label="My Tickets"
          value="my-tickets"
          icon={<img src={value === "my-tickets" ? activeMyEventIcon : myEventIcon} style={{ width: 18 }} />}
          component={Link}
          to="/myevents"
          sx={{ "& .MuiBottomNavigationAction-label": { fontSize: 8 } }}
        />

        <BottomNavigationAction
          label="Sell"
          value="sell"
          icon={<img src={value === "sell" ? activeSellIcon : sellIcon} style={{ width: 18 }} />}
          component={Link}
          to="/sell"
          sx={{ "& .MuiBottomNavigationAction-label": { fontSize: 8 } }}
        />

        <BottomNavigationAction
          label="My Account"
          value="account"
          icon={<img src={value === "account" ? activeAccountIcon : accountIcon} style={{ width: 18 }} />}
          component={Link}
          to="/myaccount"
          sx={{ "& .MuiBottomNavigationAction-label": { fontSize: 8 } }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default BottomNavBar;
