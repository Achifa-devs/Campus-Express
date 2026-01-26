import React from 'react'
import ellipsisSvg from '../../../assets/filter-edit-svgrepo-com.svg'

export default function ShopTitle({shop,TitleEdit,updateActiveJsx}) {
  return (
    <>
      <div>
            <h1>Shop Title</h1>
            <br />
            <img src={ellipsisSvg} style={{
              height: '20px',
              width: '20px',
              position: 'absolute',
              right: '50px',
              cursor: 'pointer'
            }} alt="" onClick={e => {
            document.querySelector('.edit-overlay').setAttribute('id', 'edit-overlay')
            updateActiveJsx(<TitleEdit shop_title={shop?.shop_title}/>)
            
          }} />
            <small>{
              shop?.shop_title === ''
              ?
              'Update Your Shop Title'
              :
              shop?.shop_title
            }</small>
            
          </div>
    </>
  )
}
