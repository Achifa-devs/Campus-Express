const express = require('express');
const { 
    checkVersionHandler, 
    getMediaFolderFromCloudinaryHandler, 
    sendFirebaseNotificationHandler, 
    updateFirebaseTokenHandler, 
    uploadMediaToCloudinaryHandler, 
    deleteMediaFromCloudinaryHandler 
} = require('../controllers/general');
const generalRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


generalRouter.get('/version/check', checkVersionHandler)
generalRouter.get('/media/folder', getMediaFolderFromCloudinaryHandler)/** /image-folder */
// generalRouter.get('/plans', )
// generalRouter.get('/sponsorship', )
// generalRouter.get('/promo', )
// generalRouter.get('/subscription', )
// generalRouter.get('/packages', )

generalRouter.post('/firebase/notification', parser, sendFirebaseNotificationHandler) /** n/otify */
generalRouter.post('/firebase/update', parser, updateFirebaseTokenHandler) /** /update-fcm */
generalRouter.post('/upload/media', upload.single('file'), uploadMediaToCloudinaryHandler) /** upload file to cloudinary */
generalRouter.post('/delete/media', parser, deleteMediaFromCloudinaryHandler) /** delete file from cloudinary */

