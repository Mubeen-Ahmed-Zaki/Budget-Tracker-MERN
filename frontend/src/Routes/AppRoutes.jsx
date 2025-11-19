import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/authentication/LoginPage";
import HomePage from "../pages/DashBoard/HomePage";
import SignUpPage from "../pages/authentication/SignUpPage";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../Routes/ProtectedRoute"

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Private Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
