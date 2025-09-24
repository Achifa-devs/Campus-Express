import React from 'react'
import ellipsisSvg from '../../../assets/filter-edit-svgrepo-com.svg'

export default function ShopDesc({shop,DescEdit,updateActiveJsx}) {
  return (
    <>

      <div>
            <h1>Shop Description</h1>

            <img src={ellipsisSvg} style={{
              height: '20px',
              width: '20px',
              position: 'absolute',
              right: '50px',
              cursor: 'pointer'
            }} alt="" onClick={e => {
            document.querySelector('.edit-overlay').setAttribute('id', 'edit-overlay')
            updateActiveJsx(<DescEdit shop_description={shop?.shop_description} />)
            
          }} />
           
            <div style={{fontSize: 'medium', fontWeight: '400', lineHeight: '23px', padding: '5px'}}>
              {
                shop?.shop_description === ''
                ?
                'Update Your Shop Description...'
                :
                <div dangerouslySetInnerHTML={{__html: shop?.shop_description}} />
              }
            </div>
          </div>
    </>
  )
}
