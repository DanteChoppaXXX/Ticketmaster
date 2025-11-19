import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material"; // optional, resets CSS for MUI

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CssBaseline /> {/* Optional: MUI baseline */}
    <App />
  </React.StrictMode>
);
;
