const { generateBuyerMessage, generateVendorMessage } = require("@/app/utils/mssg");

export class wp {
    static async pending(status, buyerName, vendorName, order, product, phone, buyer_locale) {
        let message = generateVendorMessage(status, vendorName, order.order_id);

        try {
           
            async function sendPendingImgToVendor() {
                const res = await fetch(
                    "https://7103.api.greenapi.com/waInstance7103939857/sendFileByUrl/24251e10e25d40c79d57ba5ed3fc4ae6e2d3cbbae89b45019c",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            chatId: `${phone}@c.us`,
                            urlFile: product?.thumbnail_id,
                            fileName: `${product.title}.png`,
                            // caption: `Order ${order.order_id}: ${product.title}`,
                        }),
                    }
                );
                return await res.json();
            }

            async function sendLink() {
                const res = await fetch(
                    "https://7103.api.greenapi.com/waInstance7103939857/sendInteractiveButtons/24251e10e25d40c79d57ba5ed3fc4ae6e2d3cbbae89b45019c",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            chatId: `${phone}@c.us`,
                            body: `${message} Click the link below to view your order details.`,
                            footer: 'Thanks for choosing Campus Sphere',
                            buttons: [
                                {
                                    type: "url",
                                    buttonId: "1",
                                    buttonText: "View Order",
                                    url: `https://www.campussphere.net/vendor/orders/${order.order_id}/tracker`,
                                },
                            ],
                        }),
                    }
                );
                return await res.json();
            }

            async function sendInfoToNedu() {
                const res = await fetch(
                    "https://7103.api.greenapi.com/waInstance7103939857/sendFileByUrl/24251e10e25d40c79d57ba5ed3fc4ae6e2d3cbbae89b45019c",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            chatId: `2348032639894@c.us`,
                            urlFile: product?.thumbnail_id,
                            fileName: `${product.title}.png`,
                            caption: `This product: "[${product.title}]" was paid for by ${buyerName}, recently, \n vendor location: in ${product.campus} ${product.uni_state} \n buyer location: ${buyer_locale}`,
                        })
                    }
                );
                return await res.json();
            }
            

            // Run all in parallel for speed
            const results = await Promise.all([
                sendPendingImgToVendor(),
                sendLink(),
                sendInfoToNedu()
            ]);

            return results; // array of API responses
        } catch (error) {
            return { error: error.message };
        }
    }

    static async processing(status, buyerName, order, product, phone) {
        try {
            let message = generateBuyerMessage(status, buyerName, order.order_id);

            async function sendProcessImgToBuyer() {
                const res = await fetch(
                    "https://7103.api.greenapi.com/waInstance7103939857/sendFileByUrl/24251e10e25d40c79d57ba5ed3fc4ae6e2d3cbbae89b45019c",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            chatId: `${phone}@c.us`,
                            urlFile: product?.thumbnail_id,
                            fileName: `${product.title}.png`,
                            caption: `Good news! The vendor has confirmed your order (ID: ${order.order_id}) and is preparing it for shipment. You’ll receive an update once it’s on the way.`,
                        }),
                    }
                );
                return await res.json();
            }

            async function sendLink() {
                const res = await fetch(
                    "https://7103.api.greenapi.com/waInstance7103939857/sendInteractiveButtons/24251e10e25d40c79d57ba5ed3fc4ae6e2d3cbbae89b45019c",
                    {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chatId: `${phone}@c.us`,
                        header: "Update On Your Purchase",
                        body: `${message}\n\nClick below to track your order.`,
                        footer: "Thanks for choosing Campus Sphere",
                        buttons: [
                        {
                            type: "url", 
                            buttonId: "1",
                            buttonText: "View Order",
                            url: `https://www.campussphere.net/store/orders/${product.product_id}/tracker`,
                        },
                        ],
                    }),
                    }
                );
                return await res.json();
            }

            // Run both in parallel
            const [imgRes, linkRes] = await Promise.all([
                sendProcessImgToBuyer(),
                sendLink(),
            ]);

            return { imgRes, linkRes };
        } catch (error) {
            return { error: error.message };
        }
    }


    static async shipping(status, buyerName, order, product, phone) {
    try {
            let message = generateBuyerMessage(status, buyerName, order.order_id);

            async function sendShippingImgToBuyer() {
                const res = await fetch(
                    "https://7103.api.greenapi.com/waInstance7103939857/sendFileByUrl/24251e10e25d40c79d57ba5ed3fc4ae6e2d3cbbae89b45019c",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            chatId: `${phone}@c.us`,
                            urlFile: product?.thumbnail_id,
                            fileName: `${product.title}.png`,
                            caption: `Great news! Your order (ID: ${order.order_id}) is on the way! sit tight. 🚀`,
                        }),
                    }
                );
                return await res.json();
            }

            async function sendShippingLink() {
                const res = await fetch(
                    "https://7103.api.greenapi.com/waInstance7103939857/sendInteractiveButtons/24251e10e25d40c79d57ba5ed3fc4ae6e2d3cbbae89b45019c",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            chatId: `${phone}@c.us`,
                            header: "Your Order Is ON The Way",
                            body: `${message}\n\nClick below to track your delivery.`,
                            footer: "Thanks for shopping with Campus Sphere",
                            buttons: [
                                {
                                    type: "url",
                                    buttonId: "1",
                                    buttonText: "Track Order",
                                    url: `https://www.campussphere.net/store/orders/${product.product_id}/tracker`,
                                },
                            ],
                        }),
                    }
                );
                return await res.json();
            }

            // Run both in parallel
            const [imgRes, linkRes] = await Promise.all([
                sendShippingImgToBuyer(),
                sendShippingLink(),
            ]);

            return { imgRes, linkRes };
        } catch (error) {
            return { error: error.message };
        }
    }


    static async delivered(status, buyerName, order, product, phone) {
        try {
            let message = generateBuyerMessage(status, buyerName, order?.order_id);

            async function sendDeliveredImgToBuyer() {
                const res = await fetch(
                    "https://7103.api.greenapi.com/waInstance7103939857/sendFileByUrl/24251e10e25d40c79d57ba5ed3fc4ae6e2d3cbbae89b45019c",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            chatId: `${phone}@c.us`,
                            urlFile: product?.thumbnail_id,
                            fileName: `${product.title}.png`,
                            caption: `Your order (ID: ${order.order_id}) has been delivered. ✅`,
                        }),
                    }
                );
                return await res.json();
            }

            async function sendDeliveredLink() {
                const res = await fetch(
                    "https://7103.api.greenapi.com/waInstance7103939857/sendInteractiveButtons/24251e10e25d40c79d57ba5ed3fc4ae6e2d3cbbae89b45019c",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            chatId: `${phone}@c.us`,
                            header: "Order Delivered",
                            body: `${message}\n\nClick below to confirm you received the order.`,
                            footer: "Thanks for shopping with Campus Sphere",
                            buttons: [
                                {
                                    type: "url",
                                    buttonId: "1",
                                    buttonText: "Confirm Order Now",
                                    url: `https://www.campussphere.net/store/orders/${product.product_id}/tracker`,
                                },
                            ],
                        }),
                    }
                );
                return await res.json();
            }

            // Run both in parallel
            const [imgRes, linkRes] = await Promise.all([
                sendDeliveredImgToBuyer(),
                sendDeliveredLink(),
            ]);

            return { imgRes, linkRes };
        } catch (error) {
            return { error: error.message };
        }
    }


}
