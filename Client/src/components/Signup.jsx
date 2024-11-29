import { Form, Input, Button, message, Typography } from "antd";
import { signup } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";

const { Text } = Typography;

/**
 * Signup component that handles new user registration.
 * Features form validation, password confirmation, and redirects to login upon successful signup.
 */
const Signup = () => {
  const navigate = useNavigate();

  /**
   * Handles form submission for user registration.
   * @param {Object} values - Form values containing name, email, and password
   */
  const onFinish = async (values) => {
    try {
      const { name, email, password } = values;
      await signup(name, email, password);
      navigate("/");
      message.success("Signup successful! You can now log in.");
    } catch (error) {
      message.error("Signup failed! Please try again.");
    }
  };

  /**
   * Custom validator for password confirmation.
   * Ensures the confirmation password matches the original password.
   */
  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Passwords do not match!"));
    },
  });

  return (
    <div className="signup-form-container">
      <h2>Signup</h2>
      <Form name="signup" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

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

        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            validateConfirmPassword,
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <Typography.Paragraph style={{ textAlign: "center", marginTop: 16 }}>
        <Text>
          Have an account?
          <Link
            to="/"
            style={{ marginLeft: 5, fontWeight: "bold", color: "#1890ff" }}
          >
            Log In
          </Link>
        </Text>
      </Typography.Paragraph>
    </div>
  );
};

export default Signup;
