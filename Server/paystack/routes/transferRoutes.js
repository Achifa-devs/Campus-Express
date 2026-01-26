const express = require('express');
const { handleTransferWebhook, handleTransferConfirmation } = require('../controllers/transfersControllers');
const router = express.Router();

router.post('/', handleTransferWebhook);
router.post('/confirmation', handleTransferConfirmation);

module.exports = router;
