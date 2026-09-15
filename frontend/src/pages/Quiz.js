import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../components/API";
import "../styles/Quiz.css"; // Keep your quiz-specific styles
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/questions")
      .then(res => setQuestions(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSelect = (option) => {
    setAnswers({
      ...answers,
      [current]: option
    });
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const back = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const submit = () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions!");
      return;
    }

    const formatted = Object.keys(answers).map(index => {
      const i = Number(index);
      return {
        question_id: questions[i]?.id,
        option_id: answers[i]?.id,
        score: answers[i]?.score || 0
      };
    });

    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("You must login first!");
      return;
    }

    const user = JSON.parse(userData);

    api.post("/api/quiz/submit", {
      userid: user.userid,
      answers: formatted
    })
    .then(res => {
      const testId = res.data.testId;
      navigate(`/result/${testId}`);
    })
    .catch(err => {
      console.error("Submit error:", err.response?.data || err.message);
    });
  };

  if (questions.length === 0) return <p>Loading...</p>;

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="dashboard"> {/* ✅ CHANGED TO DASHBOARD */}
      <Sidebar />
      <div className="main">      {/* ✅ CHANGED TO MAIN */}
        <div className="quiz-container">
          <div className="quiz-card">
            {/* Progress */}
            <div className="progress-bar">
              <motion.div
                className="progress"
                animate={{ width: `${progress}%` }}
              />
            </div>

            <p className="step">
              Question {current + 1} of {questions.length}
            </p>

            {/* Question animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.4 }}
              >
                <h2>{q.text}</h2>

                {/* Options */}
                <div className="options">
                  {q.options.map(opt => (
                    <motion.div
                      key={opt.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`option ${
                        answers[current]?.id === opt.id ? "selected" : ""
                      }`}
                      onClick={() => handleSelect(opt)}
                    >
                      {opt.text}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Buttons */}
            <div className="buttons">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                onClick={back}
                disabled={current === 0}
              >
                Back
              </motion.button>

              {current === questions.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={submit}
                >
                  Submit
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={next}
                  disabled={!answers[current]}
                >
                  Next
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}