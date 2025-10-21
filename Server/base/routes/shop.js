const express = require('express');
const shopRouter = express.Router();
const parser = require('body-parser').json({ limit: '1024mb' });
const {
   getShopHandler,
   getShopReviewsHandler,
   createShopHandler,
   updateShopHandler,
   getProductHandler,
   getProductsHandler,
   createProductHandler,
   updateProductHandler,
   deleteProductHandler,
   getShopAnalyticsHandler,
 }  = require('../controllers/shop')

shopRouter.get('/shop', getShopHandler)
shopRouter.get('/shop/reviews', getShopReviewsHandler)
shopRouter.get('/shop/analytics', getShopAnalyticsHandler)

shopRouter.post('/shop/create', parser, createShopHandler)
shopRouter.post('/shop/update', parser, updateShopHandler)
// shopRouter.post('/shop/delete', parser, () => '')

shopRouter.get('/shop/product', getProductHandler)
shopRouter.get('/shop/products', getProductsHandler)

shopRouter.post('/shop/product/create', parser, createProductHandler)
shopRouter.post('/shop/product/update', parser, updateProductHandler)
shopRouter.get('/shop/product/delete', deleteProductHandler)

module.exports = shopRouter;