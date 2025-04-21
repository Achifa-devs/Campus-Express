import express from "express";
import {
    parser
} from "../utils/parser.js"
import {
    GET_VENDOR, 
    LOGIN_VENDOR, 
    REGISTER_VENDOR, 
    RESET_PWD, 
    RESET_VENDOR_EMAIL, 
    RESET_VENDOR_PHONE, 
    UPDATE_VENDOR_PROFILE
} from "../controllers/vendor/vendor.js";
import {
    CREATE_PRODUCT, 
    DELETE_PRODUCT, 
    GET_PRODUCT, 
    GET_PRODUCT_THUMBNAIL, 
    GET_PRODUCTS, 
    UPDATE_PRODUCT
} from "../controllers/vendor/product.js";
import {
    CANCEL_ORDER, 
    GET_ORDER, 
    GET_ORDERS
} from "../controllers/vendor/order.js";
import {
    CREATE_SHOP,
    GET_SHOP_DETAILS,
    GET_SHOP_REVIEWS,
    // UPDATE_SHOP
} from "../controllers/vendor/shop.js";

export const VENDOR_ROUTE = express.Router()


VENDOR_ROUTE.get('/vendor', GET_VENDOR)
VENDOR_ROUTE.post('/vendor/registration', parser, REGISTER_VENDOR)
VENDOR_ROUTE.post('/vendor/login', parser, LOGIN_VENDOR)
VENDOR_ROUTE.post('/vendor/email-update', parser, RESET_VENDOR_EMAIL )
VENDOR_ROUTE.post('/vendor/phone-update', parser, RESET_VENDOR_PHONE)
VENDOR_ROUTE.post('/vendor/profile-update', parser, UPDATE_VENDOR_PROFILE)
VENDOR_ROUTE.post('/vendor/reset-password', parser, RESET_PWD)

// VENDOR_ROUTE.post('/vendor/confirm-email',)
// VENDOR_ROUTE.post('/vendor/verify-token',)


VENDOR_ROUTE.get('/vendor/product', GET_PRODUCT)
VENDOR_ROUTE.get('/vendor/products', GET_PRODUCTS)
VENDOR_ROUTE.get('/vendor/product-thumbnail', GET_PRODUCT_THUMBNAIL);
VENDOR_ROUTE.post('/vendor/create-product', parser, CREATE_PRODUCT)
VENDOR_ROUTE.post('/vendor/update-product', parser, UPDATE_PRODUCT)
VENDOR_ROUTE.post('/vendor/delete-product', parser, DELETE_PRODUCT)

VENDOR_ROUTE.get('/vendor/shop', GET_SHOP_DETAILS)
VENDOR_ROUTE.get('/vendor/shop-reviews', GET_SHOP_REVIEWS)
VENDOR_ROUTE.post('/vendor/create-shop', parser, CREATE_SHOP)
// VENDOR_ROUTE.post('/vendor/update-shop', parser, UPDATE_SHOP)
// VENDOR_ROUTE.post('/vendor/delete-shop',)



VENDOR_ROUTE.get('/vendor/order', GET_ORDER)
VENDOR_ROUTE.get('/vendor/orders', GET_ORDERS)
VENDOR_ROUTE.post('/vendor/cancel-order', parser, parser, CANCEL_ORDER)






