import { useContext } from "react";
import { UserContext } from "../context/UserContext";

/**
 * Custom hook to access the user context.
 * @returns {Object} User context containing user state and authentication methods
 * @property {Object|null} user - Current user information or null if not logged in
 * @property {Function} login - Function to log in a user
 * @property {Function} logout - Function to log out the current user
 */
export const useUser = () => {
  return useContext(UserContext);
}; 