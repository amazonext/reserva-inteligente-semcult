import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import Home from "@/pages/Home";
import Dashboard from "@/pages/UserReservation";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Reservations from "@/pages/Reservations";
import UserReservation from "@/pages/UserReservation";

// components
import ScrollToTop from "./components/ScrollToTop";

// contexts
import { AuthProvider } from "./contexts/AuthContext";

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/userreservation" element={<UserReservation />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;