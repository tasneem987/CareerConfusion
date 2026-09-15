import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../components/API";
import "../../styles/MajorPage.css";

export default function AdminMajorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [major, setMajor] = useState(null);

  useEffect(() => {
    api.get(`/api/majors/${id}`)
      .then((res) => {
        console.log("MAJOR DATA:", res.data);
        setMajor(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!major) {
    return (
      <div className="quiz-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  // Handle both array and JSON string formats safely
  const skills = Array.isArray(major.skills)
    ? major.skills
    : JSON.parse(major.skills || "[]");

  const careers = Array.isArray(major.careers)
    ? major.careers
    : JSON.parse(major.careers || "[]");

  const studyPlan = Array.isArray(major.study_plan)
    ? major.study_plan
    : JSON.parse(major.study_plan || "[]");

  return (
    <div className="quiz-page">
      <div className="major-main">
        <div className="major-container">

          <button
            onClick={() => navigate(-1)}
            className="back-btn"
            title="Go back"
          >
            ←
          </button>

          <div className="major-header">
            <div className="emoji-title">
              <span className="emoji major-emoji">{major.icon}</span>
              <h1>{major.name}</h1>
            </div>

            <p>{major.description}</p>
          </div>

          <div className="major-grid">

            <div className="major-box cost-box">
              <h3><span className="emoji">💰</span> Cost</h3>
              <p>{major.cost}</p>
            </div>

            <div className="major-box uni-box">
              <h3><span className="emoji">🎓</span> Universities</h3>

              <ul>
                <li>AUB</li>
                <li>LAU</li>
                <li>BAU</li>
                <li>LIU</li>
                <li>NDU</li>
              </ul>
            </div>

            <div className="major-box skills-box">
              <h3><span className="emoji">🧠</span> Required Skills</h3>

              <ul>
                {skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="major-box study-box">
              <h3><span className="emoji">📚</span> Study Plan</h3>

              <ul>
                {studyPlan.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="major-box careers-box">
              <h3><span className="emoji">💼</span> Careers</h3>

              <ul>
                {careers.map((job, i) => (
                  <li key={i}>{job}</li>
                ))}
              </ul>
            </div>

            <div className="major-box salary-box">
              <h3><span className="emoji">💸</span> Salary</h3>

              <p>
                <strong>Lebanon:</strong> {major.salary_lebanon}
              </p>

              <p>
                <strong>Abroad:</strong> {major.salary_abroad}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}