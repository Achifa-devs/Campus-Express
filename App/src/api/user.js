import { request } from "../utils/requestHandler";

export class User {
  static async getUser(params = {}) {
    return request({
      url: "/user",
      method: "GET",
      params,
    });
  }

  static async updateUser(payload) {
    return request({
      url: "/user",
      method: "PATCH",
      data: payload,
    });
  }

  static async updateEmail(payload) {
    return request({
      url: "/user/email",
      method: "PATCH",
      data: payload,
    });
  }

  static async updatePhone(payload) {
    return request({
      url: "/user/phone",
      method: "PATCH",
      data: payload,
    });
  }

  static async updatePassword(payload) {
    return request({
      url: "/user/password",
      method: "PATCH",
      data: payload,
    });
  }
}

export default User;
