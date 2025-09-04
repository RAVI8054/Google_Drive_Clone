// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-gray-200 px-6 py-3 shadow-md flex justify-between items-center">
      <Link to="/drive" className="text-xl font-bold text-teal-400">
        MyDrive
      </Link>

      <nav className="flex items-center gap-6">
        <Link to="/drive" className="hover:text-teal-400">
          Home
        </Link>
        <Link to="/drive" className="hover:text-teal-400">
          My Folders
        </Link>
        {user && (
          <button
            onClick={handleLogout}
            className="bg-teal-500 text-gray-900 px-3 py-1 rounded-lg hover:bg-teal-400 transition"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
