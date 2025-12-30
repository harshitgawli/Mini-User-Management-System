import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import api from "../api/axios";

const UserProfile = () => {
  const { user, login } = useContext(AuthContext);
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const saveProfile = async () => {
    const res = await api.put("/users/me", { fullName, email });
    login({ token: localStorage.getItem("token"), user: res.data.data });
    alert("Profile updated");
  };

  const changePassword = async () => {
    await api.put("/users/change-password", { password });
    alert("Password changed");
  };

  return (
    <>
      <h2>User Profile</h2>

      <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={saveProfile}>Save</button>

      <hr />

      <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={changePassword}>Change Password</button>
    </>
  );
};

export default UserProfile;
