import React from 'react'
import './styles/xxl.css'
import './styles/small.css'
import './styles/hybrid.css'
import logo from "../../public/ic_notification.png"

export default function page() {
  return (
    <div>
         <header>
            <img src={logo.src} style={{ height: '100px', width: '100px' }} alt="" />
            
              <h1 style={{ color: '#fff', fontSize: '4vh', fontWeight: '500' }}>Campus Sphere Policies</h1>
              
              <small className='overview'>Welcome to Campus Sphere Nigeria - your trusted campus marketplace. Below you'll find all our policies designed to create a safe, fair, and transparent trading environment for our campus community.</small>
        </header>

        

        <div>
            
            {/* Privacy Policy */}
            <h2>Privacy Policy</h2>
            <article>
                <p>
                    1. Information We Collect:
                    - User Account Information: Name, email address, contact details when you create an account
                    - Transaction Information: Purchase history, item listings, and payment details
                    - User-generated Content: Posts, comments, reviews, and other content you share
                    - Device Information: IP address, device type, browser type, and technical details
                </p>
                <p>
                    2. How We Use Your Information:
                    - Facilitating buying and selling transactions
                    - Improving platform features and user experience
                    - Sending transaction updates and service notifications
                    - Maintaining platform security and preventing fraud
                </p>
                <p>
                    3. Information Sharing:
                    - Limited profile information with other users for transactions
                    - With trusted service providers who help operate our platform
                    - When required by law or to protect our legal rights
                </p>
            </article>

            {/* Terms of Service */}
            <h2>Terms of Service</h2>
            <article>
                <p>
                    1. Account Responsibilities:
                    - You must be a current student or staff member with valid campus credentials
                    - You are responsible for maintaining account security and password confidentiality
                    - One account per person - duplicate accounts may be suspended
                </p>
                <p>
                    2. Prohibited Activities:
                    - Selling illegal, stolen, or prohibited items
                    - Harassment, fraud, or misrepresentation of items
                    - Circumventing transaction fees or platform rules
                    - Academic dishonesty (selling assignments, exam papers, etc.)
                </p>
                <p>
                    3. Platform Usage:
                    - Campus Sphere provides the platform but isn't involved in individual transactions
                    - Users are responsible for their interactions and transactions
                    - We may suspend accounts violating these terms
                </p>
            </article>

            {/* Payment & Refund Policy */}
            <h2>Payment & Refund Policy</h2>
            <article>
                <p>
                    1. Transaction Fees:
                    - Standard platform fee of 2.5% applies to all successful transactions
                    - Fees are deducted automatically from the seller's payment
                    - No fees for browsing, listing, or messaging
                </p>
                <p>
                    2. Refund Conditions:
                    - Items not as described or significantly different from listing
                    - Items damaged during delivery (with proper evidence)
                    - Seller fails to deliver after payment confirmation
                    - Refund requests must be made within 48 hours of delivery
                </p>
                <p>
                    3. Payment Processing:
                    - Payments are held in escrow until delivery confirmation
                    - Funds are released to sellers after buyer confirms satisfaction
                    - Processing time: 24-48 hours after delivery confirmation
                </p>
            </article>

            {/* Shipping & Delivery Policy */}
            <h2>Shipping & Delivery Policy</h2>
            <article>
                <p>
                    1. Delivery Methods:
                    - Campus pickup points at designated locations
                    - Meet-up delivery within campus premises
                    - Third-party courier services (additional fees may apply)
                </p>
                <p>
                    2. Delivery Timeframes:
                    - Campus pickup: Same day or next business day
                    - Meet-up delivery: Within 24 hours of agreement
                    - Courier delivery: 1-3 business days depending on location
                </p>
                <p>
                    3. Responsibility:
                    - Sellers are responsible for item condition until delivery
                    - Buyers must inspect items upon receipt
                    - Both parties should communicate clearly about delivery arrangements
                </p>
            </article>

            {/* Dispute Resolution Policy */}
            <h2>Dispute Resolution Policy</h2>
            <article>
                <p>
                    1. Raising Disputes:
                    - Disputes must be raised within 48 hours of transaction completion
                    - Provide clear evidence (photos, messages, descriptions)
                    - Both parties will be contacted for their side of the story
                </p>
                <p>
                    2. Resolution Process:
                    - Our team mediates between buyer and seller
                    - Investigation period: 3-5 business days
                    - Possible outcomes: Full refund, partial refund, or no action
                </p>
                <p>
                    3. Final Decision:
                    - Campus Sphere's decision is final in all disputes
                    - Repeated disputes may result in account review or suspension
                    - Serious cases may be referred to campus authorities
                </p>
            </article>

            {/* Community Guidelines */}
            <h2>Community Guidelines</h2>
            <article>
                <p>
                    1. Respectful Conduct:
                    - Treat all community members with respect
                    - No harassment, discrimination, or hate speech
                    - Maintain civil communication in all interactions
                </p>
                <p>
                    2. Item Listings:
                    - Accurate descriptions and clear photos required
                    - Fair pricing based on item condition and market value
                    - Prohibited items clearly marked and not allowed
                </p>
                <p>
                    3. Platform Etiquette:
                    - Respond to messages within 24 hours
                    - Honor agreed prices and arrangements
                    - Leave honest reviews and ratings
                </p>
            </article>

            {/* Data Protection Rights */}
            <h2>Your Rights & Controls</h2>
            <article>
                <p>
                    1. Account Controls:
                    - Review and update your account information anytime
                    - Adjust communication preferences in settings
                    - Download your data or request account deletion
                </p>
                <p>
                    2. Security Measures:
                    - We implement security measures to protect your information
                    - Regular security audits and updates
                    - Encryption of sensitive data and transactions
                </p>
                <p>
                    3. Policy Updates:
                    - We may update these policies to improve our services
                    - Significant changes will be notified through the platform
                    - Continued use means acceptance of updated policies
                </p>
                <p>
                    Contact Us:
                    If you have any questions about these policies, please contact us at support@campussphere.ng
                    By using Campus Sphere Nigeria, you agree to all the policies outlined above.
                </p>
            </article>
            
        </div>
    </div>
  )
}