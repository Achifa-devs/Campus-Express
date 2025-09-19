import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../../../styles/Buyer/cancelOrderOverlay.css'
import { usePathname } from "next/navigation";
import '../../../styles/Buyer/Alert.css'
import axios from "axios";
import { useSelector } from "react-redux";
import { buyer_overlay_setup } from "@/files/reusable.js/overlay-setup";
const OrderTrackerSummary = ({order, Method, updateJsx, activeJsx}) => {

    // let meta = {
    //     immediate_purchase: window.location.pathname.split('/').length > 4 ? true : false,
    //     ce_id: buyer.user_id,
    //     cart: {unit: parseInt(window.location.pathname.split('/')[4].split('-')[1]), product_id: atob(window.location.pathname.split('/')[2])},
    // }
    let pathname = usePathname();
    let {
        user_id 
    } = useSelector(s => s.user_id);

    let [immediate_check, set_immediate_check] = useState('')

    useEffect(() => {set_immediate_check(pathname)}, [pathname])

    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);
    function handleDeposit() {let overlay = document.querySelector('.overlay');overlay.setAttribute('id', 'overlay')};
    
    function handleCancelOrder() {
        let overlay = document.querySelector('.cancel-order-overlay')
        overlay.setAttribute('id', 'cancel-order-overlay');
    }

    function handleConfirmOrder() {
        let overlay = document.querySelector('.confirm-order-overlay')
        overlay.setAttribute('id', 'confirm-order-overlay');
    }
    
    return (  

        <>
            {/* <div className="overlay" style={{padding: '20px'}} onClick={e => e.target === document.querySelector('.overlay') ? e.currentTarget.removeAttribute('id'): ''}>
                {
                    Method
                }
            </div> */}

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
                            <footer class="modal-container-footer">
                                <button class="button is-ghost" onClick={e=> {
                                    document.querySelector('.cancel-order-overlay').removeAttribute('id')
                                }}>Decline</button>
                                {/* user_id,order_id,amount,reason */}
                                <button class="button is-primary" onClick={e => {
                                    buyer_overlay_setup(true, 'Cancelling Order')

                                    axios.post('https://cs-node.vercel.app/cancel-order', {user_id: user_id, order_id: order?.order_id, amount:order?.price, reason: 'cancelled', product_id: order?.product_id})
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

            <div className="checkout-confirmation" style={{display: screenWidth > 759 ? 'flex' :'none', marginTop: '3px'}}>

                <div className="checkout-confirmation-cnt" >

                    <div style={{borderBottom: "none", height: '50px'}}>
                        <span>Order Number <b>#{order?.order_id}</b></span>
                    </div>
                    <hr style={{margin: '10px 0px'}} />

                    <div style={{
                        height: 'auto',
                        width: '100%',
                        padding: '5px',
                        // position: 'absolute',
                        // bottom: '0', 
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <button style={{cursor: 'pointer', height: 'auto', width: 'fit-content', borderRadius: '5px'}} onClick={e => updateJsx(false)}>
                            <small style={{float: "left", borderBottom: activeJsx ? 'none': '1px solid #FF4500'}}>Track Your Order</small>
                            {/* <small style={{float: "right"}}>View</small> */}
                        </button>
                        {/* <br /> */}
                        <button style={{cursor: 'pointer', height: 'auto', width: 'fit-content', borderRadius: '5px'}} onClick={e => updateJsx(true)}>
                            <small style={{float: "left", borderBottom: !activeJsx ? 'none': '1px solid #FF4500'}}>Order Details</small>
                            {/* <small style={{float: "right"}}>View</small> */}
                        </button>
                    </div>

                    <div style={{
                        height: 'auto',
                        width: '100%',
                        padding: '5px',
                        // position: 'absolute',
                        // bottom: '0', 
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <button style={{width: '45%', height: '50px',borderRadius: '5px'}} className="shadow-sm" onClick={e=> {
                            e.preventDefault();
                            handleConfirmOrder()
                        }}>
                            <span>Confirm</span>
                        </button>

                        <button style={{width: '45%', height: '50px',borderRadius: '5px'}} className="shadow-sm" onClick={e=> {
                            e.preventDefault();
                            handleCancelOrder();
                        }}>
                            <span>Cancel</span>
                        </button>
                    </div>
                    
                </div>
            </div>

                {
                    screenWidth > 759
                ?
                    ''
                :
                    <div style={{position: 'fixed', background: '#fff', bottom: '0',left: '0', width: '100%', padding: '20px', zIndex: '1000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row-reverse'}}>
                        <button style={{margin: '0', width: '67%'}} className="shadow-sm button" onClick={e=> {
                            let overlay = document.querySelector('.confirm-order-overlay')
                            overlay.setAttribute('id', 'confirm-order-overlay');
                            handleConfirmOrder()
                        }}>
                            {/* <span>{!activeJsx?"View Order Details":"Track Order"}&nbsp; </span> */}
                            <span>Confirm delivery</span>
                        </button>

                        <button style={{margin: '0', width: '27%'}} onClick={handleCancelOrder} className="shadow-sm button" >
                            <small>Cancel</small>
                        </button>

                    </div>
                

                }
        </>
     );
}
 
export default OrderTrackerSummary;