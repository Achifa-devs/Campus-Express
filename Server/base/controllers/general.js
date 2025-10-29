const { 
    checkVersion, 
    updateFirebaseToken, 
    sendFirebaseNotification, 
    getMediaFolderFromCloudinary, 
    uploadMediaToCloudinary, 
    deleteMediaFromCloudinary, 
    checkVendorPromo
} = require("../services/general");
const Flutterwave = require('flutterwave-node-v3');
require("dotenv").config();

exports.bankVerification = async function (req, res) {
    let {
        account_number,
        bank_code
    } = req.body;
    console.log(account_number, bank_code)
    const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
    const data = {account_number: account_number,account_bank: bank_code};

    flw.Misc.verify_Account(data)
    .then((data) => {
        console.log(data)
        if(data.status === 'success'){
            res.status(201).send({ success: true, data: result.data })
        }else{
            res.status(503).send({ success: false, data: null})
        }
    })
    .catch(err => {
        res.status(400).json({ success: false, message: err.message });
        console.log(err)
    });

}

exports.checkVersionHandler =  async function (req, res) {
    try {
        const respomse = await checkVersion(req.query);
        res.status(201).json({ success: true, data: respomse });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.checkVendorPromoHandler =  async function (req, res) {
    try {
        const respomse = await checkVendorPromo(req.query);
        res.status(201).json({ success: true, data: respomse });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.updateFirebaseTokenHandler =  async function (req, res) {
    try {
        const respomse = await updateFirebaseToken(req.body);
        res.status(201).json({ success: true, data: respomse });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.sendFirebaseNotificationHandler =  async function (req, res) {
    try {
        const response = await sendFirebaseNotification(req.body);
        res.status(201).json({ success: true, data: response});
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.getMediaFolderFromCloudinaryHandler =  async function (req, res) {
    try {
        const response = await getMediaFolderFromCloudinary(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


exports.uploadMediaToCloudinaryHandler =  async function (req, res) {
    
    try {
        const response = await uploadMediaToCloudinary({...req.body, ...req.file});
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.deleteMediaFromCloudinaryHandler =  async function (req, res) {
    try {
        const response = await deleteMediaFromCloudinary(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}