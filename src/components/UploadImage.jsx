// src/components/UploadImage.jsx
import { useState } from "react";
import { api } from "../utils/api";
import toast from "react-hot-toast";

export default function UploadImage({ folderId, onUploaded }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please choose an image");

    try {
      const form = new FormData();
      form.append("file", file);
      form.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset"
      );
      const cloudName =
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "<your_cloud_name>";

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: form }
      );
      const cloudData = await cloudRes.json();
      if (!cloudData?.secure_url) throw new Error("Cloudinary upload failed");

      await api.post("/images", {
        name: (name || file.name).trim(),
        url: cloudData.secure_url,
        folder: folderId || null,
        publicId: cloudData.public_id,
      });

      setFile(null);
      setName("");
      onUploaded?.();
      toast.success("Uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  return (
    <form onSubmit={handleUpload} className="flex gap-2 items-center">
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <input
        type="text"
        placeholder="Image Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Upload</button>
    </form>
  );
}
