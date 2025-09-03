import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(form.email, form.password);
    if (!res.ok) setErr(res.message);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
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
        <button type="submit">Login</button>
      </form>
      {err && <p style={{ color: "red" }}>{err}</p>}

      {/* Dummy Google button */}
      <button disabled style={{ background: "#ddd", marginTop: "1rem" }}>
        Sign in with Google (demo only)
      </button>
    </div>
  );
}
