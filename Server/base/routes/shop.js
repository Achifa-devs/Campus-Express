const express = require('express');
const shopRouter = express.Router();
const parser = require('body-parser').json({ limit: '1024mb' });
const getShopHandler = require('../controllers/shop')

const getShopReviewsHandler = require('../controllers/shop')
const createShopHandler = require('../controllers/shop')
const updateShopHandler = require('../controllers/shop')
const getProductHandler = require('../controllers/shop')
const getProductsHandler = require('../controllers/shop')
const getProductThumbnailHandler = require('../controllers/shop')
const createProductHandler = require('../controllers/shop')
const updateProductHandler = require('../controllers/shop')
const deleteProductHandler = require('../controllers/shop')


shopRouter.get('/shop', getShopHandler)
shopRouter.get('/shop/reviews', getShopReviewsHandler)

shopRouter.post('/shop/create', parser, createShopHandler)
shopRouter.post('/shop/update', parser, updateShopHandler)
// shopRouter.post('/shop/delete', parser, () => '')

shopRouter.get('/shop/product', getProductHandler)
shopRouter.get('/shop/products', getProductsHandler)
shopRouter.get('/shop/product/thumbnail', getProductThumbnailHandler);

shopRouter.post('/shop/product/create', parser, createProductHandler)
shopRouter.post('/shop/product/update', parser, updateProductHandler)
shopRouter.get('/shop/product/delete', deleteProductHandler)

module.exports = shopRouter;