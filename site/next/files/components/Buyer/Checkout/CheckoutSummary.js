import { useEffect, useState } from "react";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useLocation } from "react-router-dom";
import { usePathname } from "next/navigation";

const CheckoutSummary = ({Total, Method, order_list, type, price, buyerData}) => {

    // let meta = {
    //     immediate_purchase: window.location.pathname.split('/').length > 4 ? true : false,
    //     ce_id: buyerData.buyerData_id,
    //     cart: {unit: parseInt(window.location.pathname.split('/')[4].split('-')[1]), product_id: atob(window.location.pathname.split('/')[2])},
    // }

    let pathname = usePathname()


    let [immediate_check, set_immediate_check] = useState('')

    useEffect(() => {set_immediate_check(pathname)}, [pathname])


    const config = {
        public_key: 'FLWPUBK_TEST-9b89907d8ef65fd12ea69e900e0cd9c3-X',
        tx_ref: Date.now(),
        amount: parseInt(price)+50,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: buyerData?.email,
            phone_number: JSON.stringify({
                buyer_info: {buyer: buyerData?.buyer_id, phone: buyerData?.phone}, 
                product_info: {product_id: order_list?.product?.product_id, title: order_list?.product?.title, price: order_list?.product?.price},
                purchase_info: {unit: null, amount_paid: null, payment_type: 'checkout', isBulkPurchase: false}
            }),
            name: buyerData?.fname + " " + buyerData?.lname
        },  

        customizations: {
            title: 'Campus Express',
            description: `Payment for ${order_list?.product?.title}`,
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    function openFlw() {
        handleFlutterPayment({
            callback: (response) => {
                console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {}
        });
    }

    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);
    function handleDeposit() {let overlay = document.querySelector('.overlay');overlay.setAttribute('id', 'overlay')};
    
    
    return ( 

        <>
           

            <div className="checkout-confirmation" style={{display: screenWidth > 759 ? 'flex' :'none'}}>

                <div className="checkout-confirmation-cnt">

                    <div style={{borderBottom: "none", fontWeight: '500'}}>
                        <span>Checkout Summary</span>
                    </div>
                    
                    <hr style={{background: '#efefef'}} />

                    <div>
                        <small style={{float: "left", fontWeight: '500'}}>Sub total</small>
                        <small style={{float: "right", fontSize: '3.5vh', fontWeight: '500'}}>
                            <small>₦</small>{
                        new Intl.NumberFormat('en-us').format(Total)}</small>
                    </div> 

                    <div style={{fontSize: "small"}}>
                        <small style={{float: "left"}}>Charges</small>
                        <small style={{float: "right"}}>
                            <small>Free</small>
                        </small>
                    </div>

                    <br />

                    <div onClick={e => window.location.href=`/checkout/${item.product_id}`} style={{height: "80px", width: '100%'}}>
                        <button style={{width: '100%', height: '50px'}} className="shadow-sm">
                            <span>Checkout &nbsp; </span>
                            <span><small>(₦</small>{price})</span>
                        </button>
                    </div>
                </div> 
                
            </div>

                {
                    screenWidth > 759
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
                        justifyContent: 'center'
                    }}>
                        <button style={{position: 'relative', background: '#FF4500', color: '#fff'}}  className="shadow-sm" onClick={ e => {
                            // type !== 'wallet' ? openFlw() : handleDeposit()
                            window.location.href='order-tracking'
                        }}>
                            <span>Checkout SubTotal&nbsp; </span>
                            <span><small>(&#8358; </small>{new Intl.NumberFormat('en-us').format(price)})</span>
                        </button>
                    </div>
                

                }
        </>
     );
}
 
export default CheckoutSummary;