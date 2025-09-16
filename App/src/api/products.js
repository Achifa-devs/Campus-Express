import { request } from "../utils/requestHandler";

export class Product {
    // Create a new product offer
    static async createOffer(payload) {
        return request({
            url: "/products",
            method: "POST",
            data: payload,
        });
    }

    // Get all products (inventory)
    static async getInventory(params = {}) {
        return request({
            url: "/products",
            method: "GET",
            params, // query parameters, not body data
        });
    }

    // Get a single product by ID
    static async getOffers(campus, option) {
        // Map option → purpose
        const purposeMap = {
            Products: "product",
            Lodges: "accomodation",
            Services: "service",
        };

        const params = new URLSearchParams({
            limit: 20,
            category: btoa("trends"),
            ...(campus !== "All campus" && { campus }), // only add if not "All campus"
            purpose: purposeMap[option] || "service", // fallback to service
        });

        return request({
            url: `/trends?${params.toString()}`,
            method: "GET",
        });
    }

    static async getOffer(productId) {
        return request({
            url: `/products/${productId}`,
            method: "GET",
        });
    }

    // Update a product offer (partial update)
    static async updateOffer(productId, payload) {
        return request({
            url: `/products/${productId}`,
            method: "PATCH", // or PUT if you want full replacement
            data: payload,
        });
    }

    // Delete a product offer
    static async deleteOffer(productId) {
        return request({
            url: `/products/${productId}`,
            method: "DELETE",
        });
    }
}
