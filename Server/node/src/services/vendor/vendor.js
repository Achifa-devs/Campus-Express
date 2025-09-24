import pool from "../../config/db.js";
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
  const { user_id } = payload;

  try {
    // Business logic
    const response = await findUserById({ user_id });
  
    return response;
  } catch (error) {
    console.log("error: ", error)
  }
};

export const postNewVendor = async (payload) => {
  const { fname, lname, email, phone, pwd, state, campus, deviceId } = payload;

  console.log(deviceId._j);

  // Hash password
  let hashedPwd = await bcrypt.hash(pwd, 10);
  let user_id = `CE-${shortId.generate(10)}`;

  // Check email and phone
  let existingEmail = await countEmail({ email });
  let existingPhone = await countPhone({ phone });

  if (existingEmail > 0) {
    throw new Error("Email exists");
  } else if (existingPhone > 0) {
    throw new Error("Phone number exists");
  }

  // Create vendor
  const response = await createVendor({
    fname,
    lname,
    user_id,
    email,
    phone,
    hashedPwd,
    state,
    campus,
    gender: null,
    deviceId: deviceId._j
  });

  // Insert subscription for this new user
  const plan = "Free"; // default starting plan
  const start_date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const end_date = null; // you can calculate trial end or leave null
  const created_at = new Date().toISOString();

  await pool.query(
    `INSERT INTO subscriptions (user_id, plan, start_date, end_date, is_active, created_at)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [user_id, plan, start_date, end_date, true, created_at]
  );

   const token = generateVendorJwtToken(user_id);
  return {
    ...response,
    user: { fname, lname, user_id, email, phone, state, campus },
    cookie: token
  };

};

export const postLoginVendor = async (payload) => {
  const { 
    email,
    pwd 
  } = payload;

  // Business logic
  const user = await findUserByEmail({ email });

  if (user) {
    const auth = await bcrypt.compare(pwd, user.password);
    if (auth) {
      console.log(user.user_id)
      const token = generateVendorJwtToken(user.user_id);
      return({user: user, cookie: token});
    }
    throw new Error("Invalid password");
    
  }
  throw new Error("Email is not registered");
  

};

export const postResetVendorEmail = async (payload) => {
  const { email, user_id } = payload;

  // Business logic
  const response = await updateVendorEmailById({ email, user_id });

  return response;
};

export const postResetVendorPhone = async (payload) => {
  const { phone, user_id } = payload;

  // Business logic
  const response = await updateVendorPhoneById({ phone, user_id });

  return response;
};

export const postUpdateVendorProfile = async (payload) => {
  const { user_id, fname, lname, gender } = payload;
  // Business logic
  const response = await updateVendorProfileById ({ user_id, fname, lname, gender:  gender.toLowerCase() === 'male' ? 1 : 0 });

  return response;
};

export const postResetVendorPwd = async (payload) => {
  const { user_id, pwd } = payload;

  // Business logic
  let Vendor = await findUserById({ user_id });
  let oldPwd = Vendor.password;
  let comparison = await bcrypt.compare(pwd, oldPwd);
  if (comparison) {
    throw new Error("New password cannot be the same as old password");
  } 
  const response = await updateVendorPasswordById({ user_id, pwd });
  return response;
};
