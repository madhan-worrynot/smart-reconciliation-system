import { useState } from "react";
import api from "../api/api";
import "./Login.css"; // Inga dhaan CSS file-a connect panrom

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Project Branding */}
        <h2 className="project-title">Smart Reconciliation & Audit System</h2>
        <p className="sub-title">Sign in to manage your audits</p>

        <form onSubmit={handleLogin}>
          
          {/* Email Input */}
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              className="input-field"
              placeholder="admin@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Display */}
          {error && <div className="error-msg">{error}</div>}

          {/* Login Button */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>

      </div>
    </div>
  );
}