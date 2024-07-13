import React from 'react'

export default function emailTemplates() {

  return (
    
    <>     
        <div className="container" style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}>
            <h1>Campus Express Nigeria. </h1>
            <p>Hello Dear,</p>
            <p>Thank you for choosing Campus Express Nigeria! To complete your password reset, please click the link below:</p>
            <button>
                {/* <a href='www.campusexpressng.com/seller.password-reset?token=${'token'}&?seller_id=${'seller_id'}'>Reset Password</a> */}
            </button>
            <p>This link is valid for 5 minutes. Please do not share this link with anyone, as it is used for identity verification purposes only.</p>
            <p>If you did not initiate this action, please contact our support team immediately.</p>
            <p>Thank you for using Campus Express Nigeria.</p>
            <p>Best regards,</p>
            <p>CEO: Akpulu Fabian<br/>
            
            Campus Express Nigeria.</p>
            
        </div>
    </>
  )
}
