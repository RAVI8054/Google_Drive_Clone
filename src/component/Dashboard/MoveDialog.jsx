
import React, { useEffect, useState } from "react";

import { Folder, ChevronLeft } from "lucide-react";
import api from "../../utils/axiosInstance";

function MoveDialog({ isOpen, currentFolderId, onClose, onMove }) {
    const [browseFolderId, setBrowseFolderId] = useState(null);
    const [stack, setStack] = useState([{ id: null, name: "Root" }]);
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(
        function () {
            if (isOpen) {
                setBrowseFolderId(currentFolderId ?? null);
                setStack([{ id: null, name: "Root" }]);
            }
        },
        [isOpen, currentFolderId]
    );

    useEffect(
        function () {
            if (!isOpen) return;
            async function load() {
                try {
                    setLoading(true);
                    const params = { parentId: browseFolderId };
                    const res = await api.get("/folder", { params });
                    setFolders(res.data?.data || []);
                } catch (e) {
                    console.log("error in move modal : ",e);
                    setFolders([]);
                } finally {
                    setLoading(false);
                }
            }
            load();
        },
        [isOpen, browseFolderId]
    );

    if (!isOpen) return null;

    function enterFolder(f) {
        setBrowseFolderId(f.id);
        setStack((s) => [...s, { id: f.id, name: f.name }]);
    }

    function goUp() {
        if (stack.length <= 1) return;
        const next = stack.slice(0, -1);
        setStack(next);
        setBrowseFolderId(next[next.length - 1].id);
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
            <div className="bg-gray-800 text-gray-100 rounded-lg p-6 w-[520px]">
                <h3 className="text-lg font-semibold mb-4">Move to…</h3>

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <button onClick={goUp} className="hover:text-gray-200 flex items-center gap-1">
                        <ChevronLeft className="w-4 h-4" /> Up
                    </button>
                    <span className="truncate">/ {stack.map((s) => s.name).join(" / ")}</span>
                </div>

                <div className="border border-gray-700 rounded max-h-64 overflow-auto">
                    {loading ? (
                        <div className="p-4 text-gray-400">Loading…</div>
                    ) : folders.length === 0 ? (
                        <div className="p-4 text-gray-500">No folders here.</div>
                    ) : (
                        folders.map(function (f) {
                            return (
                                <div
                                    key={f.id}
                                    className="px-3 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                                    onDoubleClick={function () { enterFolder(f); }}
                                    onClick={function () { enterFolder(f); }}
                                >
                                    <Folder className="w-4 h-4 text-yellow-400" />
                                    <span className="truncate">{f.name}</span>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button className="px-4 py-2 text-gray-300 hover:text-gray-100" onClick={onClose}>Cancel</button>
                    <button
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                        onClick={function () { onMove(browseFolderId ?? null); }}
                    >
                        Move here
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MoveDialog;
