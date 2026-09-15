import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../components/API";
import "../styles/password-reset.css"; // ← ADD THIS

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/forgot-password", {
        email,
      });

      if (res.data.success) {
        navigate("/verify-reset-otp", {
  state: { email },
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
        <div className="logo-box">🔑</div>
        <h1>Forgot Password?</h1>
        <p>Don't worry! Enter your email and we'll send you a reset code.</p>
      </div>
      
      <div className="right-panel">
        <div className="form-wrapper">
          <h2>Forgot Password</h2>
          <p>Enter your email to receive a reset code</p>

          <form onSubmit={handleSendOTP}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
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

export default ForgotPassword;