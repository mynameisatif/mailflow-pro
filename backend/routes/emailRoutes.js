import express from "express";
import { sendBulkEmails } from "../controllers/emailController.js";

const router = express.Router();

router.post("/send-email", sendBulkEmails);

export default router;