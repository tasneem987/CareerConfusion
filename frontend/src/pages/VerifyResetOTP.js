import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../components/API";
import "../styles/password-reset.css"; // ← ADD THIS

const VerifyResetOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      navigate("/forgot-password");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/verify-reset-otp", {
        email,
        otp,
      });

      if (res.data.success) {
        // IMPORTANT: allow reset page access
        navigate("/reset-password", {
          state: {
            email,
            verified: true,
          },
        });
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-reset-page"> {/* ← ADD WRAPPER */}
      <div className="left-panel">
        <div className="logo-box">🔢</div>
        <h1>Check Your Email</h1>
        <p>We've sent a 6-digit verification code to your email.</p>
      </div>
      
      <div className="right-panel">
        <div className="form-wrapper">
          <h2>Verify Code</h2>
          <p>Enter the code sent to <strong>{email}</strong></p>

          <form onSubmit={handleVerify}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              placeholder="6-digit code"
              required
            />

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>

          {message && (
            <p className={message.includes("success") ? "success-message" : "error-message"}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyResetOTP;