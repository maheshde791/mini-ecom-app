import React, { useEffect, useState } from "react";

export default function TopBar({ token, onLogout }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username);
        } else {
          console.error("Failed to fetch profile:", res.statusText);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        background: "#f5f5f5",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>Mini E-commerce</h2>
      {token && (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>👤 {username}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
