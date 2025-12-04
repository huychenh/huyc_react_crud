import { useEffect, useState } from "react";
import type { User } from "../types/User";
import type { UsersResponse } from "../types/UserResponse";
import { GET_USERS_API_URL } from "../utils/url-helper";

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(GET_USERS_API_URL)
            .then((res) => res.json())
            .then((data: UsersResponse) => {
                setUsers(data.users);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error when fetch API:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>User List</h2>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>No.</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>First Name</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Last Name</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{index + 1}</td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.firstName}</td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.lastName}</td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
