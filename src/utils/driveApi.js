// src/utils/driveApi.js
import api from "./axiosInstance";

// Load folders & images for a folder
export const fetchFolderContent = async (parentId = null) => {
  const res = await api.get("/folders", {
    params: { parentId: parentId || "" },
  });
  return res.data;
};

// Create folder
export const createNewFolder = async (name, parentId = null) => {
  const res = await api.post("/folders", { name, parentId });
  return res.data;
};

// Upload image
export const uploadNewImage = async (file, name, folderId = null) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", file);
  if (folderId) formData.append("folderId", folderId);

  const res = await api.post("/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Search images
export const searchImagesByName = async (query) => {
  const res = await api.get("/images/search", { params: { query } });
  return res.data;
};
