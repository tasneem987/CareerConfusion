import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const links = [
    { to: "/admin", label: "Dashboard", icon: "📊" },
    { to: "/admin/users", label: "Users", icon: "👥" },
    { to: "/admin/majors", label: "Majors", icon: "🎓" },
    { to: "/admin/questions", label: "Questions", icon: "❓" },
    { to: "/admin/community", label: "Community", icon: "🕺" },
    { to: "/admin/analytics", label: "Analytics", icon: "📈" },
  ];

  return (
    <div className="admin-sidebar">
      <div>
        <div className="sidebar-logo">Admin Panel</div>
        <nav className="sidebar-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/admin"}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span>{link.icon}</span> {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
    </div>
  );
}