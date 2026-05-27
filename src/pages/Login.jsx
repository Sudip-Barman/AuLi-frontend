import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth"
import "../pages/Auth.css";
import API_URL from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault(); // important

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.access_token) {
        setToken(data.access_token);
        navigate("/chat");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        

        <h1>Welcome Back 👋</h1>

        <p className="auth-subtitle">
          Continue your AI learning journey
        </p>

        {/* 👇 FORM WRAP */}
        <form onSubmit={handleLogin}>

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
            Login
          </button>

        </form>

        <p className="auth-switch">
          Don’t have an account?
          <Link to="/signup">Signup</Link>
        </p>

      </div>
    </div>
  );
}
export default Login;