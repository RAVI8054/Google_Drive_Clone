// src/component/Dashboard/ItemGrid.jsx
import React from "react";
import { Folder, FileImage } from "lucide-react";

export default function ItemGrid({ folders, images, onOpenFolder }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {/* Folders */}
      {folders.map((folder) => (
        <div
          key={folder._id}
          onClick={() => onOpenFolder(folder._id)}
          className="p-4 bg-gray-800 rounded-xl shadow hover:bg-gray-700 cursor-pointer transition flex flex-col items-center"
        >
          <Folder className="w-10 h-10 text-yellow-400 mb-2" />
          <p className="text-sm truncate w-full text-center">{folder.name}</p>
        </div>
      ))}

      {/* Images */}
      {images.map((img) => (
        <div
          key={img._id}
          className="p-2 bg-gray-800 rounded-xl shadow hover:bg-gray-700 transition flex flex-col items-center"
        >
          <FileImage className="w-8 h-8 text-blue-400 mb-2" />
          <img
            src={img.url}
            alt={img.name}
            className="w-full h-24 object-cover rounded-md mb-2"
          />
          <p className="text-xs truncate w-full text-center">{img.name}</p>
        </div>
      ))}
    </div>
  );
}
