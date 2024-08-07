
function Signature(req,res) {
    const cloudinary = require('cloudinary').v2;

    cloudinary.config({
        cloud_name: 'daqbhghwq',
        api_key: '244892476618978',
        api_secret: '9cK2GEvtfholKpvWjzbGUnBJJ5o',
    });


    const folder = req.body.folder_name || 'default_folder'; // default folder if none specified
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder },
        '9cK2GEvtfholKpvWjzbGUnBJJ5o'
    );
    
    res.status(200).json({ signature, timestamp, folder });

}

module.exports={
    Signature
}