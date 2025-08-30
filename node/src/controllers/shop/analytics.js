
import { postContactClick, postUpdateContactClickForUnknownCustomer } from "../../services/shop/analytics.js";
import {
    getProduct, 
    getProducts, 
    getProductThumbnail, 
    getProductType, 
    getSearch, 
    postProductView, 
    postUpdateProductViewForUnknownCustomer
} from "../../services/shop/product.js";

export async function GET_PRODUCT(req, res) {
    
    try {
        const product = await getProduct(req.query);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function GET_PRODUCTS(req, res) {
    try {
        const products = await getProducts({...req.query, gender: req.headers.gender});
        res.status(201).json({ success: true, data: products });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function GET_PRODUCTS_TYPE(req, res) {
    try {
        const products = await getProductType(req.query);
        res.status(201).json({ success: true, data: products });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function GET_SEARCH(req, res) {
    try {
        const search_response = await getSearch(req.query);
        res.status(201).json({ success: true, data: search_response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function GET_PRODUCT_THUMBNAIL(req, res) {
    try {
        const productThumbnail = await getProductThumbnail(req.query);
        res.status(201).json({ success: true, data: productThumbnail });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// 
// 
// 

export async function POST_CONTACT_CLICK(req, res) {
    try {
        const post_contact_click = await postContactClick(req.body);
        res.status(201).json({ success: true, data: post_contact_click });
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
