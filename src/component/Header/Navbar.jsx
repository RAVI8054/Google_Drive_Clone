// src/component/Navbar/Navbar.jsx
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cloud, Moon, LogIn, LayoutDashboard, User, LogOut } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // user display name
  const fullName = user?.name || (user?.email ? user.email.split("@")[0] : null);

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function getInitial(name) {
    return name ? name.charAt(0).toUpperCase() : "U";
  }

  function getBgColor() {
    if (!fullName) return "bg-gray-700";
    const colors = [
      "bg-red-900", "bg-blue-900", "bg-green-900",
      "bg-yellow-900", "bg-purple-900", "bg-pink-900",
      "bg-indigo-900", "bg-teal-900",
    ];
    let hash = 0;
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  const bgColor = useMemo(getBgColor, [fullName]);

  return (
    <nav className="w-full h-[70px] shadow-sm bg-gray-900 rounded-2xl p-6">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Cloud className="w-7 h-7 text-teal-400" />
          <h1 className="text-xl font-bold text-teal-400">CloudDrive</h1>
        </div>

        {/* Center Links */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-300 lg:text-lg">
          <li><Link to="/" className="hover:text-teal-400">Home</Link></li>
          <li><Link to="#" className="hover:text-teal-400">Features</Link></li>
          <li><Link to="#" className="hover:text-teal-400">Pricing</Link></li>
          <li><Link to="#" className="hover:text-teal-400">About</Link></li>
        </ul>

        {/* Right: Theme + Auth */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          {/* Dark Mode button (demo only) */}
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600"
          >
            <Moon className="w-5 h-5 text-gray-300" />
          </button>

          {!user ? (
            <Link
              to="/login"
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-teal-400 text-gray-900 font-medium hover:bg-teal-500"
            >
              <LogIn className="w-5 h-5" /> Login
            </Link>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-teal-400 text-gray-900 font-medium hover:bg-teal-500"
              >
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </Link>

              {/* Avatar + Dropdown */}
              <div
                className={
                  "w-11 h-11 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 " +
                  bgColor
                }
                onClick={toggleDropdown}
              >
                {fullName ? (
                  <span className="text-lg font-bold text-white">{getInitial(fullName)}</span>
                ) : (
                  <User className="w-5 h-5 text-gray-300" />
                )}
              </div>

             {isOpen && (
  <div className="absolute right-0 top-14 w-48 bg-black rounded-xl shadow-lg overflow-hidden">
    <div className="px-4 py-3 text-sm text-gray-200 border-b border-gray-700">
      {fullName || "User"}
    </div>
    <button
      onClick={handleLogout}
      className="w-full text-left flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700"
    >
      <LogOut className="w-4 h-4" /> Logout
    </button>
  </div>
)}

            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
