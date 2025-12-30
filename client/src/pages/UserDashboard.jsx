import { useEffect, useState } from "react";
import api from "../api/axios";

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/users/me").then((res) => {
      setUser(res.data.data[0]);
    });
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      {user && (
        <>
          <p>Name: {user.fullName}</p>
          <p>Email: {user.email}</p>
        </>
      )}
      <button onClick={() => {
        localStorage.clear();
        window.location.href = "/";
      }}>
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;
