const modules = require('../modules');

function BrevoTemp(subject,to,html) {
    const nodemailer = require('nodemailer'); 
 
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',  // Replace with your SMTP server hostname
        port: 587, // Replace with your SMTP server port
        secure: true, // Set to true if using SSL/TLS
        auth: { 
            user: 'akpulufabian@gmail.com', // Replace with your email address
            pass: 'nbZL3fDMPTHSqzah', // Replace with your email password or app-specific password
        },
    }); 

    // Email content 
    const mailOptions = {
        from: 'akpulufabian@gmail.com', // Replace with your email address
        to: `${to}`, // Replace with the recipient's email address
        subject: subject,
        html: html
        
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}


module.exports = {
    BrevoTemp
}