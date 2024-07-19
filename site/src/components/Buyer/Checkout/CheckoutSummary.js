import { useEffect, useState } from "react";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useLocation } from "react-router-dom";

const CheckoutSummary = ({Total, Method, type, price, buyerData}) => {

    // let meta = {
    //     immediate_purchase: window.location.pathname.split('/').length > 4 ? true : false,
    //     ce_id: buyerData.buyerData_id,
    //     cart: {unit: parseInt(window.location.pathname.split('/')[4].split('-')[1]), product_id: atob(window.location.pathname.split('/')[2])},
    // }
    let location = useLocation();

   

    let [immediate_check, set_immediate_check] = useState('')

    useEffect(() => {set_immediate_check(location.pathname)}, [location])


    const config = {
        public_key: 'FLWPUBK_TEST-9b89907d8ef65fd12ea69e900e0cd9c3-X',
        tx_ref: Date.now(),
        amount: parseInt(price)+50,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        
        customer: {
            email: buyerData?.email,
            // phone_number: `checkout/${immediate_check.split('/').length > 4 ? true : false}*${parseInt(window.location.pathname.split('/')[4].split('-')[1])}*${atob(window.location.pathname.split('/')[2])}/${buyerData.buyerData_id}/${buyerData.phone}/${price}`,
            name: buyerData?.fname + " " + buyerData?.lname
        },  

        customizations: {
            title: 'Campus Express',
            description: 'Payment for ordered item',
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
            <div className="overlay" style={{padding: '20px'}} onClick={e => e.target === document.querySelector('.overlay') ? e.currentTarget.removeAttribute('id'): ''}>
                <div className="loader"></div>
            </div>

            <div className="buyer-checkout-cnt" style={{display: screenWidth > 759 ? 'flex' :'none'}}>

                <div style={{borderBottom: "none"}}>
                    <span>Checkout Summary</span>
                </div>

                <div>
                    <small style={{float: "left"}}>Sub total</small>
                    <small style={{float: "right"}}>
                        <small>₦</small>{price}</small>
                </div> 

                <div style={{fontSize: "small"}}>
                    <small style={{float: "left"}}>Charges</small>
                    <small style={{float: "right"}}>
                        <small>Free</small>
                    </small>
                </div>

                <div style={{height: "80px"}}>
                    <button className="shadow-sm" onClick={ e => type !== 'wallet' ? openFlw() : handleDeposit()}>
                        <span>Checkout SubTotal&nbsp; </span>
                        <span><small>(₦</small>{price})</span>
                    </button>
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
                        <button className="shadow-sm" onClick={ e => {
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