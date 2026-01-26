const {
  countEmail,
  countPhone,
  findUserByEmail,
  findUserById,
  updateUserFcm,
  truncateUser,
  updateUserPhotoById,
  countToken,
  createNewToken,
  createUser,
  updateUserEmailById,
  updateUserPasswordById,
  updateUserPhoneById,
  updateUserProfileById,
} = require("../models/users");
const tokenTemplate = require('../email_templates/token');


const bcrypt = require("bcryptjs");
const shortId = require("short-id");
const tools = require("../utils/tools");


exports.createToken = async function  (payload) {
  const { date, email } = payload;

  try {
    // Business logic
    const { 
      user_id 
    } = await findUserByEmail({ email });
    console.log(user_id)

    if(!user_id){
      throw new Error("Email does not exist");
    }
    const token = tools.generateNumericToken();
    const response = await createNewToken({ token, date, user_id });
    let mail = tokenTemplate(`${fname}.${lname[0]}`, token, email);  
    const emailSent = await tools.send_email('Token for password recovery', mail, email);
    if(!emailSent)throw new Error("Email not sent, Try again");
    return response;
  } catch (error) {
    console.log("error: ", error)
  }
};

exports.verifyToken = async function  (payload) {
  const { token, email } = payload;

  try {
    // Business logic
    const {
      user_id
    } = await findUserByEmail({ email });
    const response = await countToken({ token, user_id });
    return response;
  } catch (error) {
    console.log("error: ", error)
  }
};
exports.getUser = async function  (payload) {
  const { user_id } = payload;

  try {
    // Business logic
    const response = await findUserById({ user_id });
    return response;
  } catch (error) {
    console.log("error: ", error)
  }
};

exports.registerUser = async function  (payload) {
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

exports.loginUser = async function  (payload) {
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

exports.deleteUser = async function  (payload) {
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

exports.updateUserEmail = async function  (payload) {
  const { email, user_id } = payload;

  // Business logic
  const response = await updateUserEmailById({ email, user_id });

  return response;
};

exports.updateUserPhoto = async function  (payload) {
  const { photo, user_id } = payload;

  // Business logic
  const response = await updateUserPhotoById({ photo, user_id });

  return response;
};

exports.updateUserPhone = async function  (payload) {
  const { phone, user_id } = payload;

  // Business logic
  const response = await updateUserPhoneById({ phone, user_id });

  return response;
};
exports.updateUserProfile = async function  (payload) {
  const { user_id, fname, lname, gender } = payload;
  // Business logic
  const response = await updateUserProfileById ({ user_id, fname, lname, gender:  gender.toLowerCase() === 'male' ? 1 : 0 });

  return response;
};

exports.updateUserPassword = async function  (payload) {
  const { email, password } = payload;

  try {
    // Business logic
    const user = await findUserByEmail({ email });

    let oldPwd = user.password;
    let comparison = await bcrypt.compare(password, oldPwd);
    if (comparison) {
      throw new Error("New password cannot be the same as old password");
    } 
    const hashPwd = await bcrypt.hash(password, 10)
    const response = await updateUserPasswordById({ user_id: user.user_id, password: hashPwd });
    return response;  
  } catch (error) {
    console.log(error)
    throw new Error("Internal server error");
  }
};
