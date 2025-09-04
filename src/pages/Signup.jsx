// src/pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import toast from "react-hot-toast";
import api from "../utils/axiosInstance";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // handle signup
  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // ✅ only "/auth/signup" since baseURL already has "/api"
      const res = await api.post("/auth/signup", {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Signup successful!");
      console.log("Signup response:", res.data);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-teal-400">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Full Name */}
          <div className="relative">
            <User className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData((p) => ({ ...p, fullName: e.target.value }))
              }
              required
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData((p) => ({ ...p, email: e.target.value }))
              }
              required
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData((p) => ({ ...p, password: e.target.value }))
              }
              required
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  confirmPassword: e.target.value,
                }))
              }
              required
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-teal-400 text-gray-900 font-medium rounded-lg hover:bg-teal-500 transition"
          >
            {loading ? "Signing up..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-gray-400 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
