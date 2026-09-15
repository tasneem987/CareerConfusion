import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Saved() {
  const navigate = useNavigate();
  const [savedMajors, setSavedMajors] = useState([]);
  const [quizRec, setQuizRec] = useState(null);
const userData = JSON.parse(localStorage.getItem("user"));
const userId = userData?.userid;

  useEffect(() => {
    loadSavedMajors();
    loadQuizRecommendation();
  }, []);

  const loadSavedMajors = async () => {
    const res = await fetch(`http://localhost:5000/api/saved-majors/${userId}`);
    const data = await res.json();
    setSavedMajors(data);
  };

  const loadQuizRecommendation = async () => {
    const res = await fetch(`http://localhost:5000/api/quiz-recommendation/${userId}`);
    const data = await res.json();
    if (data.recommendation) {
      setQuizRec(data.recommendation);
    }
  };

  const removeMajor = async (majorId) => {
    await fetch("http://localhost:5000/api/remove-major", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, major_id: majorId }),
    });
    loadSavedMajors();
  };

  return (
    <div className="dashboard">
          <Sidebar />
    <div className="main">

      {/* QUIZ RECOMMENDATION */}
      {quizRec && (
        <>
          <h1 className="title">🎯 Your Quiz Match</h1>
          <div className="majors-grid">
            <div
              className="major-card"
              style={{ border: "2px solid #7c3aed" }}
              onClick={() => navigate(`/major/${quizRec.major_id}`)}
            >
              <div className="card-top">
                <div className="icon">{quizRec.icon}</div>
                <span className="category">{quizRec.category}</span>
                <span style={{
                  background: "#7c3aed",
                  color: "white",
                  padding: "2px 10px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: "bold"
                }}>
                  100% Match
                </span>
              </div>
              <h3>{quizRec.major_name}</h3>
              <p>{quizRec.description}</p>
              <div className="bottom">
                <span>{quizRec.years} years</span>
                <div className="progress">
                  <div className="progress-bar" style={{ width: "100%", background: "#7c3aed" }}></div>
                </div>
                <span>100%</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* SAVED MAJORS */}
      <h1 className="title">Saved Majors ⭐</h1>
      <div className="majors-grid">
        {savedMajors.map((major) => (
          <div className="major-card" key={major.major_id}
            onClick={() => navigate(`/major/${major.major_id}`)}>
            <div className="card-top">
              <div className="icon">{major.icon}</div>
              <span className="category">{major.category}</span>
              <button className="remove-btn" onClick={(e) => {
                e.stopPropagation();
                removeMajor(major.major_id);
              }}>❌</button>
              
            </div>
            <h3>{major.major_name}</h3>
            <p>{major.description}</p>
            <div className="bottom">
              <span>{major.years} years</span>
              <div className="progress">
                <div className="progress-bar" style={{ width: major.demand + "%" }}></div>
              </div>
              <span>{major.demand}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}