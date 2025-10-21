const countEmail = require("../models/users");
const countPhone = require("../models/users");
const findUserByEmail = require("../models/users");
const findUserById = require("../models/users");
const updateUserFcm = require("../models/users");
const truncateUser = require("../models/users");
const updateUserPhotoById = require("../models/users");
const countToken = require("../models/users");
const createNewToken = require("../models/users");


const bcrypt = require("bcryptjs");
const shortId = require("short-id");

const  createUser  = require("../models/users");
const  updateUserEmailById  = require("../models/users");
const  updateUserPasswordById  = require("../models/users");
const  updateUserPhoneById  = require("../models/users");
const  updateUserProfileById  = require("../models/users");
const tools = require("../utils/tools");


module.exports = async function createToken (payload) {
  const { token, date, user_id } = payload;

  try {
    // Business logic
    const response = await createNewToken({ token, date, user_id })
    return response;
  } catch (error) {
    console.log("error: ", error)
  }
};

module.exports = async function verifyToken (payload) {
  const { token } = payload;

  try {
    // Business logic
    const response = await countToken({ token });
    return response;
  } catch (error) {
    console.log("error: ", error)
  }
};
module.exports = async function getUser (payload) {
  const { user_id } = payload;

  try {
    // Business logic
    const response = await findUserById({ user_id });
    return response;
  } catch (error) {
    console.log("error: ", error)
  }
};

module.exports = async function registerUser (payload) {
    const { 
        fname, 
        lname, 
        email, 
        phone, 
        pwd, 
        state, 
        campus, 
        deviceId, 
        fcm 
    } = payload;

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
    const response = await createUser({
        fname,
        lname,
        user_id,
        email,
        phone,
        hashedPwd,
        state,
        campus,
        gender: null,
        deviceId: deviceId._j,
        fcm
    });

    if (response) {
        const token = tools.generateUserJwtToken(user_id);
        return {
            ...response,
            user: { fname, lname, user_id, email, phone, state, campus },
            cookie: token
        };
    }else{
        throw new Error("Error creating new user");
    }

};

module.exports = async function loginUser (payload) {
    const { 
        email,
        pwd,
        fcm
    } = payload;

    // Business logic
    const user = await findUserByEmail({ email });

    if (user) {
        const auth = await bcrypt.compare(pwd, user.password);
        if (auth) {
            await updateUserFcm({fcm, user_id: user.user_id});
    
            const token = tools.generateUserJwtToken(user.user_id);
            return({user: user, cookie: token});
        }
        throw new Error("Invalid password");
        
    }
    throw new Error("Email is not registered");
  

};

module.exports = async function deleteUser (payload) {
    const { 
        user_id
    } = payload;

    // Business logic
    const user = await findUserById({ user_id });

    if (user) {
        truncateUser({ user_id })
        
    }
    throw new Error("User does not exist");
  

};

module.exports = async function updateUserEmail (payload) {
  const { email, user_id } = payload;

  // Business logic
  const response = await updateUserEmailById({ email, user_id });

  return response;
};

module.exports = async function updateUserPhoto (payload) {
  const { photo, user_id } = payload;

  // Business logic
  const response = await updateUserPhotoById({ photo, user_id });

  return response;
};

module.exports = async function updateUserPhone (payload) {
  const { phone, user_id } = payload;

  // Business logic
  const response = await updateUserPhoneById({ phone, user_id });

  return response;
};

module.exports = async function updateUserProfile (payload) {
  const { user_id, fname, lname, gender } = payload;
  // Business logic
  const response = await updateUserProfileById ({ user_id, fname, lname, gender:  gender.toLowerCase() === 'male' ? 1 : 0 });

  return response;
};

module.exports = async function updateUserPassword (payload) {
  const { user_id, pwd } = payload;

  // Business logic
  let Vendor = await findUserById({ user_id });
  let oldPwd = Vendor.password;
  let comparison = await bcrypt.compare(pwd, oldPwd);
  if (comparison) {
    throw new Error("New password cannot be the same as old password");
  } 
  const response = await updateUserPasswordById({ user_id, pwd });
  return response;
};
