import express from "express";
const app = express();
import userRoutes from "./Handlers/authHandler.js";
import dataRoutes from "./Handlers/dataHandler.js";
import cors from "cors";

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("Server is running.....");
});

userRoutes(app);
dataRoutes(app);

const server = `http://localhost:${PORT}`;
app.listen(PORT, () => {
  console.log(`Server is running on ${server}`);
});
