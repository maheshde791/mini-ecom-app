import React, { useState, useEffect } from "react";

// New (always go via proxy)
const API_BASE_URL = "/api";

export default function Profile({ token }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    fetchProfile();
  }, [token]);

  if (!user) return <p>❌ Not logged in</p>;

  return (
    <div>
      <h3>👤 Profile</h3>
      <p><strong>Username:</strong> {user.username}</p>
    </div>
  );
}
