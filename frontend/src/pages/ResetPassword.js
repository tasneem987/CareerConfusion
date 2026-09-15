import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../components/API";
import "../styles/password-reset.css";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const verified = location.state?.verified;

  // 🚨 prevent unauthorized access
  if (!verified) {
    navigate("/forgot-password");
  }

  // ================= STATES =================
  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    setMessage("");

    // ================= CHECK MATCH =================
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // ================= CALL BACKEND =================
    try {
      const res = await api.post(
        "/reset-password",
        {
          email,
          newPassword,
        }
      );

      if (res.data.success) {
        setMessage(
          "Password reset successful!"
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div className="password-reset-page">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="logo-box">🔐</div>
        <h1>New Password</h1>
        <p>
          Create a strong password to secure your account.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="form-wrapper">
          <h2>Reset Password</h2>

          <form onSubmit={handleReset}>
            {/* NEW PASSWORD */}
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              required
            />

            {/* CONFIRM PASSWORD */}
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              required
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="primary-btn"
            >
              Reset Password
            </button>
          </form>

          {/* MESSAGE */}
          {message && (
            <p
              className={
                message.includes("successful")
                  ? "success-message"
                  : "error-message"
              }
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;