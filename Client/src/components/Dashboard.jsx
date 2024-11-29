import { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Typography } from "antd";
import { useUser } from "../hooks/useUser.js";
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
import { darkTheme } from "../theme/colors";

const { Title } = Typography;

/**
 * Dashboard component that displays various analytics and statistics.
 * Features multiple visualizations including pie charts and bar charts for data representation.
 * Requires user authentication to view.
 */
const Dashboard = () => {
  const { user } = useUser();

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

  if (!user) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: darkTheme.primary,
          color: darkTheme.text.primary,
          fontSize: "1.2rem",
          fontWeight: 500,
          padding: "20px",
          textAlign: "center",
          borderRadius: "8px",
        }}
      >
        Please log in to view your dashboard.
      </div>
    );
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
    <div
      style={{
        padding: "24px",
        backgroundColor: darkTheme.primary,
        minHeight: "100vh",
      }}
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card
            title={
              <span style={{ color: darkTheme.text.primary }}>
                Welcome to the Dashboard
              </span>
            }
            bordered={false}
            style={{
              backgroundColor: darkTheme.secondary,
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Row justify="space-between" align="middle">
              <Col>
                <Title
                  level={4}
                  style={{
                    color: darkTheme.text.primary,
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  Hello, {user.name}!
                </Title>
              </Col>
              <Col></Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            title={
              <span style={{ color: darkTheme.text.primary }}>User Stats</span>
            }
            bordered={false}
            hoverable
            style={{
              backgroundColor: darkTheme.secondary,
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            headStyle={{
              backgroundColor: darkTheme.secondary,
              borderBottom: `1px solid ${darkTheme.border}`,
            }}
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
                          fill={
                            index === 0 ? darkTheme.accent : darkTheme.border
                          }
                        />
                      ))}
                    </Pie>
                    <PieTooltip />
                  </PieChart>
                </PieResponsiveContainer>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "16px",
                color: darkTheme.text.secondary,
                fontSize: "0.9rem",
              }}
            >
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
            title={
              <span style={{ color: darkTheme.text.primary }}>
                Revenue Stats
              </span>
            }
            bordered={false}
            hoverable
            style={{
              backgroundColor: darkTheme.secondary,
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            headStyle={{
              backgroundColor: darkTheme.secondary,
              borderBottom: `1px solid ${darkTheme.border}`,
            }}
          >
            <div style={{ width: "100%", height: "300px" }}>
              <ResponsiveContainer>
                <BarChart data={revenueData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={darkTheme.border}
                  />
                  <XAxis
                    dataKey="name"
                    stroke={darkTheme.text.secondary}
                    tick={{ fill: darkTheme.text.secondary }}
                  />
                  <YAxis
                    stroke={darkTheme.text.secondary}
                    tick={{ fill: darkTheme.text.secondary }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkTheme.secondary,
                      border: `1px solid ${darkTheme.border}`,
                      borderRadius: "4px",
                    }}
                    labelStyle={{ color: darkTheme.text.primary }}
                    itemStyle={{ color: darkTheme.text.secondary }}
                  />
                  <Legend
                    wrapperStyle={{
                      color: darkTheme.text.secondary,
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill={darkTheme.accent}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <Row
              style={{
                marginTop: "16px",
                color: darkTheme.text.secondary,
                fontSize: "0.9rem",
              }}
            >
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

        {/* Recent Orders Section */}
        <Col span={24}>
          <Card
            title={
              <span style={{ color: darkTheme.text.primary }}>
                Recent Orders
              </span>
            }
            bordered={false}
            hoverable
            style={{
              backgroundColor: darkTheme.secondary,
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            headStyle={{
              backgroundColor: darkTheme.secondary,
              borderBottom: `1px solid ${darkTheme.border}`,
            }}
          >
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                color: darkTheme.text.secondary,
              }}
            >
              {dashboardData?.recentOrders?.map((order) => (
                <li
                  key={order.id}
                  style={{
                    padding: "12px",
                    borderBottom: `1px solid ${darkTheme.border}`,
                    fontSize: "0.9rem",
                  }}
                >
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
