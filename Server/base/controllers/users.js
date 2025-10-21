const {
    getUser,
    loginUser,
    registerUser,
    updateUserEmail,
    updateUserPassword,
    updateUserPhone,
    updateUserProfile,
    deleteUser,
    updateUserPhoto,
    verifyToken,
    createToken 
} = require('../services/users');



exports.createTokenHandler =  async function (req, res) {
    try {
        const response = await createToken(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.verifyTokenHandler =  async function (req, res) {
    try {
        const response = await verifyToken(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.getUserHandler =  async function (req, res) {
    try {
        const response = await getUser(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.deleteUserHandler =  async function (req, res) {
    try {
        const response = await deleteUser(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.registerUserHandler =  async function (req, res) {
    try {
        const response = await registerUser(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.loginUserHandler =  async function (req, res) {
    try {
        const response = await loginUser(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.updateUserPhotoHandler =  async function (req, res) {
    try {
        const response = await updateUserPhoto(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.updateUserEmailHandler =  async function (req, res) {
    try {
        const response = await updateUserEmail(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.updateUserPhoneHandler =  async function (req, res) {
    try {
        const response = await updateUserPhone(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.updateUserProfileHandler =  async function (req, res) {
    try {
        const response = await updateUserProfile(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.updateUserPasswordHandler =  async function (req, res) {
    try {
        const response = await updateUserPassword(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
