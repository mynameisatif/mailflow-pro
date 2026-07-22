import { sendEmail } from "../services/gmailService.js";

export const sendBulkEmails = async (req, res) => {
  console.log("\n==============================");
  console.log("📨 EMAIL CONTROLLER STARTED");
  console.log("==============================");

  try {
    console.log("Authenticated User:", !!req.user);

    if (!req.user) {
      console.log("❌ User not authenticated");

      return res.status(401).json({
        success: false,
        message: "Please login first.",
      });
    }

    console.log("Logged in as:", req.user.profile.emails[0].value);

    const { emails, subject, message } = req.body;

    console.log("Recipients:", emails);
    console.log("Subject:", subject);
    console.log("Message:", message);

    const sender = req.user.profile.emails[0].value;

    const results = [];

    for (const email of emails) {
      console.log("\n----------------------------");
      console.log("Sending email to:", email);
      console.log("----------------------------");

      try {
        const result = await sendEmail({
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
          messageId: result.messageId || result.id,
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