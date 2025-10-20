"use client"
import React, { use } from 'react'
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { open_notice } from '@/files/reusable.js/notice';
import { useParams } from 'next/navigation';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';
import axios from 'axios';
import { PaystackButton } from 'react-paystack';
import { uuid } from 'uuidv4';
export default function NewOrderSummary({item,deliveryOpt}) {

    let {pickup_channel} = useSelector(s=>s.pickup_channel)
    let {user_id}=useSelector(s=>s.user_id);
    let {buyer_info}=useSelector(s=>s.buyer_info);
    const [baseAmount, setBaseAmount] = useState(0);

    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);

    let [screenWidth, setScreenWidth] = useState(0);
    let [shipping_fee, set_shipping_fee] = useState(0);
    let [order_data, set_order_data] = useState([]);

    useEffect(() => {
        if(item.length > 1){
            item.map(data => {
                let fee = findShippingFee(data)
                set_order_data(prev => [...prev, {
                    user_id: user_id,
                    product_id: data?.product_id,
                    price: parseInt(data?.price) * parseInt(data?.unit),
                    stock: data?.unit,
                    locale: pickup_channel,
                    vendor_id: data?.user_id,
                    order_id: uuid(),
                    shipping_fee: fee,
                    date: new Date()
                }])
            })
        }
    }, [item])

   
    useEffect(() => {
        if (order_data.length> 0) {
            let totalPrice = order_data.reduce((total,item) => total + (parseInt(item.price)), 0);
            let vendorShippingMap = new Map();
            order_data.forEach(item => {
            const vendorId = item.vendor_id; // or item.seller_id, depending on your schema
            const fee = parseInt(item.shipping_fee) || 0;

            // Only set once per vendor — ignore duplicates
            if (!vendorShippingMap.has(vendorId)) {
                vendorShippingMap.set(vendorId, fee);
            }
            });
            let totalShippingFee = Array.from(vendorShippingMap.values()).reduce((total, fee) => total + fee, 0);
            set_shipping_fee(totalShippingFee);
            setBaseAmount(totalPrice)
        }
    }, [order_data])


    let findShippingFee = (item) => {
        const shipping_range = item?.shipping_range ? JSON.parse(item.shipping_range) : null;

        if (!shipping_range) return null;

        const accepted_range_price = Object.entries(shipping_range)
            .filter(([_, value]) => value && value.selected)
            .map(([key, value]) => ({
            range: key,
            price: parseInt(value.price)
            }));

        for (const range_obj of accepted_range_price) {
            if (range_obj.range === 'in_campus' && item?.campus === buyer_info?.campus) {
            return range_obj.price;
            }

            if (range_obj.range === 'in_state' && item?.uni_state === buyer_info?.state) {
            return range_obj.price;
            }

            if (range_obj.range === 'out_state' && item?.uni_state !== buyer_info?.state) {
            return range_obj.price;
            }
        }

        return null; // nothing matched
    };



    const metadata = {
        user_id: buyer_info?.user_id || "" ,
        type: "checkout", 
        order_data: order_data
    };

    const config = {
        metadata,
        reference: `${new Date().getTime()}-${Math.floor(Math.random() * 100000)}`,
        email: buyer_info?.email || "",
        amount: ((parseInt(baseAmount)) + parseInt(shipping_fee)) * 100, // Convert to kobo
    };


    const publicKey = "pk_live_13343a7bd4deeebc644070871efcdf8fdcf280f7";
    const componentProps = {
        ...config,
        publicKey,
        text: ` 
            Checkout ₦${new Intl.NumberFormat("en-us").format((parseInt(baseAmount)) + parseInt(shipping_fee))}
            
        `,
        
        onSuccess: async() =>{
            buyer_overlay_setup(true, 'Informing buyer now...')
            // await fetch("/api/mssg/pending", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //         status: "pending",
            //         buyerName: buyer_info?.fname,
            //         order: order_data,
            //         product: item,
            //         // phone: `234${buyer_info?.phone}`,
            //         buyer_locale: `${buyer_info.campus} in ${buyer_info.state}`
            //     }),
            // });
            window.location.href = `/store/orders/${item?.product_id}/tracker`;

        },
        onClose: () => {
            alert("Wait! You need this oil, don't go!!!!");
        },
    }


    useEffect(() => {
        document.querySelector('.checkout-button').style.width = '100%'
        document.querySelector('.checkout-button').style.height = '100%'
         
    }, [])

    useEffect(() => {
        pickup_channel.length > 0 ? set_validation(true) : set_validation(false)
    }, [pickup_channel])

    async function handleNewOrder() {
        // alert(stock)

        let check_1 = pickup_channel.filter(item => item.channel === 'Door Step Delivery')
        let check_2 = pickup_channel.filter(item => item.channel === 'Custom Pickup Location')

        if (deliveryOpt !== -1) {
            if (deliveryOpt === 0 && check_2.length > 0 || deliveryOpt === 1 && check_1.length > 0) {
                buyer_overlay_setup(true, 'Creating new order...')

                axios.post("/api/store/new-order", order_data)
                .then((result) => {
                    const response = result.data; // axios auto-parses JSON
                    console.log(response)

                    if (response.success) {
                        // buyer_overlay_setup(false, '');

                        // window.location.replace(`/store/checkout/${item?.product_id}`)
                        window.location.replace(`/store/orders/${item?.product_id}/checkout`);
                    } else {
                        open_notice(true, 'Error Occured, Please Try Again');
                        buyer_overlay_setup(false, '');
                    }
                })
                .catch((err) => {
                    open_notice(true, 'Error Occured, Please Try Again');
                    buyer_overlay_setup(false, '');
                    console.error(err);
                });

            }else{ 
                if(deliveryOpt === 1){
                    open_notice(true, 'Door Step Delivery Is Not Set!...')

                }else if(deliveryOpt ===0){
                    open_notice(true, 'Custom Pickup Location Is Not Set!...')

                }
                
            }
        }else{
            open_notice(true, 'No delivery option have been selected...')
        }
    }

    function validate_address () {
        let check_1 = pickup_channel.filter(item => item.channel === 'Door Step Delivery')
        let check_2 = pickup_channel.filter(item => item.channel === 'Custom Pickup Location')

        if (deliveryOpt !== -1) {
            if (deliveryOpt === 0 && check_2.length > 0 || deliveryOpt === 1 && check_1.length > 0) {
                return true;
            }else{ 
                if(deliveryOpt === 1){
                    open_notice(true, 'Door Step Delivery Is Not Set!...')

                }else if(deliveryOpt ===0){
                    open_notice(true, 'Custom Pickup Location Is Not Set!...')

                }
                return false;
            }
        }else{
            open_notice(true, 'No delivery option have been selected...')
            return false;

        }
    }

    const [validation, set_validation] = useState(false)

    return ( 

        <>  

            <div className="new-order-confirmation" style={{display: screenWidth > 759 ? 'flex' :'none'}}>

                <div className="new-order-confirmation-cnt">
                    <div style={{borderBottom: "none", fontWeight: '500'}}>
                        <span>Order Summary</span>
                    </div>
                    <hr style={{background: '#efefef', margin: '15px 0px'}} />
                    <div>
                        <small style={{float: "left", fontWeight: '500'}}>Sub total</small>
                        <small style={{float: "right", fontSize: '3.5vh', fontWeight: '500'}}>
                            <small>₦</small>{
                        new Intl.NumberFormat('en-us').format(parseInt(baseAmount))}</small>
                    </div> 

                    <div style={{fontSize: "small"}}>
                        <small style={{float: "left"}}>Shipping fee</small>
                        <small style={{float: "right"}}>
                            <small>₦{new Intl.NumberFormat('en-us').format(shipping_fee)}</small>
                        </small>
                    </div>

                    <br />

                    <div className='checkout-btn' style={{height: "80px", width: '100%'}} onClick={e => {
                        let r = validate_address();
                        set_validation(r);

                    }} >
                        <div style={{pointerEvents: validation ? 'all' : 'none'}}>
                            <PaystackButton className="shadow-sm checkout-button"  {...componentProps} />
                        </div>
                    </div>
                </div> 
                
            </div>

                {
                    screenWidth > 760
                ?

                    ''
                :
                    <div onClick={e => {

                    }} className='checkout-btn' style={{
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
                        <PaystackButton className="shadow-sm checkout-button"  {...componentProps} />
                    </div>

                }
        </>
     );
}
 
