const Payment = require("../models/payment");
const Transact = require("../models/transfer");
const Transfer = require("../utils/common");

exports.handleTransferWebhook = async function (req, res) {
    // Handle the transfer webhook event

    const {
        user_id,
        amount,
        account_number,
        account_name,
        bank_code,
        reason
    } = req.body;

    console.log(req.body)
   
    // const {
    //     bank_name, account_number, account_name, bank_code
    // } = req.body.bank
    // const {
    //     first_name, last_name, email, phone
    // } = req.body.user
    // const {
    //     reason, amount, recipient, status
    // } = req.body.source

    const reference = Transfer.generateRefId(`campus_sphere${user_id.split('-')[1]}`)

    let {
        data
    } = await Transfer.createRecipient(account_name, account_number, bank_code);
    let {
        recipient_code,
        createdAt
    } = data;
    
    let payment_res = await Transact.createTransfer({
        ref: reference,
        status: 'queued',
        created_at: createdAt,
        updated_at: createdAt,
        amount: amount,
        user_id, user_id
    })
    if(!payment_res)return;
    const result = await Transfer.initiateTransfer(amount*100, recipient_code, reason, reference);

    res.status(201).json({
        data: result,
        success: true
    })
}

exports.handleTransferConfirmation = async function (req, res) {
    const {
        data
    } = req.body;
    console.log(
        data.status,
        data.reference,
        data.createdAt
    )

    const response = await Transact.updateTransferStatus({
        status: data.status,
        ref: data.reference,
        date: data.createdAt
    })

    res.status(200).send({
        data: response,
        success: true
    })
}

