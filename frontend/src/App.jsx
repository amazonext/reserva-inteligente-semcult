import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "@/pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Reservations from "@/pages/Reservations";
import Request from "@/pages/UserReservation";

// components
import ScrollToTop from "./components/ScrollToTop";

// contexts
import { AuthProvider } from "./contexts/AuthContext";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/request" element={<Request />} />
          <Route path="/*" element={<NotFound />} /> {/* 404 */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;