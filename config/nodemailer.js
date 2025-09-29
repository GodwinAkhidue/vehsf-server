import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function SendNodemailerMail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `VEHSF <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    return { info };
  } catch (err) {
    return { err };
  }
}

export default SendNodemailerMail;
