import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { UserContext } from "./UserContext";

/**
 * Provider component for managing user authentication state.
 * Handles user persistence through localStorage and provides login/logout functionality.
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the user context
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize user state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /**
   * Logs in a user by storing their information in state and localStorage
   * @param {Object} user - User information object
   */
  const login = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  /**
   * Logs out the current user by clearing their information from state and localStorage
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
