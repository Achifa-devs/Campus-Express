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


  try {
    // 1. Find token stored for this user
    const hashedToken = await findTokenByEmail({ email });
    if (!hashedToken) {
      throw new Error("No token found for this email.");
    }

    // 2. Compare raw token with hashed token
    const isValid = await bcrypt.compare(token, hashedToken.token);

    if (!isValid) {
      throw new Error("Invalid or expired token. Try again in the next 30 minutes.");
    }

    // 3. Token is valid → remove it to prevent reuse
    await deleteTokenByEmail({ email });
    return true;
  } catch (err) {
    console.error("Token verification error:", err.message);
    return false; // you can throw if you prefer
  }
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
  const hashedToken = await bcrypt.hash(token, 10);

  try {
    // Check user
    const user = await findUserByEmail({ email });
    if (!user) {
      throw new Error("User not found.");
    }

    // Store token
    const isTokenCreated = await createToken("email", hashedToken, user.email);
    if (!isTokenCreated) {
      throw new Error("Failed to create token.");
    }


    // Generate email template (sync or async depending on your tokenTemplate)
    const template = tokenTemplate(
      `${user.fname} ${user.lname}`,
      token,
      user.email
    );

    // Send email
    const sent = await send_email("Email confirmation", template, user.email);

    if (!sent) {
      throw new Error("Failed to send confirmation email.");
    }
    console.log(sent)


    return true; // Success
  } catch (error) {
    console.error("postConfirmEmail error:", error);
    throw new Error("Internal server error.");
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
  const { user_id, fname, lname, email, phone, gender, campus, state } = payload;
  try {
    // Business logic
    const response = await updateCustomerProfileById({ user_id, fname, lname, email, phone, campus, state , gender:  gender.toLowerCase() === 'male' ? 1 : 0 });
  
    return response;
  } catch (error) {
    console.log(error)
    throw new Error("internal server error");
    
  }
};

export const postResetCustomerPwd = async (payload) => {
  const { email, password } = payload;


  try {
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
  } catch (error) {
    console.log("Error: ", error);
    return error
  }
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
