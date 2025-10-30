const {
  findShopReviewsById,
  findShopDetailsById,
  registerShop,
  updateShopById,
  findProductById,
  findProductsById,
  createProductById,
  deleteProductById,
  findShopMetrics,
  updateShopPaymentById
} = require('../models/shop')


const v2 = require('../config/cloudinary')

exports.getShopAnalytics = async function (payload) {
  const { product_id } = payload;
  // Business logic
  const response = await findShopMetrics({ product_id });
  return response;
};

exports.getShopReviews = async function  (payload) {
  const { user_id } = payload;
  // Business logic
  const response = await findShopReviewsById({ user_id });
  return response;
};

exports.getShop = async function (payload) {
  const { user_id } = payload;
  // Business logic
  const response = await findShopDetailsById({ user_id });
  return response;
};

exports.createShop = async function (payload) {
  const { 
    logo,
    shopName,
    description,
    address1,
    address2,
    address3,
    user_id
   } = payload;

  // Business logic
  try {
    const response = await registerShop({ 
      logo,
      shopName,
      description,
      address1,
      address2,
      address3,
      user_id
    });
  
    return response;
  } catch (error) {
    return false
  }
};

exports.updateShopPayment = async function (payload) {
  const { validatedAcct, user_id } = payload;

  try {
    // Business logic
    const response = await updateShopPaymentById({ validatedAcct, user_id });
    return response;
  } catch (error) {
    console.log(error)
  }
};

exports.updateShop = async function (payload) {
  const { title, description, user_id, logo } = payload;

  try {
    // Business logic
    const response = await updateShopById({ title, description, user_id, logo });
    return response;
  } catch (error) {
    console.log(error)
  }
};

exports.getProduct = async function (payload) {
    const { product_id, user_id } = payload;
    // Business logic
    const response = await findProductById({ product_id, user_id });
    return response;
};

exports.getProducts = async function (payload) {
    let { user_id } = payload;
    // Business logic
    try {
      const response = await findProductsById({ user_id });
      return response;
    } catch (error) {
      throw new Error("Error finding product");
    }
};

exports.createProduct = async function (payload) {
  try {
    const { constantData, dynamicData, shipping_data } = payload;
    // const { user_id } = constantData;

    // Create the product
    const response = await createProductById({ constantData, dynamicData, shipping_data });

    if (!response) {
      throw new Error("Failed to create product");
    }
    return response;
  } catch (error) {
    console.error(error.message || error);
    throw new Error("Error creating product: ", error);
    
  }
};

exports.updateProduct = async function (payload) {
   try {
        const { constantData, dynamicData, shipping_data } = payload;
        // Business logic
        const response = await updateProductById({ constantData, dynamicData, shipping_data });
        if (!response) {
            throw new Error("Failed to update product");
        }
        return response;
   } catch (error) {
        console.error(error.message || error);
        throw new Error("Error updating product: ", error);
   }
};

exports.deleteProduct = async function (payload) {
  const { product_id, type } = payload;

  try {
    const deleteFolder  = async(folderName, resourceType = 'image') => {
      try {
        // Delete all resources inside the folder
        const resources = await cloudinary.api.delete_resources_by_prefix(folderName, {
          resource_type: resourceType,
        });
        // Delete the folder itself
        const folder = await v2.api.delete_folder(folderName);
        return { resources, folder };
      } catch (error) {
        throw new Error("Error deleting Cloudinary folder:", error);
      }
    };
    await deleteFolder(product_id, type);
    // await deleteProductPromotion({product_id});
    await deleteProductById({product_id});

    return true;
  } catch (error) {
    throw new Error("Error: ", error);
  }

};
