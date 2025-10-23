const express = require('express');
const refundRouter = express.Router();


// HANDLES CUSTOMER REFUND REQ --- ##NOT IMPLEMENTED##
refundRouter.get('/refund', () => '');
refundRouter.get('/refunds', () => '');
refundRouter.post('/refund/create', parser, () => '');
refundRouter.post('/refund/cancel', parser, () => '');
refundRouter.post('/refund/remove', parser, () => '');
refundRouter.post('/refund/confirm', parser, () => '');


module.exports = refundRouter;

