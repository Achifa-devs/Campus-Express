module.exports = function registrationTemplate(name, email, campus) {
    return (
        `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <title>Welcome to CampusSphere - Your Campus Marketplace</title>
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
                            max-width: 550px;
                            margin: 20px auto;
                            background: #ffffff;
                            border-radius: 20px;
                            overflow: hidden;
                            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                        }

                        .header {
                            background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
                            color: white;
                            padding: 50px 30px;
                            text-align: center;
                            position: relative;
                            overflow: hidden;
                        }

                        .logo {
                            width: 70px;
                            height: 70px;
                            background: rgba(255, 255, 255, 0.2);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 25px;
                            font-weight: bold;
                            font-size: 28px;
                            backdrop-filter: blur(10px);
                        }

                        .header h1 {
                            margin: 0;
                            font-size: 32px;
                            font-weight: 700;
                            letter-spacing: -0.5px;
                        }

                        .header p {
                            margin-top: 12px;
                            font-size: 18px;
                            color: rgba(255, 255, 255, 0.9);
                            font-weight: 400;
                        }

                        .content {
                            padding: 40px 30px;
                            color: #2D3748;
                            line-height: 1.7;
                        }

                        .greeting {
                            font-size: 20px;
                            font-weight: 600;
                            color: #1A202C;
                            margin-bottom: 25px;
                        }

                        .welcome-section {
                            background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
                            border-radius: 16px;
                            padding: 25px;
                            margin-bottom: 30px;
                            border-left: 4px solid #4F46E5;
                        }

                        .user-info {
                            background: #F8FAFC;
                            border-radius: 12px;
                            padding: 20px;
                            margin: 25px 0;
                            border: 1px solid #E2E8F0;
                        }

                        .info-item {
                            display: flex;
                            justify-content: space-between;
                            padding: 12px 0;
                            border-bottom: 1px solid #F1F5F9;
                        }

                        .info-item:last-child {
                            border-bottom: none;
                        }

                        .info-label {
                            font-weight: 600;
                            color: #475569;
                        }

                        .info-value {
                            color: #1E293B;
                            font-weight: 500;
                        }

                        .features-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 15px;
                            margin: 30px 0;
                        }

                        .feature-card {
                            background: #FFFFFF;
                            border: 1px solid #E2E8F0;
                            border-radius: 12px;
                            padding: 20px;
                            text-align: center;
                            transition: all 0.3s ease;
                        }

                        .feature-card:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                            border-color: #4F46E5;
                        }

                        .feature-icon {
                            font-size: 24px;
                            margin-bottom: 12px;
                        }

                        .feature-title {
                            font-weight: 600;
                            color: #1E293B;
                            margin-bottom: 8px;
                            font-size: 14px;
                        }

                        .feature-desc {
                            font-size: 12px;
                            color: #64748B;
                            line-height: 1.5;
                        }

                        .cta-button {
                            display: block;
                            width: 100%;
                            background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
                            color: white;
                            text-decoration: none;
                            padding: 18px 30px;
                            border-radius: 12px;
                            text-align: center;
                            font-weight: 600;
                            font-size: 16px;
                            margin: 30px 0;
                            transition: all 0.3s ease;
                            box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
                        }

                        .cta-button:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
                        }

                        .next-steps {
                            background: #F0FDF4;
                            border: 1px solid #BBF7D0;
                            border-radius: 12px;
                            padding: 25px;
                            margin: 25px 0;
                        }

                        .next-steps h3 {
                            color: #166534;
                            margin-bottom: 15px;
                            font-size: 16px;
                        }

                        .steps-list {
                            list-style: none;
                            padding: 0;
                        }

                        .steps-list li {
                            padding: 8px 0;
                            color: #475569;
                            display: flex;
                            align-items: center;
                        }

                        .steps-list li::before {
                            content: "✓";
                            color: #22C55E;
                            font-weight: bold;
                            margin-right: 12px;
                        }

                        .campus-highlight {
                            background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);
                            border: 1px solid #FCD34D;
                            border-radius: 12px;
                            padding: 20px;
                            margin: 25px 0;
                            text-align: center;
                        }

                        .security-note {
                            background: #FEF2F2;
                            border: 1px solid #FECACA;
                            border-radius: 12px;
                            padding: 20px;
                            margin: 25px 0;
                            font-size: 14px;
                            color: #DC2626;
                        }

                        .signature {
                            margin-top: 30px;
                            padding-top: 20px;
                            border-top: 1px solid #E2E8F0;
                            text-align: center;
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
                            background: #4F46E5;
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
                            
                            .features-grid {
                                grid-template-columns: 1fr;
                            }
                            
                            .header h1 {
                                font-size: 26px;
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
                            <h1>Welcome to CampusSphere! 🎉</h1>
                            <p>Your Campus Marketplace Awaits</p>
                        </div>
                        
                        <div class="content">
                            <p class="greeting">Hello ${' ' + name},</p>
                            
                            <div class="welcome-section">
                                <p style="font-size: 16px; color: #475569; margin: 0;">
                                    Thank you for choosing CampusSphere - the trusted marketplace for your campus community. 
                                    We're excited to have you onboard and can't wait to see you explore, buy, and sell within your campus ecosystem.
                                </p>
                            </div>

                            <div class="user-info">
                                <h3 style="color: #1E293B; margin-bottom: 20px; text-align: center;">Your Account Details</h3>
                                <div class="info-item">
                                    <span class="info-label">Full Name: </span>
                                    <span class="info-value"> ${' ' + name}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Email Address: </span>
                                    <span class="info-value"> ${' ' + email}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Campus: </span>
                                    <span class="info-value"> ${' ' + campus || 'Main Campus'}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Account Status: </span>
                                    <span class="info-value" style="color: #22C55E;"> &nbsp;Active ✅</span>
                                </div>
                            </div>

                            <h3 style="color: #1E293B; margin-bottom: 20px; text-align: center;">Discover Campus Sphere Features</h3>
                            <div class="features-grid">
                                <div class="feature-card">
                                    <div class="feature-icon">🛒</div>
                                    <div class="feature-title">Buy & Sell</div>
                                    <div class="feature-desc">Trade Course Materials, Mobile Phones, Laptops, Games, Electronics, and other Lodge Accessories with campus mates</div>
                                </div>
                                <div class="feature-card">
                                    <div class="feature-icon">🏠</div>
                                    <div class="feature-title">Accommodation/Lodges</div>
                                    <div class="feature-desc">Find Roommate & sublets</div>
                                </div>
                                <div class="feature-card">
                                    <div class="feature-icon">🛡️</div>
                                    <div class="feature-title">Secure Payments</div>
                                    <div class="feature-desc">Safe transactions with campus-verified users</div>
                                </div>
                            </div>

                            <a href="https://www.campussphere.net" class="cta-button">
                                Explore Your Dashboard →
                            </a>

                            <div class="next-steps">
                                <h3>🚀 Get Started Guide</h3>
                                <ul class="steps-list"> 
                                    <li>Complete your profile with a photo and bio</li>
                                    <li>Verify your student status for trusted badge</li>
                                    <li>Browse listings in your campus marketplace</li>
                                    <li>List your first item for sale</li>
                                    <li>Join campus-specific discussion groups</li>
                                </ul>
                            </div>

                            <div class="campus-highlight">
                                <h3 style="color: #92400E; margin-bottom: 10px;">🏫 Campus Exclusive</h3>
                                <p style="color: #92400E; margin: 0; font-size: 14px;">
                                    As a Campus Sphere member, you get exclusive access to campus-only deals, 
                                    events, and verified student community. Connect with peers safely!
                                </p>
                            </div>

                            <div class="security-note">
                                🔒 <strong>Account Security:</strong> Your account is protected with campus verification. 
                                Never share your password and always meet in safe campus locations for transactions.
                            </div>

                            <div class="signature">
                                <p>Welcome to your campus community,</p>
                                <p><strong>The Campus Sphere Team</strong></p>
                                <p style="color: #718096; font-size: 14px; margin-top: 10px;">
                                    Building trusted campus marketplaces worldwide
                                </p>
                            </div>
                        </div>
                        
                        <div class="footer">
                            <div class="footer-links">
                                <a href="https://www.campussphere.net/privacy-policy">Privacy Policy</a>
                                <a href="https://www.campussphere.net/terms-of-use">Terms of Service</a>
                                <a href="https://www.campussphere.net/help-center">Help Center</a>
                            </div>
                            
                            <div class="social-icons">
                                <a href="https://web.facebook.com/profile.php?id=61569276643577" class="social-icon">
                                    <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
                                </a>
                                <a href="https://x.com/CampusSphere?t=ci_pEhDRWMfsC68XIM-D4g&s=08" class="social-icon">
                                    <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter">
                                </a>
                                <a href="https://whatsapp.com/channel/0029Vb5WQNQ6xCSTfXow583w" class="social-icon">
                                    <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp">
                                </a>
                                <a href="https://www.tiktok.com/@campus_sphere?is_from_webapp=1&sender_device=pc" class="social-icon">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3046/3046120.png" alt="TikTok">
                                </a>
                            </div>
                            
                            <p class="copyright">
                                © 2024 Campus Sphere. All rights reserved.<br>
                                Connecting campus communities through trusted commerce.
                            </p>
                        </div>
                    </div>

                </body>
            </html>
        `
    )
}