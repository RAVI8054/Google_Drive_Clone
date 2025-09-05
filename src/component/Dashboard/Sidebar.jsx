import React from "react";
import { useAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import { api, endpoints } from "../../utils/api";

export default function Sidebar({ onFolderCreated, onImageUploaded, currentFolderId }) {
  const { token } = useAuth();

  // 📂 Create folder
  const handleCreateFolder = async () => {
    const name = prompt("Enter folder name:");
    if (!name) return;

    try {
      const res = await api.post(
        endpoints.folders,
        { name, parent: currentFolderId || null },
        token
      );

      // ✅ handle both cases: res.folder OR res
      const newFolder = res.folder || res;
      if (newFolder && onFolderCreated) {
        onFolderCreated(newFolder);
      }

      toast.success("✅ Folder created");
    } catch (err) {
      console.error("Folder create error:", err);
      toast.error("❌ Failed to create folder");
    }
  };

  // 🖼️ Upload image (Cloudinary → backend)
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const name = prompt("Enter image name:");
    if (!name) return;

    try {
      // 1️⃣ Upload to Cloudinary
      
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
console.log("Cloudinary config:", cloudName, preset);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!cloudRes.ok) throw new Error("Cloudinary upload failed");
      const cloudData = await cloudRes.json();

      // 2️⃣ Save metadata in backend DB
      const res = await api.post(
        endpoints.images,
        {
          name,
          url: cloudData.secure_url, // ✅ Cloudinary link
          publicId: cloudData.public_id,
          format: cloudData.format,
          size: cloudData.bytes,
          folderId: currentFolderId || null,
        },
        token
      );

      // ✅ handle both cases: res.image OR res
      const newImage = res.image || res;
      if (newImage && onImageUploaded) {
        onImageUploaded(newImage);
      }


      toast.success("✅ Image uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("❌ Failed to upload image");
    }
  };

  return (
    <aside className="w-64 bg-gray-800 p-4 text-white">
      {/* Create Folder */}
      <button
        onClick={handleCreateFolder}
        className="w-full mb-3 py-2 bg-teal-500 rounded hover:bg-teal-600"
      >
        + Create Folder
      </button>

      {/* Upload Image */}
      <label className="w-full block py-2 text-center bg-blue-500 rounded hover:bg-blue-600 cursor-pointer">
        Upload Image
        <input type="file" hidden onChange={handleUploadImage} />
      </label>
    </aside>
  );
}
