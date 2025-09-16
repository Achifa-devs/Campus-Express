// src/api/request.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://cs-server-olive.vercel.app", 
  timeout: 10000,
});

// Request interceptor (e.g., add auth token)
api.interceptors.request.use(config => {
  // Example: attach JWT token
  const token = "userTokenFromStorage";
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor (handle errors globally)
api.interceptors.response.use(
  res => res,
  err => {
    console.error("API error:", err);
    throw err;
  }
);

// Generic request handler
export const request = async ({ url, method = "GET", data, params }) => {
  return api({ url, method, data, params }).then(res => res.data);
};
