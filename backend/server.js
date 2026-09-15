require("dotenv").config();


const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));


// store codes temporarily
const verificationCodes = {};
//rest password
const resetOTPStore = {};

// ---------------------------
// IMPORTS
// ---------------------------

const nodemailer = require("nodemailer");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const otpStore = {};

//AUTO DELETE EXPIRED OTPs
setInterval(() => {
  const now = Date.now();

  for (const email in otpStore) {
    if (otpStore[email].expires < now) {
      delete otpStore[email];
    }
  }
}, 60000);

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// Local storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/profile_pics/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed!'), false);
    }
  }
});


// Middleware
app.use(cors());
app.use(express.json()); // allows JSON in req.body
//ADMIN
const isAdmin = (req, res, next) => {
  const role = req.headers["user-role"];

  if (role !== "admin") {
    return res.status(403).json({ error: "Admins only" });
  }

  next();
};
// ---------------------------
// DATABASE CONNECTION
// ---------------------------
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports = db;

// ---------------------------
// ROUTES
// ---------------------------
app.use("/images", express.static("public/images"));

// 🖼️ UPLOAD PROFILE PICTURE ENDPOINT
app.post('/api/upload-profile-pic', upload.single('profilePic'), async (req, res) => {
  try {
    let user;
    try {
      user = JSON.parse(req.headers['x-user-id']);
    } catch {
      return res.status(400).json({ success: false, message: 'Invalid user header' });
    }
    const userId = user.userid;
    if (!userId || !req.file) {
      return res.status(400).json({ success: false, message: 'Missing user ID or file' });
    }

    // Build the public URL (accessible from the browser)
    const filename = req.file.filename;
    const profilePicUrl = `http://localhost:5000/uploads/profile_pics/${filename}`;

    // Update database – save the URL only (local uploads don’t need public_id)
    await db.promise().query(
      'UPDATE users SET profile_pic = ? WHERE userid = ?',
      [profilePicUrl, userId]
    );

    res.json({ success: true, profilePic: profilePicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
});

// 🗑️ DELETE PROFILE PICTURE (Optional)
app.delete('/api/delete-profile-pic', async (req, res) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.userid;

  db.query(
    'SELECT profile_pic_public_id FROM users WHERE userid = ?',
    [userId],
    async (err, results) => {
      if (err || !results[0]?.profile_pic_public_id) {
        return res.json({ success: false, message: 'No profile picture found' });
      }

      // Delete from Cloudinary
      await cloudinary.uploader.destroy(results[0].profile_pic_public_id);

      // Reset in database
      db.query(
        'UPDATE users SET profile_pic = NULL WHERE userid = ?',
        [userId],
        (err) => {
          if (err) console.error(err);
          res.json({ success: true, message: 'Profile picture removed' });
        }
      );
    }
  );
});
//delete profile picture endpoint
app.delete('/api/profile-pic/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    // Retrieve current profile pic URL
    const [rows] = await db.promise().query(
      'SELECT profile_pic FROM users WHERE userid = ?',
      [userId]
    );
    const picUrl = rows[0]?.profile_pic;
    
    // Delete the file from disk if it exists
    if (picUrl) {
      // Convert URL to file path
      const relativePath = picUrl.replace('http://localhost:5000/', '');
      const fullPath = path.join(__dirname, relativePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    // Clear database
    await db.promise().query(
      'UPDATE users SET profile_pic = NULL WHERE userid = ?',
      [userId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Deletion failed' });
  }
});


// ----- REGISTER (FIXED: added logging, removed unnecessary validation order) -----
app.post("/register", async (req, res) => {
  const { name, email, password, age, educational_level } = req.body;

  if (!name || !email || !password || !age || !educational_level) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error(err);
        return res.json({
          success: false,
          message: "Database error",
        });
      }

      if (results.length > 0) {
        return res.json({
          success: false,
          message: "Email already registered",
        });
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Save temporarily
      otpStore[email] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000,
    userData: {
      name,
      email,
      password,
      age,
      educational_level,
    },
  };

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Major Compass Email Verification",
          html: `
            <h2>Email Verification</h2>
            <p>Your verification code is:</p>
            <h1>${otp}</h1>
            <p>This code expires in 5 minutes.</p>
          `,
        });

        res.json({
          success: true,
          message: "OTP sent to email",
        });
      } catch (emailError) {
        console.error(emailError);

        res.json({
          success: false,
          message: "Failed to send email",
        });
      }
    }
  );
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

    const isAdmin = user.role === "admin";

res.json({
  success: true,
  message: "Login successful",
  user: {
    userid: user.userid,
    name: user.name,
    email: user.email,
    role: isAdmin ? "admin" : "user"
  }
});
  });
});

