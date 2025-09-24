import React, { useEffect, useState } from 'react'
import Thumbnail from '../../../components/Buyer/Thumbnail'
import js_ago from 'js-ago'
import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'

export default function OrderedItem({item}) {
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);

  return (
    <>
        
        <div className="checkout-card-data" style={{margin: '0 0 5px 0'}}>
            <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>Order Confirmation</h6>
            <div className="checkout-card-data-cnt">
                <div className='thumbnail-cnt'>
                    <Thumbnail thumbnail_id={item?.thumbnail_id} height={'100%'} />
                </div> 

                <div style={{position: 'absolute', top: '5px', right: '5px', padding: '4px'}}>
                    <img src={ellipsisSvg} style={{height: '10px', width: '10px'}} alt="..." />
                </div>
                
                <div className="body-cnt" style={{position: 'relative'}}>
                    <div className="body-cnt-top">
                        <div className="title">
                            <p style={{
                                whiteSpace: 'nowrap', /* Prevent text from wrapping */
                                overflow: 'hidden',    /* Hide any overflow text */
                                textOverflow: 'ellipsis'
                            }}>{item?.title}</p>
                        </div>

                        <div className="price">
                            &#8358;&nbsp;{
                            new Intl.NumberFormat('en-us').format(item?.price)}
                        </div>
                    </div>
                    
                    <div className="body-cnt-btm" style={{position: 'absolute', bottom: '5px', right: '5px', padding: '4px'}}>

                        <div className="stock">
                         {item?.stock} unit selected
                        </div>
                    </div>
                   
                </div>
            </div>
        
        </div>
    </>
  )
}
