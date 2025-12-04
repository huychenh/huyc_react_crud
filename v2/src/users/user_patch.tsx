import { useState } from "react";
import type { User } from "../types/User";
import { PATCH_USER_API_URL } from "../utils/url-helper";

export default function UserPatch() {
  const [userId, setUserId] = useState<number>(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePatchUser = () => {
    const updateData: Partial<User> = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;

    if (Object.keys(updateData).length === 0) {
      setError("Please fill at least one field to update");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(PATCH_USER_API_URL(userId), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("User not found or error updating");
        return res.json();
      })
      .then((data: User) => {
        setUser(data);
        setLoading(false);
        // reset form
        setFirstName("");
        setLastName("");
        setEmail("");
      })
      .catch((err) => {
        setError(err.message);
        setUser(null);
        setLoading(false);
      });
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Patch User (Update Partial)</h2>
      <div style={{ marginBottom: 10 }}>
        <label>
          User ID:{" "}
          <input
            type="number"
            value={userId}
            min={1}
            onChange={(e) => setUserId(Number(e.target.value))}
            style={{ width: 60, marginRight: 10 }}
          />
        </label>
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
        <button onClick={handlePatchUser}>Patch User</button>
      </div>

      {loading && <p>Updating user...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && (
        <div style={{ marginTop: 10 }}>
          <h3>Updated User</h3>
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
