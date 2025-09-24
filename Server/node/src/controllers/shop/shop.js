import {
    getShopContent, 
    getShopDetails, 
    getShopOwner, 
    getShopReviews, 
    postShopReview, 
    // postShopVisit
} from "../../services/shop/shop.js";

export async function GET_SHOP_OWNER(req, res) {
    
    try {
        const shop_owner = await getShopOwner(req.query);
        res.status(201).json({ success: true, data: shop_owner });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

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

export async function GET_SHOP_CONTENT(req, res) {
    try {
        const shop_content = await getShopContent(req.query);
        res.status(201).json({ success: true, data: shop_content });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function POST_NEW_SHOP_REVIEW(req, res) {
    try {
        const shop_review = await postShopReview(req.body);
        res.status(201).json({ success: true, data: shop_review });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// export async function POST_NEW_SHOP_VISIT(req, res) {
//     try {
//         const shop_visit = await postShopVisit(req.body);
//         res.status(201).json({ success: true, data: shop_visit });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// }