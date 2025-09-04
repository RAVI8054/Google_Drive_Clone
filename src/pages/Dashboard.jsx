import React, { useEffect, useState } from "react";
import Sidebar from "../component/Dashboard/Sidebar";
import DashboardHeader from "../component/Dashboard/DashboardHeader";
import ItemGrid from "../component/Dashboard/ItemGrid";
import { api, endpoints } from "../utils/api";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { token } = useAuth();
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [folderHistory, setFolderHistory] = useState([]); // track nested navigation

  // 📌 Load folders/images
  const load = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const q = currentFolderId
        ? `?parentId=${encodeURIComponent(currentFolderId)}`
        : "";

      const folderRes = await api.get(`${endpoints.folders}${q}`, token);
      setFolders(Array.isArray(folderRes.folders) ? folderRes.folders : []);

      const imageRes = await api.get(`${endpoints.images}${q}`, token);
      setImages(Array.isArray(imageRes.images) ? imageRes.images : []);
    } catch (err) {
      toast.error("❌ Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [token, currentFolderId]);

  // 📂 When folder created → update UI
  const handleFolderCreated = (folder) => {
    setFolders((prev) => [...prev, folder]);
    toast.success("📂 Folder created");
  };

  // 🖼️ When image uploaded → update UI
  const handleImageUploaded = (image) => {
    setImages((prev) => [...prev, image]);
    toast.success("🖼️ Image uploaded");
  };

  // 📂 Open nested folder
  const handleOpenFolder = (id) => {
    setFolderHistory((prev) => [...prev, currentFolderId]);
    setCurrentFolderId(id);
  };

  // 🔙 Back to parent
  const handleGoBack = () => {
    const prev = folderHistory[folderHistory.length - 1];
    setFolderHistory((prev) => prev.slice(0, -1));
    setCurrentFolderId(prev || null);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        onFolderCreated={handleFolderCreated}
        onImageUploaded={handleImageUploaded}
        currentFolderId={currentFolderId}
      />

      {/* Main content */}
      <main className="flex-1 p-6">
        <DashboardHeader />
        <h1 className="text-2xl font-bold mb-4">My Drive</h1>

        {/* Back button */}
        {currentFolderId && (
          <button
            onClick={handleGoBack}
            className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ⬅ Back
          </button>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ItemGrid
            folders={folders}
            images={images}
            onOpenFolder={handleOpenFolder}
          />
        )}
      </main>
    </div>
  );
}
