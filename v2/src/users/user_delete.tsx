import { useState } from "react";
import type { User } from "../types/User";
import { DELETE_USER_API_URL } from "../utils/url-helper";

export default function UserDelete() {
    const [userId, setUserId] = useState<number>(1);
    const [deletedUser, setDeletedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteUser = () => {
        if (!userId) {
            setError("Please enter a valid user ID");
            return;
        }

        setLoading(true);
        setError(null);

        fetch(DELETE_USER_API_URL(userId), {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error("User not found or error deleting");
                return res.json();
            })
            .then((data: User) => {
                setDeletedUser(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setDeletedUser(null);
                setLoading(false);
            });
    };

    return (
        <div style={{ marginTop: 30 }}>
            <h2>Delete User</h2>
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
                <button onClick={handleDeleteUser}>Delete User</button>
            </div>

            {loading && <p>Deleting user...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {deletedUser && (
                <div style={{ marginTop: 10 }}>
                    <h3>Deleted User</h3>
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
                                <td style={{ border: "1px solid #ccc", padding: 8 }}>{deletedUser.id}</td>
                                <td style={{ border: "1px solid #ccc", padding: 8 }}>{deletedUser.firstName}</td>
                                <td style={{ border: "1px solid #ccc", padding: 8 }}>{deletedUser.lastName}</td>
                                <td style={{ border: "1px solid #ccc", padding: 8 }}>{deletedUser.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
