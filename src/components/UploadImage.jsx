import React, { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function UploadImage({ onUploaded }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [folderId, setFolderId] = useState(""); // optional: place in folder
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();
    if (!name.trim() || !file) {
      return toast.error("Image name and file are required");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);
    if (folderId) formData.append("folderId", folderId);

    setLoading(true);
    try {
      await api.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Image uploaded");
      setName("");
      setFile(null);
      setFolderId("");
      onUploaded?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to upload image");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleUpload} className="flex gap-2">
      <input
        type="text"
        placeholder="Image name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="border rounded px-3 py-2"
      />
      <input
        type="text"
        placeholder="Folder ID (optional)"
        value={folderId}
        onChange={(e) => setFolderId(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <button
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
