import nodemailer from "nodemailer";

export async function sendGuestEmail({ to, subject, message, senderEmail }) {
  const transporter = nodemailer.createTransport({
    host: process.env.GUEST_SMTP_HOST,
    port: Number(process.env.GUEST_SMTP_PORT) || 587,
    secure: process.env.GUEST_SMTP_SECURE === "true",
    auth: {
      user: process.env.GUEST_SMTP_USER,
      pass: process.env.GUEST_SMTP_PASS,
    },
  });

  const mailOptions = {
    from: senderEmail,
    to,
    subject,
    html: message.replace(/\n/g, "<br>"),
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Guest email sent:", info);

  return info;
}
