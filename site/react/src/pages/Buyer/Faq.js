import React, { useRef, useState } from 'react'
import BuyerLayout from '../../layout/Buyer'

export default function Faq() {

    let list = useRef([
       
        {
            title: 'Speak With An Agent',
            uri: '',
            description: 'Reach out to us via WhatsApp or telephone to speak directly with one of our friendly agents. We are here to assist you with any questions or concerns you may have.',
            contact: 'WhatsApp: +1234567890 | Phone: +1234567890',
            actionButton: 'Contact Us',
            icon: 'path/to/agent-icon.png'
        },
        
        {
            title: 'Campus Express Payment',
            uri: 'Understand Campus Express Payment',
            description: 'Gain a comprehensive understanding of the various payment options available on Campus Express. Learn how to securely make payments and manage your transactions with ease and confidence.',
            link: 'https://www.campusexpress.com/payment-info',
            actionButton: 'Learn More',
            icon: 'path/to/payment-icon.png'
        },
        
        {
            title: 'Campus Coin',
            uri: '',
            description: 'Discover how Campus Coin can enhance your shopping experience on our platform. Learn about its benefits, how to earn it, and how to use it for various transactions.',
            link: 'https://www.campusexpress.com/campus-coin',
            actionButton: 'Know More',
            icon: 'path/to/coin-icon.png'
        },
        
        {
            title: 'Security On Campus Express',
            uri: '',
            description: 'Explore the extensive security measures we have in place on Campus Express. Learn about our escrow services designed to prevent fraud and ensure a safe shopping experience for all users.',
            link: 'https://www.campusexpress.com/security',
            actionButton: 'Explore Security',
            icon: 'path/to/security-icon.png'
        },
        
        {
            title: 'Billing Method',
            uri: '',
            description: 'Get detailed information about the billing methods supported by Campus Express. Understand how our billing system works to ensure transparent and accurate transactions for your purchases.',
            link: 'https://www.campusexpress.com/billing-method',
            actionButton: 'Explore Billing',
            icon: 'path/to/billing-icon.png'
        },
        
        {
            title: 'Refund/Return',
            uri: '',
            description: 'Find out everything you need to know about our refund and return policies. Learn the steps to request a refund or return an item and ensure a hassle-free process.',
            link: 'https://www.campusexpress.com/refund-return',
            actionButton: 'Learn About Refunds',
            icon: 'path/to/refund-icon.png'
        },
        
        {
            title: 'Pay For Your Order',
            uri: '',
            description: 'Learn how to complete the payment process for your orders on Campus Express. Follow our step-by-step guide to make secure payments and confirm your purchases effortlessly.',
            link: 'https://www.campusexpress.com/pay-for-order',
            actionButton: 'Pay Now',
            icon: 'path/to/payment-icon.png'
        },
        
        {
            title: 'Track Your Order',
            uri: '',
            description: 'Keep track of your order from the moment it is placed until it reaches your doorstep. Use our tracking tools to monitor the status and location of your shipment in real time.',
            link: 'https://www.campusexpress.com/track-order',
            actionButton: 'Track Order',
            icon: 'path/to/track-icon.png'
        },
        
        {
            title: 'Cancel Your Order',
            uri: '',
            description: 'Understand the process to cancel an order on Campus Express. Learn about the conditions under which you can cancel your order and the steps to follow for a successful cancellation.',
            link: 'https://www.campusexpress.com/cancel-order',
            actionButton: 'Cancel Order',
            icon: 'path/to/cancel-icon.png'
        }
        
    ])
  return (
    <>
      <BuyerLayout>
        <div className="buyer-card-cnt" style={{
            borderRadius: '1.5px',
            height: 'fit-content', 
            minHeight: 'unset',
            padding: '20px',
            width: '100%',
            background: '#fff'
        }}>
        {
            list.current.map(item => 
                <div className="cols">
                    <div className="card shadow-sm" style={{height: 'auto', marginBottom: '10px', borderRadius: '10px', background: '#fff4e0', color: '#FF4500'}}>
                        <h5 style={{width: '100%', textAlign: 'left'}}><b>{item.title}</b></h5>
                        {/* <br /> */}
                        <div style={{padding: '10px'}}>{item.description}</div>
                        <button>{item.actionButton}</button>
                    </div>

                </div>
            )
        }
        </div>

        <div>

        </div>
      </BuyerLayout>
    </>
  )
}