//send code
app.post("/send-code", (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (results.length === 0) {
      return res.json({ success: false, message: "Email not found" });
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    verificationCodes[email] = code;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Code",
      text: `Your verification code is: ${code}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: "Email failed" });
      }

      res.json({ success: true, message: "Code sent" });
    });
  });
});

//verfication
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const storedData = otpStore[email];

  if (!storedData) {
    return res.json({
      success: false,
      message: "No OTP found",
    });
  }

  if (Date.now() > storedData.expires) {
    delete otpStore[email];

    return res.json({
      success: false,
      message: "OTP expired",
    });
  }

  if (storedData.otp !== otp) {
    return res.json({
      success: false,
      message: "Invalid OTP",
    });
  }

  const {
    name,
    password,
    age,
    educational_level,
  } = storedData.userData;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      `INSERT INTO users
      (name, email, password, age, educational_level, role)
      VALUES (?, ?, ?, ?, ?, 'user')`,
      [
        name,
        email,
        hashedPassword,
        age,
        educational_level,
      ],
      async (err, result) => {
        if (err) {
          console.error(err);

          return res.json({
            success: false,
            message: "Registration failed",
          });
        }

        // ================= CLEAN OTP =================
        delete otpStore[email];

        // ================= WELCOME EMAIL =================
        try {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to Major Compass 🎓",
            html: `
              <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">
                
                <div style="max-width:600px; margin:auto; background:white; border-radius:12px; padding:30px; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                  
                  <h1 style="color:#4f46e5; text-align:center;">
                    🎓 Welcome to Major Compass
                  </h1>

                  <p style="font-size:16px; color:#333;">
                    Hi <b>${name}</b>,
                  </p>

                  <p style="font-size:15px; color:#555; line-height:1.6;">
                    Your account has been successfully created. You are now part of <b>Major Compass</b> — your guide to choosing the right major, university, and career path in Lebanon.
                  </p>

                  <div style="margin:20px 0; padding:15px; background:#eef2ff; border-left:4px solid #4f46e5; border-radius:6px;">
                    <p style="margin:0; color:#333;">
                      🚀 Explore majors<br/>
                      🏫 Discover universities<br/>
                      📊 Take career guidance quizzes
                    </p>
                  </div>

                  <div style="text-align:center; margin-top:25px;">
                    <a href="http://localhost:3000/login"
                      style="
                        background:#4f46e5;
                        color:white;
                        padding:12px 20px;
                        text-decoration:none;
                        border-radius:8px;
                        font-weight:bold;
                        display:inline-block;
                      ">
                      Go to Login
                    </a>
                  </div>

                  <p style="font-size:12px; color:#999; text-align:center; margin-top:25px;">
                    © Major Compass — Helping students shape their future
                  </p>

                </div>
              </div>
            `,
          });
        } catch (mailError) {
          console.error("Welcome email error:", mailError);
        }

        // ================= RESPONSE =================
        res.json({
          success: true,
          message: "Email verified successfully",
        });
      }
    );
  } catch (error) {
    console.error(error);

    res.json({
      success: false,
      message: "Server error",
    });
  }
});
//resend verfication code
app.post("/resend-otp", async (req, res) => {
  const { email } = req.body;

  const storedData = otpStore[email];

  if (!storedData) {
    return res.json({
      success: false,
      message: "No registration found",
    });
  }

  const newOtp = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  otpStore[email].otp = newOtp;
  otpStore[email].expires =
    Date.now() + 5 * 60 * 1000;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "New OTP Code",
      html: `
        <h2>Your new OTP code</h2>
        <h1>${newOtp}</h1>
      `,
    });

    res.json({
      success: true,
      message: "New OTP sent",
    });
  } catch (err) {
    console.error(err);

    res.json({
      success: false,
      message: "Failed to resend OTP",
    });
  }
});
//forget password
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error(err);

        return res.json({
          success: false,
          message: "Database error",
        });
      }

      if (results.length === 0) {
        return res.json({
          success: false,
          message: "Email not found",
        });
      }

      const otp = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      resetOTPStore[email] = {
        otp,
        expires:
          Date.now() + 5 * 60 * 1000,
      };

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject:
            "Major Compass Password Reset",
          html: `
            <h2>Password Reset</h2>
            <p>Your reset code is:</p>
            <h1>${otp}</h1>
            <p>Expires in 5 minutes.</p>
          `,
        });

        res.json({
          success: true,
          message: "OTP sent",
        });
      } catch (error) {
        console.error(error);

        res.json({
          success: false,
          message:
            "Failed to send email",
        });
      }
    }
  );
});
//reset password
app.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } =
    req.body;

  const storedData =
    resetOTPStore[email];

  if (!storedData) {
    return res.json({
      success: false,
      message: "No OTP found",
    });
  }

  const stored = resetOTPStore[email];

if (!stored || !stored.verified) {
  return res.json({
    success: false,
    message: "Unauthorized request",
  });
}

  if (Date.now() > storedData.expires) {
    delete resetOTPStore[email];

    return res.json({
      success: false,
      message: "OTP expired",
    });
  }

  if (storedData.otp !== otp) {
    return res.json({
      success: false,
      message: "Invalid OTP",
    });
  }

  const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

if (!passwordRegex.test(newPassword)) {
  return res.json({
    success: false,
    message:
      "Password must contain uppercase, lowercase, number and 8+ characters",
  });
}

  try {
    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    db.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashedPassword, email],
      (err, result) => {
        if (err) {
          console.error(err);

          return res.json({
            success: false,
            message:
              "Failed to reset password",
          });
        }

        delete resetOTPStore[email];

        res.json({
          success: true,
          message:
            "Password reset successful",
        });
      }
    );
  } catch (error) {
    console.error(error);

    res.json({
      success: false,
      message: "Server error",
    });
  }
});
//verify reset password
app.post("/verify-reset-otp", (req, res) => {
  const { email, otp } = req.body;

  const stored = resetOTPStore[email];

  if (!stored) {
    return res.json({
      success: false,
      message: "No OTP found",
    });
  }

  if (Date.now() > stored.expires) {
    delete resetOTPStore[email];

    return res.json({
      success: false,
      message: "OTP expired",
    });
  }

  if (stored.otp !== otp) {
    return res.json({
      success: false,
      message: "Incorrect code",
    });
  }

  // mark as verified
  stored.verified = true;

  return res.json({
    success: true,
    message: "OTP verified",
  });
});

// ✅ GET ALL MAJORS
app.get("/api/majors", (req, res) => {
  db.query(
    `SELECT major_id AS id, major_name AS name, description, required_skills,
            education_required, category, years, demand, icon,
            skills, careers, study_plan, cost, salary_lebanon, salary_abroad
     FROM major`,
    (err, results) => {
      if (err) return res.status(500).json({ error: "Server error" });
      res.json(results);
    }
  );
});

// ✅ GET MAJOR BY ID
app.get("/api/majors/:id", (req, res) => {
  db.query(
    `SELECT major_id AS id, major_name AS name, description, required_skills,
            education_required, category, years, demand, icon,
            skills, careers, study_plan, cost, salary_lebanon, salary_abroad
     FROM major WHERE major_id = ?`,
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Server error" });

      if (results.length === 0) {
        return res.status(404).json({ error: "Major not found" });
      }

      res.json(results[0]);
    }
  );
});

//get questions
app.get("/api/questions", (req, res) => {
  const query = `
    SELECT 
      q.question_id,
      q.question_text,
      q.category,
      o.option_id,
      o.option_text,
      o.score
    FROM question q
    JOIN options o ON q.question_id = o.question_id
    ORDER BY q.question_id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }

    // 🔥 group options under each question
    const questions = {};

    results.forEach(row => {
      if (!questions[row.question_id]) {
        questions[row.question_id] = {
          id: row.question_id,
          text: row.question_text,
          category: row.category,
          options: []
        };
      }

      questions[row.question_id].options.push({
        id: row.option_id,
        text: row.option_text,
        score: row.score
      });
    });

    res.json(Object.values(questions));
  });
});

