import { useState } from "react";
import type { User } from "../types/User";
import { GET_USER_API_URL } from "../utils/url-helper";

export default function UserDetail() {
  const [userId, setUserId] = useState<number>(1);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = () => {
    setLoading(true);
    setError(null);
    fetch(GET_USER_API_URL(userId))
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data: User) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setUser(null);
        setLoading(false);
      });
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Get User By ID</h2>
      <div style={{ marginBottom: 10 }}>
        <label>
          User ID:{" "}
          <input
            type="number"
            value={userId}
            min={1}
            onChange={(e) => setUserId(Number(e.target.value))}
            style={{ width: 60 }}
          />
        </label>
        <button onClick={fetchUser} style={{ marginLeft: 10 }}>
          Fetch
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && (
        <table style={{ borderCollapse: "collapse", width: "100%", marginTop: 10 }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>First Name</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Last Name</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{user.id}</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{user.firstName}</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{user.lastName}</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{user.email}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
