import express from "express";
import { sendBulkEmails } from "../controllers/emailController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send-email", requireAuth, sendBulkEmails);

export default router;