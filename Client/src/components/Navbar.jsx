import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

/**
 * Navigation bar component that provides links to different sections of the application.
 * Uses Ant Design's Layout and Menu components for consistent styling.
 */
const Navbar = () => {
  const menuItems = [
    {
      label: <Link to="/dashboard">Home</Link>,
      key: "1",
    },
    {
      label: <Link to="/">Login</Link>,
      key: "2",
    },
  ];

  return (
    <Layout>
      <Header style={{ background: "#333", padding: 0, position: "relative" }}>
        <div
          style={{
            float: "left",
            color: "white",
            fontSize: "20px",
            marginLeft: "20px",
          }}
        >
          Dashboard
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          style={{ lineHeight: "64px", float: "right" }}
        />
      </Header>
    </Layout>
  );
};

export default Navbar;
