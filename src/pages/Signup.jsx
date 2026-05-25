import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import API_URL from "../api";
function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e?.preventDefault(); // 👈 important for Enter key

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("Account created successfully");
        window.location.href = "/";
      } else {
        alert(data.detail || "Signup failed");
      }
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account ✨</h1>

        <p className="auth-subtitle">
          Start learning with AuLi AI
        </p>

        {/* 👇 FORM WRAPPER */}
        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?
          <Link to="/">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;