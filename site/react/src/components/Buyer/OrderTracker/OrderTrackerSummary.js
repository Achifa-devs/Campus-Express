import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../../../styles/Buyer/cancelOrderOverlay.css'
const OrderTrackerSummary = ({Total, Method, updateJsx, activeJsx}) => {

    // let meta = {
    //     immediate_purchase: window.location.pathname.split('/').length > 4 ? true : false,
    //     ce_id: buyer.buyer_id,
    //     cart: {unit: parseInt(window.location.pathname.split('/')[4].split('-')[1]), product_id: atob(window.location.pathname.split('/')[2])},
    // }
    let location = useLocation();

    let [immediate_check, set_immediate_check] = useState('')

    useEffect(() => {set_immediate_check(location.pathname)}, [location])

    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);
    function handleDeposit() {let overlay = document.querySelector('.overlay');overlay.setAttribute('id', 'overlay')};
    
    function handleCancelOrder() {
        let overlay = document.querySelector('.cancel-order-overlay')
        overlay.setAttribute('id', 'cancel-order-overlay');
    }
    
    return (  

        <>
            <div className="overlay" style={{padding: '20px'}} onClick={e => e.target === document.querySelector('.overlay') ? e.currentTarget.removeAttribute('id'): ''}>
                {
                    Method
                }
            </div>

            <div className="cancel-order-overlay" style={{padding: '20px'}} onClick={e => e.target === document.querySelector('.cancel-order-overlay') ? e.currentTarget.removeAttribute('id'): ''}>
                <div className="cancel-order-warning">
                    <div>
                        <b>If you cancel this order</b>
                    </div>
                    <hr />
                    <br />
                    <ul style={{padding: '10px'}}>
                        <li>
                            <small>You will loose currnt track of this item</small>
                            
                        </li>
                        <li>
                            <small>The item will not get delivered.</small>
                            
                        </li>
                        <li>
                            <small>You will be refunded </small>
                            
                        </li>
                        <li>
                            <small>This order history will be ended</small>
                            
                        </li>
                    </ul>

                    <br />

                    <div className="cancel-order">
                        <button>Continue</button>
                        <button onClick={e => {
                            document.querySelector('.cancel-order-overlay').removeAttribute('id')
                        }}>Cancel</button>
                    </div>
                </div>

                
            </div>

            <div className="buyer-checkout-cnt" style={{display: screenWidth > 759 ? 'flex' :'none', width: '400px', margin: '0px', padding: '  0 0 0 10px'}}>

                <div style={{borderBottom: "none"}}>
                    <span>Order Number <small>203rt006yu</small></span>
                </div>

                <div style={{cursor: 'pointer'}} onClick={e => updateJsx(false)}>
                    <small style={{float: "left", borderBottom: activeJsx ? 'none': '1px solid #FF4500'}}>Track Your Order</small>
                    {/* <small style={{float: "right"}}>View</small> */}
                </div> 

                <div style={{cursor: 'pointer'}} onClick={e => updateJsx(true)}>
                    <small style={{float: "left", borderBottom: !activeJsx ? 'none': '1px solid #FF4500'}}>Order Details</small>
                    {/* <small style={{float: "right"}}>View</small> */}
                </div>

                <div style={{height: "80px"}}>
                    <button className="shadow-sm" onClick={handleCancelOrder}>
                        <span>Cancel Order&nbsp; </span>
                        {/* <span><small>(₦</small>{Total})</span> */}
                    </button>
                </div>
                
            </div>

                {
                    screenWidth > 759
                ?
                    ''
                :
                    <div style={{position: 'fixed', bottom: '0',left: '0', width: '100%', padding: '20px', zIndex: '1000', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <button onClick={e => updateJsx(!activeJsx)} className="shadow-sm" >
                            <span>{!activeJsx?"View Order Details":"Track Order"}&nbsp; </span>
                        </button>
                    </div>
                

                }
        </>
     );
}
 
export default OrderTrackerSummary;