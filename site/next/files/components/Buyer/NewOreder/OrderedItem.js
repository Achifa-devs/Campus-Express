import React, { useEffect, useState } from 'react'
import Thumbnail from '../../../components/Buyer/Thumbnail'
import js_ago from 'js-ago'
import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'

export default function OrderedItem({item}) {
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);

  return (
    <>
        
        <div className="new-order-card-data">
            <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>New Order</h6>
            <div className="new-order-card-data-cnt">
                <div className='thumbnail-cnt'>
                    <Thumbnail product_id={item?.product_id} />
                </div> 

                <div style={{position: 'absolute', top: '5px', right: '5px', padding: '4px'}}>
                    <img src={ellipsisSvg} style={{height: '10px', width: '10px'}} alt="..." />
                </div>
                
                <div className="body-cnt">
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
                    
                    <div className="body-cnt-mid">
                        <div className="seller">
                            <span style={{
                                whiteSpace: 'nowrap', /* Prevent text from wrapping */
                                overflow: 'hidden',    /* Hide any overflow text */
                                textOverflow: 'ellipsis'
                            }}>Seller: Maya's Store</span>
                        </div>

                        <div className="stock">
                            20 In stock
                        </div>
                    </div>
                    
                    <div className="body-cnt-btm">
                        <button className="add">
                            +
                        </button>
                        &nbsp;
                        &nbsp;
                        <span>
                            {0}
                        </span>
                        &nbsp;
                        &nbsp;

                        <button className="minus">
                            -
                        </button>
                    </div>

                </div>
            </div>
        
        </div>
    </>
  )
}
