import React from 'react'
import ellipsisSvg from '../../../assets/filter-edit-svgrepo-com.svg'

export default function Inventory({shop, InvetoryEdit,updateActiveJsx}) {
  return (
    <>
        <div>
            <img src={ellipsisSvg} style={{
              height: '20px',
              width: '20px',
              position: 'absolute',
              right: '50px',
              cursor: 'pointer'
            }} alt="" onClick={e => {
            document.querySelector('.edit-overlay').setAttribute('id', 'edit-overlay')
            updateActiveJsx(<InvetoryEdit list={shop.inventory} />)

          }} />
            <span>Inventory</span>
            
            <div className='seller-profile-inventory' style={{overflow: 'auto', flexWrap: 'wrap'}}>
              <ul style={{overflow: 'hidden', flexWrap: 'wrap'}}>
                {
                  shop.inventory 
                  ?  
                  JSON.parse(shop.inventory).length > 0 
                    ? 
                    JSON.parse(shop.inventory).map((item,index) => <li key={index} style={{listStyleType: 'none', margin: '10px'}}>{item}</li>) 
                    : 
                    <li style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FF4500', color: '#fff'}}>
                      Please Add Items You Sell
                    </li> 
                  : 
                  <li style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FF4500', color: '#fff'}}>
                      Please Add Items You Sell
                    </li>
                    
                }
              </ul>
            </div>
        </div>
    </>
  )
}
