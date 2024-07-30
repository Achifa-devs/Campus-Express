import React, { useEffect, useState } from 'react'
import Thumbnail from '../../../components/Buyer/Thumbnail'
import js_ago from 'js-ago'
import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'

export default function OrderedItem({item}) {
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);

  return (
    <>
        
        <div className="seller-order-card shadow-sm" style={{position: 'relative', display: 'flex', background: '#fff', margin: '0 0 5px 0', borderRadius: '10px', height: screenWidth > 760 ? '160px': '130px'}}>
            <div style={{height: '100%', width: screenWidth > 760 ? '20%' : '40%', borderRadius: '5px', display: 'table', margin: '0 auto'}}>
                <Thumbnail product_id={item?.product_id} />
            </div> 

            <div style={{position: 'absolute', top: '5px', right: '5px', padding: '4px'}}>
                <img src={ellipsisSvg} style={{height: '10px', width: '10px'}} alt="..." />
            </div>
            
            <div className="seller-order-body" style={{width: 'calc(80%)', position: 'relative', height: '100%'}}>
                {/* <img src={deleteSvg}alt="" /> */}

                <div className="seller-order-title" style={{display: 'flex', width: '80%', fontSize: 'medium', height: '60%', alignItems: 'center', fontWeight: '500'}}>
                    <p style={{
                        whiteSpace: 'nowrap', /* Prevent text from wrapping */
                        overflow: 'hidden',    /* Hide any overflow text */
                        textOverflow: 'ellipsis'
                    }}>{item?.title}</p>
                </div>
                <div className="seller-order-id" style={{display: 'flex', height: '40%', alignItems: 'flex-start'}}>
                    <h3 style={{fontWeight: '500', fontSize: 'small'}}>&#8358;{
                    new Intl.NumberFormat('en-us').format(item?.price)}</h3>
                </div>
                

                <div className="seller-order-date" style={{bottom: '5px', position: 'absolute'}}>
                    {item
                    ?
                    js_ago(new Date(item.date))
                    :
                    ''}
                </div>

            </div>
        
        </div>
    </>
  )
}
