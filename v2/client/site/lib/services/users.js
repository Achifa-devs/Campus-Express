import bcrypt from 'bcryptjs';
import shortId from 'short-id';
import {
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
} from '../models/users';
import { generateUserJwtToken, generateNumericToken, sendEmail } from '../utils';
import { tokenTemplate } from '../email-templates/token';

export async function createToken(payload) {
  const { date, email } = payload;

  try {
    const user = await findUserByEmail({ email });

    if (!user?.user_id) {
      throw new Error('Email does not exist');
    }

    const token = generateNumericToken();
    const response = await createNewToken({ token, date, user_id: user.user_id });

    const mail = tokenTemplate(`${user.fname}.${user.lname[0]}`, token, email);
    const emailSent = await sendEmail('Token for password recovery', mail, email);

    if (!emailSent) throw new Error('Email not sent, Try again');
    return response;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
}

export async function verifyToken(payload) {
  const { token, email } = payload;

  try {
    const { user_id } = await findUserByEmail({ email });
    const response = await countToken({ token, user_id });
    return response;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
}

export async function getUser(payload) {
  const { user_id } = payload;

  try {
    const response = await findUserById({ user_id });
    return response;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
}

export async function registerUser(payload) {
  const { fname, lname, email, phone, pwd, state, campus, deviceId, fcm } = payload;

  // Hash password
  const hashedPwd = await bcrypt.hash(pwd, 10);
  const user_id = `CE-${shortId.generate(10)}`;

  // Check email and phone
  const existingEmail = await countEmail({ email });
  const existingPhone = await countPhone({ phone });

  if (existingEmail > 0) {
    throw new Error('Email exists');
  } else if (existingPhone > 0) {
    throw new Error('Phone number exists');
  }

  // Create user
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
    deviceId: deviceId?._j || deviceId,
    fcm,
  });

  if (response) {
    const token = generateUserJwtToken(user_id);
    return {
      ...response,
      user: { fname, lname, user_id, email, phone, state, campus },
      cookie: token,
    };
  } else {
    throw new Error('Error creating new user');
  }
}

export async function loginUser(payload) {
  const { email, pwd, fcm } = payload;

  const user = await findUserByEmail({ email });

  if (user) {
    const auth = await bcrypt.compare(pwd, user.password);
    if (auth) {
      await updateUserFcm({ fcm, user_id: user.user_id });
      const token = generateUserJwtToken(user.user_id);
      return { user, cookie: token };
    }
    throw new Error('Invalid password');
  }
  throw new Error('Email is not registered');
}

export async function deleteUser(payload) {
  const { user_id } = payload;

  const user = await findUserById({ user_id });

  if (user) {
    await truncateUser({ user_id });
    return { message: 'User deleted successfully' };
  }
  throw new Error('User does not exist');
}

export async function updateUserEmail(payload) {
  const { email, user_id } = payload;
  const response = await updateUserEmailById({ email, user_id });
  return response;
}

export async function updateUserPhoto(payload) {
  const { photo, user_id } = payload;
  const response = await updateUserPhotoById({ photo, user_id });
  return response;
}

export async function updateUserPhone(payload) {
  const { phone, user_id } = payload;
  const response = await updateUserPhoneById({ phone, user_id });
  return response;
}

export async function updateUserProfile(payload) {
  const { user_id, fname, lname, gender } = payload;
  const response = await updateUserProfileById({
    user_id,
    fname,
    lname,
    gender: gender.toLowerCase() === 'male' ? 1 : 0,
  });
  return response;
}

export async function updateUserPassword(payload) {
  const { email, password } = payload;

  try {
    const user = await findUserByEmail({ email });

    const oldPwd = user.password;
    const comparison = await bcrypt.compare(password, oldPwd);
    if (comparison) {
      throw new Error('New password cannot be the same as old password');
    }

    const hashPwd = await bcrypt.hash(password, 10);
    const response = await updateUserPasswordById({
      user_id: user.user_id,
      password: hashPwd,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error('Internal server error');
  }
}
