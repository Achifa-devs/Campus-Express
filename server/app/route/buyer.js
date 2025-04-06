
const { unsave_item } = require("../controller/buyer/delete");
const {
    get_buyer,
    get_shop_items,
    get_lodges,
    get_item,
    get_item_thumbnail,
    get_thumbnail, 
    get_saved_item_data,
    get_saved_item,
    get_search_word,
    get_shop_items_via_condition,
    get_orders,
    get_inbox,
    get_order,
    get_address_book,
    get_refunds,
    get_refund
} = require("../controller/buyer/get");
const { 
    filter_items, 
    save_item, 
    reset_pwd, 
    add_new_referral, 
    create_order,
    cancel_order,
    remove_order,
    confirm_order,
    create_refund,
    cancel_refund,
    remove_refund,
    confirm_refund,
    update_id_for_unknown_buyer
} = require("../controller/buyer/post");
const { 
    register_buyer, 
    log_buyer_in 
} = require("../controller/buyer/registraton_login");
const { 
    update_pwd, 
    update_view, 
    update_pickup_channel,
    update_order,
    update_email,
    update_phone,
    update_profile,
    alter_pwd
} = require("../controller/buyer/update");
const { BuyerAuth } = require("../middleware/buyer");
const { 
    express, 
    parser
 } = require("../reuseables/modules");

let buyer_route = express.Router();  


// buyer_route.get('');
// buyer_route.post('');


buyer_route.post('/registration', parser, register_buyer);
buyer_route.post('/login', parser, log_buyer_in);
buyer_route.get('/authentication', BuyerAuth);
buyer_route.post('/filter', parser, filter_items);

buyer_route.get('/buyer', get_buyer);
buyer_route.get('/', get_shop_items);
buyer_route.get('/filtered-ads', get_shop_items_via_condition);
buyer_route.get('/search-word', get_search_word);

buyer_route.get('/lodges', get_lodges);
buyer_route.get('/product', get_item);
buyer_route.get('/product-images', get_item_thumbnail);
buyer_route.get('/thumbnail', get_thumbnail);

buyer_route.get('/saved-items-data', get_saved_item_data);
buyer_route.get('/saved-items', get_saved_item);
buyer_route.post('/save-item', parser, save_item);

buyer_route.delete('/unsave-item', unsave_item);
 
buyer_route.post('/password-update', parser, update_pwd);
buyer_route.post('/password-alter', parser, alter_pwd);
buyer_route.post('/password-reset', parser, reset_pwd);
// buyer_route.post('/password-token-check', parser, CheckPwdResetToken);

// buyer_route.post('/email-validation', parser, ValidateEmail);
// buyer_route.post("/send-mail", parser, sendAdsCampaigne);

buyer_route.post('/new-view', parser, update_view);
buyer_route.get('/update-unknown-buyer-in-views', parser, update_id_for_unknown_buyer);
buyer_route.post('/new-visitor', parser, add_new_referral);
buyer_route.post('/update-order', parser, update_order);


buyer_route.post('/email-update', parser, update_email);
buyer_route.post('/phone-update', parser, update_phone);
buyer_route.post('/profile-update', parser, update_profile);


// buyer_route.post('/add-cart', parser, add_item_to_cart);
// buyer_route.get('/cart', get_carts);
// buyer_route.get('/cart-items', get_carts);
// buyer_route.delete('/delete-cart', delete_item_from_cart);
// buyer_route.post('/update-cart-unit', parser, update_cart);

buyer_route.get('/inbox', get_inbox);

buyer_route.post('/create-order', parser, create_order);
buyer_route.post('/cancel-order', parser, cancel_order);
buyer_route.post('/remove-order', parser, remove_order);
buyer_route.post('/confirm-order', parser, confirm_order);
buyer_route.get('/orders', get_orders);
buyer_route.get('/order', get_order);

buyer_route.get('/get-addresses', get_address_book);



buyer_route.post('/create-refund', parser, create_refund);
buyer_route.post('/cancel-refund', parser, cancel_refund);
buyer_route.post('/remove-refund', parser, remove_refund);
buyer_route.post('/confirm-refund', parser, confirm_refund);
buyer_route.get('/refunds', get_refunds);
buyer_route.get('/refund', get_refund);


// buyer_route.get('/get-chat', get_chat);
// buyer_route.post('/new-chat', parser, upload_chat);




module.exports = {buyer_route} 