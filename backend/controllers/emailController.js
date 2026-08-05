import { sendEmail } from "../services/gmailService.js";
import { sendGuestEmail } from "../services/guestMailService.js";

export const sendBulkEmails = async (req, res) => {
  console.log("\n==============================");
  console.log("📨 EMAIL CONTROLLER STARTED");
  console.log("==============================");

  try {
    const { emails, subject, message, guest } = req.body;
    const useGuest = guest === true || guest === "true";

    console.log("Guest mode:", useGuest);
    console.log("Authenticated User:", !!req.user);

    if (!Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please add at least one recipient email.",
      });
    }

    if (!subject?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a subject.",
      });
    }

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      });
    }

    if (!useGuest && !req.user) {
      console.log("❌ User not authenticated");
      return res.status(401).json({
        success: false,
        message: "Please login first.",
      });
    }

    const sender = useGuest
      ? process.env.GUEST_FROM_EMAIL || process.env.GUEST_SMTP_USER || "no-reply@example.com"
      : req.user.profile.emails[0].value;

    if (useGuest) {
      console.log("Sending as guest sender:", sender);
      if (!process.env.GUEST_SMTP_HOST || !process.env.GUEST_SMTP_PORT) {
        return res.status(500).json({
          success: false,
          message:
            "Guest email sending is not configured. Please set GUEST_SMTP_HOST and GUEST_SMTP_PORT in backend .env.",
        });
      }
    } else {
      console.log("Logged in as:", sender);
    }

    const results = [];

    for (const email of emails) {
      console.log("\n----------------------------");
      console.log("Sending email to:", email);
      console.log("----------------------------");

      try {
        const result = useGuest
          ? await sendGuestEmail({
              to: email,
              subject,
              message,
              senderEmail: sender,
            })
          : await sendEmail({
              accessToken: req.user.accessToken,
              to: email,
              subject,
              message,
            });

        console.log("✅ Email sent successfully");
        console.log(result);

        results.push({
          email,
          success: true,
          messageId: result.messageId || result.id || result.response || "guest-sent",
        });

      } catch (err) {
        console.log("❌ Failed to send");
        console.error(err);

        results.push({
          email,
          success: false,
          error: err.message,
        });
      }
    }

    console.log("\n==============================");
    console.log("FINISHED");
    console.log(results);
    console.log("==============================\n");

    return res.json({
      success: true,
      sender,
      results,
    });

  } catch (err) {
    console.log("🔥 CONTROLLER ERROR");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};