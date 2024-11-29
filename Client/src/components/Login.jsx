import { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { login as apiLogin } from "../utils/auth";
import { useUser } from "../hooks/useUser.js";
import { darkTheme } from '../theme/colors';

const { Text } = Typography;

/**
 * Login component for user authentication.
 * Handles user login with email/password and provides feedback.
 * Redirects to dashboard upon successful login.
 */
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, login } = useUser();

  /**
   * Processes the login form submission
   * @param {Object} values - Contains email and password from the form
   */
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { email, password } = values;
      const loggedInUser = await apiLogin(email, password);
      login(loggedInUser);
      message.success(`Welcome, ${loggedInUser.name}`);
      navigate("/dashboard");
    } catch (error) {
      message.error("Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkTheme.primary,
        color: darkTheme.text.primary,
        flexDirection: "column",
        gap: "20px"
      }}>
        <div style={{
          backgroundColor: darkTheme.secondary,
          padding: "32px 48px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          minWidth: "300px"
        }}>
          <div style={{
            fontSize: "1.2rem",
            fontWeight: "500",
            color: darkTheme.text.primary,
            marginBottom: "8px"
          }}>
            You are already logged in...
          </div>
          
          <Button 
            type="primary"
            onClick={() => navigate('/dashboard')}
            style={{
              backgroundColor: darkTheme.accent,
              border: "none",
              height: "40px",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: "500"
            }}
            hover={{
              backgroundColor: `${darkTheme.accent}dd`
            }}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-form-container">
      <h2 style={{ color: darkTheme.text.primary , textAlign:"center" }}>Welcome Back</h2>
      <Form name="login" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password should be at least 6 characters!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Log in
          </Button>
        </Form.Item>
      </Form>

      <Typography.Paragraph style={{ textAlign: "center", marginTop: 16 }}>
        <Text>
          Do not have an account?
          <Link
            to="/signup"
            style={{ marginLeft: 5, fontWeight: "bold", color: "#1890ff" }}
          >
            Sign up
          </Link>
        </Text>
      </Typography.Paragraph>
    </div>
  );
};

export default Login;
