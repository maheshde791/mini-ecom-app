import React, { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import TopBar from "./components/TopBar";

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div style={{ fontFamily: "Arial" }}>
      <TopBar token={token} onLogout={() => setToken(null)} />

      <div style={{ padding: "2rem" }}>
        {!token ? (
          <>
            <Register setToken={setToken} />
            <Login setToken={setToken} />
          </>
        ) : (
          <>
            <Profile token={token} />
          </>
        )}
      </div>
    </div>
  );
}
