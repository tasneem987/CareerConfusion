import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";

const api = axios.create({ baseURL: "http://localhost:5000" });
api.interceptors.request.use(config => {
  config.headers["user-role"] = JSON.parse(localStorage.getItem("user"))?.role;
  return config;
});

// Helper to safely parse a field that might be a JSON string or an array
const parseArrayField = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim().startsWith("[")) {
    try {
      return JSON.parse(value);
    } catch {
      return value.split(",").map(s => s.trim());
    }
  }
  return [];
};

export default function Majors() {
  const navigate = useNavigate();
  const [majors, setMajors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMajor, setEditMajor] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({
    name: "", description: "", category: "", required_skills: "",
    skills: [], careers: [], study_plan: [], cost: "", salary_lebanon: "",
    salary_abroad: "", education_required: "", years: "", demand: 0, icon: ""
  });

  const fetch = () => api.get("/api/majors").then(res => {
    // Normalize each major's array fields to actual arrays
    const normalized = res.data.map(major => ({
      ...major,
      skills: parseArrayField(major.skills),
      careers: parseArrayField(major.careers),
      study_plan: parseArrayField(major.study_plan),
    }));
    setMajors(normalized);
  });
  useEffect(() => { fetch(); }, []);

  const openAdd = () => {
    setEditMajor(null);
    setForm({
      name: "", description: "", category: "", required_skills: "",
      skills: [], careers: [], study_plan: [],
      cost: "", salary_lebanon: "", salary_abroad: "",
      education_required: "", years: "", demand: 0, icon: ""
    });
    setShowModal(true);
  };

  const openEdit = (major) => {
    setEditMajor(major.id);
    setForm({
      name: major.name,
      description: major.description || "",
      category: major.category,
      required_skills: major.required_skills || "",
      skills: parseArrayField(major.skills),
      careers: parseArrayField(major.careers),
      study_plan: parseArrayField(major.study_plan),
      cost: major.cost || "",
      salary_lebanon: major.salary_lebanon || "",
      salary_abroad: major.salary_abroad || "",
      education_required: major.education_required || "",
      years: major.years || "",
      demand: major.demand || 0,
      icon: major.icon || ""
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    // Ensure arrays stay arrays when sending
    const payload = { ...form };
    if (editMajor) {
      await api.put(`/api/admin/majors/${editMajor}`, payload);
    } else {
      await api.post("/api/admin/majors", payload);
    }
    setShowModal(false);
    fetch();
  };

  const handleDelete = async () => {
    await api.delete(`/api/admin/majors/${deleteId}`);
    setDeleteId(null);
    fetch();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h2>Majors ({majors.length})</h2>
        <button className="submit-btn" style={{ width: "auto" }} onClick={openAdd}>Add Major</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Category</th><th>Demand</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {majors.map(m => (
            <tr
              key={m.id}
              onClick={() => navigate(`/admin/majorpage/${m.id}`)}
              style={{ cursor: "pointer" }}
              title="Click to view major details"
            >
              <td>{m.id}</td>
              <td style={{ color: "#4f46e5", fontWeight: 500 }}>{m.name}</td>
              <td>{m.category}</td>
              <td>{m.demand}%</td>
              <td onClick={(e) => e.stopPropagation()}>
                <button
                  className="action-btn edit-btn"
                  style={{ padding: "4px 8px", fontSize: "13px", marginRight: "8px" }}
                  onClick={() => openEdit(m)}
                >
                  Edit
                </button>
                <button
                  className="action-btn delete-btn"
                  style={{ padding: "4px 8px", fontSize: "13px" }}
                  onClick={() => setDeleteId(m.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>{editMajor ? "Edit Major" : "Add Major"}</h3>
          {/* All form fields remain unchanged */}
          <div className="form-group"><label>Name</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})}/></div>
          <div className="form-group"><label>Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}/></div>
          <div className="form-group"><label>Category</label><input value={form.category} onChange={e => setForm({...form, category: e.target.value})}/></div>
          <div className="form-group"><label>Required Skills</label><input value={form.required_skills} onChange={e => setForm({...form, required_skills: e.target.value})}/></div>
          <div className="form-group"><label>Years</label><input value={form.years} onChange={e => setForm({...form, years: e.target.value})}/></div>
          <div className="form-group"><label>Demand (0-100)</label><input type="number" value={form.demand} onChange={e => setForm({...form, demand: e.target.value})}/></div>
          <div className="form-group">
            <label>Skills (comma separated)</label>
            <input
              value={form.skills.join(", ")}
              onChange={e =>
                setForm({ ...form, skills: e.target.value.split(",").map(s => s.trim()) })
              }
            />
          </div>
          <div className="form-group">
            <label>Careers (comma separated)</label>
            <input
              value={form.careers.join(", ")}
              onChange={e =>
                setForm({ ...form, careers: e.target.value.split(",").map(s => s.trim()) })
              }
            />
          </div>
          <div className="form-group">
            <label>Study Plan (comma separated)</label>
            <input
              value={form.study_plan.join(", ")}
              onChange={e =>
                setForm({ ...form, study_plan: e.target.value.split(",").map(s => s.trim()) })
              }
            />
          </div>
          <div className="form-group"><label>Cost</label><input value={form.cost} onChange={e => setForm({...form, cost: e.target.value})}/></div>
          <div className="form-group"><label>Salary Lebanon</label><input value={form.salary_lebanon} onChange={e => setForm({...form, salary_lebanon: e.target.value})}/></div>
          <div className="form-group"><label>Salary Abroad</label><input value={form.salary_abroad} onChange={e => setForm({...form, salary_abroad: e.target.value})}/></div>
          <div className="form-group"><label>Education Required</label><input value={form.education_required} onChange={e => setForm({...form, education_required: e.target.value})}/></div>
          <div className="form-group"><label>Icon</label><input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})}/></div>
          <button className="submit-btn" onClick={handleSubmit}>Save Major</button>
        </Modal>
      )}

      {deleteId && (
        <ConfirmDialog
          message="Delete this major permanently?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}