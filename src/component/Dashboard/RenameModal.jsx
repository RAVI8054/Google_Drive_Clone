
import React, { useEffect, useState } from "react";

function RenameModal({ isOpen, initialName, onClose, onSubmit }) {
    const [name, setName] = useState(initialName || "");

    useEffect(
        function () {
            setName(initialName || "");
        },
        [initialName]
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-gray-100 rounded-lg p-6 w-96">
                <h3 className="text-lg font-semibold mb-4">Rename</h3>
                <input
                    autoFocus
                    value={name}
                    onChange={function (e) { setName(e.target.value); }}
                    onKeyDown={function (e) { if (e.key === "Enter" && name.trim()) onSubmit(name.trim()); }}
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900"
                    placeholder="New name"
                />
                <div className="flex justify-end gap-2 mt-6">
                    <button className="px-4 py-2 text-gray-300 hover:text-gray-100" onClick={onClose}>Cancel</button>
                    <button
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
                        disabled={!name.trim()}
                        onClick={function () { onSubmit(name.trim()); }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RenameModal;
