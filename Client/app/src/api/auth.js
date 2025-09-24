import { request } from "../utils/requestHandler";

export class Auth {
  static async registerUser(payload) {
    return await request({
      url: "/registration",
      method: "POST",
      data: payload,
    });
  }

  static async loginUser(payload) {
    return await request({
      url: "/login",
      method: "POST",
      data: payload,
    });
  }

  static async confirmEmail(payload) {
    return await request({
      url: "/confirm-email",
      method: "POST",
      data: payload,
    });
  }

  static async verifyToken(payload) {
    return await request({
      url: "/verify-token",
      method: "POST",
      data: payload,
    });
  }

  static async changePassword(payload) {
    return await request({
      url: "/change-password",
      method: "POST",
      data: payload,
    });
  }
}

export default Auth;
