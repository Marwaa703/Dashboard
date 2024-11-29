import axios from "axios";

/**
 * Axios instance configured for API requests.
 * Includes base configuration for API communication and request/response interceptors.
 */
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor for handling authentication and request modifications
 */
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
