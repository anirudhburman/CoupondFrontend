import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Replace with your API base URL

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Adjust the timeout as needed
});

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Headers"] =
  "Origin, X-Requested-With, Content-Type, Accept";

export const loginUser = async (loginRequest) => {
  try {
    const response = await api.post("/app/login", loginRequest);
    return response.data;
  } catch (error) {
    throw error;
  }
};
