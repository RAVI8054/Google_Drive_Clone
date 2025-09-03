
import { useState, useRef } from "react";
import { FolderPlus, Upload } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstance";

function NewItemModal(props) {
    const { isOpen, onClose, parentId, onItemCreated } = props;

    // this state is for folder name --
    const [folderName, setFolderName] = useState("");

    // loading state for folder creation
    const [folderLoading, setFolderLoading] = useState(false);

    // loading state for file upload
    const [fileLoading, setFileLoading] = useState(false);

    const fileInputRef = useRef(null);

    function handleFolderNameChange(e) {
        setFolderName(e.target.value);
    }

    function handleKeyPress(e) {
        if (e.key === "Enter") {
            createFolder();
        }
    }

    function openFileDialog() {
        fileInputRef.current.click();
    }

    async function createFolder() {
        if (folderName.trim() === "") return;

        setFolderLoading(true);
        try {
            // callign our api for new folder creation
            let res = await api.post("/folder", { name: folderName, parentId: parentId });
            console.log("res of creating new folder api in newItem modal is : ",res);

            setFolderName("");
            toast.success("Folder created successfully!");
            if (onItemCreated) onItemCreated();
            onClose();
        } catch (err) {
            console.error("Error creating folder:", err);
            toast.error("Failed to create folder");
        } finally {
            setFolderLoading(false);
        }
    }

    async function uploadFiles(event) {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        setFileLoading(true);
        try {
            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append("file", files[i]);
                formData.append("parentId", parentId);

                // calling our upload file api
                let res = await api.post("/file", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                console.log("respon of upload file in the new Item moadl is : ",res);
            }
            toast.success("Files uploaded successfully!");
            if (onItemCreated) onItemCreated();
            onClose();
        } catch (err) {
            console.error("Error uploading files:", err);
            toast.error("File upload failed");
        } finally {
            setFileLoading(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-gray-100 rounded-xl p-6 w-96 shadow-2xl">
                <h3 className="text-xl font-bold mb-4 text-teal-400">Create New</h3>

                <div className="space-y-4">
                    {/* Create Folder */}
                    <div>
                        <input
                            type="text"
                            placeholder="Folder name"
                            value={folderName}
                            onChange={handleFolderNameChange}
                            onKeyPress={handleKeyPress}
                            disabled={folderLoading}
                            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                        <button
                            onClick={createFolder}
                            disabled={folderLoading || folderName.trim() === ""}
                            className={`w-full mt-2 py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors
                                ${folderLoading ? "bg-gray-600 cursor-not-allowed" : "bg-teal-400 hover:bg-teal-500 text-gray-900"}`}
                        >
                            {folderLoading && <span className="loader border-t-2 border-b-2 border-gray-900 w-4 h-4 rounded-full animate-spin"></span>}
                            <FolderPlus className="w-4 h-4" />
                            <span>Create Folder</span>
                        </button>
                    </div>

                    {/* Upload Files */}
                    <div className="border-t border-gray-700 pt-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            className="hidden"
                            onChange={uploadFiles}
                            disabled={fileLoading}
                        />
                        <button
                            onClick={openFileDialog}
                            disabled={fileLoading}
                            className={`w-full py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors
                                ${fileLoading ? "bg-gray-600 cursor-not-allowed" : "bg-teal-400 hover:bg-teal-500 text-gray-900"}`}
                        >
                            {fileLoading && <span className="loader border-t-2 border-b-2 border-gray-900 w-4 h-4 rounded-full animate-spin"></span>}
                            <Upload className="w-4 h-4" />
                            <span>Upload Files</span>
                        </button>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        disabled={folderLoading || fileLoading}
                        className="px-4 py-2 text-gray-400 hover:text-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {/* Loader style */}
            <style>{`
                .loader {
                    border-top-color: #ffffff;
                    border-bottom-color: #ffffff;
                }
            `}</style>
        </div>
    );
}

export default NewItemModal;
