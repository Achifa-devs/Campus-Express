import React, { useEffect, useState } from 'react'
import Thumbnail from '../../../components/Buyer/Thumbnail'
import js_ago from 'js-ago'
import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'

export default function OrderedItem({item,updateStock}) {
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
    let [stock, setstock] = useState(1);

    useEffect(() => {
      updateStock(stock)
    }, [stock])

  return (
    <>
        
        <div className="new-order-card-data">
            <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>New Order</h6>
            <div className="new-order-card-data-cnt">
                <div className='thumbnail-cnt'>
                    <Thumbnail thumbnail_id={item?.thumbnail_id} height={'100%'} />
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
                                  textOverflow: 'ellipsis',
                                fontSize: 'medium'
                            }}>{item?.title}</p>
                        </div>

                        <h3 className="price" style={{
                                fontSize: 'medium'}}>
                            &#8358;&nbsp;{
                            new Intl.NumberFormat('en-us').format(item?.price)}
                        </h3>
                    </div>
                    
                    <div className="body-cnt-mid">
                        <div className="seller">
                            <span style={{
                                whiteSpace: 'nowrap', 
                                  overflow: 'hidden', 
                                visibility: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>Shop ID: {item?.seller_id}</span>
                        </div>
                        <br />
                        <div className="stock">
                            {item?.stock} In stock
                        </div>
                    </div>
                    
                    <div className="body-cnt-btm">
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

                        <button style={{padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2.5px'}} className="minus" onClick={e => {parseInt(stock) === parseInt(item.stock) ? '' : setstock(stock-1)}}>
                            -
                        </button>
                    </div>

                </div>
            </div>
        
        </div>
    </>
  )
}
