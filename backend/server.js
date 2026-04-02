require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// 1. Setup Database SQLite
const dbPath = path.resolve(__dirname, "precise.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("DB Connection Error:", err.message);
  else console.log("Connected to SQLite Database.");
});

// Initialize Tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        provider TEXT DEFAULT 'email',
        role TEXT DEFAULT 'Member',
        avatar TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS reset_tokens (
        email TEXT,
        token TEXT,
        expires_at INTEGER
    )`);
});

// 2. Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      provider: user.provider,
      role: user.role,
      avatar: user.avatar,
    },
    process.env.JWT_SECRET || "secretapikey",
    { expiresIn: "1d" },
  );
};

// 3. API Routes ==================================

// Register
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, row) => {
    if (row)
      return res
        .status(400)
        .json({ success: false, message: "Email sudah terdaftar!" });

    const hashedPass = await bcrypt.hash(password, 10);
    const avatar = name.charAt(0).toUpperCase();

    db.run(
      `INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)`,
      [name, email, hashedPass, avatar],
      function (err) {
        if (err)
          return res
            .status(500)
            .json({ success: false, message: "System error" });
        res.json({ success: true, message: "Registrasi berhasil!" });
      },
    );
  });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Email atau password salah!" });
    if (user.provider !== "email")
      return res.status(400).json({
        success: false,
        message: `Akun ini didaftarkan dengan ${user.provider}. Silakan login menggunakan opsi ${user.provider}.`,
      });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res
        .status(400)
        .json({ success: false, message: "Email atau password salah!" });

    const token = generateToken(user);
    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        provider: user.provider,
        role: user.role,
        avatar: user.avatar,
      },
    });
  });
});

// Social Login
app.post("/api/auth/social", (req, res) => {
  const { name, email, picture, provider } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (user) {
      // Already registered
      const token = generateToken(user);
      return res.json({
        success: true,
        token,
        user: {
          name: user.name,
          email: user.email,
          provider: user.provider,
          role: user.role,
          avatar: user.avatar,
        },
        message: "Login success!",
      });
    } else {
      // New user via social
      const p = provider || "OAuth";
      db.run(
        `INSERT INTO users (name, email, provider, role, avatar) VALUES (?, ?, ?, ?, ?)`,
        [name, email, p, "Member", picture],
        function (err) {
          if (err)
            return res
              .status(500)
              .json({ success: false, message: "System error" });

          const newUser = {
            id: this.lastID,
            name,
            email,
            provider: p,
            role: "Member",
            avatar: picture,
          };
          const token = generateToken(newUser);
          res.json({
            success: true,
            token,
            user: newUser,
            message: "Akun dari " + p + " terdaftar!",
          });
        },
      );
    }
  });
});

// Get User Count
app.get("/api/users/count", (req, res) => {
  db.get(`SELECT COUNT(*) as count FROM users`, [], (err, row) => {
    res.json({ success: true, count: row ? row.count : 0 });
  });
});

// Forgot Password (Send Real Email!)
app.post("/api/auth/forgot-password", (req, res) => {
  const { email } = req.body;
  db.get(
    `SELECT * FROM users WHERE email = ? AND provider = 'email'`,
    [email],
    (err, user) => {
      if (!user)
        return res.status(400).json({
          success: false,
          message: "Email tak ditemukan (Atau ini email SSO Google/Facebook).",
        });

      // Generate reset token (6 digit)
      const tokenCode = Math.floor(100000 + Math.random() * 900000).toString(); // simple OTP style instead of long hex for ease
      const expires = Date.now() + 3600000; // 1 hour

      db.run(
        `INSERT INTO reset_tokens (email, token, expires_at) VALUES (?, ?, ?)`,
        [email, tokenCode, expires],
        (err) => {
          if (err)
            return res
              .status(500)
              .json({ success: false, message: "System Error" });

          const mailOptions = {
            from: `"PrecisePay" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset Code - PrecisePay",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; border-radius: 8px;">
                    <h2 style="color: #FF4D4D;">Reset Password Anda</h2>
                    <p>Halo <strong>${user.name}</strong>,</p>
                    <p>Kami menerima request untuk reset password PrecisePay Anda. Gunakan KODE RAHASIA ini untuk memulihkan akses ke akun: </p>
                    <div style="font-size: 24px; font-weight: bold; background: white; padding: 12px; text-align: center; border: 2px dashed #000; border-radius: 6px; letter-spacing: 4px;">
                        ${tokenCode}
                    </div>
                    <p style="color: #64748b; font-size: 14px; margin-top: 20px;">*Kode ini hangus dalam 1 Jam dan jangan berikan kode ke siapapun.</p>
                </div>
                `,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Nodemailer Error: ", error);
              return res.status(500).json({
                success: false,
                message:
                  "Gagal memanggil SMTP, pastikan credential GMAIL Anda benar di dalam folder backend/.env!",
              });
            }
            res.json({
              success: true,
              message: "Kode pemulihan terkirim ke email Anda!",
              token: tokenCode,
            }); // note: we send token back temporarily for testing if email fails, UI depends on it for forgot form steps
          });
        },
      );
    },
  );
});

// Verify Token
app.post("/api/auth/verify-token", (req, res) => {
  const { token } = req.body;
  db.get(
    `SELECT * FROM reset_tokens WHERE token = ? AND expires_at > ?`,
    [token, Date.now()],
    (err, row) => {
      if (!row)
        return res.status(400).json({
          success: false,
          message: "Kode OTP usang atau tidak valid.",
        });
      res.json({ success: true, message: "Kode valid!" });
    },
  );
});

// Reset Password (using Token)
app.post("/api/auth/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  db.get(
    `SELECT * FROM reset_tokens WHERE token = ? AND expires_at > ?`,
    [token, Date.now()],
    async (err, row) => {
      if (!row)
        return res.status(400).json({
          success: false,
          message: "Kode Reset Token usang atau invalid.",
        });

      const hashedPass = await bcrypt.hash(newPassword, 10);
      db.run(
        `UPDATE users SET password = ? WHERE email = ?`,
        [hashedPass, row.email],
        (err) => {
          if (err)
            return res.status(500).json({
              success: false,
              message: "System error saat update DB.",
            });

          db.run(`DELETE FROM reset_tokens WHERE email = ?`, [row.email]);
          res.json({
            success: true,
            message: "Sukses ganti password! Anda bisa Sign-In sekarang.",
          });
        },
      );
    },
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend Ready! API nyala pada: http://localhost:${PORT}`);
  console.log(`📩 SMTP Email Setup (baca file .env jika perlu disesuaikan)`);
});
