const express = require('express');
const { 
    getProductHandler, 
    getProductsHandler, 
    getProductTypeHandler, 
    getProductSearchQueryHandler 
} = require('../controllers/products');
const productRouter = express.Router();

productRouter.get('/product', getProductHandler);
productRouter.get('/products', getProductsHandler);
productRouter.get('/product/type', getProductTypeHandler);
productRouter.get('/product/search', getProductSearchQueryHandler);

module.exports = productRouter;