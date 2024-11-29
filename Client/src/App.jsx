import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { Layout, ConfigProvider, theme } from "antd";
import "./App.css";

const { Content } = Layout;

/**
 * Root application component that handles routing and layout structure.
 * Provides navigation between authentication and dashboard views.
 */
const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#ff5b00',
          colorBgContainer: '#2d2d2d',
          colorBgElevated: '#2d2d2d',
          colorBorder: '#404040',
        },
      }}
    >
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Navbar />
          <Content style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
