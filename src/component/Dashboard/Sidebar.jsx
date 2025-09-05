import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import { api, endpoints } from "../../utils/api";
import { Search, FolderPlus, Upload } from "lucide-react";

export default function Sidebar({
  onFolderCreated,
  onImageUploaded,
  onSearch,
  currentFolderId,
}) {
  const { token } = useAuth();
  const [search, setSearch] = useState("");

  // 🔍 Handle Search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      onSearch(""); // reset
      return;
    }
    try {
      const res = await api.get(
        `${endpoints.search}?q=${encodeURIComponent(search)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onSearch(res.data); // send results back to Dashboard
    } catch (err) {
      console.error("Search error:", err);
      toast.error("Search failed");
    }
  };

  // 📂 Create folder (supports nested using parentId)
  const handleCreateFolder = async () => {
    const name = prompt("Enter folder name:");
    if (!name) return;

    try {
      const res = await api.post(
        endpoints.folders,
        { name, parentId: currentFolderId || null },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onFolderCreated(res.data);
      toast.success("Folder created");
    } catch (err) {
      console.error("Error creating folder:", err);
      toast.error("Failed to create folder");
    }
  };

  // 🖼️ Upload Image
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("name", file.name);
    formData.append("image", file);
    formData.append("folderId", currentFolderId || "");

    try {
      const res = await api.post(endpoints.images, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      onImageUploaded(res.data);
      toast.success("Image uploaded");
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error("Failed to upload image");
    }
  };

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 p-4 flex flex-col gap-4">
      {/* 🔍 Search */}
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search folders & images"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
        />
      </form>

      {/* 📂 Create Folder */}
      <button
        onClick={handleCreateFolder}
        className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-gray-900 rounded-lg hover:bg-teal-600 transition"
      >
        <FolderPlus className="w-5 h-5" /> Create Folder
      </button>

      {/* 🖼️ Upload Image */}
      <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer">
        <Upload className="w-5 h-5" /> Upload Image
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUploadImage}
        />
      </label>
    </aside>
  );
}
