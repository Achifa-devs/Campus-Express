
import nodemailer from 'nodemailer'

export async function send_email(subject, template, email) {
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
