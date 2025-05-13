import React from 'react'
import './styles/xxl.css'
import logo from "../../public/ic_notification.png"


export default function page() {
  return (
    <div>
        <header>
            <img src={logo.src} style={{ height: '100px', width: '100px' }} alt="" />
            
              <h1 style={{ color: '#fff', fontSize: '4vh', fontWeight: '500' }}>Terms of Service for Campus Sphere</h1>
              
              <small className='overview'>Welcome to Campus Sphere Nigeria (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using our platform, including our website and mobile applications (collectively, the &quot;Service&quot;), you agree to comply with and be bound by the following terms and conditions of use. Please read these terms carefully.</small>
        </header>
        <article>
            <p>
                1. Acceptance of Terms
                By accessing or using the Service, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not access or use the Service.
            </p>
            <p>
                2. Description of Service
                Campus Sphere Nigeria provides an online platform to facilitate buying and selling activities within the campus community. Users can create listings, browse products, and connect with other users for transactions.
            </p>
            <p>
                3. User Accounts
                To use certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
            <p>
                4. Listing and Selling
                Users can create listings for items they wish to sell. By creating a listing, you agree to provide accurate and truthful information about the item. You are solely responsible for the content of your listings.
            </p>
            <p>
                5. Buying and Transactions
                Users interested in purchasing items agree to engage in transactions in good faith. Campus Sphere Nigeria is not involved in the actual transaction between buyers and sellers and is not responsible for the quality, safety, or legality of items listed.
            </p>
            <p>
                6. Prohibited Activities
                Users agree not to engage in any prohibited activities, including but not limited to fraud, unauthorized access, and violation of any applicable laws or regulations.
            </p>
            <p>
                7. Privacy
                Our Privacy Policy explains how we collect, use, and disclose information about you. By using the Service, you consent to the practices described in the Privacy Policy.
            </p>
            <p>
                8. Termination
                We reserve the right to terminate or suspend your account and access to the Service at our sole discretion, without notice, for any reason, including if you violate these Terms of Service.
            </p>
            <p>
                9. Changes to Terms
                We may update or modify these Terms of Service at any time. Any changes will be effective immediately upon posting. Your continued use of the Service after the posting of changes constitutes your acceptance of the updated terms.
            </p>
            <p>10. Contact Information</p>
            <p>If you have any questions or concerns about these Terms of Service, please contact us at campusexpressnaija@gmail.com.</p>
            <p>Thank you for using Campus Sphere Nigeria!</p>
        </article>
    </div>
  )
}
