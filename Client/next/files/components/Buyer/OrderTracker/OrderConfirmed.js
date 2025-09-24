import js_ago from 'js-ago'
import React from 'react'

export default function OrderConfirmed({order}) {
  return (
    <>
      <div>
        <div>
            <span>
                
            </span>
            <span>Order Confirmed</span>
        </div>
        <ul style={{
            padding: '10px'
        }}>
            <li style={{fontSize: 'small'}}>This placed Order with ID <b>{order?.product?.product_id}</b> was confirmed by Campus Sphere on <b>{js_ago(new Date(order?.order?.date))}</b></li>
            {/* <li style={{fontSize: 'small'}}>You can reverse this order by clicking here</li> */}
        </ul>
      </div>
    </>
  )
}
