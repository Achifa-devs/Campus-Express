const express = require('express');
const generalRouter = express.Router();


generalRouter.get('/version/check', )
generalRouter.get('/media/folder', )/** /image-folder */
generalRouter.get('/analytics/metrics', ) /** /boosted-metrics */
generalRouter.get('/plans', )
generalRouter.get('/sponsorship', )
generalRouter.get('/promo', )
generalRouter.get('/subscription', )
generalRouter.get('/packages', )

generalRouter.post('/firebase/notification', parser, ) /** n/otify */
generalRouter.post('/firebase/update', parser, ) /** /update-fcm */
generalRouter.post('/upload/media', parser, ) /** upload file to cloudinary */
generalRouter.post('/delete/media', parser, ) /** delete file from cloudinary */

