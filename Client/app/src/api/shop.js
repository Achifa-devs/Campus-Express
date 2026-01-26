import { request } from "../utils/requestHandler";

export class Shop {
    // Create a new shop
    static async createShop(payload) {
        return request({
            url: "/shops",
            method: "POST",
            data: payload,
        });
    }

    // Get all shops (with optional filters)
    static async getShops(params = {}) {
        return request({
            url: "/shops",
            method: "GET",
            params,
        });
    }

    // Get a single shop by ID
    static async getShop(shopId) {
        return request({
            url: `/shops/${shopId}`,
            method: "GET",
        });
    }

    // Update a shop by ID (partial update)
    static async updateShop(shopId, payload) {
        return request({
            url: `/shops/${shopId}`,
            method: "PATCH", // use PUT if replacing everything
            data: payload,
        });
    }

    // Delete a shop by ID
    static async deleteShop(shopId) {
        return request({
            url: `/shops/${shopId}`,
            method: "DELETE",
        });
    }
}
