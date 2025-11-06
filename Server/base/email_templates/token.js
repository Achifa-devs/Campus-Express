module.exports = function tokenTemplate(name, token, email){
    return (
        `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <title>Verify Your Email - Campus Sphere</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                        
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }

                        body {
                            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            margin: 0;
                            padding: 0;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            min-height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .container {
                            max-width: 500px;
                            margin: 20px auto;
                            background: #ffffff;
                            border-radius: 20px;
                            overflow: hidden;
                            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                        }

                        .header {
                            background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%);
                            color: white;
                            padding: 40px 30px;
                            text-align: center;
                            position: relative;
                            overflow: hidden;
                        }

                        .header::before {
                            content: '';
                            position: absolute;
                            top: -50%;
                            left: -50%;
                            width: 200%;
                            height: 200%;
                            background: radial-gradient(circle, rgba(255,255,255,0.1) 1%, transparent 1%);
                            background-size: 20px 20px;
                            animation: float 6s ease-in-out infinite;
                        }

                        @keyframes float {
                            0%, 100% { transform: translateY(0px) rotate(0deg); }
                            50% { transform: translateY(-10px) rotate(180deg); }
                        }

                        .logo {
                            width: 60px;
                            height: 60px;
                            background: rgba(255, 255, 255, 0.2);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 20px;
                            font-weight: bold;
                            font-size: 24px;
                            backdrop-filter: blur(10px);
                        }

                        .header h1 {
                            margin: 0;
                            font-size: 28px;
                            font-weight: 700;
                            letter-spacing: -0.5px;
                        }

                        .header p {
                            margin-top: 8px;
                            font-size: 16px;
                            color: rgba(255, 255, 255, 0.9);
                            font-weight: 400;
                        }

                        .content {
                            padding: 40px 30px;
                            color: #2D3748;
                            line-height: 1.7;
                        }

                        .greeting {
                            font-size: 18px;
                            font-weight: 600;
                            color: #1A202C;
                            margin-bottom: 20px;
                        }

                        .instruction {
                            color: #4A5568;
                            margin-bottom: 25px;
                            font-size: 15px;
                        }

                        .token-container {
                            background: linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%);
                            border: 2px dashed #E2E8F0;
                            border-radius: 16px;
                            padding: 25px;
                            text-align: center;
                            margin: 25px 0;
                            position: relative;
                        }

                        .token-label {
                            font-size: 14px;
                            color: #718096;
                            font-weight: 500;
                            margin-bottom: 12px;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        }

                        .token-box {
                            font-family: 'Courier New', monospace;
                            font-size: 32px;
                            font-weight: 700;
                            color: #2D3748;
                            letter-spacing: 3px;
                            background: #FFFFFF;
                            padding: 15px;
                            border-radius: 12px;
                            border: 2px solid #E2E8F0;
                            display: inline-block;
                            min-width: 200px;
                        }

                        .expiry-notice {
                            background: #FFF5F5;
                            border: 1px solid #FED7D7;
                            border-radius: 12px;
                            padding: 16px;
                            margin: 20px 0;
                            text-align: center;
                        }

                        .expiry-notice strong {
                            color: #C53030;
                        }

                        .cta-button {
                            display: block;
                            width: 100%;
                            background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%);
                            color: white;
                            text-decoration: none;
                            padding: 18px 30px;
                            border-radius: 12px;
                            text-align: center;
                            font-weight: 600;
                            font-size: 16px;
                            margin: 30px 0;
                            transition: all 0.3s ease;
                            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
                        }

                        .cta-button:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
                        }

                        .alternative-text {
                            text-align: center;
                            color: #718096;
                            font-size: 14px;
                            margin-bottom: 25px;
                        }

                        .security-note {
                            background: #F0FFF4;
                            border: 1px solid #9AE6B4;
                            border-radius: 12px;
                            padding: 16px;
                            margin: 20px 0;
                            font-size: 14px;
                            color: #276749;
                        }

                        .signature {
                            margin-top: 30px;
                            padding-top: 20px;
                            border-top: 1px solid #E2E8F0;
                        }

                        .signature p {
                            color: #4A5568;
                            margin-bottom: 5px;
                        }

                        .footer {
                            background: #1A202C;
                            color: #A0AEC0;
                            text-align: center;
                            padding: 30px;
                        }

                        .footer-links {
                            margin: 20px 0;
                        }

                        .footer-links a {
                            color: #CBD5E0;
                            text-decoration: none;
                            margin: 0 15px;
                            font-size: 14px;
                            transition: color 0.3s ease;
                        }

                        .footer-links a:hover {
                            color: #FFFFFF;
                        }

                        .social-icons {
                            margin: 25px 0;
                        }

                        .social-icon {
                            display: inline-block;
                            width: 40px;
                            height: 40px;
                            background: rgba(255, 255, 255, 0.1);
                            border-radius: 50%;
                            margin: 0 8px;
                            transition: all 0.3s ease;
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .social-icon:hover {
                            background: #FF6B35;
                            transform: translateY(-2px);
                        }

                        .social-icon img {
                            width: 18px;
                            height: 18px;
                            filter: brightness(0) invert(1);
                        }

                        .copyright {
                            font-size: 12px;
                            color: #718096;
                            margin-top: 20px;
                        }

                        @media (max-width: 600px) {
                            .container {
                                margin: 10px;
                                border-radius: 16px;
                            }
                            
                            .header {
                                padding: 30px 20px;
                            }
                            
                            .content {
                                padding: 30px 20px;
                            }
                            
                            .token-box {
                                font-size: 24px;
                                padding: 12px;
                                min-width: 150px;
                            }
                            
                            .footer {
                                padding: 25px 20px;
                            }
                        }
                    </style>
                </head>
                <body>

                    <div class="container">
                        <div class="header">
                            <div class="logo">CS</div>
                            <h1>Verify Your Email</h1>
                            <p>Secure access to your Campus Sphere account</p>
                        </div>
                        
                        <div class="content">
                            <p class="greeting">Hello ${name},</p>
                            
                            <p class="instruction">
                                You're just one step away from securing your Campus Sphere account. 
                                Use the verification token below to complete your email verification process.
                            </p>

                            <div class="token-container">
                                <div class="token-label">Your Verification Token</div>
                                <div class="token-box">${token}</div>
                            </div>

                            <div class="expiry-notice">
                                ⏰ This token will expire in <strong>60 seconds</strong> for your security.
                            </div>

                            <a href="https://www.campussphere.net/vendor/reset-password?token=${token}&email=${email}" class="cta-button">
                                Verify Email Address
                            </a>

                            <p class="alternative-text">
                                Or copy and paste this token in the verification page
                            </p>

                            <div class="security-note">
                                🔒 <strong>Security Tip:</strong> If you didn't request this verification, 
                                please ignore this email and ensure your account credentials are secure.
                            </div>

                            <div class="signature">
                                <p>Best regards,</p>
                                <p><strong>The Campus Sphere Team</strong></p>
                                <p style="color: #718096; font-size: 14px; margin-top: 10px;">
                                    Creating safer campus marketplaces
                                </p>
                            </div>
                        </div>
                        
                        <div class="footer">
                            <div class="footer-links">
                                <a href="https://campussphere.net/privacy">Privacy Policy</a>
                                <a href="https://campussphere.net/terms">Terms of Service</a>
                                <a href="https://campussphere.net/support">Help Center</a>
                            </div>
                            
                            <div class="social-icons">
                                <a href="https://facebook.com/campussphere" class="social-icon">
                                    <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
                                </a>
                                <a href="https://twitter.com/campussphere" class="social-icon">
                                    <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter">
                                </a>
                                <a href="https://instagram.com/campussphere" class="social-icon">
                                    <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram">
                                </a>
                                <a href="https://linkedin.com/company/campussphere" class="social-icon">
                                    <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn">
                                </a>
                            </div>
                            
                            <p class="copyright">
                                © 2024 Campus Sphere. All rights reserved.<br>
                                Building trusted campus communities worldwide.
                            </p>
                        </div>
                    </div>

                </body>
            </html>
        `
    )
}