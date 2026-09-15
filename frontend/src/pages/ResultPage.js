import React, { useEffect, useState } from "react";
import api from "../components/API";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Sidebar from "../components/Sidebar";
import "../styles/Result.css";

export default function ResultPage() {
  const { testId } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/api/quiz/result/${testId}`)
      .then((res) => {
        console.log("Raw API response:", res.data);
        const fetchedResults = res.data.results || [];
        setResults(fetchedResults);

        if (fetchedResults.length === 0) {
          setError("No matching majors found for your profile.");
        } else {
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }
      })
      .catch((err) => {
        console.error("Result fetch error:", err);
        setError("Failed to load results. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [testId]);

  if (loading) {
    return (
      <div className="quiz-page">
        <Sidebar />
        <div className="result-main">
          <div className="result-container">
            <h2>Loading your matches...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-page">
        <Sidebar />
        <div className="result-main">
          <div className="result-container">
            <h2>⚠️ {error}</h2>
            <div className="action-buttons">
              <button className="retake-btn" onClick={() => navigate("/quiz")}>
                🔁 Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <Sidebar />
      <div className="result-main">
        <div className="result-container">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🎯 Your Career Match
          </motion.h2>

          {results.length > 0 && (
            <motion.div
              className="top-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3>🏆 Best Match</h3>
              <h1>{results[0].major_name}</h1>
              <p>{results[0].match_percentage}% Match</p>
            </motion.div>
          )}

          <div className="results-list">
            {results.map((r, index) => (
              <motion.div
                key={index}
                className="result-card clickable"
                onClick={() => navigate(`/major/${r.major_id}`)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <h3>{r.major_name}</h3>
                <div className="bar">
                  <motion.div
                    className="fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${r.match_percentage}%` }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                  />
                </div>
                <p>{r.match_percentage}% match</p>
              </motion.div>
            ))}
          </div>

          <div className="action-buttons">
            <motion.button
              className="retake-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/quiz")}
            >
              🔁 Retake Quiz
            </motion.button>
            <motion.button
              className="home-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
            >
              🏠 Dashboard
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}