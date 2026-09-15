// ===== LOGIN PAGE (UPDATED PROFESSIONAL VERSION) =====
import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate, Link } from "react-router-dom";
import api from "../components/API";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();

  // ================= STATES =================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ================= LOGIN HANDLER =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setMessage("");

    // ================= EMPTY CHECK =================
    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    // ================= EMAIL FORMAT CHECK =================
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage("Invalid email format");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      // ================= SUCCESS =================
      if (res.data.success) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        setSuccess(true);

        setTimeout(() => {
          if (res.data.user.role === "admin") {
            navigate("/admin", {
              replace: true,
            });
          } else {
            navigate("/dashboard", {
              replace: true,
            });
          }
        }, 1200);
      }

      // ================= ERROR =================
      else {
        setMessage(
          res.data.message ||
            "Login failed"
        );
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ================= SUCCESS SCREEN =================
  if (success) {
    return (
      <div className="success-screen">
        <div className="checkmark-circle">
          <div className="checkmark"></div>
        </div>

        <h2>Login Successful</h2>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="auth-container">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="logo-box">
          <GraduationCap size={28} />
        </div>

        <h1>Major Compass</h1>

        <p>
          Navigate your future with confidence.
          Discover the right major, the best
          university, and your ideal career path
          in Lebanon.
        </p>

        <div className="tags">
          <span className="tag">50+ Majors</span>
          <span className="tag">30+ Universities</span>
          <span className="tag">Major Quiz</span>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <motion.div
          className="form-wrapper"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="subtitle">
            Welcome back
          </h2>

          <p className="subtitle">
            Sign in to continue your journey
          </p>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div
              className={`floating-group ${
                email ? "filled" : ""
              }`}
            >
              <Mail
                className="input-icon"
                size={18}
              />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

              <label>Email</label>
            </div>

            {/* PASSWORD */}
            <div
              className={`floating-group ${
                password ? "filled" : ""
              }`}
            >
              <Lock
                className="input-icon"
                size={18}
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <label>Password</label>

              <span
                className="toggle-password"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </span>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? (
                <div className="spinner"></div>
              ) : (
                "Sign In →"
              )}
            </button>

            {/* FORGOT PASSWORD */}
            <p className="register">
              <span
                onClick={() =>
                  navigate(
                    "/forgot-password"
                  )
                }
                style={{
                  cursor: "pointer",
                  color: "#6c63ff",
                }}
              >
                Forgot Password?
              </span>
            </p>

            {/* SIGN UP */}
            <p className="register">
              Don’t have an account?{" "}
              <Link to="/register">
                Sign Up
              </Link>
            </p>
          </form>

          {/* MESSAGE */}
          {message && (
            <p className="message">
              {message}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;