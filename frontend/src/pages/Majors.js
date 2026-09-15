import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../components/API";
import { toast } from "react-toastify";
import "../styles/Majors.css";
import VoiceInput from "../components/VoiceInput";

export default function Majors() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [majors, setMajors] = useState([]);
  const [saved, setSaved] = useState([]);

  const navigate = useNavigate();

  const getUser = () => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  };

  const categories = [
    "All",
    "Technology",
    "Business",
    "Engineering",
    "Health",
    "Arts & Design",
  ];

  const loadMajors = useCallback(async () => {
    try {
      const res = await api.get("/api/majors");
      setMajors(res.data);
    } catch (err) {
      console.error("Error loading majors:", err);
    }
  }, []);

  const loadSavedMajors = useCallback(async () => {
    const user = getUser();
    if (!user) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/saved-majors/${user.userid}`
      );
      const data = await res.json();
      const ids = data.map((m) => m.major_id);
      setSaved(ids);
    } catch (err) {
      console.error("Error loading saved majors:", err);
    }
  }, []);

  useEffect(() => {
    loadMajors();
    loadSavedMajors();
  }, [loadMajors, loadSavedMajors]);

  const toggleSave = async (majorId, e) => {
    e.stopPropagation();

    const user = getUser();
    if (!user) {
      toast.error("Please login first ❗");
      return;
    }

    const button = e.target.closest('.save-btn');
    
    try {
      if (saved.includes(majorId)) {
        await fetch("http://localhost:5000/api/remove-major", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.userid,
            major_id: majorId,
          }),
        });

        setSaved((prev) => prev.filter((id) => id !== majorId));
        button?.classList.remove('saved');
        toast.info("Removed from saved ❌");
      } else {
        await fetch("http://localhost:5000/api/save-major", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.userid,
            major_id: majorId,
          }),
        });

        setSaved((prev) => [...prev, majorId]);
        button?.classList.add('saved');
        toast.success("Saved successfully ⭐");
      }
    } catch (err) {
      toast.error("Something went wrong ⚠️");
    }
  };

  const filteredMajors = majors.filter((major) => {
    return (
      (category === "All" || major.category === category) &&
      major.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content-wrapper">
        <div className="main">
          <h1 className="title">All Majors</h1>
          <p className="subtitle">Explore all available fields of study</p>

          <div className="controls-row">
            {/* 🔍 SEARCH */}
            <div className="search-section">
              <input
                className="search-input"
                placeholder="🔍 Search majors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* 🎤 SMALL MIC BUTTON */}
            <div className="voice-mic-container">
              <VoiceInput setText={setSearch} />
            </div>

            {/* 🗂️ FILTERS - SAME POSITION */}
            <div className="filters-section">
              <div className="filters-container">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-btn ${category === cat ? "active" : ""}`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="majors-grid">
            {filteredMajors.length === 0 ? (
              <div className="no-results">
                <h3>No majors found 😔</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredMajors.map((major) => (
                <div
                  className="major-card"
                  key={major.id}
                  onClick={() => navigate(`/major/${major.id}`)}
                >
                  <div className="card-top">
                    <div className="icon">{major.icon}</div>
                    <span className="category">{major.category}</span>
                    <button
                      className={`save-btn ${saved.includes(major.id) ? 'saved' : ''}`}
                      onClick={(e) => toggleSave(major.id, e)}
                      title={saved.includes(major.id) ? "Remove from saved" : "Save major"}
                    >
                      {saved.includes(major.id) ? "⭐" : "☆"}
                    </button>
                  </div>

                  <h3>{major.name}</h3>
                  <p>{major.description}</p>

                  <div className="bottom">
                    <span>{major.years} years</span>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{ width: `${major.demand}%` }}
                      ></div>
                    </div>
                    <span>{major.demand}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}