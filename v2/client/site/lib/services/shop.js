import cloudinary from '../cloudinary';
import {
  findShopReviewsById,
  findShopDetailsById,
  registerShop,
  updateShopById,
  findProductById,
  findProductsById,
  createProductById,
  deleteProductById,
  findShopMetrics,
  updateShopPaymentById,
  updateProductById,
} from '../models/shop';

export async function getShopAnalytics(payload) {
  const { product_id } = payload;
  const response = await findShopMetrics({ product_id });
  return response;
}

export async function getShopReviews(payload) {
  const { user_id } = payload;
  const response = await findShopReviewsById({ user_id });
  return response;
}

export async function getShop(payload) {
  const { user_id } = payload;
  const response = await findShopDetailsById({ user_id });
  return response;
}

export async function createShop(payload) {
  const { logo, shopName, description, address1, address2, address3, user_id } = payload;

  try {
    const response = await registerShop({
      logo,
      shopName,
      description,
      address1,
      address2,
      address3,
      user_id,
    });
    return response;
  } catch (error) {
    return false;
  }
}

export async function updateShopPayment(payload) {
  const { validatedAcct, user_id } = payload;

  try {
    const response = await updateShopPaymentById({ validatedAcct, user_id });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateShop(payload) {
  const { title, description, user_id, logo } = payload;

  try {
    const response = await updateShopById({ title, description, user_id, logo });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProduct(payload) {
  const { product_id, user_id } = payload;
  const response = await findProductById({ product_id, user_id });
  return response;
}

export async function getProducts(payload) {
  const { user_id } = payload;
  try {
    const response = await findProductsById({ user_id });
    return response;
  } catch (error) {
    throw new Error('Error finding product');
  }
}

export async function createProduct(payload) {
  try {
    const { constantData, dynamicData, shipping_data } = payload;
    const response = await createProductById({ constantData, dynamicData, shipping_data });

    if (!response) {
      throw new Error('Failed to create product');
    }
    return response;
  } catch (error) {
    console.error(error.message || error);
    throw new Error('Error creating product: ' + error.message);
  }
}

export async function updateProduct(payload) {
  try {
    const { constantData, dynamicData, shipping_data } = payload;
    const response = await updateProductById({ constantData, dynamicData, shipping_data });
    if (!response) {
      throw new Error('Failed to update product');
    }
    return response;
  } catch (error) {
    console.error(error.message || error);
    throw new Error('Error updating product: ' + error.message);
  }
}

export async function deleteProduct(payload) {
  const { product_id, type } = payload;

  try {
    const deleteFolder = async (folderName, resourceType = 'image') => {
      try {
        await cloudinary.api.delete_resources_by_prefix(folderName, {
          resource_type: resourceType,
        });
        const folder = await cloudinary.api.delete_folder(folderName);
        return folder;
      } catch (error) {
        throw new Error('Error deleting Cloudinary folder: ' + error.message);
      }
    };

    await deleteFolder(product_id, type);
    await deleteProductById({ product_id });

    return true;
  } catch (error) {
    throw new Error('Error: ' + error.message);
  }
}
