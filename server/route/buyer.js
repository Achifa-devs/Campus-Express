
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
    get_order
} = require("../controller/buyer/get");
const { 
    filter_items, 
    save_item, 
    reset_pwd, 
    add_new_referral, 
    create_order
} = require("../controller/buyer/post");
const { 
    register_buyer, 
    log_buyer_in 
} = require("../controller/buyer/registraton_login");
const { 
    update_pwd, 
    update_view 
} = require("../controller/buyer/update");
const { 
    express, 
    parser
 } = require("../modules");

let buyer_route = express.Router();  


// buyer_route.get('');
// buyer_route.post('');


buyer_route.post('/registration', parser, register_buyer);
buyer_route.post('/login', parser, log_buyer_in);
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
buyer_route.post('/password-reset', parser, reset_pwd);
// buyer_route.post('/password-token-check', parser, CheckPwdResetToken);

// buyer_route.post('/email-validation', parser, ValidateEmail);
// buyer_route.post("/send-mail", parser, sendAdsCampaigne);

buyer_route.post('/new-view', parser, update_view);
buyer_route.post('/new-visitor', parser, add_new_referral);


// buyer_route.post('/add-cart', parser, add_item_to_cart);
// buyer_route.get('/cart', get_carts);
// buyer_route.get('/cart-items', get_carts);
// buyer_route.delete('/delete-cart', delete_item_from_cart);
// buyer_route.post('/update-cart-unit', parser, update_cart);


buyer_route.post('/create-order', parser, create_order);
buyer_route.get('/orders', get_orders);
buyer_route.get('/order', get_order);

// buyer_route.get('/get-chat-rooms', get_chat_rooms);
// buyer_route.get('/get-chat', get_chat);
// buyer_route.post('/new-chat', parser, upload_chat);




module.exports = {buyer_route} 