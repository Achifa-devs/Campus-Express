import {
  createProduct, 
  deleteProduct, 
  findProductById, 
  findProducts, 
  findProductsThumbnailById, 
  updateProduct
} from "../../repositories/vendor/product.js";

export const getProduct = async (payload) => {
    const { product_id, seller_id } = payload;

    // Business logic
    const response = await findProductById({ product_id, seller_id });

    return response;
};


export const getProducts = async (payload) => {
    let { seller_id } = payload;
    
    // Business logic
    const response = await findProducts({ seller_id });

    return response;
};


export const getProductThumbnail = async (payload) => {
    const { product_id } = payload;

    // Business logic
    const response = await findProductsThumbnailById({ product_id });

    return response;
};


export const postProduct = async (payload) => {
    const { constantData, dynamicData, shipping_data } = payload;

    // Business logic
    let response = await createProduct({ constantData, dynamicData, shipping_data });

    return response;
};


export const postUpdateProduct = async (payload) => {
    const { constantData, dynamicData, shipping_data } = payload;

    // Business logic
    const response = await updateProduct({ constantData, dynamicData, shipping_data });

    return response;
};


export const postDeleteProduct = async (payload) => {
    const { product_id } = payload;

    // Business logic
    const response = await deleteProduct({ product_id });
    // DELETE product thumbnail from cloudinary

    return response;
};
