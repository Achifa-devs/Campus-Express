import React from 'react'

export default function Statement({order}) {
  return (
    <>
      <div>
        <div>
            <span>
                
            </span>
            <span>Statement</span>
        </div>
        <ul style={{
            padding: '10px'
        }}>
          <li style={{ fontSize: 'small' }}>This placed Order with ID <b>{order?.product_id}</b> was confirmed consumable by you on <b>{ null}</b></li>
            {/* <li style={{fontSize: 'small'}}>You can reverse this order by clicking here</li> */}
        </ul>
      </div>
    </>
  )
}
