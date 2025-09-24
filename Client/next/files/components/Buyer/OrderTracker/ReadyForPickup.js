import React from 'react'

export default function ReadyForPickUp({order}) {
  return (
    <>
      <div>
        <div>
            <span>
                
            </span>
            <span>Ready For Pick Up</span>
        </div>
        <ul style={{
            padding: '10px'
        }}>
            <li style={{fontSize: 'small'}}>This placed Order with ID <b>{order?.product?.product_id}</b> can be picked up now at <b>{order?.order?.pick_up_channels[0]?.locale}</b></li>
            {/* <li style={{fontSize: 'small'}}>You can reverse this order by clicking here</li> */}
        </ul>
      </div>
    </>
  )
}
