import React from 'react'

export default function PaymentMethod() {
  return (
    <>
        <div className="buyer-checkout-payment-method">
            <div className="payment-method-head">
                <span>Payment Method</span>
                <span>Change</span>
            </div>
            <hr />

            <ul>
                <li>Bank Tranfers, Card, Ussd</li>
            </ul>
        </div>
    </>
  )
}
