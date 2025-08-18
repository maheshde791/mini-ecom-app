import React, { useState } from "react";

export default function Register({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      // Step 1: Call /register
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setMessage("✅ Registered successfully!");

        // Step 2: Auto-login immediately
        const loginRes = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            username,
            password,
          }),
        });

        const loginData = await loginRes.json();
        if (loginRes.ok && loginData.access_token) {
          setToken(loginData.access_token);
          setMessage("✅ Registered & logged in!");
        } else {
          setMessage("⚠️ Registered but login failed");
        }
      } else {
        const errorData = await res.json();
        setMessage("❌ " + (errorData.detail || "Registration failed"));
      }
    } catch (err) {
      setMessage("❌ Network error");
    }
  };

  return (
    <div>
      <h3>Register</h3>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
}
