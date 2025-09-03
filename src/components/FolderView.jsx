import React from "react";

export default function FolderView({ folders = [], images = [] }) {
  return (
    <div className="mt-6">
      {/* Folders */}
      <h2 className="text-xl font-semibold mb-2">Folders</h2>
      {folders.length === 0 ? (
        <p className="text-gray-500 text-sm">No folders created yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {folders.map((folder) => (
            <div
              key={folder._id}
              className="p-4 border rounded-lg bg-gray-50 text-center"
            >
              <span className="block text-lg font-medium">{folder.name}</span>
              <span className="text-xs text-gray-500">
                ID: {folder._id}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Images */}
      <h2 className="text-xl font-semibold mb-2">Images</h2>
      {images.length === 0 ? (
        <p className="text-gray-500 text-sm">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img._id}
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-2">
                <p className="font-medium">{img.name}</p>
                <p className="text-xs text-gray-500">ID: {img._id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
