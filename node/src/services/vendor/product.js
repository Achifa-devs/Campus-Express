import { v2 as cloudinary } from 'cloudinary';

import {
  createProduct, 
  deleteProduct, 
  findProductById, 
  deleteProductPromotion,
  findProducts, 
  findProductsThumbnailById, 
  updateAdQuota, 
  updateProduct
} from "../../repositories/vendor/product.js";

export const getProduct = async (payload) => {
    const { product_id, user_id } = payload;

    // Business logic
    const response = await findProductById({ product_id, user_id });

    return response;
};


export const getProducts = async (payload) => {
    let { user_id } = payload;
    // Business logic
    try {
        const response = await findProducts({ user_id });
        console.log(response)
    
        return response;
    } catch (error) {
        console.log(error)
        
    }
};


export const getProductThumbnail = async (payload) => {
    const { product_id } = payload;

    // Business logic
    const response = await findProductsThumbnailById({ product_id });

    return response;
};


export const postProduct = async (payload) => {
  try {
    const { constantData, dynamicData, shipping_data } = payload;
    const { user_id } = constantData;

    // Create the product
    const response = await createProduct({ constantData, dynamicData, shipping_data });

    if (!response) {
      throw new Error("Failed to create product");
    }

    // Update ad quota
    const info = await updateAdQuota({ user_id });

    if (!info) {
      throw new Error("Failed to update ad quota");
    }

    return info;
  } catch (error) {
    console.error(error.message || error);
    return false; // return false on failure so caller can handle it
  }
};




export const postUpdateProduct = async (payload) => {
    const { constantData, dynamicData, shipping_data } = payload;

    // Business logic
    const response = await updateProduct({ constantData, dynamicData, shipping_data });

    return response;
};


export const postDeleteProduct = async (payload) => {
  const { product_id, type } = payload;

  try {
    const deleteFolder = async (folderName, resourceType = 'image') => {
      try {
        // Delete all resources inside the folder
        const resources = await cloudinary.api.delete_resources_by_prefix(folderName, {
          resource_type: resourceType,
        });
  
        console.log("Deleted resources:", resources);
  
        // Delete the folder itself
        const folder = await cloudinary.api.delete_folder(folderName);
        console.log("Deleted folder:", folder);
  
        return { resources, folder };
      } catch (error) {
        console.error("Error deleting Cloudinary folder:", error);
        throw error;
      }
    };
    // await deleteFolder(product_id, type);
    await deleteProductPromotion({product_id});
    await deleteProduct({product_id});

    return true;
  } catch (error) {
    console.log("error: ", error);
    throw new Error("Error: ", error);
  }

};
