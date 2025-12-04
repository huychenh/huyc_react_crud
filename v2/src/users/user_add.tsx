import { useState } from "react";
import type { User } from "../types/User";
import { ADD_USER_API_URL } from "../utils/url-helper";

export default function UserAdd() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddUser = () => {
    if (!firstName || !lastName || !email) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(ADD_USER_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email }),
    })
      .then((res) => res.json())
      .then((data: User) => {
        setUser(data);
        setLoading(false);
        // reset form
        setFirstName("");
        setLastName("");
        setEmail("");
      })
      .catch(() => {
        setError("Error adding user");
        setLoading(false);
      });
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Add New User</h2>
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {loading && <p>Adding user...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && (
        <div style={{ marginTop: 10 }}>
          <h3>Added User</h3>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
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
        </div>
      )}
    </div>
  );
}
