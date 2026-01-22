export function welcomeTemplate(name, email, campus) {
  return `
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
          }

          .header {
            background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
            color: white;
            padding: 50px 30px;
            text-align: center;
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
          }

          .header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 700;
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
            <h1>Welcome to CampusSphere! 🎉</h1>
            <p>Your Campus Marketplace Awaits</p>
          </div>
          
          <div className="content">
            <p className="greeting">Hello ${name},</p>
            
            <p>Thank you for choosing CampusSphere - the trusted marketplace for your campus community.</p>

            <div className="user-info">
              <h3 style="color: #1E293B; margin-bottom: 20px; text-align: center;">Your Account Details</h3>
              <div className="info-item">
                <span className="info-label">Full Name:</span>
                <span className="info-value">${name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email Address:</span>
                <span className="info-value">${email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Campus:</span>
                <span className="info-value">${campus || 'Main Campus'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Account Status:</span>
                <span className="info-value" style="color: #22C55E;">Active ✅</span>
              </div>
            </div>

            <a href="https://www.campussphere.net" className="cta-button">
              Explore Your Dashboard →
            </a>

            <div className="signature">
              <p>Welcome to your campus community,</p>
              <p><strong>The dorm deals Team</strong></p>
            </div>
          </div>
          
          <div className="footer">
            <div className="footer-links">
              <a href="https://www.campussphere.net/privacy-policy">Privacy Policy</a>
              <a href="https://www.campussphere.net/terms-of-use">Terms of Service</a>
              <a href="https://www.campussphere.net/help-center">Help Center</a>
            </div>
            
            <p className="copyright">
              © 2024 dorm deals. All rights reserved.<br>
              Connecting campus communities through trusted commerce.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
