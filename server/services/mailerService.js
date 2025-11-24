const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async function sendAlertEmail(title, text) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  await transporter.sendMail({
    from: `"Scraper" <${process.env.EMAIL_USER}>`,
    to: process.env.ALERT_TO,
    subject: title,
    text: text
  });

  console.log("Email enviado!");
};
