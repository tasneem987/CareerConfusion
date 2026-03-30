// ---------------------------
// IMPORTS
// ---------------------------
require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // folder where images are saved
  },
  filename: (req, file, cb) => {
    // Keep original name or generate a unique one
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ---------------------------
// APP INIT
// ---------------------------
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // allows JSON in req.body

// ---------------------------
// DATABASE CONNECTION
// ---------------------------
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

module.exports = db;

// ---------------------------
// ROUTES
// ---------------------------
app.use("/images", express.static("public/images"));

// ----- REGISTER (FIXED: added logging, removed unnecessary validation order) -----
app.post("/register", async (req, res) => {
  const { name, email, password, age, educational_level } = req.body;

  // Log incoming data for debugging (remove in production if desired)
  console.log("Register request body:", { name, email, age, educational_level });

  // Validate all fields
  if (!name || !email || !password || !age || !educational_level) {
    return res.json({ success: false, message: "All fields are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: "Database error" });
    }

    if (results.length > 0) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      `INSERT INTO users 
        (name, email, password, age, educational_level, role) 
        VALUES (?, ?, ?, ?, ?, 'user')`,
      [name, email, hashedPassword, age, educational_level],
      (err2, result) => {
        if (err2) {
          console.error("Registration INSERT error:", err2);
          return res.json({ success: false, message: "Registration failed" });
        }

        res.json({
          success: true,
          message: "User registered successfully",
          user: {
            userid: result.insertId,
            name,
            email,
            age,
            educational_level,
          },
        });
      }
    );
  });
});

// ----- LOGIN -----
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.json({ success: false, message: "Database error" });

    if (results.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        userid: user.userid,
        name: user.name,
        email: user.email
      }
    });
  });
});

// ---------------------------
// START SERVER
// ---------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});