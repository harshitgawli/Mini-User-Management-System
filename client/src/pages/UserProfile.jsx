import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editingProfile, setEditingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
    }
  }, [user]);

  if (!user) return <p>Loading profile...</p>;

  const saveProfile = async () => {
    try {
      setLoading(true);
      const res = await api.post("/users/profile", { fullName, email });

      login({
        token: localStorage.getItem("token"),
        user: res.data.data,
      });

      setMessage("Profile updated successfully");
      setEditingProfile(false);
    } catch {
      setMessage("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      setMessage("Both old and new passwords are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/users/change-password", {
        oldPassword,
        newPassword,
      });

      setMessage("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setChangingPassword(false);
    } catch {
      setMessage("Password update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>User Profile</h2>

      {/* 🔴 LOGOUT BUTTON */}
      <button onClick={handleLogout}>Logout</button>

      {message && <p>{message}</p>}

      <p><b>Name:</b> {user.fullName}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Role:</b> {user.role}</p>

      <button onClick={() => setEditingProfile(!editingProfile)}>
        Edit Profile
      </button>

      {editingProfile && (
        <>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button disabled={loading} onClick={saveProfile}>
            {loading ? "Saving..." : "Save"}
          </button>
        </>
      )}

      <hr />

      <button onClick={() => setChangingPassword(!changingPassword)}>
        Change Password
      </button>

      {changingPassword && (
        <>
          <input
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button disabled={loading} onClick={changePassword}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
