import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";

import passport from "./auth/googleAuth.js";

import googleRoutes from "./routes/googleAuthRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Body Parser
app.use(express.json());

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true only if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", googleRoutes);
app.use("/api", emailRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MailFlow Backend Running 🚀",
  });
});
app.get("/session-test", (req, res) => {
  res.json({
    session: req.session,
    user: req.user || null,
    isAuthenticated: req.isAuthenticated(),
  });
});
app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});