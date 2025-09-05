// src/component/Dashboard/DashboardHeader.jsx
import React, { useState } from "react";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";

export default function DashboardHeader({ onMenuClick }) {
  const { user, logoutUser } = useAuth(); //  function name
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser(); //  call logoutUser
    setMenuOpen(false);
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Menu button */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Middle: App title */}
        <h1 className="text-lg md:text-xl font-bold text-teal-400">
          Dashboard
        </h1>

        {/* Right: User menu */}
        <div className="relative">
          <button
            // onClick={() => setMenuOpen(!menuOpen)}
             className="flex items-center space-x-2 focus:outline-none"
          >
            {/* Show user avatar or fallback */}
            <img
              src={user?.avatar || "/default-avatar.png"}
              alt={user?.name || user?.email || "User"}
              className="h-8 w-8 rounded-full border border-gray-600"
            />
            <span className="hidden md:block font-medium">
              {user?.name || user?.email || "Guest"}
            </span>
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-black rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-black"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
