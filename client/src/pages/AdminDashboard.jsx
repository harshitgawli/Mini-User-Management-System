// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/admin/users?page=${page}`, {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      // 🔁 adjust this line to match your real response shape
      // Example if backend returns: { data: { users: [...] } }
      // setUsers(res.data.data.users);

      setUsers(res.data.data[0].users);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to load users");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
  if (!window.confirm("Are you sure?")) return;

  try {
    const action = currentStatus === "active" ? "deactivate" : "activate";
    await api.post(`/admin/users/${id}/${action}`, {});
    
    // 🔄 Refetch instead of optimistic update
    await fetchUsers(); 
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Status update failed");
  }
};


  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <>
      <h2>Admin Dashboard</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u._id}>
                <td>{u.email}</td>
                <td>{u.fullName}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>
                <td>
                  <button
                    onClick={() => toggleStatus(u._id, u.status)}
                  >
                    {u.status === "active"
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button
        onClick={() => setPage((p) => p - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
    </>
  );
};

export default AdminDashboard;
