
import {
    getCustomer, 
    postAlterCustomerPwd, 
    postConfirmEmail, 
    postLoginCustomer, 
    postNewCustomer, 
    postResetCustomerEmail, 
    postResetCustomerPhone, 
    postResetCustomerPwd, 
    postUpdateCustomerProfile,
    postVerifyToken
} from "../../services/shop/customer.js";

export async function GET_CUSTOMER(req, res) {
    
    try {
        const customer = await getCustomer(req.query);
        res.status(201).json({ success: true, data: customer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function REGISTER_CUSTOMER(req, res) {
    try {
        const new_customer = await postNewCustomer(req.body);
        res.status(201).json({ success: true, data: new_customer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function LOGIN_CUSTOMER(req, res) {
    try {
        const login_customer = await postLoginCustomer(req.body);
        res.status(201).json({ success: true, data: login_customer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function RESET_CUSTOMER_EMAIL(req, res) {
    try {
        const reset_customer_email = await postResetCustomerEmail(req.body);
        res.status(201).json({ success: true, data: reset_customer_email });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function RESET_CUSTOMER_PHONE(req, res) {
    try {
        const reset_customer_phone = await postResetCustomerPhone(req.body);
        res.status(201).json({ success: true, data: reset_customer_phone });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function UPDATE_CUSTOMER_PROFILE(req, res) {
    try {
        const update_customer_profile = await postUpdateCustomerProfile(req.body);
        res.status(201).json({ success: true, data: update_customer_profile });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function RESET_PWD(req, res) {
    try {
        const reset_pwd = await postResetCustomerPwd(req.body);
        res.status(201).json({ success: true, data: reset_pwd });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export async function ALTER_PWD(req, res) {
    try {
        const alter_pwd = await postAlterCustomerPwd(req.body);
        res.status(201).json({ success: true, data: alter_pwd });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}



export async function CONFIRM_EMAIL(req, res) {
    try {
        const reset_pwd = await postConfirmEmail(req.body);
        res.status(201).json({ success: true, data: reset_pwd });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export async function VERIFY_TOKEN(req, res) {
    try {
        const reset_pwd = await postVerifyToken(req.body);
        res.status(201).json({ success: true, data: reset_pwd });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}