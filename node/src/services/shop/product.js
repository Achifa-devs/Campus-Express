import {
  createProductView, 
  findProductById, 
  findProducts, 
  findProductsByCategory, 
  findProductsByCategoryAndGender, 
  findProductsThumbnailById, 
  findProductsType, 
  findProductViewById, 
  updateProductView, 
  updateProductViewForUnkownBuyer
} from "../../repositories/shop/product.js";

export const getProduct = async (payload) => {
  const { product_id } = payload;

  // Business logic
  const response = await findProductById({ product_id });

  return response;
};

export const getSearch = async (payload) => {
  let { word, purpose, campus } = payload;
 
    
  try {
    const response = await findProducts({ limit: null, purpose, campus });
    const filteredList = response.filter(item => item.title.toLowerCase().indexOf(word.toLowerCase()) > -1);
    return filteredList;
  
  } catch (error) {
    console.log("error: ", error)
    throw new Error("Error: ", error);
  }
};

export const getProducts = async (payload) => {
  let { category, limit, gender, campus, purpose } = payload;
 
  try {
    let trimmed = atob(category).trim();
      
    // Ensure limit is a valid number
    limit = parseInt(limit);
    if (isNaN(limit) || limit <= 0) {
      limit = 10;  // Set a default limit if invalid
    }
  
    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
    let cap_gender = gender ? capitalizeFirstLetter(gender) : '';
  
    // Business logic
    if (purpose === 'product') {
      if (trimmed.toLowerCase() === 'fashion' ) {
        const response = await findProductsByCategoryAndGender({ trimmed, cap_gender, limit, campus, purpose });
    
        return response;
    
      } else if (trimmed.toLowerCase() === 'trends') {
    
        const response = await findProducts({ limit, campus, purpose });
        return response;
    
      } else{
        const response = await findProductsByCategory({ category, limit, campus, purpose });
    
        return response;
      }
    } else if(purpose === 'accomodation'){
      const response = await findProducts({ limit, campus, purpose });
    
      return response;
    }else{
      const response = await findProducts({ limit, campus, purpose });
    
      return response;
    }
  
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


export const getProductType = async (payload) => {
  const { category, type, purpose } = payload;

  // Business logic
  try {
    const response = await findProductsType({ type, limit: 40, purpose });
    return response;

  } catch (error) {
    console.log('error: ', error)
    
  }

};


export const postProductView = async (payload) => {
  const { product_id, user_id } = payload;
  // console.log(product_id,user_id)
  try {
    // Business logic
    let existingView = await findProductViewById({ product_id, user_id });
  
    let newView = await createProductView({ user_id, product_id });
    
    if (existingView.length > 0) {
      throw new Error("Already viewed")
    } else if(newView < 1){
      throw new Error("Error occured while updating view");
    }
    let response = await updateProductView({ product_id });
  
    return response;
  } catch (error) {
    console.log(error)
  }
};


export const postUpdateProductViewForUnknownCustomer = async (payload) => {
  const { unknown_user_id, registered_id } = payload;

  // Business logic
  
  const response = await updateProductViewForUnkownBuyer({ unknown_user_id, registered_id });
  
  return response;
};
