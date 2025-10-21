const getUser = require('../services/users');
const loginUser = require('../services/users');
const registerUser = require('../services/users');
const updateUserEmail = require('../services/users');
const updateUserPassword = require('../services/users');
const updateUserPhone = require('../services/users');
const updateUserProfile = require('../services/users');
const deleteUser = require('../services/users');
const updateUserPhoto = require('../services/users');
const verifyToken = require('../services/users');
const createToken = require('../services/users');



module.exports =  async function createTokenHandler(req, res) {
    try {
        const response = await createToken(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function verifyTokenHandler(req, res) {
    try {
        const response = await verifyToken(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function getUserHandler(req, res) {
    try {
        const response = await getUser(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function deleteUserHandler(req, res) {
    try {
        const response = await deleteUser(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function registerUserHandler(req, res) {
    try {
        const response = await registerUser(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function loginUserHandler(req, res) {
    try {
        const response = await loginUser(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function updateUserPhotoHandler(req, res) {
    try {
        const response = await updateUserPhoto(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function updateUserEmailHandler(req, res) {
    try {
        const response = await updateUserEmail(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function updateUserPhoneHandler(req, res) {
    try {
        const response = await updateUserPhone(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function updateUserProfileHandler(req, res) {
    try {
        const response = await updateUserProfile(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function updateUserPasswordHandler(req, res) {
    try {
        const response = await updateUserPassword(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
