import js_ago from 'js-ago'
import React from 'react'

export default function OrderPlaced({order}) {
  return (
    <>
      <div>
        <div>
            <span>
                
            </span>
            <span>Order Placed</span>
        </div>
        <ul style={{
            padding: '10px'
        }}>
            <li style={{fontSize: 'small'}}>This is to confirm that this Order with ID <b>{order?.product_id}</b> was placed <b>{js_ago(new Date(order?.date))}</b></li>
            {/* <li style={{fontSize: 'small'}}>You can reverse this order by clicking here</li> */}
        </ul>
      </div>
    </>
  )
}
