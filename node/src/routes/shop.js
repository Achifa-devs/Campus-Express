import {
    GET_CUSTOMER, 
    REGISTER_CUSTOMER, 
    LOGIN_CUSTOMER, 
    RESET_CUSTOMER_EMAIL, 
    RESET_CUSTOMER_PHONE, 
    UPDATE_CUSTOMER_PROFILE,
    RESET_PWD,
    CONFIRM_EMAIL,
    VERIFY_TOKEN,
    ALTER_PWD
} from "../controllers/shop/customer.js"
import {
    GET_FAVOURITE, 
    GET_FAVOURITES, 
    POST_FAVOURITE, 
    DELETE_FAVOURITE
} from "../controllers/shop/favourite.js"
import {
    GET_ORDER,
    GET_ORDERS,
    POST_NEW_ORDER,
    CANCEL_ORDER,
    REMOVE_ORDER,
    CONFIRM_ORDER,
    UPDATE_ORDER
} from "../controllers/shop/order.js"
import {
    GET_PRODUCT, 
    GET_PRODUCTS, 
    GET_PRODUCTS_TYPE, 
    GET_PRODUCT_THUMBNAIL, 
    GET_SEARCH, 
    POST_PRODUCT_VIEW, 
    UPDATE_PRODUCT_VIEW_FOR_UNKNOWN_CUSTOMER
} from "../controllers/shop/product.js"
import {
    GET_REFUND, 
    GET_REFUNDS, 
    CREATE_REFUND, 
    CANCEL_REFUND, 
    REMOVE_REFUND, 
    CONFIRM_REFUND
} from "../controllers/shop/refund.js"
import {
    GET_SHOP_OWNER,
    GET_SHOP_REVIEWS,
    GET_SHOP_DETAILS,
    GET_SHOP_CONTENT,
    POST_NEW_SHOP_REVIEW,
    // POST_NEW_SHOP_VISIT
} from "../controllers/shop/shop.js"

import express from "express";
import {
    parser
} from "../utils/parser.js"
import { POST_CONTACT_CLICK } from "../controllers/shop/analytics.js"
export const CUSTOMER_ROUTE = express.Router()

// HANDLES SHOP REQ --- ##NOT IMPLEMENTED##
CUSTOMER_ROUTE.get('/owner', GET_SHOP_OWNER)
CUSTOMER_ROUTE.get('/reviews', GET_SHOP_REVIEWS)
CUSTOMER_ROUTE.get('/details', GET_SHOP_DETAILS)
CUSTOMER_ROUTE.get('/content', GET_SHOP_CONTENT)
CUSTOMER_ROUTE.post('/review', parser, POST_NEW_SHOP_REVIEW)
CUSTOMER_ROUTE.post('/comfirm-email', parser, CONFIRM_EMAIL)
CUSTOMER_ROUTE.post('/verify-token', parser, VERIFY_TOKEN)
// VENDOR_ROUTE.post('/vendor/verify-token',)
// CUSTOMER_ROUTE.post('/visit', parser, POST_NEW_SHOP_VISIT)

// HANDLES CUSTOMER DATA && AUTH REQ ---
CUSTOMER_ROUTE.get('/customer', GET_CUSTOMER)
CUSTOMER_ROUTE.post('/registration', parser, REGISTER_CUSTOMER)
CUSTOMER_ROUTE.post('/login', parser, LOGIN_CUSTOMER)
CUSTOMER_ROUTE.post('/email-update', parser, RESET_CUSTOMER_EMAIL)
CUSTOMER_ROUTE.post('/phone-update', parser, RESET_CUSTOMER_PHONE)
CUSTOMER_ROUTE.post('/profile-update', parser, UPDATE_CUSTOMER_PROFILE)
// HANDLES CUSTOMER PASSWORD RESET REQ
CUSTOMER_ROUTE.post('/alter-password', parser, ALTER_PWD);
CUSTOMER_ROUTE.post('/reset-password', parser, RESET_PWD);

// buyer_route.post('/new-visitor', parser, add_new_referral);

// HANDLES CUSTOMER ORDER REQ --- ##NOT IMPLEMENTED##
CUSTOMER_ROUTE.get('/order', GET_ORDER)
CUSTOMER_ROUTE.get('/orders', GET_ORDERS)
CUSTOMER_ROUTE.post('/new-order', parser, POST_NEW_ORDER)
CUSTOMER_ROUTE.post('/cancel-order', parser, CANCEL_ORDER)
CUSTOMER_ROUTE.post('/remove-order', parser, REMOVE_ORDER)
CUSTOMER_ROUTE.post('/confirm-order', parser, CONFIRM_ORDER)
CUSTOMER_ROUTE.post('/update-order', parser, UPDATE_ORDER)


// HANDLES CUSTOMER REFUND REQ --- ##NOT IMPLEMENTED##
CUSTOMER_ROUTE.get('/refund', GET_REFUND);
CUSTOMER_ROUTE.get('/refunds', GET_REFUNDS);
CUSTOMER_ROUTE.post('/new-refund', parser, CREATE_REFUND);
CUSTOMER_ROUTE.post('/cancel-refund', parser, CANCEL_REFUND);
CUSTOMER_ROUTE.post('/remove-refund', parser, REMOVE_REFUND);
CUSTOMER_ROUTE.post('/confirm-refund', parser, CONFIRM_REFUND);


// HANDLES REQ ON HOW CUSTOMER VIEW PRODUCTS ---
CUSTOMER_ROUTE.get('/product', GET_PRODUCT);
CUSTOMER_ROUTE.get('/products', GET_PRODUCTS);
CUSTOMER_ROUTE.get('/products-type', GET_PRODUCTS_TYPE);
CUSTOMER_ROUTE.get('/search', GET_SEARCH);
CUSTOMER_ROUTE.get('/product-thumbnail', parser, GET_PRODUCT_THUMBNAIL);
CUSTOMER_ROUTE.post('/product-view', parser, POST_PRODUCT_VIEW);
CUSTOMER_ROUTE.post('/product-view-unknown-buyer-update', parser, UPDATE_PRODUCT_VIEW_FOR_UNKNOWN_CUSTOMER);


// HANDLES CUSTOMER FAVOURITE REQ
CUSTOMER_ROUTE.get('/favourite', GET_FAVOURITE);
CUSTOMER_ROUTE.get('/favourites', GET_FAVOURITES);
CUSTOMER_ROUTE.post('/favourite', POST_FAVOURITE);
CUSTOMER_ROUTE.delete('/favourite', DELETE_FAVOURITE);


// HANDLES CUSTOMER REACTIONS
CUSTOMER_ROUTE.post('/contact-click', parser, POST_CONTACT_CLICK);
