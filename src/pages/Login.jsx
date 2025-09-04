import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null); // success/error messages
  const [type, setType] = useState("error"); // "success" | "error"
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    console.log("🟡 Attempting login with:", form);

    const res = await login(form.email, form.password);

    if (res.ok) {
      console.log("🟢 Login successful:", res);
      setType("success");
      setMessage("Login successful 🎉 Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200); // small delay so user sees message
    } else {
      console.error("🔴 Login failed:", res.message);
      setType("error");
      setMessage(res.message || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-teal-400">Login</h2>

        {/* Form */}
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-teal-400 text-gray-900 font-medium rounded-lg hover:bg-teal-500 transition"
          >
            Login
          </button>
        </form>

        {/* ✅ Success/Error message */}
        {message && (
          <p
            className={`mt-3 text-center text-sm ${
              type === "error" ? "text-red-400" : "text-green-400"
            }`}
          >
            {message}
          </p>
        )}

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-600"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-600"></div>
        </div>

        {/* Google login demo */}
        <button
          disabled
          className="w-full py-2 flex items-center justify-center gap-2 bg-gray-700 text-white font-medium rounded-lg shadow-md cursor-not-allowed opacity-60"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M533.5 278.4c0-17.7-1.6-34.7-4.6-51.1H272v96.8h146.9c-6.3 33.8-25 62.4-53.2 81.5v67h85.8c50.2-46.3 79-114.2 79-194.2z"
              fill="#4285F4"
            />
            <path
              d="M272 544.3c72.8 0 134-24.1 178.7-65.4l-85.8-67c-23.8 15.9-54.2 25.3-92.9 25.3-71.6 0-132.3-48.2-154.1-112.7H28.2v70.9C72.8 481.4 166 544.3 272 544.3z"
              fill="#34A853"
            />
            <path
              d="M117.9 322.4c-10.3-30.7-10.3-63.9 0-94.6v-70.9H28.2c-39.8 79.9-39.8 175.5 0 255.4l89.7-70.9z"
              fill="#FBBC05"
            />
            <path
              d="M272 107.7c39.6 0 75.3 13.6 103.4 40.4l77.7-77.7C404.6 24.5 343.3 0 272 0 166 0 72.8 62.9 28.2 155.7l89.7 70.9C139.7 156 200.4 107.7 272 107.7z"
              fill="#EA4335"
            />
          </svg>
          <span>Sign in with Google (demo only)</span>
        </button>

        {/* Signup link */}
        <p className="mt-4 text-gray-400 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-teal-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
