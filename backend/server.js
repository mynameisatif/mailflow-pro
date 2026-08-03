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

app.set("trust proxy", 1);

// CORS
// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mynameisatif.github.io",
      "https://mynameisatif.github.io/mailflow-pro",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parser
app.use(express.json());

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mailflow-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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