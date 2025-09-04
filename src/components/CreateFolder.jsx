// src/components/CreateFolder.jsx
import React, { useState, useContext } from "react";
import { api, endpoints } from "../utils/api";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

export default function CreateFolder({ onCreated }) {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext); // ✅ get auth token here

  async function handleCreate(e) {
    e.preventDefault();
    if (!name.trim()) return toast.error("Folder name is required");

    setLoading(true);
    try {
      const res = await api.post(
        endpoints.folders, // ✅ centralized path
        { name: name.trim(), parent: parentId || null },
        token || localStorage.getItem("token") // ✅ pass token!
      );

      if (res?._id) {
        toast.success("Folder created ✅");
        console.log("🟢 Folder created:", res);
        setName("");
        setParentId("");
        onCreated?.(); // trigger parent refresh
      } else {
        toast.error(res?.message || "Failed to create folder ❌");
        console.error("🔴 Folder creation failed:", res);
      }
    } catch (e) {
      console.error("🔥 API error creating folder:", e);
      toast.error("Failed to create folder ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleCreate} className="flex gap-2">
      <input
        type="text"
        placeholder="Folder name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="text"
        placeholder="Parent folder ID (optional)"
        value={parentId}
        onChange={(e) => setParentId(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