// ============================
// ✅ SUBMIT QUIZ (FINAL FIXED + MULTI CATEGORY)
// ============================
app.post("/api/quiz/submit", async (req, res) => {
  const { userid, answers } = req.body;

  if (!userid || !answers || answers.length === 0) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const connection = await db.promise().getConnection();

  try {
    await connection.beginTransaction();

    // 1. Create test
    const [testResult] = await connection.query(
      "INSERT INTO test (user_id, date_taken, result_score) VALUES (?, NOW(), 0)",
      [userid]
    );

    const testId = testResult.insertId;

    // 2. Initialize scores
    let categoryScores = {
      Technology: 0,
      Business: 0,
      Health: 0,
      Arts: 0
    };

    // 3. Process answers
    for (const ans of answers) {
      const [optionData] = await connection.query(
        `SELECT tech_score, business_score, health_score, arts_score 
         FROM options WHERE option_id = ?`,
        [ans.option_id]
      );

      if (!optionData.length) continue;

      const option = optionData[0];

      categoryScores.Technology += option.tech_score || 0;
      categoryScores.Business += option.business_score || 0;
      categoryScores.Health += option.health_score || 0;
      categoryScores.Arts += option.arts_score || 0;

      await connection.query(
        "INSERT INTO answer (test_id, question_id, answer_value, score) VALUES (?, ?, ?, ?)",
        [testId, ans.question_id, ans.option_id, ans.score || 0]
      );
    }

    // 4. Sort categories (TOP system)
    const sortedCategories = Object.entries(categoryScores)
      .sort((a, b) => b[1] - a[1]);

    // ✅ TOP 2 categories
    const topCategoriesRaw = sortedCategories.slice(0, 2).map(c => c[0]);

    console.log("TOP 2 RAW:", topCategoriesRaw);

    // 5. CATEGORY MAPPING (DB MATCHING)
    const categoryMap = {
      Technology: ["Technology", "Engineering", "Science"],
      Business: ["Business"],
      Health: ["Health"],
      Arts: ["Arts & Design", "Media"],
      Engineering: ["Engineering", "Technology"],
      Education: ["Education", "Humanities"],
      Humanities: ["Humanities"],
      Science: ["Science", "Technology", "Health"],
      Media: ["Media", "Arts & Design"]
    };

    // 6. EXPAND TOP 2 INTO DB CATEGORIES
    let mappedCategories = [];

    topCategoriesRaw.forEach(cat => {
      if (categoryMap[cat]) {
        mappedCategories.push(...categoryMap[cat]);
      } else {
        mappedCategories.push(cat);
      }
    });

    // remove duplicates
    mappedCategories = [...new Set(mappedCategories)];

    console.log("FINAL CATEGORIES:", mappedCategories);

    // 7. Percentages
    const total =
      categoryScores.Technology +
      categoryScores.Business +
      categoryScores.Health +
      categoryScores.Arts;

      const safeTotal = total || 1;

    const percentages = {
      Technology: Math.round((categoryScores.Technology / safeTotal) * 100),
      Business: Math.round((categoryScores.Business / safeTotal) * 100),
      Health: Math.round((categoryScores.Health / safeTotal) * 100),
      Arts: Math.round((categoryScores.Arts / safeTotal) * 100)
    };

    // 8. Get MAJORS from MULTIPLE categories
    const placeholders = mappedCategories.map(() => "?").join(",");

    const [majors] = await connection.query(
      `SELECT * FROM major WHERE category IN (${placeholders}) LIMIT 10`,
      mappedCategories
    );

    // 9. Build results (simple ranking)
    const results = majors.map((m, index) => ({
      major_id: m.major_id,
      major_name: m.major_name,
      category: m.category,
      match_percentage: Math.max(100 - index * 7, 60)
    }));

    // 10. Save best category (TOP 1 only for DB consistency)
    const bestCategoryRaw = topCategoriesRaw[0];

    await connection.query(
      "UPDATE test SET result_score = ?, result_type = ? WHERE test_id = ?",
      [categoryScores[bestCategoryRaw], bestCategoryRaw, testId]
    );

    await connection.commit();

    // 11. RESPONSE
    res.json({
      success: true,
      testId,
      topCategories: topCategoriesRaw,
      mappedCategories,
      percentages,
      results
    });

  } catch (err) {
    await connection.rollback();
    console.error("🔥 ERROR:", err);
    res.status(500).json({ error: "Server error" });
  } finally {
    connection.release();
  }
});
// ============================
// ✅ GET RESULTS
// ============================
app.get("/api/quiz/result/:testId", async (req, res) => {
  const { testId } = req.params;

  try {
    const [test] = await db.promise().query(
      "SELECT result_type FROM test WHERE test_id = ?",
      [testId]
    );

    if (!test.length) {
      return res.status(404).json({ error: "Test not found" });
    }

    const bestCategory = test[0].result_type;
    console.log("Best category from DB:", bestCategory);

    const categoryMap = {
      Technology: ["Technology", "Engineering", "Science"],
      Business: ["Business"],
      Health: ["Health"],
      Arts: ["Arts & Design", "Media"]
    };

    let mapped = categoryMap[bestCategory] || [bestCategory];
    console.log("Mapped categories:", mapped);

    const placeholders = mapped.map(() => "?").join(",");
    let [majors] = await db.promise().query(
      `SELECT * FROM major WHERE category IN (${placeholders}) LIMIT 10`,
      mapped
    );

    // FALLBACK: if no majors found, return all majors (optional)
    if (majors.length === 0) {
      console.log("No majors found for categories, returning all majors as fallback");
      [majors] = await db.promise().query(
        "SELECT * FROM major LIMIT 10"
      );
    }

    const results = majors.map((m, index) => ({
      major_id: m.major_id,
      major_name: m.major_name,
      match_percentage: Math.max(100 - index * 7, 60)
    }));

    res.json({ results });
  } catch (err) {
    console.error("Result route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// ============================
// ✅ GET ALL POSTS (COMMUNITY)
// ============================
app.get("/api/posts", async (req, res) => {
  try {
    const [posts] = await db.promise().query(
      `SELECT p.post_id, p.content, p.created_at, u.name, u.profile_pic,
              (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.post_id) AS likes_count
       FROM posts p 
       JOIN users u ON p.user_id = u.userid
       ORDER BY p.created_at DESC`
    );
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
//
// Like/Unlike a post
app.post("/api/posts/:id/like", async (req, res) => {
  const postId = req.params.id;
  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ error: "user_id required" });

  try {
    const [existing] = await db.promise().query(
      "SELECT * FROM likes WHERE user_id = ? AND post_id = ?",
      [user_id, postId]
    );

    if (existing.length) {
      // Unlike
      await db.promise().query(
        "DELETE FROM likes WHERE user_id = ? AND post_id = ?",
        [user_id, postId]
      );
    } else {
      // Like
      await db.promise().query(
        "INSERT INTO likes (user_id, post_id) VALUES (?, ?)",
        [user_id, postId]
      );
    }

    // Return new like count and user's like state
    const [countResult] = await db.promise().query(
      "SELECT COUNT(*) AS likes FROM likes WHERE post_id = ?",
      [postId]
    );
    const liked = existing.length === 0; // after toggling
    res.json({ likes: countResult[0].likes, liked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get likes for a post (optional)
app.get("/api/posts/:id/likes", async (req, res) => {
  const postId = req.params.id;
  try {
    const [countResult] = await db.promise().query(
      "SELECT COUNT(*) AS likes FROM likes WHERE post_id = ?",
      [postId]
    );
    res.json({ likes: countResult[0].likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ============================
// COMMUNITY POSTS
// ============================

// 🔹 GET ALL POSTS
app.get("/api/posts", async (req, res) => {
  try {
    const [posts] = await db.promise().query(
      `SELECT p.post_id, p.content, p.created_at, u.name, u.profile_pic,
              (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.post_id) AS likes_count
       FROM posts p 
       JOIN users u ON p.user_id = u.userid
       ORDER BY p.created_at DESC`
    );
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 ADD POST
app.post("/api/posts", (req, res) => {
  const { user_id, content } = req.body;

  if (!user_id || !content) {
    return res.json({ success: false });
  }

  db.query(
    "INSERT INTO posts (user_id, content) VALUES (?, ?)",
    [user_id, content],
    (err) => {
      if (err) return res.json({ success: false });

      res.json({ success: true });
    }
  );
});
// ============================
// COMMUNITY POSTS
// ============================

// 🔹 GET ALL POSTS
app.get("/api/posts", async (req, res) => {
  try {
    const [posts] = await db.promise().query(
      `SELECT p.post_id, p.content, p.created_at, u.name, u.profile_pic,
              (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.post_id) AS likes_count
       FROM posts p 
       JOIN users u ON p.user_id = u.userid
       ORDER BY p.created_at DESC`
    );
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 ADD POST
app.post("/api/posts", (req, res) => {
  const { user_id, content } = req.body;

  if (!user_id || !content) {
    return res.json({ success: false, message: "Missing data" });
  }

  db.query(
    "INSERT INTO posts (user_id, content) VALUES (?, ?)",
    [user_id, content],
    (err) => {
      if (err) {
        console.log(err);
        return res.json({ success: false });
      }

      res.json({ success: true });
    }
  );
});
// ============================
// COMMENTS (REPLIES)
// ============================

// GET COMMENTS FOR POST
app.get("/api/comments/:postId", async (req, res) => {
  try {
    const [comments] = await db.promise().query(
      `SELECT c.*, u.name, u.profile_pic 
       FROM comments c 
       JOIN users u ON c.user_id = u.userid
       WHERE c.post_id = ?
       ORDER BY c.created_at ASC`,
      [req.params.postId]
    );
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ADD COMMENT
app.post("/api/comments", (req, res) => {
  const { post_id, user_id, content } = req.body;

  db.query(
    "INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)",
    [post_id, user_id, content],
    (err) => {
      if (err) return res.json({ success: false });
      res.json({ success: true });
    }
  );
});
// ============================
// ⭐ SAVE A MAJOR
// ============================
app.post("/api/save-major", async (req, res) => {
  const { user_id, major_id } = req.body;

  try {
    const [exists] = await db.promise().query(
      "SELECT * FROM saved_majors WHERE user_id = ? AND major_id = ?",
      [user_id, major_id]
    );

    if (exists.length) {
      return res.json({ message: "Already saved" });
    }

    await db.promise().query(
      "INSERT INTO saved_majors (user_id, major_id) VALUES (?, ?)",
      [user_id, major_id]
    );

    res.json({ message: "Saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// ============================
// 🤖 AI CHAT ROUTE (via n8n + Gemini)
// ============================
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: "No message provided" });
    }

    const response = await fetch("http://localhost:5678/webhook/1f48da57-ba2c-4e8d-854f-3d3ce2abd3b0", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message, user_id: "user1" })
    });

    const text = await response.text();
    console.log("n8n raw response:", text);

    let reply = "No response from AI";
    try {
      const data = JSON.parse(text);
      reply = data?.content?.parts?.[0]?.text || data?.text || text;
    } catch {
      reply = text || "No response from AI";
    }

    res.json({ reply });
  } catch (error) {
    console.error("❌ AI ERROR:", error);
    res.status(500).json({ reply: "AI failed" });
  }
});
app.get("/api/saved-majors/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [results] = await db.promise().query(
      `
      SELECT 
        m.major_id,
        m.major_name,
        m.description,
        m.category,
        m.years,
        m.demand,
        m.icon
      FROM saved_majors s
      JOIN major m ON s.major_id = m.major_id
      WHERE s.user_id = ?
      `,
      [userId]
    );

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
app.get("/api/user-quizzes/:userId", async (req, res) => {
  const { userId } = req.params;

  const [rows] = await db.promise().query(
    "SELECT * FROM user_quizzes WHERE user_id = ?",
    [userId]
  );

  res.json(rows);
});
app.post("/api/remove-major", async (req, res) => {
  const { user_id, major_id } = req.body;

  await db.promise().query(
    "DELETE FROM saved_majors WHERE user_id = ? AND major_id = ?",
    [user_id, major_id]
  );

  res.json({ message: "Removed" });
});
// ============================
// 🎯 QUIZ TOP RECOMMENDATION
// ============================
app.get("/api/quiz-recommendation/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Get latest quiz result
    const [quizzes] = await db.promise().query(
      "SELECT result_type FROM user_quizzes WHERE user_id = ? ORDER BY id DESC LIMIT 1",
      [userId]
    );

    if (!quizzes.length) {
      return res.json({ recommendation: null });
    }

    const bestCategory = quizzes[0].result_type;

    const categoryMap = {
      Technology: ["Technology", "Engineering", "Science"],
      Business: ["Business"],
      Health: ["Health"],
      Arts: ["Arts & Design", "Media"]
    };

    const mapped = categoryMap[bestCategory] || [bestCategory];
    const placeholders = mapped.map(() => "?").join(",");

    const [majors] = await db.promise().query(
      `SELECT major_id, major_name, description, category, years, demand, icon 
       FROM major WHERE category IN (${placeholders}) LIMIT 1`,
      mapped
    );

    if (!majors.length) {
      return res.json({ recommendation: null });
    }

    res.json({
      recommendation: {
        ...majors[0],
        match_percentage: 100,
        category_result: bestCategory
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
app.get("/api/saved-majors/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows] = await db.promise().query(`
      SELECT 
        m.id AS major_id,
        m.name AS major_name,
        m.category,
        m.description,
        m.years,
        m.demand,
        m.icon
      FROM saved_majors s
      JOIN majors m ON s.major_id = m.id
      WHERE s.user_id = ?
    `, [userId]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
//user quizzez
// ✅ GET USER QUIZ RESULTS (FROM test TABLE)
app.get("/api/user-results/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await db.promise().query(
      "SELECT test_id AS id, result_type, date_taken AS created_at FROM test WHERE user_id = ? ORDER BY date_taken DESC",
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
app.get("/api/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await db.promise().query(
      `SELECT userid, name, email, age, educational_level, bio, profile_pic, location
       FROM users 
       WHERE userid = ?`,
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
app.put("/api/user/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, age, educational_level, bio, location } = req.body;

  // Validate name: no numbers allowed
  if (name && /\d/.test(name)) {
    return res.status(400).json({ success: false, error: "Name cannot contain numbers" });
  }

  try {
    await db.promise().query(
      `UPDATE users 
       SET name = ?, age = ?, educational_level = ?, bio = ?, location = ?
       WHERE userid = ?`,
      [name, age, educational_level, bio || null, location || null, userId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});
app.get("/api/activity/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // ✅ Fixed: use major.major_id instead of major.id
    const [saved] = await db.promise().query(`
      SELECT 
        major.major_name AS title,
        saved_majors.created_at,
        'saved' AS type
      FROM saved_majors
      JOIN major ON saved_majors.major_id = major.major_id
      WHERE saved_majors.user_id = ?
    `, [userId]);

    const [quizzes] = await db.promise().query(`
      SELECT 
        result_type AS title,
        created_at,
        'quiz' AS type
      FROM user_quizzes
      WHERE user_id = ?
    `, [userId]);

    const activity = [...saved, ...quizzes];
    activity.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    res.json(activity);
  } catch (err) {
    console.error("Activity error:", err);
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/profile-stats/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // ✅ Count saved majors
    const [savedRows] = await db.promise().query(
      "SELECT COUNT(*) AS totalSaved FROM saved_majors WHERE user_id = ?",
      [userId]
    );

    // ✅ Count quizzes
const [quizRows] = await db.promise().query(
  "SELECT COUNT(*) AS totalQuizzes FROM test WHERE user_id = ?",
  [userId]
);

    // ✅ Most common quiz result
    const [topFieldRows] = await db.promise().query(
      `
      SELECT result_type, COUNT(*) AS total
      FROM user_quizzes
      WHERE user_id = ?
      GROUP BY result_type
      ORDER BY total DESC
      LIMIT 1
      `,
      [userId]
    );

    res.json({
      saved: savedRows[0].totalSaved,
      quizzes: quizRows[0].totalQuizzes,
      topField: topFieldRows.length > 0
        ? topFieldRows[0].result_type
        : "None"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
app.post("/api/save-quiz-result", async (req, res) => {
  const { user_id, result_type, test_id } = req.body;

  try {
    await db.promise().query(
      `
      INSERT INTO user_quizzes
      (user_id, result_type, test_id)
      VALUES (?, ?, ?)
      `,
      [user_id, result_type, test_id]
    );

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//🔥ADMINNNN
//ADMIN: Get all Users
app.get("/api/admin/users", isAdmin, (req, res) => {
  db.query("SELECT userid, name, email, age, educational_level, role FROM users", (err, result) => {
    res.json(result);
  });
});

//ADMIN: Delete user
app.delete("/api/admin/users/:id", isAdmin, (req, res) => {
  db.query("DELETE FROM users WHERE userid = ?", [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    });
});

// ADMIN: Add major
app.post("/api/admin/majors", isAdmin, (req, res) => {
  const {
    name,
    description,
    category,
    required_skills,
    skills,
    careers,
    study_plan,
    cost,
    salary_lebanon,
    salary_abroad,
    education_required,
    years,
    demand,
    icon
  } = req.body;

  const query = `
    INSERT INTO major (
      major_name,
      description,
      required_skills,
      skills,
      careers,
      study_plan,
      cost,
      salary_lebanon,
      salary_abroad,
      education_required,
      category,
      years,
      demand,
      icon
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      name,
      description,
      required_skills,
      JSON.stringify(skills),
      JSON.stringify(careers),
      JSON.stringify(study_plan),
      cost,
      salary_lebanon,
      salary_abroad,
      education_required,
      category,
      years,
      demand,
      icon
    ],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

// ADMIN: Delete major//new
app.delete("/api/admin/majors/:id", isAdmin, (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM major WHERE major_id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Major deleted successfully"
      });
    }
  );
});

// ANALYTICS - pie chart data
app.get("/api/admin/analytics", isAdmin, (req, res) => {
  db.query(
    `SELECT result_type AS name, COUNT(*) AS count 
     FROM test 
     WHERE result_type IS NOT NULL 
     GROUP BY result_type`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ADMIN: Age distribution of users
app.get("/api/admin/analytics/users/age", isAdmin, (req, res) => {
  db.query(
    `SELECT 
       CASE 
         WHEN age < 18 THEN '<18'
         WHEN age BETWEEN 18 AND 24 THEN '18-24'
         WHEN age BETWEEN 25 AND 34 THEN '25-34'
         WHEN age BETWEEN 35 AND 44 THEN '35-44'
         ELSE '45+' 
       END AS age_group,
       COUNT(*) AS count
     FROM users
     GROUP BY age_group
     ORDER BY FIELD(age_group, '<18', '18-24', '25-34', '35-44', '45+')`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ADMIN: Users by educational level
app.get("/api/admin/analytics/users/education", isAdmin, (req, res) => {
  db.query(
    "SELECT educational_level, COUNT(*) AS count FROM users GROUP BY educational_level",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ADMIN: Users by role
app.get("/api/admin/analytics/users/role", isAdmin, (req, res) => {
  db.query(
    "SELECT role, COUNT(*) AS count FROM users GROUP BY role",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ADMIN: Most saved majors (top 10)
app.get("/api/admin/analytics/majors/top-saved", isAdmin, (req, res) => {
  db.query(
    `SELECT m.major_name, COUNT(sm.major_id) AS saves
     FROM saved_majors sm
     JOIN major m ON sm.major_id = m.major_id
     GROUP BY sm.major_id
     ORDER BY saves DESC
     LIMIT 10`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ADMIN: Majors by category
app.get("/api/admin/analytics/majors/category", isAdmin, (req, res) => {
  db.query(
    "SELECT category, COUNT(*) AS count FROM major GROUP BY category",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ADMIN: Majors by demand (buckets)
app.get("/api/admin/analytics/majors/demand", isAdmin, (req, res) => {
  db.query(
    `SELECT 
       CASE 
         WHEN demand >= 90 THEN 'High (90-100)'
         WHEN demand >= 75 THEN 'Medium (75-89)'
         ELSE 'Low (<75)' 
       END AS demand_level,
       COUNT(*) AS count
     FROM major
     GROUP BY demand_level`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ADMIN: Tests taken per day (last 30 days)
app.get("/api/admin/analytics/tests/daily", isAdmin, (req, res) => {
  db.query(
    `SELECT DATE(date_taken) AS day, COUNT(*) AS count
     FROM test
     WHERE date_taken >= CURDATE() - INTERVAL 30 DAY
     GROUP BY DATE(date_taken)
     ORDER BY day ASC`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ADMIN: Average result score by result type
app.get("/api/admin/analytics/tests/avg-score", isAdmin, (req, res) => {
  db.query(
    `SELECT result_type, ROUND(AVG(result_score), 1) AS avg_score
     FROM test
     WHERE result_score IS NOT NULL AND result_type IS NOT NULL
     GROUP BY result_type`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ADMIN: Test participation per user (top 10)
app.get("/api/admin/analytics/tests/top-users", isAdmin, (req, res) => {
  db.query(
    `SELECT u.name, COUNT(t.test_id) AS tests_taken
     FROM users u
     JOIN test t ON u.userid = t.user_id
     GROUP BY u.userid
     ORDER BY tests_taken DESC
     LIMIT 10`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ADMIN: Posts per category
app.get("/api/admin/analytics/posts/category", isAdmin, (req, res) => {
  db.query(
    "SELECT COALESCE(category, 'Uncategorized') AS category, COUNT(*) AS count FROM posts GROUP BY category",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ADMIN: Comments per post (top posts)
app.get("/api/admin/analytics/comments/top", isAdmin, (req, res) => {
  db.query(
    `SELECT p.content AS post, COUNT(c.comment_id) AS comments
     FROM posts p
     LEFT JOIN comments c ON p.post_id = c.post_id
     GROUP BY p.post_id
     ORDER BY comments DESC
     LIMIT 10`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result.map(r => ({ post: r.post.substring(0, 30) + '...', comments: r.comments })));
    }
  );
});

//ADMIN: Chart
app.get("/api/admin/chart", isAdmin, (req, res) => {
  db.query(
    `SELECT result_type AS name, COUNT(*) AS count 
     FROM test 
     WHERE result_type IS NOT NULL 
     GROUP BY result_type`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

//ADMIN: Stats
app.get("/api/admin/stats", isAdmin, (req, res) => {
  const query = `
    SELECT
      (SELECT COUNT(*) FROM users) AS users,
      (SELECT COUNT(*) FROM major) AS majors,
      (SELECT COUNT(DISTINCT test_id) FROM answer) AS tests
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

// ADMIN – Delete a comment
app.delete("/api/admin/comments/:id", isAdmin, (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM comments WHERE comment_id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Server error" });
    res.json({ success: true });
  });
});

// GET all questions with options (admin)
app.get("/api/admin/questions", isAdmin, (req, res) => {
  const query = `
    SELECT q.question_id, q.question_text, q.category,
           o.option_id, o.option_text,
           o.tech_score, o.business_score, o.health_score, o.arts_score
    FROM question q
    LEFT JOIN \`options\` o ON q.question_id = o.question_id
    ORDER BY q.question_id, o.option_id
  `;
  db.query(query, (err, rows) => {
    if (err) return res.status(500).json(err);
    const questionsMap = {};
    rows.forEach(row => {
      if (!questionsMap[row.question_id]) {
        questionsMap[row.question_id] = {
          id: row.question_id,
          text: row.question_text,
          category: row.category,
          options: []
        };
      }
      if (row.option_id) {
        questionsMap[row.question_id].options.push({
          id: row.option_id,
          text: row.option_text,
          tech_score: row.tech_score,
          business_score: row.business_score,
          health_score: row.health_score,
          arts_score: row.arts_score
        });
      }
    });
    res.json(Object.values(questionsMap));
  });
});

// ADD question with options
app.post("/api/admin/questions", isAdmin, async (req, res) => {
  const { text, category, options } = req.body; // options: [{text, tech, business, health, arts}]
  const connection = await db.promise().getConnection();
  try {
    await connection.beginTransaction();
    const [qRes] = await connection.query(
      "INSERT INTO question (question_text, category) VALUES (?, ?)",
      [text, category]
    );
    const questionId = qRes.insertId;
    for (const opt of options) {
      await connection.query(
        `INSERT INTO \`options\` 
         (question_id, option_text, tech_score, business_score, health_score, arts_score) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [questionId, opt.text, opt.tech, opt.business, opt.health, opt.arts]
      );
    }
    await connection.commit();
    res.json({ success: true, id: questionId });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: "Server error" });
  } finally {
    connection.release();
  }
});

// UPDATE question with options/edit
app.put("/api/admin/questions/:id", isAdmin, async (req, res) => {
  const questionId = req.params.id;
  const { text, category, options } = req.body;
  const connection = await db.promise().getConnection();
  try {
    await connection.beginTransaction();

    // Update question text and category
    await connection.query(
      "UPDATE question SET question_text = ?, category = ? WHERE question_id = ?",
      [text, category, questionId]
    );

    // Delete existing options for the question (cascade not automatic by default)
    await connection.query("DELETE FROM `options` WHERE question_id = ?", [questionId]);

    // Insert new options
    for (const opt of options) {
      await connection.query(
        `INSERT INTO \`options\` (question_id, option_text, tech_score, business_score, health_score, arts_score)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [questionId, opt.text, opt.tech, opt.business, opt.health, opt.arts]
      );
    }

    await connection.commit();
    res.json({ success: true });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: "Server error" });
  } finally {
    connection.release();
  }
});

// DELETE question (options deleted via FK cascade)
app.delete("/api/admin/questions/:id", isAdmin, (req, res) => {
  db.query("DELETE FROM question WHERE question_id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

//edit major in Admin 
app.put("/api/admin/majors/:id", isAdmin, async (req, res) => {
  const majorId = req.params.id;
  const {
    name, description, category, required_skills,
    skills, careers, study_plan,
    cost, salary_lebanon, salary_abroad,
    education_required, years, demand, icon
  } = req.body;

  try {
    await db.promise().query(
      `UPDATE major SET
        major_name = ?, description = ?, required_skills = ?,
        skills = ?, careers = ?, study_plan = ?,
        cost = ?, salary_lebanon = ?, salary_abroad = ?,
        education_required = ?, category = ?, years = ?,
        demand = ?, icon = ?
       WHERE major_id = ?`,
      [
        name, description, required_skills,
        JSON.stringify(skills), JSON.stringify(careers), JSON.stringify(study_plan),
        cost, salary_lebanon, salary_abroad,
        education_required, category, years,
        demand, icon,
        majorId
      ]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});
//community

// Pin Post Route
// 🔹 Pin / Unpin a post
app.put("/api/admin/posts/pin/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE posts SET pinned = NOT pinned WHERE post_id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      res.json({ message: "Post updated" });
    }
  );
});

// 🔹 Delete a post (already exists, just ensure it's here)
app.delete("/api/admin/posts/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM comments WHERE post_id = ?",
    [id],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      db.query(
        "DELETE FROM posts WHERE post_id = ?",
        [id],
        (err2) => {
          if (err2) {
            console.log(err2);
            return res.status(500).json(err2);
          }
          res.json({ message: "Post deleted" });
        }
      );
    }
  );
});

// 🔹 Search / filter posts
app.get("/api/admin/posts/search", (req, res) => {
  const { query, filter } = req.query;
  let sql = `
    SELECT p.*, u.name, u.profile_pic,
           (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.post_id) AS likes_count
    FROM posts p 
    JOIN users u ON p.user_id = u.userid 
    WHERE 1=1
  `;
  const params = [];
  if (query) {
    sql += ` AND (p.content LIKE ? OR u.name LIKE ?)`;
    params.push(`%${query}%`, `%${query}%`);
  }
  if (filter === 'pinned') {
    sql += ` AND p.pinned = 1`;
  } else if (filter === 'unpinned') {
    sql += ` AND p.pinned = 0`;
  }
  sql += ` ORDER BY p.created_at DESC`;
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Enhanced Stats Route (updated)
app.get("/api/admin/community/stats", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS totalPosts FROM posts",
    (err, postsResult) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      db.query(
        "SELECT COUNT(*) AS totalComments FROM comments",
        (err2, commentsResult) => {
          if (err2) {
            console.log(err2);
            return res.status(500).json(err2);
          }

          // Get pinned posts count
          db.query(
            "SELECT COUNT(*) AS pinnedPosts FROM posts WHERE pinned = 1",
            (err3, pinnedResult) => {
              if (err3) {
                console.log(err3);
                return res.status(500).json(err3);
              }

              res.json({
                totalPosts: postsResult[0].totalPosts,
                totalComments: commentsResult[0].totalComments,
                pinnedPosts: pinnedResult[0].pinnedPosts,
              });
            }
          );
        }
      );
    }
  );
});

//test
app.get("/test", (req, res) => {
  res.send("Backend works");
});
// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// ---------------------------
// START SERVER
// ---------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});