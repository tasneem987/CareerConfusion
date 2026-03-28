// ===== Final login.js with floating labels + password toggle =====
import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate, Link } from "react-router-dom";
import api from "../components/API";
import { GraduationCap, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/login", { email, password });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/", { replace: true });
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="logo-box" >
          <GraduationCap size={28} />
        </div>

        <h1>Career Confusion</h1>

        <p>
          Navigate your future with confidence. Discover the right major, the
          best university, and your ideal career path in Lebanon.
        </p>

        <div className="tags">
          <span className="tag">50+ Majors</span>
          <span className="tag">30+ Universities</span>
          <span className="tag">Career Quiz</span>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="form-wrapper">
          <h2>Welcome back</h2>
          <p className="subtitle">Sign in to continue your career journey</p>

          <form onSubmit={handleSubmit}>
            {/* EMAIL FIELD */}
            <div className={`floating-group ${email ? "filled" : ""}`}>
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>

            {/* PASSWORD FIELD */}
            <div className={`floating-group ${password ? "filled" : ""}`}>
              <Lock className="input-icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>

            <p className="register">
              Don’t have an account? <Link to="/register">Sign Up</Link>
            </p>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;


