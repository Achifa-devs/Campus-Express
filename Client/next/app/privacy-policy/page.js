import React from 'react'
import './styles/xxl.css'
import logo from "../../public/ic_notification.png"

export default function page() {
  return (
    <div>
         <header>
            <img src={logo.src} style={{ height: '100px', width: '100px' }} alt="" />
            
              <h1 style={{ color: '#fff', fontSize: '4vh', fontWeight: '500' }}>Campus Sphere Privacy policy</h1>
              
              <small className='overview'>Thank you for using Campus Sphere Nigeria, an online platform dedicated to facilitating buying and selling within the campus community. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information.</small>
        </header>

        

        <div>
            
            <h2>Information We Collect:</h2>
            <article>
                <p>
                    1. User Account Information:
                    - To use our platform, you may be required to create a user account. We collect information such as your name, email address, and contact details.
                </p>
                <p>
                    2. Transaction Information:
                    - We collect information related to your transactions on the platform, including purchase history, item listings, and payment details.
                </p>
                <p>
                    3. User-generated Content:
                    - Information you provide through posts, comments, reviews, or other content shared on the platform.
                </p>
                <p>
                    4. Device Information:
                    - We automatically collect device information, including IP address, device type, browser type, and other technical details.
                </p>
            </article>
            <h2>How We Use Your Information:</h2>
            <article>
                <p>
                    1. Facilitating Transactions:
                    - We use your information to facilitate buying and selling transactions on the platform, including processing payments and providing customer support.
                </p>
                <p>
                    2. User Experience Improvement:
                    - Analyzing user behavior helps us improve our platform, enhance features, and tailor content to better serve the campus community.
                </p>
                <p>
                    3. Communication:
                    - We may use your contact information to send transaction updates, service-related notifications, and marketing communications.
                </p>
                <p>
                    4. Security and Fraud Prevention:
                    - Your information helps us maintain a secure platform and prevent fraudulent activities.
                </p>
            </article>
            <h2>Information Sharing:</h2>
            <article>
                <p>
                    1. With Other Users:
                    - Limited information, such as your username and profile picture, may be shared with other users to facilitate transactions and enhance user engagement.
                </p>
                <p>
                    2. With Service Providers:
                    - We may share your information with third-party service providers who assist us in providing and improving our services.
                </p>
                <p>
                    3. Legal Compliance:
                    - We may disclose your information to comply with legal obligations or respond to lawful requests from authorities.
                </p>
            </article>
            <h2>Your Choices:</h2>
            <article>
                <p>
                    1. Account Information:
                    - You can review and update your account information by logging into your account settings.
                </p>
                <p>
                    2. Communication Preferences:
                    - You can manage your communication preferences by adjusting settings in your account or unsubscribing from marketing emails.
                </p>
            </article>
            <h2>Security:</h2>
            <article>
                <p>
                    We implement security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
                    Changes to this Privacy Policy:
                    We may update this Privacy Policy from time to time. We will notify you of significant changes through the platform or other communication channels.
                    Contact Us:
                    If you have any questions or concerns regarding this Privacy Policy, please contact us at [insert contact information].
                    By using Campus Sphere Nigeria, you agree to the terms outlined in this Privacy Policy.
                </p>
            </article>
            
        </div>
    </div>
  )
}
