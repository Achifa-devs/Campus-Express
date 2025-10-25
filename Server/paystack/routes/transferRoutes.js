const express = require('express');
const { handleTransferWebhook, handleTransferConfirmation } = require('../controllers/transfersControllers');
const parser = require('body-parser').json({
    limit: "1024mb"
})
const router = express.Router();

// Webhook endpoint
router.post('/transfer', parser, handleTransferWebhook);
router.post('/transfer/confirmation', parser, handleTransferConfirmation);


module.exports = router;