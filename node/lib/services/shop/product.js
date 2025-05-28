import { createProductView, findProductById, findProducts, findProductsByCategory, findProductsByCategoryAndGender, findProductsThumbnailById, findProductsType, findProductViewById, updateProductView, updateProductViewForUnkownBuyer } from "../../repositories/shop/product.js";
export const getProduct = async payload => {
  const {
    product_id
  } = payload;

  // Business logic
  const response = await findProductById({
    product_id
  });
  return response;
};
export const getSearch = async payload => {
  let {
    word
  } = payload;
  const response = await findProducts({
    limit: null
  });
  const filteredList = response.filter(item => item.title.toLowerCase().indexOf(word.toLowerCase()) > -1);
  console.log("response: ", filteredList);
  return filteredList;
};
export const getProducts = async payload => {
  let {
    category,
    limit,
    gender
  } = payload;
  let trimmed = atob(category).trim();

  // Ensure limit is a valid number
  limit = parseInt(limit);
  if (isNaN(limit) || limit <= 0) {
    limit = 10; // Set a default limit if invalid
  }
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  let cap_gender = gender ? capitalizeFirstLetter(gender) : '';

  // Business logic
  if (trimmed.toLowerCase() === 'fashion' || trimmed.toLowerCase() === 'lodge & apartments') {
    const response = await findProductsByCategoryAndGender({
      trimmed,
      cap_gender,
      limit
    });
    return response;
  } else if (trimmed.toLowerCase() === 'trends') {
    const response = await findProducts({
      limit
    });
    console.log("response: ", response);
    return response;
  }
  const response = await findProductsByCategory({
    category,
    limit
  });
  return response;
};
export const getProductThumbnail = async payload => {
  const {
    product_id
  } = payload;

  // Business logic
  const response = await findProductsThumbnailById({
    product_id
  });
  return response;
};
export const getProductType = async payload => {
  const {
    category,
    type
  } = payload;

  // Business logic
  try {
    const response = await findProductsType({
      type,
      limit: 40
    });
    return response;
  } catch (error) {
    console.log('error: ', error);
  }
};
export const postProductView = async payload => {
  const {
    product_id,
    buyer_id
  } = payload;

  // Business logic
  let existingView = await findProductViewById({
    product_id,
    buyer_id
  });
  let newView = await createProductView({
    buyer_id,
    product_id
  });
  if (existingView.length > 0) {
    throw new Error("Already viewed");
  } else if (newView < 1) {
    throw new Error("Error occured while updating view");
  }
  let response = await updateProductView({
    product_id
  });
  return response;
};
export const postUpdateProductViewForUnknownCustomer = async payload => {
  const {
    unknown_buyer_id,
    registered_id
  } = payload;

  // Business logic

  const response = await updateProductViewForUnkownBuyer({
    unknown_buyer_id,
    registered_id
  });
  return response;
};