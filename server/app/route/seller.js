const { 
    express, 
    parser,
    multer,
    path,
    shortId
} = require("../reuseables/modules");
let seller_route = express.Router();  
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
// let storage = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req,file,cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// })

// Configure Cloudinary Storage
let storage = multer.memoryStorage()

// const parser = multer({ storage: storage });


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50 MB
    }
});
 
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


// @@AUTH
const { 
    UpdatePwd, 
    ConfirmEmail, 
    VerifyToken 
} = require("../controller/seller/authentication");
seller_route.post('/seller.comfirm-email', parser, ConfirmEmail);
seller_route.post('/seller.verify-token', parser, VerifyToken);
seller_route.post('/seller.password-update', parser, UpdatePwd);
// @@AUTH


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

 

seller_route.post('/seller.file-delete', parser, (req, res) => {

    let {
        // id,
        type,
        url
    } = req.body;
    console.log(url)

    const cloudinary = require('cloudinary').v2;

    const deleteFileFromCloudinary = async (url, res) => {
        try {
            // Extract publicId from the URL
            const urlParts = url.split('/');
            const fileNameWithExtension = urlParts[urlParts.length - 1];
            const fileName = fileNameWithExtension.split('.')[0]; // remove extension

            // Get folder path if available
            const folderPath = urlParts.slice(urlParts.indexOf('upload') + 1, urlParts.length - 1).join('/');
            const publicId = `${folderPath.split('/')[1]}/${fileName.split('%')[0]}|${folderPath.split('/')[1]}`;
            console.log(publicId)

            // Delete from Cloudinary
            const result = await cloudinary.uploader.destroy(publicId, { timeout: 60000000});

            console.log('File deleted result:', result);

            if (result.result === 'ok' || result.result === 'not found') {
                res.status(200).send({ bool: true, data: result });
            } else {
                res.status(500).send({ bool: false, data: result });
            }

        } catch (error) {
            console.error('Error deleting file:', error);
            res.status(500).send({ bool: false, data: error.message });
        }
    };

    // Example usage
    // deleteFileFromCloudinary('https://res.cloudinary.com/demo/image/upload/v1712345678/product123/my-image.jpg', res);

    deleteFileFromCloudinary(url,res)
});

seller_route.post('/seller.thumbnail-delete', parser, (req, res) => {

    let {
        // id,
        type,
        url
    } = req.body;
    console.log(url)

    const cloudinary = require('cloudinary').v2;

    const deleteFileFromCloudinary = async (url, res) => {
        try {
            // Extract publicId from the URL
            const urlParts = url.split('/');
            const fileNameWithExtension = urlParts[urlParts.length - 1];
            const fileName = fileNameWithExtension.split('.')[0]; // remove extension

            // Get folder path if available
            const folderPath = urlParts.slice(urlParts.indexOf('upload') + 1, urlParts.length - 1).join('/');
            const publicId = `${folderPath.split('/')[1]}/${fileName.split('%')[0]}|${folderPath.split('/')[1]}`;
            console.log(publicId)

            // Delete from Cloudinary
            const result = await cloudinary.uploader.destroy(publicId, { timeout: 60000000 });

            console.log('File deleted result:', result);

            if (result.result === 'ok' || result.result === 'not found') {
                res.status(200).send({ bool: true, data: result });
            } else {
                res.status(500).send({ bool: false, data: result });
            }

        } catch (error) {
            console.error('Error deleting file:', error);
            res.status(500).send({ bool: false, data: error.message });
        }
    };

    // Example usage
    // deleteFileFromCloudinary('https://res.cloudinary.com/demo/image/upload/v1712345678/product123/my-image.jpg', res);

    deleteFileFromCloudinary(url,res)
});


seller_route.get('/seller.listing', GetItems);
seller_route.get('/seller.edited-item', GetEditedItem);
seller_route.get('/seller.product-delete', DeleteItem);  
// @@LISTING


// @@ GET PROFILE
const { 
    UpdateSellerProfile, 
    GetSellerData, 
    GetSellerPhoto,
    GetProfileAnalytics
} = require("../controller/seller/profile");
seller_route.post('/seller.profile-update', parser, UpdateSellerProfile);
seller_route.get('/seller.profile', GetSellerData); 
seller_route.get('/seller.profile-photo', GetSellerPhoto); 
seller_route.get('/seller.profile-analytics', GetProfileAnalytics); 
// @@ GET PROFILE 


// @@ GET ORDERS
const { 
    GetOrders,
    CancelOrder
} = require("../controller/seller/orders");
seller_route.get('/seller.orders', GetOrders); 
seller_route.post('/seller.order-cancellation', parser, CancelOrder); 
// @@ GET ORDERS 


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
    GetShop, 
    UpdateShopName,
    GetShopPayment,
    GetShopShipping,
    GetShopInfo
    // UpdateReturnInfo,
} = require("../controller/seller/shop");
seller_route.get('/seller.shop', GetShop);

seller_route.get('/seller.shop-payment', GetShopPayment);
seller_route.get('/seller.shop-shipping', GetShopShipping);
seller_route.get('/seller.shop-info', GetShopInfo);

seller_route.post('/seller.pay-rent', parser, PayRent);
seller_route.post('/seller.shop-setup', parser, ShopSetup);
seller_route.post('/seller.shopInfo', parser, UpdateShopInfo);
// seller_route.post('/seller.returnInfo', parser, UpdateReturnInfo);
seller_route.post('/seller.shippingInfo', parser, UpdateShippingInfo);
seller_route.post('/seller.paymentInfo', parser, UpdatePaymentInfo);
seller_route.post('/seller.inventory-update', parser, UpdateInventory);
seller_route.post('/seller.shop-name-update', parser, UpdateShopName);
// @@SHOP

module.exports = {seller_route}
