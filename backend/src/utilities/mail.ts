import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";
dotenv.config();
const { SENDGRID_KEY, EMAIL_PORT, EMAIL_HOST, SENDER_EMAIL } = process.env;
const transportOptions: SMTPTransport.Options = {
  host: EMAIL_HOST,
  port: Number(EMAIL_PORT),
  secure: false, // Set to true if you are using a secure connection (TLS/SSL)
  auth: {
    user: "apikey",
    pass: SENDGRID_KEY,
  },
};
const transporter = nodemailer.createTransport(transportOptions);
async function sendMail(email: string, subject: string, html: string) {
  try {
    if (!SENDER_EMAIL) {
      throw new Error("sender email not specified");
    }
    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: email,
      subject: subject,
      html: html,
    });
  } catch (error) {
    console.error(error);
    throw new Error("couldn't send mail");
  }
}

export default sendMail;
