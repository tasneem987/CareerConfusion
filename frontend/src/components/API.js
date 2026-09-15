import axios from "axios";

// 🔹 Backend API (your server)
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 🔹 AI API (NO baseURL → important)
export const aiApi = axios.create({
  headers: { "Content-Type": "application/json" },
});

export default api;