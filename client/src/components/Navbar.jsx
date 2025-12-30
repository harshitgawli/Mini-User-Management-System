import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <span>{user.fullName} ({user.role})</span>

      {user.role === "admin" && <Link to="/admin">Admin</Link>}
      <Link to="/profile">Profile</Link>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
