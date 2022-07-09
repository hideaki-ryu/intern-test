import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
// custom MUI theme
import theme from "./conf/theme.conf";
import { ThemeProvider } from "@mui/material/styles";

// Pages
import App from "./App";
import NotFound from "./components/LandingPage/pages/NotFound";
import Homepage from "./components/LandingPage/pages/Home";
import Pricing from "./components/LandingPage/pages/PricingPage";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Homepage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route index element={<Navigate replace to="/home" />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
  rootElement
);
