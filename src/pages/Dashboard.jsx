import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import api from "../utils/api";
import toast from "react-hot-toast";
import CreateFolder from "../components/CreateFolder";
import UploadImage from "../components/UploadImage";
import FolderView from "../components/FolderView";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  async function fetchData() {
    try {
      const res = await api.get("/drive"); // backend should return { folders, images }
      setFolders(res.data.folders || []);
      setImages(res.data.images || []);
    } catch (err) {
      toast.error("Failed to load data");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    try {
      const res = await api.get(`/images/search?name=${search}`);
      setImages(res.data || []);
    } catch (err) {
      toast.error("Search failed");
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 mb-6">
        <CreateFolder onCreated={fetchData} />
        <UploadImage onUploaded={fetchData} />
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">
            Search
          </button>
        </form>
      </div>

      {/* Folder and Image View */}
      <FolderView folders={folders} images={images} />
    </div>
  );
}
