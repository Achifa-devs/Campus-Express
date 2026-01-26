const express = require('express');
const { handleWebhook } = require('../controllers/paymentController');
const router = express.Router();

// Simple health check for Paystack webhooks
router.get('/', (_req, res) => res.status(200).json({ ok: true, route: '/payment' }));
router.get('/health', (_req, res) => res.status(200).json({ ok: true, route: '/payment/health' }));

// Webhook endpoint
router.post('/', handleWebhook);

module.exports = router;
