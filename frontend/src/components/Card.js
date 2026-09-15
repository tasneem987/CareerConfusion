import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ title, desc, path }) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => path && navigate(path)}
      style={{ cursor: "pointer" }}
    >
      <div className="icon">📘</div>
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
}