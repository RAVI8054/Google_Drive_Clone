// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { api } from "../utils/api";
import FileUpload from "../component/Dashboard/FileUpload";

export default function Dashboard() {
  const { token } = useAuth();
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [search, setSearch] = useState("");

  const loadData = async () => {
    const query = currentFolder ? `?parent=${currentFolder}` : "";
    const data = await api.get(`/folders${query}`, token);
    setFolders(data?.folders || []);
    setImages(data?.images || []);
  };

  const searchImages = async () => {
    if (!search) return loadData();
    const data = await api.get(`/images/search?query=${encodeURIComponent(search)}`, token);
    setFolders([]); // hide folders during search
    setImages(Array.isArray(data) ? data : data?.images || []);
  };

  useEffect(() => {
    if (token) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, currentFolder]);

  const createFolder = async () => {
    if (!newFolderName.trim()) return;
    await api.post(
      "/folders",
      { name: newFolderName.trim(), parent: currentFolder || null },
      token
    );
    setNewFolderName("");
    loadData();
  };

  return (
    <div>
      <h2>My Drive</h2>

      {/* Breadcrumbs */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setCurrentFolder(null)}>Root</button>
        {currentFolder && <span> → Inside folder</span>}
      </div>

      {/* Search */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search images by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchImages}>Search</button>
        {search && (
          <button
            onClick={() => {
              setSearch("");
              loadData();
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Folder creation */}
      <div>
        <input
          type="text"
          placeholder="New folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button onClick={createFolder}>Create Folder</button>
      </div>

      {/* List folders */}
      <h3>Folders</h3>
      <ul>
        {folders.map((f) => (
          <li key={f._id}>
            <button onClick={() => setCurrentFolder(f._id)}>{f.name}</button>
          </li>
        ))}
      </ul>

      {/* Upload images */}
      <FileUpload folderId={currentFolder} />

      {/* List images */}
      <h3>Images</h3>
      <ul>
        {images.map((img) => (
          <li key={img._id}>
            <img src={img.url} alt={img.name} width="100" />
            <p>{img.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
