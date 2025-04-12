// === FILE: /client/src/pages/ResumeEditorWithFeatures.jsx ===
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAutoSave from "../hooks/useAutoSave";

const ResumeEditorWithFeatures = () => {
  const { id } = useParams();
  const [sections, setSections] = useState({});
  const [history, setHistory] = useState([]);
  const [jobDesc, setJobDesc] = useState("");
  const [theme, setTheme] = useState("light");
  const [aiOutput, setAiOutput] = useState({});

  useEffect(() => {
    // fetch existing data
    fetch(`http://localhost:5000/api/resumes/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSections(data.sections || {}));
  }, [id]);

  const autoSave = async () => {
    setHistory((prev) => [...prev.slice(-4), sections]); // Keep last 5 versions
    await fetch(`http://localhost:5000/api/resumes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ sections }),
    });
  };

  useAutoSave(sections, autoSave);

  const handleAIEnhance = async (type) => {
    const res = await fetch("http://localhost:5000/api/resumes/ai-tools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ type, jobDescription: jobDesc, sections }),
    });
    const data = await res.json();
    setAiOutput((prev) => ({ ...prev, [type]: data.output }));
  };

  const restoreVersion = (versionIndex) => {
    setSections(history[versionIndex]);
  };

  return (
    <div className={theme === "dark" ? "dark-theme" : "light-theme"} style={{ padding: 20 }}>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Toggle Theme</button>

      <h2>Resume Editor (Auto-Save + AI)</h2>
      {Object.entries(sections).map(([section, content]) => (
        <div key={section}>
          <h3>{section}</h3>
          <textarea
            value={content}
            onChange={(e) => setSections((prev) => ({ ...prev, [section]: e.target.value }))}
            rows={5}
            cols={60}
          />
        </div>
      ))}

      <h3>Job Description</h3>
      <textarea
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        rows={4}
        cols={60}
      />

      <div style={{ marginTop: 20 }}>
        <button onClick={() => handleAIEnhance("keywords")}>Keyword Match</button>
        <button onClick={() => handleAIEnhance("parser")}>Parse JD</button>
        <button onClick={() => handleAIEnhance("grammar")}>Fix Grammar</button>
        <button onClick={() => handleAIEnhance("bullet")}>Enhance Bullet Points</button>
      </div>

      {Object.entries(aiOutput).map(([key, value]) => (
        <div key={key}>
          <h4>{key.toUpperCase()} Output:</h4>
          <pre>{value}</pre>
        </div>
      ))}

      <h4>Version History</h4>
      {history.map((v, i) => (
        <button key={i} onClick={() => restoreVersion(i)}>
          Restore v{i + 1}
        </button>
      ))}
    </div>
  );
};

export default ResumeEditorWithFeatures;