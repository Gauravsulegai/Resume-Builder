// === FILE: /client/src/App.jsx (updated routes) ===
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ResumeEditor from "./pages/ResumeEditor";
import ResumeEditorWithFeatures from "./pages/resumeEditorWithFeatures";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor/:id" element={<ResumeEditor />} />
        <Route path="/editor-advanced/:id" element={<resumeEditorWithFeatures />} />
      </Routes>
    </Router>
  );
};

export default App;