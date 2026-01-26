import { request } from "../utils/requestHandler";

export class Favourite {
    // Create a new product offer
    static async createFavourite(payload) {
        return request({
            url: "/favourite",
            method: "POST",
            data: payload,
        });
    }

    // Get all products (inventory)
    static async getFavourites(user_id) {
        return request({
            url: "/favourites",
            method: "GET",
            params: {user_id}, // query parameters, not body data
        });
    }

    // Get a single product by ID
    static async getFavourite(user_id, product_id) {
        return request({
            url: `/favourite`,
            method: "GET",
            params: {user_id, product_id}
        });
    }

    // Delete a product offer
    static async deleteFavourite({ user_id, product_id }) {
        return request({
            url: `/favourite?user_id=${user_id}&product_id=${product_id}`,
            method: "DELETE",
        });
    }

}
