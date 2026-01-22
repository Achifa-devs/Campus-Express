import React from 'react'
import ellipsisSvg from '../../../assets/filter-edit-svgrepo-com.svg'

export default function ShopRent({Rent,updateActiveJsx,shop}) {
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
              updateActiveJsx(<Rent />)
              
            }} />
              <div><b>Shop Rent</b></div>

              <div>
                {/* <div>ID: Verified</div> */}
                <div style={{textTransform: 'capitalize'}}>{(shop.rent)?JSON.parse(shop.rent).tier:'...'}: {
                  (shop.rent)?JSON.parse(shop.rent).price:'...'
                } coin</div>
                {/* <div>Student: False</div> */}
              </div>

              <div>
                {/* <div>ID: Verified</div> */}
                <div>Time Duration: {
                    '30 Days Left'
                }</div>
                {/* <div>Student: False</div> */}
              </div>
          </div>
    </>
  )
}
