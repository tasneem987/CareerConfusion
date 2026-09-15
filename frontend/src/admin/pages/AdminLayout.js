import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../../styles/admin.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="admin-app">   {/* ← added this class */}
      <div className="dashboard">
        <Sidebar />
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}