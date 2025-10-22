const maxAge = 90 * 24 * 60 * 60; 
const jwt  =  require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer')

module.exports = class tools {
  static generateUserJwtToken = (id) => {
    return jwt.sign({ id }, process.env.USER_SECRET, {
      expiresIn: maxAge
    });
  };
  
  static generateNumericToken() {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  static async send_email(subject, template, email) {
    try {
      // Create a transporter using SMTP
      const transporter = nodemailer.createTransport({
        host: 'smtp.privateemail.com',  
        port: 465, 
        secure: true, 
        auth: { 
          user: 'campus-sphere@campussphere.net',
          pass: 'A!nianuli82003',
        },
      });
  
      // Email content 
      const mailOptions = { 
        from: '"Campus Sphere" <campus-sphere@campussphere.net>',
        to: email,
        subject,
        html: template,
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
  
      return true; // ✅ Email sent successfully
    } catch (error) {
      console.error("Error sending email:", error);
      return false; // ❌ Failed to send
    }
  }
  

}

// Example usage: