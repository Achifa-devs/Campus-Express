export function tokenTemplate(name, token, email) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Verify Your Email - dorm deals</title>
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
            background: linear-gradient(135deg, #FF6B35 0%, #FFA500 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
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
            background: linear-gradient(135deg, #FF6B35 0%, #FFA500 100%);
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

          .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #E2E8F0;
          }

          .footer {
            background: #1A202C;
            color: #A0AEC0;
            text-align: center;
            padding: 30px;
          }

          .footer-links a {
            color: #CBD5E0;
            text-decoration: none;
            margin: 0 15px;
            font-size: 14px;
          }

          .copyright {
            font-size: 12px;
            color: #718096;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <div className="logo">CS</div>
            <h1>Verify Your Email</h1>
            <p>Secure access to your dorm deals account</p>
          </div>
          
          <div className="content">
            <p className="greeting">Hello ${name},</p>
            
            <p className="instruction">
              You're just one step away from securing your dorm deals account. 
              Use the verification token below to complete your email verification process.
            </p>

            <div className="token-container">
              <div className="token-label">Your Verification Token</div>
              <div className="token-box">${token}</div>
            </div>

            <div className="expiry-notice">
              ⏰ This token will expire in <strong>60 seconds</strong> for your security.
            </div>

            <a href="https://www.campussphere.net/vendor/reset-password?token=${token}&email=${email}" className="cta-button">
              Verify Email Address
            </a>

            <div className="signature">
              <p>Best regards,</p>
              <p><strong>The dorm deals Team</strong></p>
            </div>
          </div>
          
          <div className="footer">
            <div className="footer-links">
              <a href="https://campussphere.net/privacy">Privacy Policy</a>
              <a href="https://campussphere.net/terms">Terms of Service</a>
              <a href="https://campussphere.net/support">Help Center</a>
            </div>
            
            <p className="copyright">
              © 2024 dorm deals. All rights reserved.<br>
              Building trusted campus communities worldwide.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
