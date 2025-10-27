const { 
    checkVersion, 
    updateFirebaseToken, 
    sendFirebaseNotification, 
    getMediaFolderFromCloudinary, 
    uploadMediaToCloudinary, 
    deleteMediaFromCloudinary, 
    checkVendorPromo
} = require("../services/general");

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