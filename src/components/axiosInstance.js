// axiosInstance.js
import axios from "axios";
import { BASE_URL } from "../settings";

const axiosInstance = axios.create({
  baseURL: BASE_URL, // e.g., "http://localhost:5000"
  withCredentials: true,  // This ensures cookies are sent with each request
});

export default axiosInstance;