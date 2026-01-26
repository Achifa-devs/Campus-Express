const { 
    findProductById, 
    findProducts, 
    findProductsByType, 
    findProductsBySearchQuery 
} = require("../models/product");


exports.getProduct = async function (payload) {
  const { product_id } = payload;
  const response = await findProductById({ product_id });
  return response;
};

exports.getProducts = async function (payload) {
  const { gender, limit = 30 } = payload; // ✅ give limit a default value
  const response = await findProducts({ gender, limit });
  return response;
};

exports.getProductType = async function (payload) {
  const { c_type, gender } = payload;
  const response = await findProductsByType({ c_type, gender });
  return response;
};

exports.getProductSearchQuery = async function (payload) {
  const { query, gender } = payload;
  // ✅ fix function name (your earlier version used findProductsSearchQuery, not findProductsBySearchQuery)
  const response = await findProductsBySearchQuery({ query, gender });
  return response;
};
