import { tokenTemplate } from "../../mails/template/token";
import { findUserByEmail, findUserByPhone } from "../../repositories/vendor/vendor";
import { send_email } from "../../utils/email_sender";



export const sendToken = async (payload) => {
  const { email, phone, token } = payload;

  // Business logic
 
    
    if (email) {
        let user = findUserByEmail(email)
        let mail = tokenTemplate(user?.fname, token, email);
        let res = await send_email('Email Update', mail, email);
    } else {
        let user = findUserByPhone(phone)
        let mail = tokenTemplate(user?.fname, token, phone);
        // let res = await send_email('Phone Number Update', mail, phone);
    }
};


export const sendTokenPwd = async (payload) => {
    const { email, phone, token } = payload;
  
    // Business logic
   
    let user = findUserByEmail(email)
      
    let mail = tokenTemplate(user?.fname, token, email);
    let res = await send_email('Email Update', mail, email);
    // let mail = tokenTemplate(user?.fname, token, phone);
    // let res = await send_email('Phone Number Update', mail, phone);
  };