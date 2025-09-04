// src/pages/Drive.jsx
import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { FolderPlus, Upload, Image as ImageIcon } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Drive() {
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [newFolder, setNewFolder] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [search, setSearch] = useState("");

  // ✅ Fetch folders + images on mount
  useEffect(() => {
    fetchFolders();
    fetchImages();
  }, []);

  const fetchFolders = async () => {
    try {
      const res = await axios.get("/folders");
      setFolders(res.data);
    } catch (err) {
      console.error("Error fetching folders:", err);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get("/images");
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  // ✅ Create Folder
  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!newFolder.trim()) return;

    try {
      const res = await axios.post("/folders", { name: newFolder });
      setFolders([...folders, res.data]);
      setNewFolder("");
    } catch (err) {
      console.error("Error creating folder:", err);
    }
  };

  // ✅ Upload Image
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("name", selectedFile.name);
    formData.append("image", selectedFile);

    try {
      const res = await axios.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImages([res.data, ...images]);
      setSelectedFile(null);
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  // ✅ Search Images
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      fetchImages();
      return;
    }

    try {
      const res = await axios.get(`/images/search?q=${search}`);
      setImages(res.data);
    } catch (err) {
      console.error("Error searching:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          {/* Create Folder */}
          <form onSubmit={handleCreateFolder} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="New Folder Name"
              value={newFolder}
              onChange={(e) => setNewFolder(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1 px-4 py-2 bg-teal-500 text-gray-900 rounded-lg hover:bg-teal-600 transition"
            >
              <FolderPlus className="w-4 h-4" /> Create Folder
            </button>
          </form>

          {/* Upload Image */}
          <form onSubmit={handleUpload} className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="text-sm"
            />
            <button
              type="submit"
              className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <Upload className="w-4 h-4" /> Upload
            </button>
          </form>

          {/* Search Images */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 ml-auto">
            <input
              type="text"
              placeholder="Search images..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Folders */}
        <h2 className="text-lg font-semibold mb-3">Folders</h2>
        {folders.length === 0 ? (
          <p className="text-gray-400">No folders yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {folders.map((folder) => (
              <div
                key={folder._id}
                className="p-4 bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
              >
                <FolderPlus className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-sm truncate">{folder.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* Images */}
        <h2 className="text-lg font-semibold mb-3">Images</h2>
        {images.length === 0 ? (
          <p className="text-gray-400">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <div
                key={img._id}
                className="p-2 bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className="rounded-lg w-full h-32 object-cover"
                />
                <div className="flex items-center gap-2 mt-2">
                  <ImageIcon className="w-4 h-4 text-teal-400" />
                  <p className="text-sm truncate">{img.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
