import { loadDashboardData } from "../models/dataModel.js";

async function dashboardData(req, res) {
  try {
    const dashboardData = loadDashboardData();
    res.json(dashboardData);
  } catch (error) {
    console.error("Error reading dashboard data:", error);
    res.status(500).json({ error: "Unable to fetch dashboard data" });
  }
}

const dataRoutes = (app) => {
  app.get("/dashboard", dashboardData);
};

export default dataRoutes;
