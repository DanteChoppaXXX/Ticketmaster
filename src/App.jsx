import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

import { EventProvider } from "./context/EventContext";
import { AuthProvider } from "./context/AuthContext";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import ForYou from "./pages/ForYou";
import MyEvents from "./pages/MyEvents";
import MyTickets from "./pages/MyTickets";
import MyAccount from "./pages/MyAccount";
import Sell from "./pages/Sell";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import SplashVideo from "./components/SplashScreen"; // your splash video component

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Render Splash first, then the app
  if (showSplash) {
    return <SplashVideo onFinish={() => setShowSplash(false)} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <EventProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Route */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
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
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
