import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

import { EventProvider } from "./context/EventContext";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import ForYou from "./pages/ForYou";
import MyEvents from "./pages/MyEvents";
import MyTickets from "./pages/MyTickets";
import MyAccount from "./pages/MyAccount";
import Sell from "./pages/Sell";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <EventProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="foryou" element={<ForYou />} />
              <Route path="myevents" element={<MyEvents />} />
              <Route path="mytickets" element={<MyTickets />} />
              <Route path="myaccount" element={<MyAccount />} />
              <Route path="sell" element={<Sell />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </EventProvider>
    </ThemeProvider>
  );
};

export default App;
