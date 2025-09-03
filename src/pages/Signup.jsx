import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function Signup() {
  const { register } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const res = await register(form.email, form.password, form.name);
    if (!res.ok) setErr(res.message);
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Sign Up</button>
      </form>
      {err && <p style={{ color: "red" }}>{err}</p>}
    </div>
  );
}
