import React from "react";

export default function ItemGrid({ folders = [], images = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.isArray(folders) &&
        folders.map((folder, i) =>
          folder ? (
            <div
              key={folder._id || folder.id || i}
              className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700"
            >
              📁 {folder.name || "Untitled"}
            </div>
          ) : null
        )}

      {Array.isArray(images) &&
        images.map((img, i) =>
          img ? (
            <div
              key={img._id || img.id || i}
              className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700"
            >
              <img
                src={img.url || "/default-avatar.png"}
                alt={img.name || "Untitled"}
                className="w-full h-24 object-cover rounded"
                onError={(e) => (e.target.src = "/default-avatar.png")}
              />
              <p className="mt-2 text-sm text-gray-300">{img.name || "Untitled"}</p>
            </div>
          ) : null
        )}
    </div>
  );
}
