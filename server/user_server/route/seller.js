const { 
    express, 
    parser 
} = require("../reuseables/modules");
let seller_route = express.Router();  


 
seller_route.get('');
seller_route.post(''); 

// @@ SELLER REGISTRATION AND LOGIN
const { 
    register_seller, 
    log_seller_in 
} = require("../controller/seller/registraton_login");
seller_route.post('/seller.registration', parser, register_seller);
seller_route.post('/seller.login', parser, log_seller_in);
// @@ SELLER REGISTRATION AND LOGIN


// @@LISTING
const { 
    UpdateProduct, 
    UploadNewItem, 
    GetItems, 
    GetEditedItem, 
    DeleteItem 
} = require("../controller/seller/listing");
seller_route.post('/seller.product-update', parser, UpdateProduct);
seller_route.post('/seller.product-upload', parser, UploadNewItem);
seller_route.get('/seller.listing', GetItems);
seller_route.get('/seller.edited-item', GetEditedItem);
seller_route.delete('/seller.product-delete', DeleteItem);  
// @@LISTING


// @@ GET PROFILE
const { 
    UpdateSellerProfile, 
    GetSellerData, 
    GetSellerPhoto 
} = require("../controller/seller/profile");
seller_route.post('/seller.profile-update', parser, UpdateSellerProfile);
seller_route.get('/seller.profile', GetSellerData); 
seller_route.get('/seller.profile-photo', GetSellerPhoto); 
// @@ GET PROFILE



// @@AUTH
const { 
    UpdatePwd 
} = require("../controller/seller/authentication");
seller_route.post('/seller.password-update', parser, UpdatePwd);
// @@AUTH


// @@REVIEWS
const { 
    GetReviews 
} = require("../controller/seller/reviews");
seller_route.get('/seller.reviews', GetReviews);
// @@REVIEWS


// @@MIDDLEWARE
const { 
    SellerAuth 
} = require("../middleware/seller");
seller_route.get('/seller.authentication', SellerAuth);
// @@MIDDLEWARE



// @@SHOP
const { 
    UpdateInventory, 
    UpdatePaymentInfo, 
    UpdateShippingInfo, 
    UpdateShopInfo, 
    ShopSetup, 
    PayRent, 
    GetShop 
} = require("../controller/seller/shop");
seller_route.get('/seller.shop', GetShop);
seller_route.post('/seller.pay-rent', parser, PayRent);
seller_route.post('/seller.shop-setup', parser, ShopSetup);
seller_route.post('/seller.shopInfo', parser, UpdateShopInfo);
seller_route.post('/seller.shippingInfo', parser, UpdateShippingInfo);
seller_route.post('/seller.paymentInfo', parser, UpdatePaymentInfo);
seller_route.post('/seller.inventory-update', parser, UpdateInventory);
// @@SHOP

module.exports = {seller_route}
