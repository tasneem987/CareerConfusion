import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../components/API";
import "../styles/verificationcode.css"; 

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/verify-otp", {
        email,
        otp,
      });

      if (res.data.success) {
        setMessage("Email verified successfully!");

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

  const handleResend = async () => {
    try {
      const res = await api.post("/resend-otp", {
        email,
      });
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage("OTP resent successfully!");
    }
  };

  return (
    <div className="verification-page"> {/* ← ADD THIS WRAPPER */}
      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="logo-box">🔒</div>
        <h1>Verify Your Email</h1>
        <p>
          Enter the 6-digit verification code we sent to your email address 
          to complete your registration.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="form-wrapper">
          <h2>Verify Email</h2>
          <p>Enter the 6-digit code sent to:</p>
          <p>{email}</p>

          <form onSubmit={handleVerify}>
            <input
              type="text"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setOtp(value);
              }}
              placeholder="Enter OTP"
              maxLength={6}
              required
            />

            <button
              type="button"
              className="secondary-btn"
              onClick={handleResend}
            >
              Resend OTP
            </button>
            
            <button type="submit" className="primary-btn">
              Verify OTP
            </button>
          </form>

          {message && (
            <p className={message.includes("successfully") ? "success-message" : "error-message"}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;