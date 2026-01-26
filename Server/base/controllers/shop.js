const { 
    getShop,
    getShopReviews,
    createShop,
    updateShop,
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getShopAnalytics,
    updateShopPayment,
} = require('../services/shop')

exports.getShopHandler =  async function (req, res) {
    try {
        const respomse = await getShop(req.query);
        res.status(201).json({ success: true, data: respomse });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.getShopReviewsHandler =  async function (req, res) {
    try {
        const respomse = await getShopReviews(req.query);
        res.status(201).json({ success: true, data: respomse });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}



// exports. =  async function GET_SHOP_DETAILS(req, res) {
//     try {
//         const shop_details = await getShopDetails(req.query);
//         res.status(201).json({ success: true, data: shop_details });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// }

exports.createShopHandler =  async function (req, res) {
    try {
        const response = await createShop(req.body);
        res.status(201).json({ success: true, data: response});
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.updateShopHandler =  async function (req, res) {
    try {
        const response = await updateShop(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.updateShopPaymentHandler =  async function (req, res) {
    try {
        const response = await updateShopPayment(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.getProductHandler =  async function (req, res) {
    
    try {
        const response = await getProduct(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.getProductsHandler =  async function (req, res) {
    try {
        const response = await getProducts(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.getShopAnalyticsHandler =  async function (req, res) {
    try {
        const response = await getShopAnalytics(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.createProductHandler =  async function (req, res) {
    try {
        const response = await createProduct(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.updateProductHandler =  async function (req, res) {
    try {
        const response = await updateProduct(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.deleteProductHandler =  async function (req, res) {
    try {
        const response = await deleteProduct(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

