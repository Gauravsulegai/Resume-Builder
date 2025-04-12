// === FILE: /client/src/pages/ResumeEditor.jsx ===
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ResumeEditor = () => {
  const { id } = useParams();
  const [sections, setSections] = useState({});
  const [optimizedContent, setOptimizedContent] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  const handleChange = (section, value) => {
    setSections((prev) => ({ ...prev, [section]: value }));
  };

  const handleOptimize = async () => {
    const res = await fetch("http://localhost:5000/api/resumes/optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        jobDescription: jobDesc,
        resumeContent: Object.values(sections).join("\n")
      })
    });
    const data = await res.json();
    setOptimizedContent(data.optimized);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Resume</h2>

      {['Summary', 'Experience', 'Education', 'Skills'].map((section) => (
        <div key={section}>
          <h3>{section}</h3>
          <textarea
            value={sections[section] || ""}
            onChange={(e) => handleChange(section, e.target.value)}
            rows={5}
            cols={60}
          />
        </div>
      ))}

      <h3>Job Description for Optimization</h3>
      <textarea
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        rows={4}
        cols={60}
      />
      <br />
      <button onClick={handleOptimize}>Optimize Resume</button>

      {optimizedContent && (
        <div>
          <h3>Optimized Content</h3>
          <pre>{optimizedContent}</pre>
        </div>
      )}
    </div>
  );
};

export default ResumeEditor;
