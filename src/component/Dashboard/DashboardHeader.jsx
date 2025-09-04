// src/component/Dashboard/DashboardHeader.jsx
import React from "react";
import { LogOut, Search } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader({ onSearch }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  const handleLogout = () => {
    logout(); // clears token/session
    navigate("/"); // 🔑 redirect back to homepage
  };

  return (
    <header className="bg-gray-800 px-6 py-4 flex items-center justify-between shadow">
      {/* App title */}
      <h1 className="text-xl font-bold text-teal-400">My Drive</h1>

      {/* Search bar */}
      <div className="relative w-1/2">
        <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search images..."
          onChange={handleSearch}
          className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
        />
      </div>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </header>
  );
}
