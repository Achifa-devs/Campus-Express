
import nodemailer from 'nodemailer'
export async function send_email(subject, template, email) {

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.privateemail.com',  // Replace with your SMTP server hostname
        port: 465, // Replace with your SMTP server port
        secure: true, // Set to true if using SSL/TLS
        auth: { 
            user: 'campus-sphere@campussphere.net', // Replace with your email address
            pass: 'A!nianuli82003', // Replace with your email password or app-specific password
        },
        
    }); 
 
    // Email content 
    const mailOptions = {
        from: '"Campus Sphere" <campus-sphere@campussphere.net>', // Replace with your email address
        to: `${email}`, // Replace with the recipient's email address
        subject: subject,
        html: template 
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



export async function send_mail_via_brevo(subject,html,email) {
    let transporter = nodemailer.createTransport({
         host: 'smtp-relay.brevo.com', // Zoho SMTP server     
        port: 587, // SSL Port
        secure: true, // Use SSL
        auth: {
            user: '686134001@smtp-brevo.com', // your Outlook email address
            pass: 'P0pRUWShnOmJGvcr', // your Outlook email password
        }
    });

    // Setup email data
    let mailOptions = {
        from: '"Campus Sphere" <campus-sphere@campussphere.net>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        // text: mssg, // plain text body
        html: html // html body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });



}
