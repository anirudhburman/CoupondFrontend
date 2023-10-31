import axios from "axios";

const BASE_URL = "http://localhost:8080/coupon"; // Replace with your API base URL

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Adjust the timeout as needed
});

let currentToken = "";

// Create a function to get the token from the Redux store
export const getTokenFromRedux = (token) => {
  if (token) {
    currentToken = `Bearer ${token}`;
    return token;
  }
  return "";
};

api.interceptors.request.use(
  (config) => {
    const receivedToken = currentToken;
    if (receivedToken) {
      config.headers.Authorization = receivedToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const addCoupon = async (coupon, token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.post("/addCoupon", coupon);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCouponByCode = async (couponCode, token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.delete(`/deleteCouponByCode/${couponCode}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCouponById = async (id, token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.delete(`/deleteCouponById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCoupon = async (coupon, token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.put("/updateCoupon", coupon);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCouponById = async (id, token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.get(`/getCouponById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCouponByCouponCode = async (couponCode, token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.get(`/getCouponByCode/${couponCode}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCoupons = async (token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.get("/getAllCoupons");
    return response.data;
  } catch (error) {
    throw error;
  }
};
