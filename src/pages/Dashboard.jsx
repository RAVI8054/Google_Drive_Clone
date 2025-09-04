// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/axiosInstance";

// existing UI components
import DashboardHeader from "../component/Dashboard/DashboardHeader";
import Sidebar from "../component/Dashboard/Sidebar";
import ItemGrid from "../component/Dashboard/ItemGrid";

export default function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ fetch user folders + images
  const fetchData = async (folderId = null, search = "") => {
    try {
      const folderRes = await api.get("/folders", {
        params: { parentId: folderId },
      });

      let imageRes;
      if (search) {
        // 🔎 call backend search API
        imageRes = await api.get("/images/search", {
          params: { query: search },
        });
      } else {
        imageRes = await api.get("/images", {
          params: { folderId },
        });
      }

      setFolders(folderRes.data);
      setImages(imageRes.data);
      setCurrentFolder(folderId);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load drive data");
    }
  };

  useEffect(() => {
    fetchData(); // root-level on load
  }, []);

  // ✅ create nested folder
  const createFolder = async () => {
    const name = prompt("Enter folder name:");
    if (!name) return;
    try {
      await api.post("/folders", { name, parentId: currentFolder });
      toast.success("Folder created successfully");
      fetchData(currentFolder);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating folder");
    }
  };

  // ✅ upload image
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", file.name);
    formData.append("folderId", currentFolder || "");

    try {
      await api.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Image uploaded successfully");
      fetchData(currentFolder);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error uploading image");
    }
  };

  // ✅ search handler
  const handleSearch = (query) => {
    setSearchTerm(query);
    fetchData(currentFolder, query);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar (unchanged) */}
      <Sidebar onCreateFolder={createFolder} onUploadImage={uploadImage} />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Header (with search) */}
        <DashboardHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />

        {/* Breadcrumb navigation */}
        <div className="px-6 py-2">
          {currentFolder ? (
            <button
              onClick={() => fetchData(null)}
              className="text-sm text-teal-400 hover:underline"
            >
              ⬅ Back to root
            </button>
          ) : (
            <span className="text-sm text-gray-400">Root</span>
          )}
        </div>

        {/* Drive content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <ItemGrid
            folders={folders}
            images={images}
            onOpenFolder={(id) => fetchData(id)}
          />
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 py-3 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} My Drive Clone
        </footer>
      </div>
    </div>
  );
}
