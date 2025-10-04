import { generateBuyerMessage, generateVendorMessage } from "@/app/utils/mssg";

async function sendToGreen(endpoint, payload) {
    try {
        const res = await fetch(
        `https://7103.api.greenapi.com/waInstance7103939857/${endpoint}/24251e10e25d40c79d57ba5ed3fc4ae6e2d3cbbae89b45019c`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }
        );
        return await res.json();
    } catch (err) {
        console.error("GreenAPI error:", err);
        return { error: err.message };
    }
}

export class wp {
    static async pending(status, buyerName, vendorName, order, product, phone, buyer_locale) {
        let message = generateVendorMessage(status, vendorName, order.order_id);

        const tasks = [
        sendToGreen("sendFileByUrl", {
            chatId: `${phone}@c.us`,
            urlFile: product?.thumbnail_id,
            fileName: `${product.title}.png`,
        }),

        sendToGreen("sendInteractiveButtons", {
            chatId: `${phone}@c.us`,
            body: `${message} Click the link below to view your order details.`,
            footer: "Thanks for choosing Campus Sphere",
            buttons: [
            {
                type: "url",
                buttonId: "1",
                buttonText: "View Order",
                url: `https://www.campussphere.net/vendor/orders/${order.order_id}/tracker`,
            },
            ],
        }),

        sendToGreen("sendFileByUrl", {
            chatId: `2348032639894@c.us`,
            urlFile: product?.thumbnail_id,
            fileName: `${product.title}.png`,
            caption: `This product: "[${product.title}]" was paid for by ${buyerName}, recently,
            vendor location: ${product.campus}, ${product.uni_state}
            buyer location: ${buyer_locale}`,
        }),
        ];

        return await Promise.allSettled(tasks);
    }

    static async processing(status, buyerName, order, product, phone) {
        let message = generateBuyerMessage(status, buyerName, order.order_id);

        const tasks = [
        sendToGreen("sendFileByUrl", {
            chatId: `${phone}@c.us`,
            urlFile: product?.thumbnail_id,
            fileName: `${product.title}.png`,
            caption: `Good news! The vendor has confirmed your order (ID: ${order.order_id}) and is preparing it for shipment.`,
        }),

        sendToGreen("sendInteractiveButtons", {
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
        ];

        return await Promise.allSettled(tasks);
    }

    static async shipping(status, buyerName, order, product, phone) {
        let message = generateBuyerMessage(status, buyerName, order.order_id);

        const tasks = [
        sendToGreen("sendFileByUrl", {
            chatId: `${phone}@c.us`,
            urlFile: product?.thumbnail_id,
            fileName: `${product.title}.png`,
            caption: `Great news! Your order (ID: ${order.order_id}) is on the way! 🚀`,
        }),

        sendToGreen("sendInteractiveButtons", {
            chatId: `${phone}@c.us`,
            header: "Your Order Is On The Way",
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
        ];

        return await Promise.allSettled(tasks);
    }

    static async delivered(status, buyerName, order, product, phone) {
        let message = generateBuyerMessage(status, buyerName, order?.order_id);

        const tasks = [
        sendToGreen("sendFileByUrl", {
            chatId: `${phone}@c.us`,
            urlFile: product?.thumbnail_id,
            fileName: `${product.title}.png`,
            caption: `Your order (ID: ${order.order_id}) has been delivered. ✅`,
        }),

        sendToGreen("sendInteractiveButtons", {
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
        ];

        return await Promise.allSettled(tasks);
    }

    static async completed(status, buyerName, order, product, phone, vendor) {
        let message = generateBuyerMessage(status, buyerName, order?.order_id);
        let v_message = generateVendorMessage(status, vendor?.fname, order?.order_id, null);

        const tasks = [
            sendToGreen("sendFileByUrl", {
                chatId: `${phone}@c.us`,
                urlFile: product?.thumbnail_id,
                fileName: `${product.title}.png`,
                caption: `Your order (ID: ${order.order_id}) has been completed. ✅`,
            }),

            sendToGreen("sendInteractiveButtons", {
                chatId: `${phone}@c.us`,
                header: "Order Completed",
                body: `${message}\n\nClick below to view your order.`,
                footer: "Thanks for shopping with Campus Sphere",
                buttons: [
                {
                    type: "url",
                    buttonId: "1",
                    buttonText: "View Order",
                    url: `https://www.campussphere.net/store/orders/${product.product_id}/tracker`,
                },
                ],
            }),

            sendToGreen("sendInteractiveButtons", {
                chatId: `234${vendor?.phone}@c.us`,
                header: "Order Completed",
                body: `${v_message}\n\nClick below to view!.`,
                footer: "Thanks for partnering with Campus Sphere",
                buttons: [
                    {
                        type: "url",
                        buttonId: "1",
                        buttonText: "View Order",
                        url: `https://www.campussphere.net/vendor/orders/${product.product_id}?order_id=${order.order_id}`,
                    },
                ],
            }),
        ];

        return await Promise.allSettled(tasks);
    }

    static async rejected(status, buyerName, order, product, phone, vendor, issue) {
        let message = generateBuyerMessage(status, buyerName, order?.order_id);
        let v_message = generateVendorMessage(status, vendor?.fname, order?.order_id, issue);

        const tasks = [
            sendToGreen("sendFileByUrl", {
                chatId: `${phone}@c.us`,
                urlFile: product?.thumbnail_id,
                fileName: `${product.title}.png`,
                caption: `Your order (ID: ${order.order_id}) has been rejected. ❌`,
            }),

            sendToGreen("sendInteractiveButtons", {
                chatId: `${phone}@c.us`,
                header: "Order Rejected",
                body: `${message}\n\nClick below to view your order.`,
                footer: "Thanks for shopping with Campus Sphere",
                buttons: [
                {
                    type: "url",
                    buttonId: "1",
                    buttonText: "View Order",
                    url: `https://www.campussphere.net/store/orders/${product.product_id}/tracker`,
                },
                ],
            }),

            sendToGreen("sendInteractiveButtons", {
                chatId: `234${vendor?.phone}@c.us`,
                header: "Order Rejected",
                body: `${v_message}\n\nClick below to view!.`,
                footer: "Thanks for partnering with Campus Sphere",
                buttons: [
                {
                    type: "url",
                    buttonId: "1",
                    buttonText: "View Order",
                    url: `https://www.campussphere.net/vendor/orders/${product.product_id}?order_id=${order.order_id}`,
                },
                ],
            }),
        ];

        return await Promise.allSettled(tasks);
    }
}
