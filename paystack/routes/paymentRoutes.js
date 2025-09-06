const express = require('express');
const { handleWebhook } = require('../controllers/paymentController');

const router = express.Router();

// Webhook endpoint
router.post('/payment', handleWebhook);

module.exports = router;