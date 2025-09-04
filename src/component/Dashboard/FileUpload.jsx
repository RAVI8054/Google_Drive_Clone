// src/component/Dashboard/FileUpload.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { api } from "../../utils/api";

export default function FileUpload({ folderId }) {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");

  const upload = async () => {
    if (!file) return;

    // 1) Upload the image to Cloudinary
    const form = new FormData();
    form.append("file", file);
    form.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset"
    );

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "<your_cloud_name>";
    const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: form,
    });
    const cloudData = await cloudRes.json();
    if (!cloudData?.secure_url) {
      alert("Cloudinary upload failed");
      return;
    }

    // 2) Save image metadata to your backend (MongoDB)
    await api.post(
      "/images",
      {
        name: (name || file.name).trim(),
        url: cloudData.secure_url,
        folder: folderId || null,
        publicId: cloudData.public_id,
      },
      token
    );

    setFile(null);
    setName("");
    alert("Image uploaded!");
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <input
        type="text"
        placeholder="Image name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
