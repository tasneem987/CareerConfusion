import { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const api = axios.create({ baseURL: "http://localhost:5000" });
api.interceptors.request.use((config) => {
  config.headers["user-role"] = JSON.parse(localStorage.getItem("user"))?.role;
  return config;
});

const COLORS = [
  "#4f46e5", "#8e44ad", "#10b981", "#f59e0b", "#ef4444", "#f97316",
  "#84cc16", "#06b6d4", "#d946ef", "#e11d48", "#4facfe", "#f093fb",
];

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ users: 0, majors: 0, tests: 0 });
  const [roleData, setRoleData] = useState(null);
  const [majorCategoryData, setMajorCategoryData] = useState(null);
  const [dailyTestsData, setDailyTestsData] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, roleRes, majorCatRes, dailyRes] = await Promise.all([
          api.get("/api/admin/stats"),
          api.get("/api/admin/analytics/users/role"),
          api.get("/api/admin/analytics/majors/category"),
          api.get("/api/admin/analytics/tests/daily"),
        ]);

        setStats(statsRes.data);

        // Role distribution
        setRoleData({
          labels: roleRes.data.map(d => d.role || "Unknown"),
          datasets: [
            {
              data: roleRes.data.map(d => d.count),
              backgroundColor: COLORS.slice(0, roleRes.data.length),
            },
          ],
        });

        // Majors by category
        setMajorCategoryData({
          labels: majorCatRes.data.map(d => d.category),
          datasets: [
            {
              label: "Number of Majors",
              data: majorCatRes.data.map(d => d.count),
              backgroundColor: COLORS.slice(0, majorCatRes.data.length),
            },
          ],
        });

        // Tests per day (line chart)
        setDailyTestsData({
          labels: dailyRes.data.map(d => d.day),
          datasets: [
            {
              label: "Tests Taken",
              data: dailyRes.data.map(d => d.count),
              borderColor: "#4f46e5",
              backgroundColor: "rgba(79, 70, 229, 0.2)",
              tension: 0.2,
              fill: true,
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to load analytics. Ensure you are an admin.");
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading analytics...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div>
      <h2>Admin Analytics Dashboard</h2>

      {/* Summary Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <h4>👥 Total Users</h4>
          <p>{stats.users}</p>
        </div>
        <div className="stat-card">
          <h4>🎓 Total Majors</h4>
          <p>{stats.majors}</p>
        </div>
        <div className="stat-card">
          <h4>📝 Tests Taken</h4>
          <p>{stats.tests}</p>
        </div>
      </div>

      {/* Three Real Analytics Charts */}
      <div className="analytics-grid">
  <div className="analytics-card">
    <div className="analytics-card-header">
      <span className="analytics-card-icon">👥</span>
      <h5 className="analytics-card-title">Users by Role</h5>
    </div>
    <div className="analytics-card-body">
      <Doughnut data={roleData} options={{
              plugins: {
                legend: { position: "bottom" },
              },
            }}
          />
          </div>
        </div>

        <div className="analytics-card">
    <div className="analytics-card-header">
      <span className="analytics-card-icon">🎓</span>
      <h5 className="analytics-card-title">Majors by Category</h5>
    </div>
    <div className="analytics-card-body">
      <Bar data={majorCategoryData} options={{
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } },
            }}
          />
          </div>
        </div>

         <div className="analytics-card">
    <div className="analytics-card-header">
      <span className="analytics-card-icon">📈</span>
      <h5 className="analytics-card-title">Tests Taken (Last 30 Days)</h5>
    </div>
    <div className="analytics-card-body">
      <Line data={dailyTestsData} options={{
              plugins: { legend: { display: false } },
              scales: {
                y: { beginAtZero: true },
                x: {
                  ticks: { maxTicksLimit: 10 },
                },
              },
            }}
          />
          </div>
        </div>
      </div>
    </div>
  );
}