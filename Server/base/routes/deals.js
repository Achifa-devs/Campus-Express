const express = require('express');
const { getDealsHandler, getDealHandler, createDealHandler, updateDealHandler } = require('../controllers/deals');
const dealRouter = express.Router();
const parser = require('body-parser').json({ limit: '1024mb' });


dealRouter.get('/deal', getDealHandler)
dealRouter.get('/deals', getDealsHandler)
// dealRouter.post('/deal/create', parser, createDealHandler)
// dealRouter.post('/deal/cancel', parser, () => '')
// dealRouter.post('/deal/confirm', parser, () => '')
// dealRouter.post('/deal/update', parser, updateDealHandler)

module.exports = dealRouter;
