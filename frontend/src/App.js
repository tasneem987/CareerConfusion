import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Majors from "./pages/Majors";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Quiz from "./pages/Quiz";
import ResultPage from "./pages/ResultPage";
import "./styles.css";
import MajorPage from "./pages/MajorPage";
import Community from "./pages/Community";
import AIChat from "./pages/AIChat";
import Saved from "./pages/Saved";
import Profile from "./pages/profile";
import VerifyOTP from "./pages/VerifyOTP";
import VerifyResetOTP from "./pages/VerifyResetOTP";
// Admin layout
import AdminLayout from "./admin/pages/AdminLayout";
// Admin pages (renamed to avoid duplicate names)
import AdminDashboard from "./admin/pages/Dashboard";
import AdminUsers from "./admin/pages/Users";
import AdminMajors from "./admin/pages/Majors";
import AdminQuestions from "./admin/pages/Questions";
import AdminAnalytics from "./admin/pages/Analytics";
import AdminCommunity from "./admin/pages/AdminCommunity";
import AdminMajorPage from "./admin/pages/AdminMajorPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result/:testId" element={<ResultPage />} />
          <Route path="/major/:id" element={<MajorPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/majors" element={<Majors />} />
          <Route path="/community" element={<Community />} />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/aichat" element={<AIChat />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify-reset-otp" element={<VerifyResetOTP />} />

          {/* ===== ADMIN ROUTES ===== */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="majors" element={<AdminMajors />} />
                    <Route path="questions" element={<AdminQuestions />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="community" element={<AdminCommunity/>} />
                    <Route path="majorpage/:id" element={<AdminMajorPage />} />
                  </Route>

        </Routes>
      </Router>

      {/* ✅ Toast must be OUTSIDE Router */}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

