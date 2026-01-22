import js_ago from 'js-ago'
import React from 'react'

export default function Shipped({order}) {
  return (
    <>
      <div>
        <div>
            <span>
                
            </span>
            <span>Shipped</span>
        </div>
        <ul style={{
            padding: '10px'
        }}>
            <li style={{fontSize: 'small'}}>This is to confirmed that your item was shipped from <b>{`${order?.product?.uni_state}, ${order?.product?.campus}`}</b> to <b>{order?.order?.pick_up_channels[0]?.locale}  {js_ago(new Date(order?.order?.date))}</b></li>
            {/* <li style={{fontSize: 'small'}}>You can reverse this order by clicking here</li> */}
        </ul>
      </div>
    </>
  )
}
