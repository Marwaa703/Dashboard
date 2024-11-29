import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "..", "data", "users.json");

// Helper function to read users from the JSON file
function readUsers() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
  }
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
}

// Helper function to write users to the JSON file
function writeUsers(users) {
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
}

// Signup method
async function signup({ email, password, name }) {
  const users = readUsers();
  if (users.find((user) => user.email === email)) {
    throw new Error("Email is already registered");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  writeUsers(users);

  return { id: newUser.id, name: newUser.name, email: newUser.email };
}

// Login method
async function login({ email, password }) {
  const users = readUsers();

  const user = users.find((user) => user.email === email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  return { id: user.id, name: user.name, email: user.email };
}

export { signup, login };
