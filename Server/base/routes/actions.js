const express = require('express');
const { 
    getShopDetailsHandler, 
    getShopOwnerhandler, 
    getShopContentHandler, 
    getShopReviewHandler, 
    createShopReviewhandler, 
    getFavouriteHandler, 
    getFavouritesHandler, 
    createFavouriteHandler, 
    deleteFavourite, 
    createShopViewHandler, 
    createShareHander, 
    createImpressionHandler 
} = require('../controllers/action');
const actionRouter = express.Router();

// HANDLES SHOP REQ --- ##NOT IMPLEMENTED##
actionRouter.get('/action/shop', getShopDetailsHandler) 
actionRouter.get('/action/shop/owner', getShopOwnerhandler) 
actionRouter.get('/action/shop/content', getShopContentHandler) 
actionRouter.get('/action/reviews', getShopReviewHandler)
actionRouter.post('/action/review', parser, createShopReviewhandler)

// HANDLES CUSTOMER FAVOURITE REQ
actionRouter.get('/action/favourite', getFavouriteHandler);
actionRouter.get('/action/favourites', getFavouritesHandler);
actionRouter.post('/action/favourite', createFavouriteHandler);
actionRouter.delete('/action/favourite', deleteFavourite);

// HANDLES CUSTOMER REACTIONS
actionRouter.post('/action/shop/view', parser, createShopViewHandler);
actionRouter.post('/action/share', parser, createShareHander);
// actionRouter.post('/action/report', parser, create);
actionRouter.post('/action/impression', parser, createImpressionHandler);

module.exports = actionRouter;
