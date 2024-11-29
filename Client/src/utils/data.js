import axiosInstance from "./axiosconfig";

/**
 * Fetches dashboard data from the API
 * @returns {Promise<Object>} Dashboard data including user stats, revenue, and other analytics
 * @throws {Error} When the API request fails
 */
export const getData = async () => {
  try {
    const response = await axiosInstance.get("/dashboard");
    return response.data;
  } catch (error) {
    console.error("Fetching Data failed", error);
    throw error;
  }
};
