const express = require('express');
const {
    registerUserHandler,
    getUserHandler,
    loginUserHandler,
    updateUserEmailHandler,
    updateUserPhoneHandler,
    updateUserProfileHandler,
    updateUserPasswordHandler,
    deleteUserHandler,
    updateUserPhotoHandler,
    createTokenHandler,
    verifyTokenHandler
 } = require('../controllers/users');
const userRouter = express.Router();
const parser = require('body-parser').json({ limit: '1024mb' });


userRouter.get('/user', getUserHandler)
userRouter.post('/user/signup', registerUserHandler)
userRouter.post('/user/login', loginUserHandler)
userRouter.post('/user/delete', deleteUserHandler)
userRouter.post('/user/update/email', updateUserEmailHandler)
userRouter.post('/user/update/phone', updateUserPhoneHandler)
userRouter.post('/user/update/photo', parser, updateUserPhotoHandler)
userRouter.post('/user/update/profile', updateUserProfileHandler)
userRouter.post('/user/update/password', updateUserPasswordHandler)


userRouter.post('/user/token', parser, createTokenHandler)
userRouter.post('/user/verify/token', verifyTokenHandler)


module.exports = userRouter;