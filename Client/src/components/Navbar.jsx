import { Layout, Menu, Button, Avatar, Dropdown } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { darkTheme } from "../theme/colors";
import { useUser } from "../hooks/useUser";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
//responsiveness

const { Header } = Layout;

/**
 * Navigation bar component that provides links to different sections of the application.
 * Uses Ant Design's Layout and Menu components for consistent styling.
 */
const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const userMenuItems = [
    {
      key: "logout",
      label: <span onClick={logout}>Logout</span>,
    },
    {
      key: "login",
      label: <span onClick={() => navigate("/")}>Login</span>,
    },
  ];


  return (
    <Header
      style={{
        background: darkTheme.secondary,
        padding: "0 16px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px",
      }}
    >
      <Link
        to={user ? "/dashboard" : "/"}
        className="dashboard-link"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            color: darkTheme.accent,
            fontSize: "24px",
            fontWeight: "bold",
            letterSpacing: "0.5px",
          }}
        >
          Dashboard
        </div>
      </Link>

      <Button
        className="mobile-menu-button"
        icon={<MenuOutlined />}
        onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
        style={{
          display: "none",
          "@media (max-width: 768px)": {
            display: "none",
          },
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          "@media (max-width: 768px)": {
            display: mobileMenuVisible ? "flex" : "none",
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            flexDirection: "column",
            background: darkTheme.secondary,
            padding: "16px",
            gap: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          },
        }}
      >
        {user ? (
          <>
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  transition: "background-color 0.3s",
                  ":hover": {
                    backgroundColor: darkTheme.primary,
                  },
                }}
              >
                <Avatar
                  style={{
                    backgroundColor: darkTheme.accent,
                    color: darkTheme.text.primary,
                  }}
                  icon={<UserOutlined />}
                />
                <span
                  style={{
                    color: darkTheme.text.primary,
                    fontSize: "14px",
                  }}
                >
                  {user.name}
                </span>
              </div>
            </Dropdown>
          </>
        ) : (
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={[
              {
                label: <Link to="/">Login</Link>,
                key: "/",
              },
              {
                label: <Link to="/signup">Sign Up</Link>,
                key: "/signup",
              },
            ]}
            style={{
              background: "transparent",
              border: "none",
              minWidth: "200px",
              display: "flex",
              justifyContent: "flex-end",
            }}
            theme="dark"
          />
        )}
      </div>
    </Header>
  );
};

export default Navbar;
