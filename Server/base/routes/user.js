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
userRouter.post('/user/signup', parser, registerUserHandler)
userRouter.post('/user/login', parser, loginUserHandler)
userRouter.post('/user/delete', parser, deleteUserHandler)
userRouter.post('/user/update/email', parser, updateUserEmailHandler)
userRouter.post('/user/update/phone', parser, updateUserPhoneHandler)
userRouter.post('/user/update/photo', parser, updateUserPhotoHandler)
userRouter.post('/user/update/profile', parser, updateUserProfileHandler)
userRouter.post('/user/update/password', parser, updateUserPasswordHandler)


userRouter.post('/user/token', parser, createTokenHandler)
userRouter.post('/user/token/verify', parser, verifyTokenHandler)


module.exports = userRouter;