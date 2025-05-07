import React, { useEffect, useState } from 'react'
import Thumbnail from '../Thumbnail'
import js_ago from 'js-ago'
import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'
import axios from 'axios';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';
import { useSelector } from 'react-redux';
import '../../../styles/Buyer/cancelOrderOverlay.css' 
import '../../../styles/Buyer/Alert.css'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

export default function OrderItem({item,order}) {
    let [selected_order, set_selected_order] = useState(false);
    let pathname = usePathname()
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => { setScreenWidth(window.innerWidth) }, []);
    function handleCancelOrder() {
        let overlay = document.querySelector('.cancel-order-overlay')
        overlay.setAttribute('id', 'cancel-order-overlay');
    }

    let {
        user_id 
    } = useSelector(s => s.user_id);

    useEffect(() => {
        // Extract query parameters directly using URLSearchParams
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('item'); // Get 'item' query parameter
        if (data === item?.product_id) {
            set_selected_order(true)
            window.location.href=`#${item?.product_id}`
        } else {
            set_selected_order(false)
            
        }
    }, []);
    
   
  return (
    <>
        <div className="cancel-order-overlay" style={{padding: '20px'}} onClick={e => e.target === document.querySelector('.cancel-order-overlay') ? e.currentTarget.removeAttribute('id'): ''}>
            <div className="cancel-order-warning">
                <div class="">
                    <article class="modal-container" style={{width: '100%', borderRadius: '5px'}}>
                        <header class="modal-container-header">
                            <span class="modal-container-title">
                                <svg aria-hidden="true" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M14 9V4H5v16h6.056c.328.417.724.785 1.18 1.085l1.39.915H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8v1h-7zm-2 2h9v5.949c0 .99-.501 1.916-1.336 2.465L16.5 21.498l-3.164-2.084A2.953 2.953 0 0 1 12 16.95V11zm2 5.949c0 .316.162.614.436.795l2.064 1.36 2.064-1.36a.954.954 0 0 0 .436-.795V13h-5v3.949z" fill="#FF4500"></path>
                                </svg>
                                Tips For Cancellation
                            </span>
                            <button class="icon-button">
                                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="currentColor"></path>
                                </svg>
                            </button>
                        </header>
                        <section class="modal-container-body rtf">
                        <h6>If you cancel this order:</h6>
                            <hr />
                            <br />
                            <ol style={{margin: '0'}}>
                                <li>You will not receive this product</li>
                                <li>You will loose track of this product</li>
                                <li>You will be refunded the money paid money</li>
                            </ol>


                        </section>
                        <footer class="modal-container-footer" style={{justifyContent: 'space-between'}}>
                            <button class="button is-ghost" style={{background: '#FF4500'}} onClick={e=> {
                                document.querySelector('.cancel-order-overlay').removeAttribute('id')
                            }}>Decline</button>
                            {/* user_id,order_id,amount,reason */}
                            <button class="button is-primary" onClick={e => {
                                buyer_overlay_setup(true, 'Cancelling Order')

                                axios.post('http://192.168.24.146:9090/cancel-order', {user_id: user_id, order_id: order?.order_id, amount:order?.price, reason: 'cancelled', product_id: order?.product_id})
                                .then(({data})=>{
                                    console.log(data)
                                    if(data){
                                        buyer_overlay_setup(false, '');
                                        window.location.href='/orders'
                                    }else{
                                        buyer_overlay_setup(false, 'Error Occured Please Try Again');
                                        setTimeout(() => {
                                            buyer_overlay_setup(false, '');
                                        },[1000])
                                    }
                                })
                                .catch(error=>{
                                    console.log(error)
                                })

                            }}>Accept</button>
                        </footer>
                    </article>
                </div>
            </div>
        </div>
        
          
        <div className="order-card-data" id={`/store/${item?.product_id}`} style={{border: selected_order ? '2px solid #FF4500' : 'none'}}>
            <div className="order-card-data-cnt">
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
                            }}>Seller: {item?.user_id}</span>
                        </div>

                        <div className="stock">
                            {item?.stock} In stock
                        </div>
                    </div>
                    
                    <div className="body-cnt-btm">
                        {
                            order?.status.state === 'cancelled'
                            ?
                            <>
                                <button style={{opacity: '.5'}} disabled>
                                    Remove
                                </button>
                                <button style={{height: 'auto'}} disabled>
                                    {
                                        'Cancelled'
                                    }
                                </button>
                            </>
                            :
                            order?.status.state === 'completed'
                            ?
                            <>
                                <button style={{opacity: '1', background: 'yellowgreen'}} onClick={e=>{window.location.href = `/store/new-return/${item?.product_id}`}}>
                                    Return & refund
                                </button>
                                <button style={{height: 'auto', background: order?.status.state === 'completed' ? 'green' : '#FF4500'}} disabled>
                                    {
                                        'Completed'
                                    }
                                </button>
                            </>
                            :
                            <>
                                <button onClick={e => {
                                    
                                    
                                    order?.havepaid
                                    ?
                                        
                                        handleCancelOrder()
                                    :
                                    
                                        buyer_overlay_setup(true, `Deleting order`)
                                        
                                        axios.post('http://192.168.24.146:9090/remove-order', {order_id: order?.order_id})
                                        .then(({data})=>{
                                            console.log(data)
                                            if(data){
                                                buyer_overlay_setup(false, '');
                                                window.location.href='/orders'
                                            }else{
                                                buyer_overlay_setup(false, 'Error Occured Please Try Again');
                                                setTimeout(() => {
                                                    buyer_overlay_setup(false, '');
                                                },[1000])
                                            }
                                        })
                                        .catch(error=>{
                                            console.log(error)
                                        })
                                }}>
                                    {
                                        order?.havepaid
                                        ?
                                        <small>Cancel order</small>
                                        :
                                        <small>Delete order</small>
                                    }
                                </button>
                                <button onClick={e=> order?.havepaid ? window.location.href=`/store/order-tracking/${item?.product_id}` : window.location.href=`/store/checkout/${item?.product_id}`}>
                                    {
                                        order?.havepaid
                                        ?
                                        <small>View Order</small>
                                        :
                                        <small>Pay For This Order</small>
                                    }
                                </button>
                            </>
                        }
                    </div>

                </div>
            </div>
        
        </div>
    </>
  )
}
