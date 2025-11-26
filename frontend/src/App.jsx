import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Dashboard from "@/components/ReservationModal";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Reservations from "@/pages/Reservations";

// contexts
import { AuthContext } from "./contexts/AuthContext";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthContext>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
      </AuthContext>
    </BrowserRouter>
  );
}

export default AppRoutes;