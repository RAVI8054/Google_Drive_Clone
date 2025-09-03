
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Cloud, Moon, LogIn, LayoutDashboard, User, LogOut, Settings } from "lucide-react";
import AuthContext from "../../context/AuthContext";
import api from "../../utils/axiosInstance";

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // here we are trying to get full name either from --- user that user typed , or from the db , or setting the email first letter as name....
    const fullName =
        user?.user_metadata?.full_name ||
        user?.response?.profile?.full_name ||
        (user?.email ? user.email.split("@")[0] : null);

    useEffect(function fetchUserAvatar() {
        if (!user) return;

        if (user.user_metadata?.avatar_url) {
            setAvatarUrl(user.user_metadata.avatar_url);
            return;
        }

        async function fetchAvatarFromBackend() {
            try {
                const res = await api.get("/auth/avatar-signed-url");
                if (res.data.success && res.data.signedUrl) {
                    setAvatarUrl(res.data.signedUrl);
                }
            } catch (err) {
                console.error("Failed to fetch avatar signed URL:", err);
            }
        }

        fetchAvatarFromBackend();
    }, [user]);

    // this handeler will handel the opened modal should closed when user click outside the profile
    useEffect(function handleOutsideClickSetup() {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return function cleanup() {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function getInitial(name) {
        return name ? name.charAt(0).toUpperCase() : "U";
    }

    function handleLogout() {
        logout();
        navigate("/login");
    }

    function toggleDropdown() {
        setIsOpen(!isOpen);
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
        <nav className="w-full h-[70px] shadow-sm bg-gray-900 rounded-2xl p-8">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

                {/* ---------- Left: Logo ---------- */}
                <div className="flex items-center gap-2">
                    <Cloud className="w-7 h-7 text-teal-400" />
                    <h1 className="text-xl font-bold text-teal-400">CloudDrive</h1>
                </div>

                {/* ---------- Center Links ---------- */}
                <ul className="hidden md:flex items-center gap-8 font-medium text-gray-300 lg:text-lg">
                    <li><Link to="/" className="hover:text-teal-400">Home</Link></li>
                    <li><Link to="/features" className="hover:text-teal-400">Features</Link></li>
                    <li><Link to="/pricing" className="hover:text-teal-400">Pricing</Link></li>
                    <li><Link to="/about" className="hover:text-teal-400">About</Link></li>
                </ul>

                {/* ---------- Right: Theme + Auth + Profile ---------- */}
                <div className="flex items-center gap-4 relative" ref={dropdownRef}>
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
                                    "w-11 h-11 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 overflow-hidden " +
                                    (avatarUrl ? "" : bgColor)
                                }
                                onClick={toggleDropdown}
                            >
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : fullName ? (
                                    <span className="text-lg font-bold text-white">{getInitial(fullName)}</span>
                                ) : (
                                    <User className="w-5 h-5 text-gray-300" />
                                )}
                            </div>

                            {isOpen && (
                                <div className="absolute right-[-10px] top-14 w-48 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                                    <div className="px-4 py-3 text-sm text-gray-200 border-b border-gray-700">
                                        {fullName || "User"}
                                    </div>
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-gray-200"
                                    >
                                        <User className="w-4 h-4" /> Profile
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-gray-200"
                                    >
                                        <Settings className="w-4 h-4" /> Settings
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-gray-200"
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
}

export default Navbar;
