import { tokenTemplate } from "../../mails/template/token.js";
import { findUserByEmail, findUserByPhone } from "../../repositories/vendor/vendor.js";
import { send_email } from "../../utils/email_sender.js";
export const sendToken = async payload => {
  const {
    email,
    phone,
    token
  } = payload;

  // Business logic

  if (email) {
    let user = findUserByEmail(email);
    let mail = tokenTemplate(user?.fname, token, email);
    let res = await send_email('Email Update', mail, email);
  } else {
    let user = findUserByPhone(phone);
    let mail = tokenTemplate(user?.fname, token, phone);
    // let res = await send_email('Phone Number Update', mail, phone);
  }
};
export const sendTokenPwd = async payload => {
  const {
    email,
    phone
  } = payload;
  function generateToken() {
    // Always gives a number between 1000 and 9999
    return Math.floor(1000 + Math.random() * 9000);
  }

  // Example usage:
  const token = generateToken();
  try {
    // ✅ Wait for user
    let user = await findUserByEmail({
      email
    });
    if (!user) {
      throw new Error("User not found.");
    }

    // ✅ If tokenTemplate is async, add await
    let mail = tokenTemplate(user?.fname, token, email);

    // ✅ Wait for email to be sent
    let sent = await send_email("Password recovery", mail, email);
    if (!sent) {
      throw new Error("Failed to send recovery email.");
    }
    return true; // success
  } catch (error) {
    console.error("sendTokenPwd error:", error);
    throw new Error("Internal server error."); // clean error response
  }
};