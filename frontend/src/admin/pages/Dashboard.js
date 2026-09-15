import { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const api = axios.create({ baseURL: "http://localhost:5000" });
api.interceptors.request.use((config) => {
  config.headers["user-role"] = JSON.parse(localStorage.getItem("user"))?.role;
  return config;
});

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, majors: 0, tests: 0 });
  const [chartData, setChartData] = useState([]);
  const [topMajors, setTopMajors] = useState([]);

  useEffect(() => {
    api.get("/api/admin/stats").then(res => setStats(res.data)).catch(console.error);
    api.get("/api/admin/chart").then(res => setChartData(res.data)).catch(console.error);
    // NEW: fetch top saved majors
    api.get("/api/admin/analytics/majors/top-saved")
      .then(res => setTopMajors(res.data))
      .catch(console.error);
  }, []);

  const interestData = {
    labels: chartData.map(i => i.name),
    datasets: [
      {
        label: "Users by Interest",
        data: chartData.map(i => i.count),
        backgroundColor: "#4facfe",
      },
    ],
  };

  const majorsData = {
    labels: topMajors.map(i => i.major_name),
    datasets: [
      {
        label: "Times Saved",
        data: topMajors.map(i => i.saves),
        backgroundColor: "#8e44ad",
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="hero" style={{ marginTop: 20 }}>
        <h1>Manage Your Platform</h1>
        <p>
          Monitor users, manage majors and questions, and analyze platform
          performance.
        </p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <h4>Total Users</h4>
          <p>{stats.users}</p>
        </div>
        <div className="stat-card">
          <h4>Majors</h4>
          <p>{stats.majors}</p>
        </div>
        <div className="stat-card">
          <h4>Tests Taken</h4>
          <p>{stats.tests}</p>
        </div>
      </div>

      {/* Two charts side by side */}
      <div style={{ display: "flex", gap: "25px", marginTop: "30px", flexWrap: "wrap" }}>
        <div className="chart-wrapper" style={{ flex: "1 1 45%", minWidth: "300px" }}>
          <h3>User Interests (Test Results)</h3>
          <Bar data={interestData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
        <div className="chart-wrapper" style={{ flex: "1 1 45%", minWidth: "300px" }}>
          <h3>Most Saved Majors</h3>
          <Bar data={majorsData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
      </div>
    </div>
  );
}