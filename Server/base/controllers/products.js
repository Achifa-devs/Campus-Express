const { 
    getProduct, 
    getProducts, 
    getProductType, 
    getProductSearchQuery 
} = require("../services/product");

exports.getProductHandler =  async function (req, res) {
    try {
        const respomse = await getProduct(req.query);
        res.status(201).json({ success: true, data: respomse });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.getProductsHandler =  async function (req, res) {
    try {
        const respomse = await getProducts(req.body);
        res.status(201).json({ success: true, data: respomse });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.getProductTypeHandler =  async function (req, res) {
    try {
        const response = await getProductType(req.body);
        res.status(201).json({ success: true, data: response});
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.getProductSearchQueryHandler =  async function (req, res) {
    try {
        const response = await getProductSearchQuery(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

