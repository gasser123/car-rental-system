import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";
dotenv.config();
const {
  ETHEREAL_USERNAME,
  ETHEREAL_PASSWORD,
  EMAIL_PORT,
  EMAIL_HOST,
  SENDER_EMAIL,
} = process.env;
const transportOptions: SMTPTransport.Options = {
  host: EMAIL_HOST,
  port: Number(EMAIL_PORT),
  secure: false, // Set to true if you are using a secure connection (TLS/SSL)
  tls: {rejectUnauthorized: false},
  auth: {
    user: ETHEREAL_USERNAME,
    pass: ETHEREAL_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(transportOptions);
async function sendMail(email: string, subject: string, html: string) {
  try {
    if (!SENDER_EMAIL) {
      throw new Error("sender email not specified");
    }
    if (!ETHEREAL_USERNAME) {
      throw new Error("email not specified");
    }
    email = ETHEREAL_USERNAME;
    const info = await transporter.sendMail({
      from: SENDER_EMAIL,
      to: email,
      subject: subject,
      html: html,
    });
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error(error);
    throw new Error("couldn't send mail");
  }
}

export default sendMail;
