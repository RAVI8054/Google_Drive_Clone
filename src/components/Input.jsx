import React from "react";

export default function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        {...props}
        className="mt-1 block w-full rounded-md border px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </label>
  );
}
