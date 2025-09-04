// src/component/Dashboard/Sidebar.jsx
import React from "react";

export default function Sidebar({ onCreateFolder, onUploadImage }) {
  return (
    <aside className="w-64 bg-gray-800 p-4">
      <button
        onClick={onCreateFolder}
        className="w-full mb-3 py-2 bg-teal-500 rounded hover:bg-teal-600"
      >
        + Create Folder
      </button>

      <label className="w-full block py-2 text-center bg-blue-500 rounded hover:bg-blue-600 cursor-pointer">
        Upload Image
        <input type="file" hidden onChange={onUploadImage} />
      </label>
    </aside>
  );
}
