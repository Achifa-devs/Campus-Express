import React from 'react'

export default function PickedUp({order}) {
  return (
    <>
      <div>
        <div>
            <span>
                
            </span>
            <span>Picked Up</span>
        </div>
        <ul style={{
            padding: '10px'
        }}>
            <li style={{fontSize: 'small'}}>This placed Order with ID <b>{order?.product_id}</b> was picked up on <b>{null}</b></li>
            {/* <li style={{fontSize: 'small'}}>You can reverse this order by clicking here</li> */}
        </ul>
      </div>
    </>
  )
}
