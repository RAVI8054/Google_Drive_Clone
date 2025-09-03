import { useContext, useEffect, useState } from "react";
import { Mail, User, Edit2, Trash2, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import api from "../utils/axiosInstance";

function Profile() {
    // get user and logout
    const { user, logout } = useContext(AuthContext);
    console.log("user in profile page is : ", user);

    // state
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({ fullName: "", email: "", bio: "" });
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    const navigate = useNavigate();

    // fetch profile
    useEffect(function loadProfileEffect() {
        async function fetchCustomProfile() {
            try {
                const res = await api.get("/user/profile");
                if (res.data.response) {
                    setProfile(res.data);
                    setFormData({
                        fullName: res.data.fullName || "",
                        email: res.data.email || "",
                        bio: res.data.bio || ""
                    });
                }
            } catch (err) {
                console.error("Failed to load profile:", err);
                toast.error("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        }

        if (user) {
            if (user.app_metadata?.provider === "google") {
                // google user → frontend data only
                setProfile(user);
                setFormData({
                    fullName: user.fullName || user.name || "",
                    email: user.email || "",
                    bio: user.bio || ""
                });
                setLoading(false);
            } else {
                fetchCustomProfile();
            }
        } else {
            setLoading(false);
        }
    }, [user]);

    // input change
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // update
    async function handleUpdate(e) {
        e.preventDefault();
        if (user && user.app_metadata?.provider === "google") {
            toast.error("Google account profile cannot be updated here yet.");
            return;
        }
        try {
            const res = await api.put("/user/profile", formData);
            if (res.data) {
                setProfile(res.data);
                toast.success("Profile updated successfully.");
                setEditing(false);
            }
        } catch (err) {
            console.error("Profile update failed:", err);
            toast.error("Profile update failed.");
        }
    }

    // delete
    async function handleDelete() {
        if (user && user.app_metadata?.provider === "google") {
            toast.error("Google account cannot be deleted from here yet.");
            return;
        }
        try {
            await api.delete("/user/profile");
            toast.success("Account deleted successfully.");
            logout();
            navigate("/signup");
        } catch (err) {
            console.error("Delete failed:", err);
            toast.error("Failed to delete account.");
        }
    }

    // edit toggle
    function handleEnableEdit() {
        setEditing(true);
    }
    function handleCancelEdit() {
        setEditing(false);
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-gray-300">Loading...</div>;
    }

    console.log("profile is : ",profile);
    return (
        <div className="max-w-7xl mx-auto p-8">
            <h2 className="text-3xl font-bold text-teal-400 mb-4 px-8">Profile Management</h2>

            <div className="bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col gap-8">

                {/* user header */}
                <div className="flex items-center gap-6">
                    {user?.user_metadata?.avatar_url ? (
                        <img
                            src={user.user_metadata.avatar_url}
                            alt="Avatar"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-2xl">
                            {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : <User />}
                        </div>
                    )}

                    <div>
                        <h3 className="text-xl font-semibold text-gray-200">{profile?.fullName}</h3>
                        <p className="text-gray-400 flex items-center gap-2">
                            <Mail className="w-4 h-4" /> {profile?.response.user.user_metadata.email}
                        </p>
                        {profile?.bio && (
                            <p className="text-gray-300 mt-2 italic">{profile.bio}</p>
                        )}
                    </div>
                </div>

                {/* message box for Google users */}
                {user?.app_metadata?.provider === "google" && (
                    <div className=" w-[60%] flex items-start gap-3 bg-yellow-900/40 border border-yellow-600 text-yellow-300 px-4 py-3 rounded-lg">
                        {/* Info Icon */}
                        <Info className="w-5 h-5 mt-1 flex-shrink-0" />

                        {/* Text Section */}
                        <div>
                            <p className="font-semibold">Notice</p>
                            <p className="text-sm mt-1">
                                You are signed in with Google. Updating or deleting your profile directly here isn't available yet.
                            </p>
                            <p className="text-sm">
                                This feature is coming soon — please stay tuned.
                            </p>
                            <p className="mt-2 font-medium">Thank you!</p>
                        </div>
                    </div>

                )}

                {/* profile form */}
                {editing ? (
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div>
                            <label className="block text-gray-400 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                rows="3"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="px-5 py-2 rounded-lg bg-teal-500 text-gray-900 font-semibold hover:bg-teal-600"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-5 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    user?.app_metadata?.provider !== "google" && (
                        <button
                            onClick={handleEnableEdit}
                            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-teal-500 text-gray-900 font-semibold hover:bg-teal-600 w-fit"
                        >
                            <Edit2 className="w-4 h-4" /> Edit Profile
                        </button>
                    )
                )}

                {/* danger zone */}
                {user?.app_metadata?.provider !== "google" && (
                    <div className="border-t border-gray-700 pt-6">
                        <h4 className="text-red-400 font-semibold mb-3">Danger Zone</h4>
                        <p className="text-gray-400 mb-4 text-sm">Once you delete your account, there is no going back. Please be certain.</p>
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
                        >
                            <Trash2 className="w-4 h-4" /> Delete Account
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
