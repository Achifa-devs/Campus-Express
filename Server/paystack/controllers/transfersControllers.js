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

exports.handleTransferConfirmation = function (req, res) {
    const {
        data
    } = req.body;
    console.log(data)

    const response = Transact.updateTransferStatus({
        status: data.data.status,
        ref: data.data.reference
    })

    res.status(200).send({
        data: response,
        success: true
    })
}


{
  integration: 1247127,
  domain: 'live',
  user: null,
  source_ip: '102.90.101.75',
  details: {
    headers: {
      'x-forwarded-for': '102.90.101.75, 141.101.99.135, 172.31.62.52',
      'x-forwarded-proto': 'https',
      'x-forwarded-port': '443',
      'x-pstk-authorizer-headers': '{}',
      tag: '6dbbc179-8a7d-4c95-8512-ead427ec8ea0',
      'accept-encoding': 'gzip',
      'content-type': 'application/json',
      'x-geo-city': 'Port Harcourt',
      'x-geo-region': 'Rivers State',
      'user-agent': 'AmazonAPIGateway_7m0e2gppol'
    },
    body: {
      source: 'balance',
      reason: 'Deal sealed',
      amount: 20000,
      recipient: 'RCP_0yfujp98mi4u1td',
      reference: 'campus_sphere4e8ff6-MH6EI4MP-OONJA3'
    },
    query: {},
    endpoint: '/transfer'
  },
  transfers: [
    {
      amount: 20000,
      createdAt: '2025-10-25T14:54:39.000Z',
      currency: 'NGN',
      domain: 'live',
      failures: null,
      id: 904737672,
      integration: 1247127,
      reason: 'Deal sealed',
      reference: 'campus_sphere4e8ff6-MH6EI4MP-OONJA3',
      source: 'balance',
      source_details: null,
      status: 'received',
      titan_code: null,
      transfer_code: 'TRF_evgv7lz3majwgws9',
      transferred_at: null,
      updatedAt: '2025-10-25T14:54:39.000Z',
      recipient: [Object]
    }
  ]
}