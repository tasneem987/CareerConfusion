import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";

const api = axios.create({ baseURL: "http://localhost:5000" });
api.interceptors.request.use(config => {
  config.headers["user-role"] = JSON.parse(localStorage.getItem("user"))?.role;
  return config;
});

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);          // new: id of question being edited
  const [deleteId, setDeleteId] = useState(null);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("personality");
  const [options, setOptions] = useState([{ text: "", tech: 0, business: 0, health: 0, arts: 0 }]);

  const fetch = () => api.get("/api/admin/questions").then(res => setQuestions(res.data));
  useEffect(() => { fetch(); }, []);

  // Open modal for ADDING a new question
  const openAdd = () => {
    setEditId(null);
    setText("");
    setCategory("personality");
    setOptions([{ text: "", tech: 0, business: 0, health: 0, arts: 0 }]);
    setShowModal(true);
  };

  // Open modal for EDITING an existing question
  const openEdit = (question) => {
    setEditId(question.id);
    setText(question.text);
    setCategory(question.category);
    setOptions(question.options.map(opt => ({
      text: opt.text,
      tech: opt.tech_score,
      business: opt.business_score,
      health: opt.health_score,
      arts: opt.arts_score
    })));
    setShowModal(true);
  };

  const addOption = () => {
    setOptions([...options, { text: "", tech: 0, business: 0, health: 0, arts: 0 }]);
  };

  const updateOption = (index, field, value) => {
    const newOpts = [...options];
    newOpts[index][field] = value;
    setOptions(newOpts);
  };

  const handleSubmit = async () => {
    const payload = {
      text,
      category,
      options: options.map(opt => ({
        text: opt.text,
        tech: Number(opt.tech),
        business: Number(opt.business),
        health: Number(opt.health),
        arts: Number(opt.arts)
      }))
    };

    if (editId) {
      // Update existing question
      await api.put(`/api/admin/questions/${editId}`, payload);
    } else {
      // Create new question
      await api.post("/api/admin/questions", payload);
    }

    setShowModal(false);
    setEditId(null);
    fetch();
  };

  const handleDelete = async () => {
    await api.delete(`/api/admin/questions/${deleteId}`);
    setDeleteId(null);
    fetch();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, alignItems: "center" }}>
        <h2>Questions ({questions.length})</h2>
        <button className="submit-btn" style={{ width: "auto" }} onClick={openAdd}>Add Question</button>
      </div>

      {questions.map(q => (
        <div key={q.id} style={{ background: "white", padding: 20, borderRadius: 16, marginBottom: 15, border: "1px solid #eee" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ marginRight: "15px" }}>{q.text}</strong>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="action-btn edit-btn"
                style={{ padding: "4px 8px", fontSize: "13px" }}
                onClick={() => openEdit(q)}
              >
                Edit
              </button>
              <button
                className="action-btn delete-btn"
                style={{ padding: "4px 8px", fontSize: "13px" }}
                onClick={() => setDeleteId(q.id)}
              >
                Delete
              </button>
            </div>
          </div>
          <span style={{ color: "#888", display: "block", marginTop: "4px" }}>{q.category}</span>
          <ul style={{ marginTop: 10, paddingLeft: "20px" }}>
            {q.options.map(opt => (
              <li key={opt.id} style={{ marginBottom: "6px" }}>
                {opt.text} <span style={{ color: "#666", fontSize: "0.9em" }}>(T:{opt.tech_score} B:{opt.business_score} H:{opt.health_score} A:{opt.arts_score})</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {showModal && (
        <Modal title={editId ? "Edit Question" : "Add New Question"} onClose={() => { setShowModal(false); setEditId(null); }}>
          <div style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "20px" }}>
            {editId ? "Edit Question" : "Add New Question"}
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Question Text</label>
            <input
              style={{ width: "100%", padding: "8px", boxSizing: "border-box", borderRadius: "6px", border: "1px solid #ccc" }}
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Category</label>
            <select
              style={{ width: "100%", padding: "8px", boxSizing: "border-box", borderRadius: "6px", border: "1px solid #ccc" }}
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="personality">Personality</option>
              <option value="interest">Interest</option>
              <option value="motivation">Motivation</option>
              <option value="work">Work</option>
              <option value="academic">Academic</option>
              <option value="behavior">Behavior</option>
              <option value="environment">Environment</option>
              <option value="skills">Skills</option>
            </select>
          </div>

          <h4 style={{ margin: "20px 0 10px 0" }}>Options</h4>
          {options.map((opt, idx) => (
            <div className="option-row" key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <input placeholder="Option text" value={opt.text} onChange={e => updateOption(idx, "text", e.target.value)} style={{ flex: 1, padding: "8px", boxSizing: "border-box", borderRadius: "6px", border: "1px solid #ccc" }}/>
              <input type="number" placeholder="Tech" value={opt.tech} onChange={e => updateOption(idx, "tech", e.target.value)} style={{ width: 65, padding: "8px", textAlign: "center", borderRadius: "6px", border: "1px solid #ccc" }}/>
              <input type="number" placeholder="Biz" value={opt.business} onChange={e => updateOption(idx, "business", e.target.value)} style={{ width: 65, padding: "8px", textAlign: "center", borderRadius: "6px", border: "1px solid #ccc" }}/>
              <input type="number" placeholder="Health" value={opt.health} onChange={e => updateOption(idx, "health", e.target.value)} style={{ width: 65, padding: "8px", textAlign: "center", borderRadius: "6px", border: "1px solid #ccc" }}/>
              <input type="number" placeholder="Arts" value={opt.arts} onChange={e => updateOption(idx, "arts", e.target.value)} style={{ width: 65, padding: "8px", textAlign: "center", borderRadius: "6px", border: "1px solid #ccc" }}/>
            </div>
          ))}
          <button className="add-option-btn" style={{ width: "100%", padding: "10px", margin: "10px 0 20px 0", borderRadius: "6px" }} onClick={addOption}>+ Add Option</button>

          <button className="submit-btn" style={{ width: "100%", padding: "12px", fontSize: "16px", borderRadius: "6px" }} onClick={handleSubmit}>
            {editId ? "Update Question" : "Save Question"}
          </button>
        </Modal>
      )}

      {deleteId && (
        <ConfirmDialog
          message="Delete this question and its options?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}