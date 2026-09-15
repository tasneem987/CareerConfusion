import { useState, useEffect } from "react";
import axios from "axios";
import ConfirmDialog from "../components/ConfirmDialog";

const api = axios.create({ baseURL: "http://localhost:5000" });
api.interceptors.request.use(config => {
  config.headers["user-role"] = JSON.parse(localStorage.getItem("user"))?.role;
  return config;
});

export default function Users() {
  const [users, setUsers] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const fetchUsers = () => api.get("/api/admin/users").then(res => setUsers(res.data)).catch(console.error);
  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async () => {
    await api.delete(`/api/admin/users/${deleteId}`);
    setDeleteId(null);
    fetchUsers();
  };

  return (
    <div>
      <h2>Users ({users.length})</h2>
      <table className="admin-table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Education</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.userid}>
              <td>{u.userid}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.age}</td>
              <td>{u.educational_level}</td>
              <td>{u.role}</td>
              <td>
                <button className="action-btn delete-btn" onClick={() => setDeleteId(u.userid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteId && (
        <ConfirmDialog
          message="Delete this user permanently?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}