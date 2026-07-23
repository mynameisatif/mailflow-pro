import express from "express";
import passport from "../auth/googleAuth.js";
import { getCurrentUser } from "../controllers/authController.js";

const router = express.Router();

// Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/gmail.send",
    ],
    accessType: "offline",
    prompt: "consent",
  })
);

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: true,
  }),
  (req, res) => {
    res.redirect("https://mynameisatif.github.io/mailflow-pro/");
  }
);

// Current User
router.get("/me", getCurrentUser);

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    req.session.destroy(() => {
      res.redirect("https://mynameisatif.github.io/mailflow-pro/");
    });
  });
});

export default router;