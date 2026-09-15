import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
      document.body.classList.toggle("sidebar-collapsed", saved === "true");
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState);
    document.body.classList.toggle("sidebar-collapsed", newState);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h3 className="logo-text">🎓 Major Compass</h3>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? "▶" : "◀"}
        </button>
      </div>

      <ul>
        <li onClick={() => navigate("/dashboard")} className={isActive("/dashboard") ? "active" : ""}>
          <span className="icon">🏠</span>
          <span className="text">Home</span>
        </li>
        <li onClick={() => navigate("/majors")} className={isActive("/majors") ? "active" : ""}>
          <span className="icon">📚</span>
          <span className="text">Majors</span>
        </li>
        <li onClick={() => navigate("/quiz")} className={isActive("/quiz") ? "active" : ""}>
          <span className="icon">📝</span>
          <span className="text">Career Quiz</span>
        </li>
        <li onClick={() => navigate("/community")} className={isActive("/community") ? "active" : ""}>
          <span className="icon">💬</span>
          <span className="text">Community</span>
        </li>
        <li onClick={() => navigate("/aichat")} className={isActive("/aichat") ? "active" : ""}>
          <span className="icon">🤖</span>
          <span className="text">AI Chat</span>
        </li>
        <li onClick={() => navigate("/saved")} className={isActive("/saved") ? "active" : ""}>
          <span className="icon">⭐</span>
          <span className="text">Saved</span>
        </li>
        <li onClick={() => navigate("/profile")} className={isActive("/profile") ? "active" : ""}>
          <span className="icon">👤</span>
          <span className="text">Profile</span>
        </li>
        <li className="logout" onClick={() => setShowModal(true)}>
          <span className="icon">🚪</span>
          <span className="text">Sign Out</span>
        </li>
      </ul>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Log out?</h3>
            <p>Are you sure you want to leave your session?</p>
            <div className="modal-buttons">
              <button className="cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="confirm" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}