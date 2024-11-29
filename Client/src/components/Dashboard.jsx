import { useEffect, useState } from "react";
import { Card, Row, Col, Button, Spin, Typography } from "antd";
import { useUser } from "../hooks/useUser.js";
import { useNavigate } from "react-router-dom";
import { getData } from "../utils/data.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  ResponsiveContainer as PieResponsiveContainer,
} from "recharts";
import { darkTheme } from '../theme/colors';

const { Title } = Typography;

/**
 * Dashboard component that displays various analytics and statistics.
 * Features multiple visualizations including pie charts and bar charts for data representation.
 * Requires user authentication to view.
 */
const Dashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches dashboard data on component mount.
   * Handles loading states and error scenarios.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData();
        setDashboardData(data);
      } catch (error) {
        setError("Failed to load dashboard data.");
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /**
   * Handles user logout and redirects to login page.
   */
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Transform raw data into chart-compatible format
  const userStatsData = dashboardData?.userStats
    ? [
        { name: "Active", value: dashboardData.userStats.activeUsers },
        { name: "Inactive", value: dashboardData.userStats.inactiveUsers },
      ]
    : [];

  const revenueData = dashboardData?.revenue?.trends
    ? dashboardData.revenue.trends.map((item) => ({
        name: item.date,
        revenue: item.amount,
      }))
    : [];

  return (
    <div style={{ padding: "20px", backgroundColor: darkTheme.primary }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            title="Welcome to the Dashboard" 
            bordered={false}
            style={{ backgroundColor: darkTheme.secondary }}
          >
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={4}>Hello, {user.name}!</Title>
              </Col>
              <Col>
                <Button type="default" onClick={handleLogout}>
                  Logout
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {/* User Stats Card with Pie Chart */}
        <Col xs={24} sm={12} lg={8}>
          <Card 
            title="User Stats" 
            bordered={false} 
            hoverable
            style={{ backgroundColor: darkTheme.secondary }}
          >
            <Row>
              <Col span={24}>
                <PieResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={userStatsData}
                      dataKey="value"
                      outerRadius={80}
                      fill={darkTheme.accent}
                    >
                      {userStatsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? darkTheme.accent : darkTheme.border}
                        />
                      ))}
                    </Pie>
                    <PieTooltip />
                  </PieChart>
                </PieResponsiveContainer>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                Total Users: {dashboardData?.userStats?.totalUsers}
              </Col>
              <Col span={12}>
                Active Users: {dashboardData?.userStats?.activeUsers}
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Revenue Stats Card with Bar Chart */}
        <Col xs={24} sm={12} lg={8}>
          <Card 
            title="Revenue Stats" 
            bordered={false} 
            hoverable
            style={{ backgroundColor: darkTheme.secondary }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkTheme.border} />
                <XAxis dataKey="name" stroke={darkTheme.text.secondary} />
                <YAxis stroke={darkTheme.text.secondary} />
                <Tooltip 
                  contentStyle={{ backgroundColor: darkTheme.secondary }}
                />
                <Legend />
                <Bar dataKey="revenue" fill={darkTheme.accent} />
              </BarChart>
            </ResponsiveContainer>
            <Row>
              <Col span={12}>
                Total Revenue: ${dashboardData?.revenue?.totalRevenue}
              </Col>
              <Col span={12}>
                Daily Revenue: ${dashboardData?.revenue?.dailyRevenue}
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Top Products Card */}
        <Col xs={24} lg={8}>
          <Card title="Top Products" bordered={false} hoverable>
            <ul>
              {dashboardData?.topProducts?.map((product, index) => (
                <li key={index}>
                  {product.name}: {product.sold} sold
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders Section */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Card title="Recent Orders" bordered={false} hoverable>
            <ul>
              {dashboardData?.recentOrders?.map((order) => (
                <li key={order.id}>
                  Order ID: {order.id} | Customer: {order.customer} | Product:{" "}
                  {order.product} | Amount: ${order.amount} | Date: {order.date}
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
