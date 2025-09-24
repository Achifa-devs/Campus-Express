import React from 'react'

export default function Reviews({reviews}) {
  return (
    <>
        <div>
            <span>Customer Reviews</span>
            
            <div className='seller-profile-reviews'>
              <ul>
                {
                  reviews.length > 0
                  ?
                  reviews.map((item, index) => {
                    return(
                      ''
                    )
                  })
                  :
                  <li style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FF4500', color: '#fff'}}>
                    No Reviews Yet
                  </li>
                }
              </ul>
            </div>
          </div>
    </>
  )
}
