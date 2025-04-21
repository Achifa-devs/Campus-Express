import {
    getShopContent, 
    getShopDetails, 
    getShopOwner, 
    getShopReviews, 
    postShopReview, 
    // postShopVisit
} from "../../services/shop/shop.js";
import { postNewShop } from "../../services/vendor/shop.js";

export async function GET_SHOP_REVIEWS(req, res) {
    try {
        const shop_reviews = await getShopReviews(req.query);
        console.log(shop_reviews)

        res.status(201).json({ success: true, data: shop_reviews });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function GET_SHOP_DETAILS(req, res) {
    try {
        const shop_details = await getShopDetails(req.query);
        res.status(201).json({ success: true, data: shop_details });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function CREATE_SHOP(req, res) {
    try {
        const shop_review = await postNewShop(req.body);
        res.status(201).json({ success: true, data: shop_review });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// export async function UPDATE_SHOP(req, res) {
//     try {
//         const shop_review = await postUpdateShop(req.body);
//         res.status(201).json({ success: true, data: shop_review });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// }
