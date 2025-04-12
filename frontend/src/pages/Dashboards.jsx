// === FILE: /client/src/pages/Dashboard.jsx ===
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/resumes", { credentials: "include" })
      .then(res => res.json())
      .then(data => setResumes(data));
  }, []);

  const handleCreate = async () => {
    const res = await fetch("http://localhost:5000/api/resumes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, sections: {}, template: "default" })
    });
    const data = await res.json();
    navigate(`/editor/${data._id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Resumes</h2>
      <input
        type="text"
        placeholder="Enter resume title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleCreate}>Create New</button>

      <ul>
        {resumes.map((resume) => (
          <li key={resume._id}>
            <a href={`/editor/${resume._id}`}>{resume.title}</a> | <a href={`/editor-advanced/${resume._id}`}>Advanced</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;