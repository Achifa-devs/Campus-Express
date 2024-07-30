import React from 'react'
import ellipsisSvg from '../../../assets/filter-edit-svgrepo-com.svg'

export default function ShopRent({Rent,updateActiveJsx,shop,userData}) {
 
  return (
    <>
        <div className="seller-profile-verification">
              <img src={ellipsisSvg} style={{
                height: '20px',
                width: '20px',
                position: 'absolute',
                right: '10px',
                top: '10px',
                transform: 'rotate(90deg)',
                cursor: 'pointer'
              }} alt="" onClick={e => {
              document.querySelector('.edit-overlay').setAttribute('id', 'edit-overlay')
              updateActiveJsx(<Rent shop={shop} userData={userData} updateActiveJsx={updateActiveJsx} />)
              
            }} />
              <div><b>Shop Rent</b></div>

              <div>
                {/* <div>ID: Verified</div> */}
                <div style={{textTransform: 'capitalize'}}>{
                  shop?.rent
                  ?
                  shop?.rent?.price
                  :
                  '...'
                } coin For {
                  shop?.rent
                  ? 
                  shop?.rent?.listing 
                  :
                  '...'
                  } Listing</div>
                {/* <div>Student: False</div> */}
              </div>

              <div>
                {/* <div>ID: Verified</div> */}
                <div>Time Duration: {
                  parseInt(shop?.rent?.price) > 0 ? '30 Days Left' : '15 Days'
                }</div>
                {/* <div>Student: False</div> */}
              </div>
          </div>
    </>
  )
}
