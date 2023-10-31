import axios from "axios";

const BASE_URL = "http://localhost:8080/user"; // Replace with your API base URL

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Adjust the timeout as needed
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

export const registerUser = async (user) => {
  try {
    const response = await api.post("/registerUser", user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerAdmin = async (user, token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.post("/registerAdmin", user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.get("/getAllUsers");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserByUsername = async (username, token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.get(`/getUserByUsername/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id, token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.get(`/getUserById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (user, token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.put("/updateUser", user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserByUsername = async (username, token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.delete(`/deleteUserByUsername/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async (id, token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.delete(`/deleteUserById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCouponsByUserId = async (id, token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.get(`/getCouponsByUserId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const buyCoupon = async (username, coupons, token) => {
  try {
    getTokenFromRedux(token);
    const response = await api.post(`/buyCoupon/${username}`, coupons);
    return response.data;
  } catch (error) {
    throw error;
  }
};
