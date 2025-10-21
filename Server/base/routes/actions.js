const express = require('express');
const actionRouter = express.Router();



// HANDLES SHOP REQ --- ##NOT IMPLEMENTED##
actionRouter.get('/action/shop', ) /** Get shop owner - shop details and shop content */
actionRouter.get('/action/reviews', )
actionRouter.post('/action/review', parser, )

actionRouter.get('/action/product', );
actionRouter.get('/action/trends', );
actionRouter.get('/action/products-type', );
actionRouter.get('/action/search', );
actionRouter.get('/action/product/thumbnail', parser, );
actionRouter.post('/action/product/view', parser, );

// HANDLES CUSTOMER FAVOURITE REQ
actionRouter.get('/action/favourite', );
actionRouter.get('/action/favourites', );
actionRouter.post('/action/favourite', );
actionRouter.delete('/action/favourite', );


// HANDLES CUSTOMER REACTIONS
actionRouter.post('/action/shop/view', parser, POST_SHOP_VIEW);
actionRouter.post('/action/share', parser, POST_SHARE);
actionRouter.post('/action/report', parser, POST_SHARE);
actionRouter.post('/action/impression', parser, POST_IMPRESSION);
