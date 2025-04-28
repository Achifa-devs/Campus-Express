export function tokenTemplate(name, token, email){
    return (
        `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <title>Confirm Your Token</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <style>
                        body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f5f5f5;
                        }

                        .container {
                        max-width: 600px;
                        margin: auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        }

                        .header {
                        background-color: #FF4500;
                        color: white;
                        padding: 30px 20px;
                        text-align: center;
                        }

                        .header h1 {
                        margin: 0;
                        font-size: 24px;
                        font-weight: 600;
                        }

                        .header p {
                        margin-top: 8px;
                        font-size: 14px;
                        color: #fff;
                        }

                        .content {
                        padding: 30px 20px;
                        color: #333;
                        line-height: 1.6;
                        }

                        .token-box {
                        background-color: #f0f4ff;
                        padding: 15px;
                        text-align: center;
                        font-size: 24px;
                        font-weight: bold;
                        letter-spacing: 2px;
                        border-radius: 6px;
                        margin: 20px 0;
                        }

                        .footer {
                        background-color: #1a1a1a;
                        color: #ccc;
                        text-align: center;
                        padding: 20px;
                        font-size: 14px;
                        }

                        .footer a {
                        color: #aaa;
                        text-decoration: none;
                        margin: 0 8px;
                        }

                        .footer a:hover {
                        text-decoration: underline;
                        }

                        .social-icons {
                        margin-top: 15px;
                        }

                        .social-icons img {
                        width: 24px;
                        margin: 0 8px;
                        vertical-align: middle;
                        }
                    </style>
                </head>
                <body>

                    <div class="container">
                        <div class="header">
                            <h1>Campus Sphere Token Confirmation</h1>
                            <p>Secure your account with confidence</p>
                        </div>
                        <div class="content">
                            <p>Hello <strong>${name}</strong>,</p>
                            <p>To complete your your email verification, please use the token below:</p>

                            <div class="token-box">${token}</div>
                            <p>This token will expire in <strong>10 minutes</strong>. If you didn&apos;t make this request, you can safely ignore this email.</p>

                            <p>You can just use this link below to continue</p>
                            <button >
                                <a class='continue-link' href='https://www.campussphere.net/vendor/reset-password?token=${token}&email=${email}'>
                                    Continue Here
                                </a>
                            </button>


                            <p>Best regards,<br />The Campus Sphere Team</p>
                        </div>
                        <div class="footer">
                            <p>&copy; 2024 Campus Sphere. All rights reserved.</p>
                            <p>
                                <a href="#">Privacy Policy</a> |
                                <a href="#">Terms of Service</a> |
                                <a href="#">Support</a>
                            </p>

                            <div class="social-icons">
                                <a href="https://facebook.com/yourbrand">
                                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
                                </a>
                                <a href="https://twitter.com/yourbrand">
                                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter">
                                </a>
                                <a href="https://instagram.com/yourbrand">
                                <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram">
                                </a>
                                <a href="https://linkedin.com/company/yourbrand">
                                <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn">
                                </a>
                            </div>
                        </div>
                    </div>

                </body>
            </html>

        `
    )
}