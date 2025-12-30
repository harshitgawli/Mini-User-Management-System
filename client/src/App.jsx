import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* DEFAULT ROUTE */}
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
