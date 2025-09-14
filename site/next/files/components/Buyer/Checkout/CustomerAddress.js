import React from 'react'

export default function CustomerAddress({buyerData}) {
  return (
    <>
        <div className="buyer-checkout-customer-address">
            <div className='customer-address-head'>
                <span>Customer Address</span>
                <span>Change</span>
            </div>

            <hr />

            <ul>
                <li>{buyerData?.campus}</li>
                <li>{buyerData?.state}</li>
            </ul>
        </div> 
    </>
  )
}
