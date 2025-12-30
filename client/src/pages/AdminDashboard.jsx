import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    const res = await api.get(`/users?page=${page}`);
    setUsers(res.data.data);
  };

  const toggleStatus = async (id, status) => {
    if (!window.confirm("Are you sure?")) return;
    await api.patch(`/users/${id}/status`, { status });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th><th>Name</th><th>Role</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.fullName}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
              <td>
                <button onClick={() =>
                  toggleStatus(u.id, u.status === "active" ? "inactive" : "active")
                }>
                  {u.status === "active" ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Prev</button>
      <button onClick={() => setPage(p => p + 1)}>Next</button>
    </>
  );
};

export default AdminDashboard;
