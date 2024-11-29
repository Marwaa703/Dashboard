import axiosInstance from "./axiosconfig";

export const signup = async (name, email, password) => {
  try {
    const response = await axiosInstance.post("/signup", {
      name,
      email,
      password,
    });
    const { user } = response.data;
    return user;
  } catch (error) {
    console.error("Sign Up failed", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/login", { email, password });
    const { user } = response.data;
    return user;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};
