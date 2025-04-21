import {
  countEmail,
  countPhone,
  createVendor, 
  findUserByEmail, 
  findUserById, 
  updateVendorEmailById, 
  updateVendorPasswordById, 
  updateVendorPhoneById, 
  updateVendorProfileById
} from "../../repositories/vendor/vendor.js";
import {
  generateVendorJwtToken
} from "../../utils/token.js";
import bcrypt from "bcryptjs"
import shortId from "short-id"
export const getVendor = async (payload) => {
  const { buyer_id } = payload;

  // Business logic
  const response = await findUserById({ buyer_id });

  return response;
};

export const postNewVendor = async (payload) => {
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

  const response = await createVendor({ fname,lname,buyer_id,email,phone,hashedPwd,state,campus,gender: gender.toLowerCase() === 'male' ? 1 : 0 });

  return response;
};

export const postLoginVendor = async (payload) => {
  const { email,pwd } = payload;

  // Business logic
  const user = await findUserByEmail({ email });

  if (user) {
    const auth = await bcrypt.compare(pwd, user.password);
    if (auth) {
      const token = generateVendorJwtToken(user.buyer_id);
      return({user: user, cookie: token});
    }
    throw new Error("Invalid password");
    
  }
  throw new Error("Email is not registered");
  

};

export const postResetVendorEmail = async (payload) => {
  const { email, buyer_id } = payload;

  // Business logic
  const response = await updateVendorEmailById({ email, buyer_id });

  return response;
};

export const postResetVendorPhone = async (payload) => {
  const { phone, buyer_id } = payload;

  // Business logic
  const response = await updateVendorPhoneById({ phone, buyer_id });

  return response;
};

export const postUpdateVendorProfile = async (payload) => {
  const { buyer_id, fname, lname, gender } = payload;
  // Business logic
  const response = await updateVendorProfileById ({ buyer_id, fname, lname, gender:  gender.toLowerCase() === 'male' ? 1 : 0 });

  return response;
};

export const postResetVendorPwd = async (payload) => {
  const { buyer_id, pwd } = payload;

  // Business logic
  let Vendor = await findUserById({ buyer_id });
  let oldPwd = Vendor.password;
  let comparison = await bcrypt.compare(pwd, oldPwd);
  if (comparison) {
    throw new Error("New password cannot be the same as old password");
  } 
  const response = await updateVendorPasswordById({ buyer_id, pwd });
  return response;
};
