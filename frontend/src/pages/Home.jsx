// === FILE: /client/src/pages/Home.jsx ===
import React from "react";

const Home = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to AI Resume Builder</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Home;