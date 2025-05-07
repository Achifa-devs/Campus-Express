import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { usePaystackPayment } from "react-paystack";
import { open_notice } from "@/files/reusable.js/notice";
import { buyer_overlay_setup } from "@/files/reusable.js/overlay-setup";

const CheckoutSummary = ({ Total, Method, order_list, type }) => {
    const [price, set_price] = useState(0);
    const { buyer_info } = useSelector(s => s.buyer_info);
    const pathname = usePathname();
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;

    useEffect(() => {
        if (!order_list) return;

        const shippingRange = order_list?.product?.shipping_range
            ? JSON.parse(order_list.product.shipping_range)
            : null;
        
        const orderRange = order_list?.order?.pick_up_channels?.map(item =>
            item?.locale?.split(",").slice(0, item.channel === "Custom Pickup Location" ? -2 : -4)
        ) ?? [];

        if (orderRange.length > 0) {
            let state = orderRange[0]?.shift()?.trim();
            let camp = orderRange[0]?.join(",")?.trim();
            
            if (order_list.product.campus === camp) {
                set_price(shippingRange?.in_campus?.price || 0);
            } else if (order_list.product.uni_state === state) {
                set_price(shippingRange?.in_state?.price || 0);
            } else {
                set_price(shippingRange?.out_state?.price || 0);
            }
        }
    }, [order_list]);

    const productPrice = parseInt(order_list?.product?.price) || 0;
    const orderStock = parseInt(order_list?.order?.stock) || 0;
    const shippingFee = parseInt(price) || 0;
    const baseAmount = productPrice * orderStock + shippingFee + 50;

    const metadata = {
        buyer_info: { user_id: buyer_info?.user_id || "" },
        product_info: {
            product_id: order_list?.product?.product_id || "",
            title: order_list?.product?.title || "",
            price: productPrice
        },
        purchase_info: {
            unit: orderStock,
            amount_paid: baseAmount,
            shipping_fee: shippingFee,
            payment_type: "checkout",
            isBulkPurchase: false
        }
    };

    const config = {
        metadata,
        reference: `${new Date().getTime()}-${Math.floor(Math.random() * 100000)}`,
        email: buyer_info?.email || "",
        first_name: buyer_info?.fname || "",
        last_name: buyer_info?.lname || "",
        phone: buyer_info?.phone || "",
        amount: baseAmount * 100, // Convert to kobo
        publicKey: "pk_live_13343a7bd4deeebc644070871efcdf8fdcf280f7"
    };

    const onSuccess = (reference) => {
        console.log(reference);
        window.location.href = `order-tracking/${order_list?.product?.product_id}`;
        open_notice(true, "Payment successful...");
        buyer_overlay_setup(false, "");
    };

    const onClose = () => console.log("Payment dialog closed");

    const initializePayment = usePaystackPayment(config);

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
                            <div style={{ float: "right" }}>₦{new Intl.NumberFormat("en-us").format(parseInt(price))}</div>
                        </div>

                        <br />

                        <div style={{ height: "fit-content", width: "100%" }}>
                            <button
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
                                        parseInt(order_list?.product?.price * order_list?.order?.stock) + parseInt(price)
                                    )})
                                </span>
                            </button>
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
                }}>
                    <button
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
                                (order_list?.product?.price * order_list?.order?.stock) + price
                            )})
                        </span>
                    </button>
                </div>
            )}
        </>
    );
};

export default CheckoutSummary;
