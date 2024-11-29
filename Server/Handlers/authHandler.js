import { signup, login } from "../models/authModel.js";

// Handle signup requests
async function handleSignup(req, res) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await signup({ email, password, name });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Handle login requests
async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await login({ email, password });
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const userRoutes = (app) => {
  app.post("/signup", handleSignup);
  app.post("/login", handleLogin);
};

export default userRoutes;
