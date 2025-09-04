// src/utils/driveApi.js
import api from "./axiosInstance";

// Upload image directly to Cloudinary
export const uploadImageToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Cloudinary upload failed");
  return res.json(); // returns { secure_url, public_id, ... }
};

// Save uploaded image in your backend DB
export const saveImageToBackend = async (name, url, folderId = null) => {
  const res = await api.post("/images", {
    name,
    url,       // 👈 Cloudinary URL
    folderId,
  });
  return res.data;
};
