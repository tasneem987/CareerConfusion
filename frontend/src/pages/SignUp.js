// ===== Register.js =====
import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate, Link } from "react-router-dom";
import api from "../components/API";

import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();

  // ================= STATES =================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [education, setEducation] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= REGISTER =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double click
    if (loading) return;

    setMessage("");

    // ================= EMPTY FIELDS =================
    if (!name || !email || !password || !age || !education) {
      setMessage("Please fill in all fields");
      return;
    }

    // ================= EMAIL VALIDATION =================
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    // ================= PASSWORD VALIDATION =================
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      setMessage(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }

    // ================= AGE VALIDATION =================
    const ageNum = parseInt(age, 10);

    if (isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
      setMessage("Please enter a valid age (10–100)");
      return;
    }

    // ================= SEND REQUEST =================
    setLoading(true);

    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        age: ageNum,
        educational_level: education,
      });

      // ================= SUCCESS =================
      if (res.data.success) {
        navigate("/verify-otp", {
          state: { email },
        });
      }

      // ================= EMAIL EXISTS =================
      else if (
        res.data.message === "Email already registered"
      ) {
        setMessage("⚠️ Email already exists");
      }

      // ================= OTHER ERRORS =================
      else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* ================= LEFT PANEL ================= */}
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

      {/* ================= RIGHT PANEL ================= */}
      <div className="right-panel">
        <motion.div
          className="form-wrapper"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="subtitle">
            Create account
          </h2>

          <p className="subtitle">
            Start your journey with Major Compass
          </p>

          <form onSubmit={handleSubmit}>
            {/* ================= NAME ================= */}
            <div
              className={`floating-group ${
                name ? "filled" : ""
              }`}
            >
              <User
                className="input-icon"
                size={18}
              />

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

              <label>Full Name</label>
            </div>

            {/* ================= EMAIL ================= */}
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

            {/* ================= AGE ================= */}
            <div
              className={`floating-group ${
                age ? "filled" : ""
              }`}
            >
              <User
                className="input-icon"
                size={18}
              />

              <input
                type="number"
                value={age}
                onChange={(e) =>
                  setAge(e.target.value)
                }
                required
                min="10"
                max="100"
              />

              <label>Age</label>
            </div>

            {/* ================= EDUCATION ================= */}
            <div
              className={`floating-group ${
                education ? "filled" : ""
              }`}
            >
              <GraduationCap
                className="input-icon"
                size={18}
              />

              <select
                value={education}
                onChange={(e) =>
                  setEducation(e.target.value)
                }
                required
                className={
                  !education
                    ? "empty-select"
                    : ""
                }
              >
                <option value="" disabled>
                  Educational Level
                </option>

                <option value="High School">
                  High School
                </option>

                <option value="Undergraduate">
                  Undergraduate
                </option>

                <option value="Bachelor">
                  Bachelor
                </option>

                <option value="Master">
                  Master
                </option>

                <option value="PhD">
                  PhD
                </option>
              </select>

              <label></label>
            </div>

            {/* ================= PASSWORD ================= */}
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
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </span>
            </div>

            {/* ================= PASSWORD HELPER ================= */}
            <div className="password-hint">
              <ShieldCheck size={14} />
              Password must contain:
              uppercase, lowercase, number,
              and 8+ characters
            </div>

            {/* ================= BUTTON ================= */}
            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Sending verification..."
                : "Register"}
            </button>

            {/* ================= LOGIN LINK ================= */}
            <p className="register">
              Already have an account?{" "}
              <Link to="/login">
                Login
              </Link>
            </p>
          </form>

          {/* ================= MESSAGE ================= */}
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

export default Register;