// === FILE: /client/src/pages/Login.jsx ===
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="login-container">
      <h1>AI Resume Builder</h1>
      <p>Login to build smarter, better resumes</p>
      <button className="google-btn" onClick={handleLogin}>
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="google"
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;