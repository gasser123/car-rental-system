import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";
dotenv.config();
const {
  EMAIL_AUTH_USERNAME,
  EMAIL_AUTH_PASSWORD,
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
    user: EMAIL_AUTH_USERNAME,
    pass: EMAIL_AUTH_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(transportOptions);
async function sendMail(email: string, subject: string, html: string) {
  try {
    if (!SENDER_EMAIL) {
      throw new Error("sender email not specified");
    }
    if (!EMAIL_AUTH_USERNAME) {
      throw new Error("email not specified");
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
