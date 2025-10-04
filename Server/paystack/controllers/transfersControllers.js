const { Transfer } = require("../utils/common");

function handleTransferWebhook (req, res) {
    // Handle the transfer webhook event
    console.log('Transfer webhook received:', parameters);
   
    const {
        bank_name, account_number, account_name, bank_code
    } = req.body.bank
    const {
        first_name, last_name, email, phone
    } = req.body.user
    const {
        reason, amount, recipient, status
    } = req.body.source



    Transfer.createRecipient(account_name, account_number, bank_code);
    Transfer.initiateTransfer(amount, recipient, reason, reference);

}