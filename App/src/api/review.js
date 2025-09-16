import { request } from "../utils/requestHandler";

export class ProductReview {
  // Create a review for a product
  static async createReview(productId, payload) {
    return request({
      url: `/products/${productId}/reviews`,
      method: "POST",
      data: payload,
    });
  }

  // Get all reviews for a product
  static async getReviews(productId, params = {}) {
    return request({
      url: `/products/${productId}/reviews`,
      method: "GET",
      params,
    });
  }

  // Get a single review by ID
  static async getReview(productId, reviewId) {
    return request({
      url: `/products/${productId}/reviews/${reviewId}`,
      method: "GET",
    });
  }

  // Update a review
  static async updateReview(productId, reviewId, payload) {
    return request({
      url: `/products/${productId}/reviews/${reviewId}`,
      method: "PATCH",
      data: payload,
    });
  }

  // Delete a review
  static async deleteReview(productId, reviewId) {
    return request({
      url: `/products/${productId}/reviews/${reviewId}`,
      method: "DELETE",
    });
  }
}

export default ProductReview;
