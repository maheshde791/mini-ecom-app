import React, { useEffect, useState } from "react";

export default function Profile({ token }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setProfile({ error: "❌ Failed to load profile" });
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <div>
      <h3>Profile</h3>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}
