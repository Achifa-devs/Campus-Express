import { tokenTemplate } from "../../mails/template/token.js";
import {
  countEmail,
  countPhone,
  createCustomer, 
  deleteTokenByEmail, 
  findTokenByEmail, 
  findUserByEmail, 
  findUserById, 
  updateCustomerEmailById, 
  updateCustomerPasswordById, 
  updateCustomerPhoneById, 
  updateCustomerProfileById
} from "../../repositories/shop/customer.js";
import { createToken } from "../../repositories/token.js";
import {
  send_email,
  send_mail_via_brevo
} from "../../utils/email_sender.js";
import {
  generateCustomerJwtToken,
  generateNumericToken
} from "../../utils/token.js";
import bcrypt from "bcryptjs"
import shortId from "short-id"
export const getCustomer = async (payload) => {
  const { user_id } = payload;

  // Business logic
  const response = await findUserById({ user_id });

  return response;
};

export const postVerifyToken = async (payload) => {
  const { token, email } = payload;

  // Business logic
  const hashedToken = await findTokenByEmail({ email });
  if (!hashedToken) {
    throw new Error("Error getting token.");

  }
  console.log(token, hashedToken.token)
  const tokenAuth = await bcrypt.compare(token, hashedToken.token);
  if (tokenAuth) {
    await deleteTokenByEmail({ email });
    return true;
  }
  throw new Error("Error verifying token, Try again in the next 30 minutes.");
  

};

export const postNewCustomer = async (payload) => {
  const { fname,lname,email,phone,pwd,state,campus,gender } = payload;

  // Business logic
  let hashedPwd = bcrypt.hash(pwd, 10);
  let user_id = shortId.generate(10);

  let existingEmail = await countEmail({ email });
  let existingPhone = await countPhone({ phone });

  if (existingEmail > 0) {
    throw new Error("Email exist");
    
  } else if (existingPhone > 0) {
    throw new Error("Phone number exist");
  }

  const response = await createCustomer({ fname,lname,user_id,email,phone,hashedPwd,state,campus,gender: gender.toLowerCase() === 'male' ? 1 : 0 });

  return response;
};

export const postLoginCustomer = async (payload) => {
  const { email,pwd } = payload;

  // Business logic
  const user = await findUserByEmail({ email });

  if (user) {
    const auth = await bcrypt.compare(pwd, user.password);
    if (auth) {
      const token = generateCustomerJwtToken(user.user_id);
      return({user: user, cookie: token});
    }
    throw new Error("Invalid password");
    
  }
  throw new Error("Email is not registered");
  

};

export const postResetCustomerEmail = async (payload) => {
  const { email, user_id } = payload;
 
  // Business logic
  let existingEmail = await countEmail({ email });
  // let existingPhone = await countPhone({ phone });

  if (existingEmail > 0) {
    throw new Error("Email already exist");
  }
  const response = await updateCustomerEmailById({ email, user_id });

  return response;
};

export const postConfirmEmail = async (payload) => {
  const { email } = payload;
  const token = generateNumericToken();
  let hashedToken = await bcrypt.hash(token, 10)
  

  // Business logic
  let user = await findUserByEmail({ email });
  if (user) {
    let response = await createToken('email', hashedToken, user?.email);
    if (response) {
      let template = tokenTemplate(`${user?.fname} ${user?.lname}`, token, user?.email);
      // let template = await send_mail_via_brevo(`${user?.fname} ${user?.lname}`, token, user?.email);
      await send_email('Email confirmation', template, user?.email);
      return response;

    }
    throw new Error("Error occured, try again.");
    
  
    // console.log(response)
 }
};

export const postResetCustomerPhone = async (payload) => {
  const { phone, user_id } = payload;

  // Business logic
  let existingPhone = await countPhone({ phone });

  if (existingPhone > 0) {
    throw new Error("Phone number already exist");
  }
  const response = await updateCustomerPhoneById({ phone, user_id });

  return response;
};

export const postUpdateCustomerProfile = async (payload) => {
  const { user_id, fname, lname, gender, campus, state } = payload;
  try {
    // Business logic
    const response = await updateCustomerProfileById({ user_id, fname, lname, campus, state , gender:  gender.toLowerCase() === 'male' ? 1 : 0 });
  
    return response;
  } catch (error) {
    console.log(error)
    throw new Error("internal server error");
    
  }
};

export const postResetCustomerPwd = async (payload) => {
  const { email, password } = payload;


  // Business logic
  let customer = await findUserByEmail({ email });
  if (!customer) {
    throw new Error("Internal server error, please try again.");
    
  }
  let oldPwd = customer.password;
  let comparison = await bcrypt.compare(password, oldPwd);

  if (comparison) {
    throw new Error("New password cannot be the same as old password");
  } 
  const hashedPwd = await bcrypt.hash(password, 10)

  const response = await updateCustomerPasswordById({ user_id: customer?.user_id, password: hashedPwd });
  return response;
};


export const postAlterCustomerPwd = async (payload) => {
  const { pwd, user_id, oldpwd } = payload;


  // Business logic
  let customer = await findUserById({ user_id });
  if (!customer) {
    throw new Error("Internal server error, please try again.");
    
  }
  let oldPwd = customer.password;
  let comparison = await bcrypt.compare(oldpwd, oldPwd);

  if (!comparison) {
    throw new Error("Incorrect password");
  } 
  let isSame = await bcrypt.compare(pwd, oldPwd);

  if (isSame) {
    throw new Error("New password cannot be the same as old password");
  } 
  const hashedPwd = await bcrypt.hash(pwd, 10)
  const response = await updateCustomerPasswordById({ user_id: user_id, password: hashedPwd });
  return response;
};
