import {
  findProductById,
  findProducts,
  findProductsByType,
  findProductsBySearchQuery,
} from '../models/product';

export async function getProduct(payload) {
  const { product_id } = payload;
  const response = await findProductById({ product_id });
  return response;
}

export async function getProducts(payload) {
  const { gender, limit = 30 } = payload;
  const response = await findProducts({ gender, limit });
  return response;
}

export async function getProductType(payload) {
  const { c_type, gender } = payload;
  const response = await findProductsByType({ c_type, gender });
  return response;
}

export async function getProductSearchQuery(payload) {
  const { query, gender } = payload;
  const response = await findProductsBySearchQuery({ query, gender });
  return response;
}
