import React, { useState } from "react";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.access_token) {
        setToken(data.access_token); // ✅ Save JWT
        setMessage("✅ Login successful");
      } else {
        setMessage("❌ Invalid credentials");
      }
    } catch (err) {
      setMessage("❌ Network error");
    }
  };

  return (
    <div>
      <h3>Login</h3>
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
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}
