import express from "express";
import passport from "../auth/googleAuth.js";
import { getCurrentUser } from "../controllers/authController.js";

const router = express.Router();

// Login with Google
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
    console.log("User Logged In");
    console.log(req.user.profile.emails[0].value);

    res.redirect("http://localhost:5173");
  }
);

router.get("/me", getCurrentUser);

export default router;