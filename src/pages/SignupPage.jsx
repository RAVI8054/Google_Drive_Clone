// src/pages/SignupPage.jsx
import React, { useState } from "react";

import { useAuth } from "../context/AuthProvider";
import Input from "../components/Input";

import toast from "react-hot-toast";

export default function SignupPage({ onSwitch }) {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(form);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          disabled={loading}
          className="w-full py-2 rounded bg-indigo-600 text-white"
        >
          {loading ? "Creating..." : "Sign up"}
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <button onClick={onSwitch} className="text-indigo-600">
          Log in
        </button>
      </p>
    </div>
  );
}
