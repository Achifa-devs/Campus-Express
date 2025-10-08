const maxAge = 90 * 24 * 60 * 60; 
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config()

export const generateCustomerJwtToken = (id) => {
    return jwt.sign({ id }, 'kdiU$28Fs!9shF&2xZpD3Q#1gLx@R7TkWzPq', {
       expiresIn: maxAge
    });
};

export const generateVendorJwtToken = (id) => {
    return jwt.sign({ id }, 'kdiU$28Fs!9shF&2xZpD3Q#1gLx@R7TkWzPq', {
       expiresIn: maxAge
    });
};


export function generateNumericToken() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

// Example usage: