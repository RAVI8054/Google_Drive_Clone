import React from "react";

export default function ItemGrid({ folders = [], images = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.isArray(folders) &&
        folders.map((folder) => (
          <div
            key={folder._id || folder.id}
            className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700"
          >
            📁 {folder.name}
          </div>
        ))}

      {Array.isArray(images) &&
        images.map((img) => (
          <div
            key={img._id || img.id}
            className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700"
          >
            <img
              src={img.url}
              alt={img.name}
              className="w-full h-24 object-cover rounded"
            />
            <p className="mt-2 text-sm text-gray-300">{img.name}</p>
          </div>
        ))}
    </div>
  );
}
