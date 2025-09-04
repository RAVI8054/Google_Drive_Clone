// src/components/CreateFolder.jsx
import React, { useState } from "react";
import { api } from "../utils/api";
import toast from "react-hot-toast";

export default function CreateFolder({ onCreated }) {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();
    if (!name.trim()) return toast.error("Folder name is required");

    setLoading(true);
    try {
      await api.post("/folders", { name: name.trim(), parent: parentId || null });
      setName("");
      setParentId("");
      onCreated?.();
      toast.success("Folder created");
    } catch (e) {
      toast.error("Failed to create folder");
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
