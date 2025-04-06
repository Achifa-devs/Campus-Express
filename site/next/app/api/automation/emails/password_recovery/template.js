export function PWD_RESET_TEMPLATE(name,token) {
    return(
       `
        <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Recovery</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ff4500; /* Red-orange background */
            border-radius: 10px;
            padding: 30px;
            text-align: center;
            color: #ffffff;
        }
        .logo {
            margin-bottom: 15px;
        }
        .logo img {
            max-width: 150px; /* Adjust as needed */
        }
        .content {
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            color: #333333;
            text-align: center;
        }
        h1 {
            margin-bottom: 10px;
            color: #ff4500;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
        }
        .token {
            font-size: 20px;
            font-weight: bold;
            color: #ff4500;
            background: #fff3e0;
            padding: 10px 20px;
            display: inline-block;
            border-radius: 5px;
            margin: 15px 0;
        }
        .button {
            background: #ff4500;
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            display: inline-block;
            margin-top: 10px;
        }
        .button:hover {
            background: #e03e00;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
        }
        .social-icons {
            margin: 15px 0;
        }
        .social-icons a {
            display: inline-block;
            margin: 0 8px;
            text-decoration: none;
        }
        .social-icons img {
            width: 32px;
            height: 32px;
        }
        .footer-text {
            font-size: 14px;
            color: #ffffff;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Logo -->
        <div class="logo">
            <img src="https://res.cloudinary.com/daqbhghwq/image/upload/v1724852529/448223033_380994008307411_3052806854721458949_n_fbxqpk.jpg" alt="Campus Sphere">
        </div>

        <h1>Password Recovery</h1>
        <div class="content">
            <p>Hello, ${name}</p>
            <p>You requested a password reset. Use the token below or click the button to reset your password.</p>
            <div class="token">${token}</div>
            <a href="https://campussphere.net/new-password?token=123456" class="button">Reset Password</a>
            <p>If you did not request this, please ignore this email.</p>
        </div>
        
        <div class="footer">
            <p class="footer-text">Follow us on</p>
            <div class="social-icons">
                <a href="https://twitter.com/yourpage" target="_blank">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter">
                </a>
                <a href="https://facebook.com/yourpage" target="_blank">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
                </a>
                <a href="https://wa.me/yourwhatsappnumber" target="_blank">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp">
                </a>
            </div>
            <p class="footer-text">&copy; 2025 Campus Sphere. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

       
       `
    )
}