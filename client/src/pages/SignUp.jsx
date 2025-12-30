import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const Signup = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.fullName || !form.email || !form.password || !form.confirmPassword)
    return setError("All fields are required");

  if (form.password.length < 6)
    return setError("Password must be at least 6 characters");

  if (form.password !== form.confirmPassword)
    return setError("Passwords do not match");

  try {
    const payload = {
      fullName: form.fullName,
      email: form.email,
      password: form.password,
    };

    await api.post("/users/signup", payload);
    navigate("/login");
  } catch (err) {
    console.error(err.response?.data || err.message);
    setError(err.response?.data?.message || "Signup failed");
  }
};


  return (
    <div className="auth-box">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input placeholder="Full Name" onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input type="password" placeholder="Confirm Password" onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
        <button>Signup</button>
      </form>

      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
