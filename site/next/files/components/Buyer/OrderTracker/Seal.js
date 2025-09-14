import React from 'react'

export default function Seal({order}) {
  return (
    <>
      <div>
        <div>
            <span>
                
            </span>
            <span>Seal</span>
        </div>
        <ul style={{
            padding: '10px'
        }}>
            <li style={{fontSize: 'small'}}>This placed Order with ID <b>{order?.product_id}</b> was consumed by you and the deal have been sealed by Campus Sphere</li>
            <li style={{fontSize: 'small'}}>You cannot reverse this.</li>
            <li style={{fontSize: 'small'}}>You cannot request for a refund.</li>
        </ul>
      </div>
    </>
  )
}
