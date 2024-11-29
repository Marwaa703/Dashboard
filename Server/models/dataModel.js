import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadDashboardData = () => {
  const filePath = path.join(__dirname, "..", "data", "data.json");
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
};
