import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { usePaystackPayment } from "react-paystack";

const CheckoutSummary = ({Total, Method, order_list, type}) => {
    let {
        buyer_info
    }=useSelector(s=>s.buyer_info);
    // let meta = {
    //     immediate_purchase: window.location.pathname.split('/').length > 4 ? true : false,
    //     ce_id: buyer_info.buyer_info_id,
    //     cart: {unit: parseInt(window.location.pathname.split('/')[4].split('-')[1]), product_id: atob(window.location.pathname.split('/')[2])},
    // }

    let pathname = usePathname()


    let [immediate_check, set_immediate_check] = useState('')

    useEffect(() => {set_immediate_check(pathname)}, [pathname])


    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);
    const config = {
        metadata: {
            buyer_info: {buyer_id: buyer_info?.buyer_id}, 
            product_info: {product_id: order_list?.product?.product_id, title: order_list?.product?.title, price: order_list?.product?.price},
            purchase_info: {unit: order_list?.order?.stock, amount_paid: order_list?.product?.price*order_list?.order?.stock, payment_type: 'checkout', isBulkPurchase: false},
        },
        reference: (new Date()).getTime().toString(),
        email: buyer_info?.email,
        first_name: buyer_info?.fname ,
        last_name: buyer_info?.lname,
        phone: buyer_info?.phone,
        // amount: 10000, 
        amount: parseInt((order_list?.product?.price*order_list?.order?.stock)+50)*100, 
        publicKey: 'pk_live_13343a7bd4deeebc644070871efcdf8fdcf280f7',
    };
    
    // you can call this function anything
    const onSuccess = (reference) => {
      // Implementation for whatever you want to do with reference and after success call.
      console.log(reference);
      if(true){
        // window.location.href=`order-tracking/${order_list?.product?.product_id}`
      }else{
        
      }
    };
  
    // you can call this function anything
    const onClose = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log('closed')
    }

    const initializePayment = usePaystackPayment(config);
  
   
    return ( 

        <>
           

            <div className="checkout-confirmation" style={{display: screenWidth > 759 ? 'flex' :'none'}}>

                <div className="checkout-confirmation-cnt">

                    <div style={{borderBottom: "none", fontWeight: '500'}}>
                        <span>Order Confirmation</span>
                    </div>
                    
                    <hr style={{background: '#efefef'}} />

                    <div>
                        <small style={{float: "left", fontWeight: '500'}}>Sub total</small>
                        <small style={{float: "right", fontSize: '3.5vh', fontWeight: '500'}}>
                            <small>₦</small>{
                        new Intl.NumberFormat('en-us').format(order_list?.product?.price*order_list?.product?.stock)}</small>
                    </div> 

                    <div style={{fontSize: "small"}}>
                        <small style={{float: "left"}}>Charges</small>
                        <small style={{float: "right"}}>
                            <small>Free</small>
                        </small>
                    </div>

                    <br />

                    <div style={{height: "80px", width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <button style={{width: '45%', height: '50px'}} className="shadow-sm" onClick={e=> {
                            e.preventDefault();
                        }}>
                            <span>Accept</span>
                        </button>

                        <button style={{width: '45%', height: '50px'}} className="shadow-sm" onClick={e=> {
                            e.preventDefault();
                        }}>
                            <span>Reject</span>
                        </button>
                    </div>
                </div> 
                
            </div>

                {
                    screenWidth > 760
                ?

                    ''
                :
                    <div style={{
                        height: 'auto',
                        width: '100%',
                        padding: '10px',
                        position: 'absolute',
                        bottom: '0', 
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <button style={{position: 'relative', width: '45%', background: '#FF4500', color: '#fff'}}  className="shadow-sm button" onClick={ e => {
                            e.preventDefault();
                            
                        }}>
                            <span>Accept</span>
                        </button>

                        <button style={{position: 'relative', width: '45%', background: '#FF4500', color: '#fff'}}  className="shadow-sm button" onClick={ e => {
                            e.preventDefault();
                            
                        }}>
                            <span>Reject</span>
                        </button>
                    </div>
                

                }
        </>
     );
}
 
export default CheckoutSummary;