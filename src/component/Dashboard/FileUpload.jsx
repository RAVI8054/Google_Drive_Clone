import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { api } from "../../utils/api";

export default function FileUpload({ folderId }) {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");

  const upload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name || file.name);
    if (folderId) formData.append("folder", folderId);

    const res = await api.postForm("/images/upload", formData, token);
    console.log("Uploaded:", res);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
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
