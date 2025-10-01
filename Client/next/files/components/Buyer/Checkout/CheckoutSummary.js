import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { usePaystackPayment } from "react-paystack";
import { open_notice } from "@/files/reusable.js/notice";
import { buyer_overlay_setup } from "@/files/reusable.js/overlay-setup";
import { PaystackButton } from 'react-paystack'



const CheckoutSummary = ({ Total, Method, order_list, type }) => {
    const { buyer_info } = useSelector(s => s.buyer_info);
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;

    const productPrice = parseInt(order_list?.product?.price) || 0;
    const orderStock = parseInt(order_list?.order?.stock) || 0;
    const shippingFee = parseInt(order_list?.order?.shipping_fee) || 0;
    const baseAmount = (productPrice) * (orderStock) + (shippingFee);

    const metadata = {
        user_id: buyer_info?.user_id || "" ,
        order_id: order_list?.order?.order_id || "",
        type: "checkout"
    };

    const config = {
        metadata,
        reference: `${new Date().getTime()}-${Math.floor(Math.random() * 100000)}`,
        email: buyer_info?.email || "",
        amount: baseAmount * 100, // Convert to kobo
        publicKey: "pk_live_13343a7bd4deeebc644070871efcdf8fdcf280f7"
    };

    const componentProps = {
        ...config,
        text: ` 
            Checkout ₦${new Intl.NumberFormat("en-us").format((parseInt(order_list?.product?.price) * parseInt(order_list?.order?.stock)) + parseInt(order_list?.order?.shipping_fee))}
            
        `,
        onSuccess: (reference) =>{
            window.location.href = `/checkout/confirmation/${reference}`
        },
        onClose: () => {
            alert("Wait! You need this oil, don't go!!!!");
        },
    }


    useEffect(() => {
        document.querySelector('.checkout-btn').children[0].style.width = '100%'
        document.querySelector('.checkout-btn').children[0].style.height = '100%'
    }, [])

    return (
        <>
            {screenWidth > 759 && (
                <div className="checkout-confirmation">
                    <div className="checkout-confirmation-cnt" style={{ height: "fit-content" }}>
                        <div style={{ borderBottom: "none", fontWeight: "500" }}>
                            <span>Checkout Summary</span>
                        </div>
                        <hr style={{ background: "#efefef", margin: "15px 0px" }} />

                        <div>
                            <small style={{ float: "left", fontWeight: "500" }}>Sub total</small>
                            <small style={{ float: "right", fontSize: "3.5vh", fontWeight: "500" }}>
                                <small>₦</small>{new Intl.NumberFormat("en-us").format(parseInt(order_list?.product?.price * order_list?.order?.stock))}
                            </small>
                        </div>

                        <div style={{ fontSize: "small", margin: "5px 0px" }}>
                            <small style={{ float: "left", fontWeight: "500", fontSize: "small" }}>Charges</small>
                            <div style={{ float: "right" }}>Free</div>
                        </div>

                        <div style={{ fontSize: "small", margin: "5px 0px" }}>
                            <small style={{ float: "left", fontWeight: "500", fontSize: "small" }}>Shipping Fee</small>
                            <div style={{ float: "right" }}>₦{new Intl.NumberFormat("en-us").format(parseInt(order_list?.order?.shipping_fee))}</div>
                        </div>

                        <br />

                        <div style={{ height: "fit-content", width: "100%" }} className="checkout-btn">
                            {/* <button
                                style={{ width: "100%", height: "50px", borderRadius: "5px" }}
                                className="shadow-sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    initializePayment(onSuccess, onClose);
                                }}
                            >
                                <span>Checkout &nbsp;</span>
                                <span>
                                    <small>(₦</small>{new Intl.NumberFormat("en-us").format(
                                        parseInt(order_list?.product?.price * order_list?.order?.stock) + parseInt(order_list?.order?.shipping_fee)
                                    )})
                                </span>
                            </button> */}

                            <PaystackButton className="shadow-sm button"  {...componentProps} />
                        </div>
                    </div>
                </div>
            )}

            {screenWidth <= 760 && (
                <div style={{
                    height: "auto",
                    width: "100%",
                    padding: "10px",
                    position: "absolute",
                    bottom: "0",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }} className="checkout-btn">
                    {/* <button
                        style={{ position: "relative", background: "#FF4500", color: "#fff" }}
                        className="shadow-sm button"
                        onClick={(e) => {
                            e.preventDefault();
                            initializePayment(onSuccess, onClose);
                        }}
                    >
                        <span>Checkout SubTotal&nbsp;</span>
                        <span>
                            <small>(₦ </small>{new Intl.NumberFormat("en-us").format(
                                (parseInt(order_list?.product?.price) * parseInt(order_list?.order?.stock)) + parseInt(order_list?.order?.shipping_fee)
                            )})
                        </span>
                    </button> */}
                    <PaystackButton className="shadow-sm button" {...componentProps} />
                </div>
            )}
        </>
    );
};

export default CheckoutSummary;
