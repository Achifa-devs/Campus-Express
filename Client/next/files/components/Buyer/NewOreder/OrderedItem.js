import React, { useEffect, useState } from 'react'
import Thumbnail from '../../../components/Buyer/Thumbnail'
import js_ago from 'js-ago'
import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'

export default function OrderedItem({data}) {
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
 
  return (
    <>
        
        <div className="new-order-card-data" style={{marginBottom: '0px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#FFF', height: 'fit-content'}}>
            {/* <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>Order: {item.product_id}</h6> */}

            {
                data.map(item => 
                    <div className="new-order-card-data-cnt" style={{
                        flexDirection: 'row',
                        height: '120px',
                        width: data.length > 1 ? screenWidth <= 560 ? '100%' : screenWidth > 560 && screenWidth <= 720 ? '45%' : '49%' : '100%',
                        border: '1px solid #FF4500'}}>
                        <div className='thumbnail-cnt' style={{width: '120px'}}>
                            <Thumbnail thumbnail_id={item?.thumbnail_id} height={'100%'} />
                        </div> 

                        <div style={{position: 'absolute', top: '5px', right: '5px', padding: '4px'}}>
                            <img src={ellipsisSvg} style={{height: '10px', width: '10px'}} alt="..." />
                        </div>
                        
                        <div className="body-cnt" style={{position: 'relative', width: 'calc(100% - 130px)'}}>
                            <div className="body-cnt-top">
                                <div className="title" style={{width: '100%'}}>
                                    <p style={{
                                        whiteSpace: 'nowrap', /* Prevent text from wrapping */
                                        overflow: 'hidden',    /* Hide any overflow text */
                                        textOverflow: 'ellipsis',
                                        fontSize: 'medium',

                                    }}>{item?.title}</p>
                                </div>


                            </div>
                            
                            <div className="body-cnt-mid" style={{position: 'relative',}}>
                                <h3 className="price" style={{
                                        fontSize: 'medium'}}>
                                    <b>
                                        &#8358;&nbsp;{
                                        new Intl.NumberFormat('en-us').format(item?.price)}
                                    </b>
                                </h3>

                                <div style={{position: 'absolute', right: '10px', fontSize: 'small', bottom: '10px'}}>
                                    {item?.unit} unit selected
                                </div>
                            </div>
                            
                            {/* <div className="body-cnt-btm" >
                                <button style={{padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2.5px'}} className="add" onClick={e => {parseInt(stock) === parseInt(item.stock) ? '' : setstock(stock+1)}}>
                                    +
                                </button>
                                &nbsp;
                                &nbsp;
                                <span>
                                    {stock}
                                </span>
                                &nbsp;
                                &nbsp;

                                <button style={{padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2.5px'}} className="minus" onClick={e => {
                                    parseInt(stock) < 2 ? '' : setstock(stock-1)
                                }}>
                                    -
                                </button>
                            </div>
                            <hr /> */}
                        </div>
                    </div>
                )
            }
        
        </div>
    </>
  )
}
