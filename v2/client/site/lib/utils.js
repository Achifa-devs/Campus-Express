import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const maxAge = 90 * 24 * 60 * 60;

export function generateUserJwtToken(id) {
  return jwt.sign({ id }, process.env.USER_SECRET, {
    expiresIn: maxAge,
  });
}

export function generateNumericToken() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

export async function sendEmail(subject, template, email) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.privateemail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || 'campus-sphere@campussphere.net',
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"dorm deals"<campus-sphere@campussphere.net>',
      to: email,
      subject,
      html: template,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// API Response helpers
export function successResponse(data, status = 200) {
  return Response.json({ success: true, data }, { status });
}

export function errorResponse(message, status = 400) {
  return Response.json({ success: false, message }, { status });
}
