import { sendToken, sendTokenPwd } from "../../services/vendor/send_token";

export async function SEND_TOKEN(req, res) {
    
    try {
        let response = sendToken(req.body)
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export async function SEND_TOKEN_PWD(req, res) {
    
    try {
        let response = sendTokenPwd(req.body)
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}