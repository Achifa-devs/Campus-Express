import {
    getOrder, 
    getOrders, 
    postCancelOrder,
} from "../../services/vendor/order.js";

export async function GET_ORDER(req, res) {
    
    try {
        const order = await getOrder(req.query);
        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function GET_ORDERS(req, res) {
    try {
        const orders = await getOrders(req.query);
        res.status(201).json({ success: true, data: orders });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function CANCEL_ORDER(req, res) {
    try {
        const cancel_order = await postCancelOrder(req.body);
        res.status(201).json({ success: true, data: cancel_order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
