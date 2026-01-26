import React from 'react'

export default function Summary({TotalEarned,TotalSold}) {
  return (
    <>
      <ul>
            
            <li style={{
              fontWeight: '400'
            }}>

              <div>&#8358;{
                TotalEarned
              }</div>
              <div>Total Earned</div>

            </li>

            <li style={{
              fontWeight: '400'
            }}>

              <div>{TotalSold}</div>
              <div>Total Orders</div>

            </li>

            <li style={{
              fontWeight: '400'
            }}>

              {/* <div>30</div>
              <div>Days Left</div> */}

            </li>
            
          </ul>
    </>
  )
}
