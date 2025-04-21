
import {
    getProduct, 
    getProducts, 
    getProductThumbnail, 
    postDeleteProduct, 
    postProduct, 
    postUpdateProduct
} from "../../services/vendor/product.js";

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
        const products = await getProducts(req.query);
        res.status(201).json({ success: true, data: products });
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

export async function CREATE_PRODUCT(req, res) {
    try {
        const post_product = await postProduct(req.body);
        res.status(201).json({ success: true, data: post_product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function UPDATE_PRODUCT(req, res) {
    try {
        const update_product = await postUpdateProduct(req.body);
        res.status(201).json({ success: true, data: update_product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function DELETE_PRODUCT(req, res) {
    try {
        const delete_product = await postDeleteProduct(req.body);
        res.status(201).json({ success: true, data: delete_product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
