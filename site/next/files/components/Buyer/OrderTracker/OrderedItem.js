import React, { useEffect, useState } from 'react'
import Thumbnail from '../../../components/Buyer/Thumbnail'
import js_ago from 'js-ago'
import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function OrderedItem({item,order}) {
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
    let {
        buyer_id 
    } = useSelector(s => s.buyer_id);

  return (
    <>
        <div className="confirm-order-overlay" style={{padding: '20px'}} onClick={e => e.target === document.querySelector('.confirm-order-overlay') ? e.currentTarget.removeAttribute('id'): ''}>
            <div className="confirm-order-warning">
                <div class="" style={{width: '100%'}}>
                    <article class="modal-container" style={{width: '100%', borderRadius: '5px'}}>
                        <header class="modal-container-header">
                            <span class="modal-container-title">
                                <svg aria-hidden="true" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M14 9V4H5v16h6.056c.328.417.724.785 1.18 1.085l1.39.915H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8v1h-7zm-2 2h9v5.949c0 .99-.501 1.916-1.336 2.465L16.5 21.498l-3.164-2.084A2.953 2.953 0 0 1 12 16.95V11zm2 5.949c0 .316.162.614.436.795l2.064 1.36 2.064-1.36a.954.954 0 0 0 .436-.795V13h-5v3.949z" fill="#FF4500"></path>
                                </svg>
                                Tips For Confirmation
                            </span>
                            <button class="icon-button">
                                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="currentColor"></path>
                                </svg>
                            </button>
                        </header>
                        <section class="modal-container-body rtf">
                            <h6>If you accept this confirmation</h6>

                            <hr />
                            <br />

                            <ol style={{margin: '0'}}>
                                <li>You will confirm that you have received the product in good condition.</li>
                                <li>You will confirm that you are satisfied with the product received.</li>
                                <li>You will not be able to ask for refund after 24 hours depending on the type of product.</li>
                            </ol>


                        </section>
                        <footer class="modal-container-footer">
                            <button class="button is-ghost" onClick={e=> {
                                document.querySelector('.confirm-order-overlay').removeAttribute('id')
                            }}>Decline</button>
                            {/* buyer_id,order_id,amount,reason */}
                            <button class="button is-primary" onClick={e => {
                                buyer_overlay_setup(true, 'Confirming Order')

                                axios.post('http://192.168.24.146:9090/confirm-order', {buyer_id: buyer_id, order_id: order?.order_id, product_id: order?.product_id})
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

        <div className="checkout-card-data">
            <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <span>Order In Progress</span>
                
            </h6>
            <div className="checkout-card-data-cnt">
                <div className='thumbnail-cnt'>
                    <Thumbnail thumbnail_id={item?.thumbnail_id} height={'100%'} />
                </div> 

                <div style={{position: 'absolute', top: '5px', right: '5px', padding: '4px'}}>
                    <img src={ellipsisSvg} style={{height: '10px', width: '10px'}} alt="..." />
                </div>
                
                <div className="body-cnt" style={{position: 'relative'}}>
                    <div className="body-cnt-top">
                        <div className="title" style={{width: '70%'}}>
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

                        {/* <div className="stock">
                         {item?.stock} unit selected
                        </div> */}
                    </div>

                    <div onClick={e => {

                        const encodedMessage = encodeURIComponent(`Item Ordered:${item.title} Seller-id:\n\n\n${item.seller_id} \n\n\nPrice: ₦${new Intl.NumberFormat('en-us').format(item.price)} \n\n\n 'https://www.campusexpressng.com/product/${item.product_id}'`);
        
                        const whatsappUrl = `https://wa.me/${item?.seller_id}?text=${encodedMessage}`;
    
                        // Open WhatsApp with the share URL
                        window.open(whatsappUrl, '_blank');
                    }} style={{position: 'absolute', height: 'auto', fontWeight: 'normal', width: 'auto',bottom: '5px', left: '5px', padding: '8px 10px', background: '#25D366', fontSize: 'small', cursor: 'pointer'}} className='button'>Chat Seller On WhatsApp Now</div>
                   
                </div>
            </div>
        
        </div>
    </>
  )
}
