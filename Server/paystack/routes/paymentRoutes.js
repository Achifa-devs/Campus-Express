const express = require('express');
const { handleWebhook } = require('../controllers/paymentController');

const router = express.Router();

// Health checks to verify Vercel deployment is responding
router.get('/', (_req, res) => res.status(200).json({ ok: true, service: 'paystack', route: '/' }));
router.get('/health', (_req, res) => res.status(200).json({ ok: true, service: 'paystack', route: '/health' }));

// Webhook endpoint
router.post('/payment', handleWebhook);

module.exports = router;