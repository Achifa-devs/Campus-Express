
import { postContactClick, postImpression, postShare, postShopView, postUpdateContactClickForUnknownCustomer } from "../../services/shop/analytics.js";

// 
// 
// 

export async function POST_SHOP_VIEW(req, res) {
    try {
        const post_shop_view = await postShopView(req.body);
        res.status(201).json({ success: true, data: post_shop_view });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function POST_CONTACT_CLICK(req, res) {
    try {
        const post_contact_click = await postContactClick(req.body);
        res.status(201).json({ success: true, data: post_contact_click });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function POST_SHARE(req, res) {
    try {
        const post_share = await postShare(req.body);
        res.status(201).json({ success: true, data: post_share });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function POST_IMPRESSION(req, res) {
    try {
        const post_impression = await postImpression(req.body);
        res.status(201).json({ success: true, data: post_impression });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function UPDATE_CONTACT_CLICK_FOR_UNKNOWN_CUSTOMER(req, res) {
    try {
        const update_contact_click_for_unknown_customer = await postUpdateContactClickForUnknownCustomer(req.body);
        res.status(201).json({ success: true, data: update_contact_click_for_unknown_customer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
