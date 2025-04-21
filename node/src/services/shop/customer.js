import {
  countEmail,
  countPhone,
  createCustomer, 
  findUserByEmail, 
  findUserById, 
  updateCustomerEmailById, 
  updateCustomerPasswordById, 
  updateCustomerPhoneById, 
  updateCustomerProfileById
} from "../../repositories/shop/customer.js";
import {
  generateCustomerJwtToken
} from "../../utils/token.js";
import bcrypt from "bcryptjs"
import shortId from "short-id"
export const getCustomer = async (payload) => {
  const { buyer_id } = payload;

  // Business logic
  const response = await findUserById({ buyer_id });

  return response;
};

export const postNewCustomer = async (payload) => {
  const { fname,lname,email,phone,pwd,state,campus,gender } = payload;

  // Business logic
  let hashedPwd = bcrypt.hash(pwd, 10);
  let buyer_id = shortId.generate(10);

  let existingEmail = await countEmail({ email });
  let existingPhone = await countPhone({ phone });

  if (existingEmail > 0) {
    throw new Error("Email exist");
    
  } else if (existingPhone > 0) {
    throw new Error("Phone number exist");
  }

  const response = await createCustomer({ fname,lname,buyer_id,email,phone,hashedPwd,state,campus,gender: gender.toLowerCase() === 'male' ? 1 : 0 });

  return response;
};

export const postLoginCustomer = async (payload) => {
  const { email,pwd } = payload;

  // Business logic
  const user = await findUserByEmail({ email });

  if (user) {
    const auth = await bcrypt.compare(pwd, user.password);
    if (auth) {
      const token = generateCustomerJwtToken(user.buyer_id);
      return({user: user, cookie: token});
    }
    throw new Error("Invalid password");
    
  }
  throw new Error("Email is not registered");
  

};

export const postResetCustomerEmail = async (payload) => {
  const { email, buyer_id } = payload;

  // Business logic
  const response = await updateCustomerEmailById({ email, buyer_id });

  return response;
};

export const postResetCustomerPhone = async (payload) => {
  const { phone, buyer_id } = payload;

  // Business logic
  const response = await updateCustomerPhoneById({ phone, buyer_id });

  return response;
};

export const postUpdateCustomerProfile = async (payload) => {
  const { buyer_id, fname, lname, gender } = payload;
  // Business logic
  const response = await updateCustomerProfileById ({ buyer_id, fname, lname, gender:  gender.toLowerCase() === 'male' ? 1 : 0 });

  return response;
};

export const postResetCustomerPwd = async (payload) => {
  const { buyer_id, pwd } = payload;

  // Business logic
  let customer = await findUserById({ buyer_id });
  let oldPwd = customer.password;
  let comparison = await bcrypt.compare(pwd, oldPwd);
  if (comparison) {
    throw new Error("New password cannot be the same as old password");
  } 
  const response = await updateCustomerPasswordById({ buyer_id, pwd });
  return response;
};
