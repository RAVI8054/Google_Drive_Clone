// // import React, { useState } from "react";
// // import { Folder, File } from "lucide-react";
// // import ItemContextMenu from "./ItemContextMenu";

// // function FileIcon({ type }) {
// //     return type === "folder" ? (
// //         <Folder className="h-5 w-5 text-yellow-400" />
// //     ) : (
// //         <File className="h-5 w-5 text-blue-400" />
// //     );
// // }

// // function ItemGrid({ items, viewMode, onItemClick, onItemDoubleClick, onItemAction, selectedItems }) {
// //     const [contextMenu, setContextMenu] = useState(null);

// //     // Right-click context menu
// //     const handleContextMenu = (event, item) => {
// //         event.preventDefault();
// //         setContextMenu({
// //             item,
// //             position: { x: event.pageX, y: event.pageY },
// //         });
// //         // Optional: select item on right-click
// //         if (!selectedItems.some(x => x.id === item.id)) {
// //             onItemClick(item);
// //         }
// //     };

// //     // Single click → select item
// //     const handleSelect = (item, event) => {
// //         if (event.type === "contextmenu") return; // ignore right-click
// //         onItemClick(item);
// //     };

// //     // Double click → open folder/file
// //     const handleOpen = (item) => {
// //         onItemDoubleClick(item);
// //     };

// //     const ListHeader = (
// //         <div className="grid grid-cols-4 gap-4 p-2 font-medium text-gray-300 border-b border-gray-700">
// //             <div>Name</div>
// //             <div>Owner</div>
// //             <div>Last Modified</div>
// //             <div>Size</div>
// //         </div>
// //     );

// //     if (viewMode === "list") {
// //         return (
// //             <div className="bg-gray-800 rounded-lg p-2 relative">
// //                 {ListHeader}
// //                 {items.map(item => (
// //                     <div
// //                         key={item.id}
// //                         className={`item-card grid grid-cols-4 gap-4 p-2 cursor-pointer hover:bg-gray-700 transition ${selectedItems.some(x => x.id === item.id) ? "bg-gray-700" : ""
// //                             }`}
// //                         onClick={(e) => handleSelect(item, e)}
// //                         onDoubleClick={() => handleOpen(item)}
// //                         onContextMenu={(e) => handleContextMenu(e, item)}
// //                     >
// //                         <div className="flex items-center space-x-2">
// //                             <FileIcon type={item.type} />
// //                             <span className="truncate">{item.name}</span>
// //                         </div>
// //                         <div>{item.owner || "You"}</div>
// //                         <div>{item.modifiedAt || "-"}</div>
// //                         <div>{item.size || "-"}</div>
// //                     </div>
// //                 ))}

// //                 {contextMenu && (
// //                     <ItemContextMenu
// //                         item={contextMenu.item}
// //                         position={contextMenu.position}
// //                         onClose={() => setContextMenu(null)}
// //                         onAction={onItemAction}
// //                     />
// //                 )}
// //             </div>
// //         );
// //     }

// //     // Grid view
// //     return (
// //         <div className=" item-card grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative">
// //             {items.map(item => (
// //                 <div
// //                     key={item.id}
// //                     className={`border border-gray-700 rounded-lg p-4 bg-gray-800 shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-center text-center ${selectedItems.some(x => x.id === item.id) ? "border-blue-500" : ""
// //                         }`}
// //                     onClick={(e) => handleSelect(item, e)}
// //                     onDoubleClick={() => handleOpen(item)}
// //                     onContextMenu={(e) => handleContextMenu(e, item)}
// //                 >
// //                     <FileIcon type={item.type} />
// //                     <p className="truncate mt-2">{item.name}</p>
// //                 </div>
// //             ))}

// //             {contextMenu && (
// //                 <ItemContextMenu
// //                     item={contextMenu.item}
// //                     position={contextMenu.position}
// //                     onClose={() => setContextMenu(null)}
// //                     onAction={onItemAction}
// //                 />
// //             )}
// //         </div>
// //     );
// // }

// // export default ItemGrid;



// import React, { useState } from "react";
// import { Folder, File } from "lucide-react";
// import ItemContextMenu from "./ItemContextMenu";

// // Utility → Convert bytes to KB, MB, GB
// function formatFileSize(bytes) {
//     if (!bytes || isNaN(bytes)) return "-";
//     const sizes = ["B", "KB", "MB", "GB", "TB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(1024));
//     return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
// }

// function FileIcon({ type }) {
//     return type === "folder" ? (
//         <Folder className="h-5 w-5 text-yellow-400" />
//     ) : (
//         <File className="h-5 w-5 text-blue-400" />
//     );
// }

// function ItemGrid({
//     items,
//     viewMode,
//     onItemClick,
//     onItemDoubleClick,
//     onItemAction,
//     selectedItems,
// }) {
//     const [contextMenu, setContextMenu] = useState(null);

//     // Right-click → context menu
//     const handleContextMenu = (event, item) => {
//         event.preventDefault();
//         setContextMenu({
//             item,
//             position: { x: event.pageX, y: event.pageY },
//         });
//         if (!selectedItems.some((x) => x.id === item.id)) {
//             onItemClick(item); // also select on right click
//         }
//     };

//     // Select (single click)
//     const handleSelect = (item, event) => {
//         if (event.type === "contextmenu") return;
//         onItemClick(item);
//     };

//     // Open (double click)
//     const handleOpen = (item) => {
//         onItemDoubleClick(item);
//     };

//     const ListHeader = (
//         <div className="grid grid-cols-5 gap-4 p-2 font-medium text-gray-300 border-b border-gray-700 text-sm">
//             <div>Name</div>
//             <div>Owner</div>
//             <div>Last Modified</div>
//             <div>Size</div>
//             <div>Type</div>
//         </div>
//     );

//     if (viewMode === "list") {
//         return (
//             <div className="bg-gray-800 rounded-lg p-2 relative">
//                 {ListHeader}
//                 {items.map((item) => (
//                     <div
//                         key={item.id}
//                         className={`grid grid-cols-5 gap-4 p-2 cursor-pointer hover:bg-gray-700 transition text-sm ${selectedItems.some((x) => x.id === item.id) ? "bg-gray-700" : ""
//                             }`}
//                         onClick={(e) => handleSelect(item, e)}
//                         onDoubleClick={() => handleOpen(item)}
//                         onContextMenu={(e) => handleContextMenu(e, item)}
//                     >
//                         {/* Name + Icon */}
//                         <div className="flex items-center space-x-2">
//                             <FileIcon type={item.type} />
//                             <span className="truncate">{item.name}</span>
//                         </div>
//                         <div>{item.owner || "You"}</div>
//                         <div>{item.modifiedAt || "-"}</div>
//                         <div>{item.size ? formatFileSize(item.size) : "-"}</div>
//                         <div className="capitalize">{item.type}</div>
//                     </div>
//                 ))}

//                 {contextMenu && (
//                     <ItemContextMenu
//                         item={contextMenu.item}
//                         position={contextMenu.position}
//                         onClose={() => setContextMenu(null)}
//                         onAction={onItemAction}
//                     />
//                 )}
//             </div>
//         );
//     }

//     // Grid view
//     return (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative">
//             {items.map((item) => (
//                 <div
//                     key={item.id}
//                     className={`border border-gray-700 rounded-lg p-4 bg-gray-800 shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-center text-center ${selectedItems.some((x) => x.id === item.id)
//                             ? "border-blue-500"
//                             : ""
//                         }`}
//                     onClick={(e) => handleSelect(item, e)}
//                     onDoubleClick={() => handleOpen(item)}
//                     onContextMenu={(e) => handleContextMenu(e, item)}
//                 >
//                     <FileIcon type={item.type} />
//                     <p className="truncate mt-2 font-medium">{item.name}</p>
//                     <p className="text-xs text-gray-400 mt-1">
//                         {item.size ? formatFileSize(item.size) : "-"}
//                     </p>
//                 </div>
//             ))}

//             {contextMenu && (
//                 <ItemContextMenu
//                     item={contextMenu.item}
//                     position={contextMenu.position}
//                     onClose={() => setContextMenu(null)}
//                     onAction={onItemAction}
//                 />
//             )}
//         </div>
//     );
// }

// export default ItemGrid;


import React, { useState } from "react";
import { Folder, File } from "lucide-react";
import ItemContextMenu from "./ItemContextMenu";

// Utility → Convert bytes to KB, MB, GB
function formatFileSize(bytes) {
    if (!bytes || isNaN(bytes)) return "-";
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

function FileIcon({ type }) {
    return type === "folder" ? (
        <Folder className="h-8 w-8 text-yellow-400" />
    ) : (
        <File className="h-8 w-8 text-blue-400" />
    );
}

function ItemGrid({
    items,
    viewMode,
    onItemClick,
    onItemDoubleClick,
    onItemAction,
    selectedItems,
}) {
    const [contextMenu, setContextMenu] = useState(null);

    // Right-click → context menu
    const handleContextMenu = (event, item) => {
        event.preventDefault();
        setContextMenu({
            item,
            position: { x: event.pageX, y: event.pageY },
        });
        if (!selectedItems.some((x) => x.id === item.id)) {
            onItemClick(item);
        }
    };

    // Select (single click)
    const handleSelect = (item, event) => {
        if (event.type === "contextmenu") return;
        onItemClick(item);
    };

    // Open (double click)
    const handleOpen = (item) => {
        onItemDoubleClick(item);
    };

    if (viewMode === "list") {
        // Ensure folders come first
        const sortedItems = [...items].sort((a, b) => {
            if (a.type === b.type) return 0;
            return a.type === "folder" ? -1 : 1;
        });

        return (
            <div className="bg-gray-800 rounded-lg p-2 relative">
                <div className="grid grid-cols-5 gap-4 p-2 font-medium text-gray-300 border-b border-gray-700 text-sm">
                    <div>Name</div>
                    <div>Owner</div>
                    <div>Last Modified</div>
                    <div>Size</div>
                    <div>Type</div>
                </div>
                {sortedItems.map((item) => (
                    <div
                        key={item.id}
                        className={`item-card grid grid-cols-5 gap-4 p-2 cursor-pointer hover:bg-gray-700 transition text-sm ${selectedItems.some((x) => x.id === item.id) ? "bg-gray-700" : ""
                            }`}
                        onClick={(e) => handleSelect(item, e)}
                        onDoubleClick={() => handleOpen(item)}
                        onContextMenu={(e) => handleContextMenu(e, item)}
                    >
                        <div className="flex items-center space-x-2">
                            <FileIcon type={item.type} />
                            <span className="truncate">{item.name}</span>
                        </div>
                        <div>{item.owner || "You"}</div>
                        <div>{item.modifiedAt || "-"}</div>
                        <div>{item.size ? formatFileSize(item.size) : "-"}</div>
                        <div className="capitalize">{item.type}</div>
                    </div>
                ))}

                {contextMenu && (
                    <ItemContextMenu
                        item={contextMenu.item}
                        position={contextMenu.position}
                        onClose={() => setContextMenu(null)}
                        onAction={onItemAction}
                    />
                )}
            </div>
        );
    }

    // Grid view (Google Drive style)
    const folders = items.filter((item) => item.type === "folder");
    const files = items.filter((item) => item.type === "file");

    return (
        <div className="space-y-6 relative">
            {/* Folders Section */}
            {folders.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {folders.map((item) => (
                        <div
                            key={item.id}
                            className={`item-card flex items-center border border-gray-700 rounded-lg p-4 bg-gray-800 shadow hover:shadow-lg transition cursor-pointer ${selectedItems.some((x) => x.id === item.id)
                                ? "border-blue-500"
                                : ""
                                }`}
                            onClick={(e) => handleSelect(item, e)}
                            onDoubleClick={() => handleOpen(item)}
                            onContextMenu={(e) => handleContextMenu(e, item)}
                        >
                            <Folder className="h-10 w-10 text-yellow-400 mr-4" />
                            <div className="flex-1 min-w-0">
                                <p className="truncate font-medium">{item.name}</p>
                                <p className="text-xs text-gray-400">
                                    {item.modifiedAt || "-"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Files Section */}
            {files.length > 0 && (
                <div className="item-card grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                    {files.map((item) => (
                        <div
                            key={item.id}
                            className={`border border-gray-700 rounded-xl pb-2 bg-gray-800 shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-center text-center ${selectedItems.some((x) => x.id === item.id) ? "border-blue-500" : ""
                                }`}
                            onClick={(e) => handleSelect(item, e)}
                            onDoubleClick={() => handleOpen(item)}
                            onContextMenu={(e) => handleContextMenu(e, item)}
                        >
                            {/* Thumbnail */}
                            {item.signedUrl ? (
                                item.mime_type?.startsWith("image/") ? (
                                    <img
                                        src={item.signedUrl}
                                        alt={item.name}
                                        className="h-60 w-full object-cover object-top rounded-md"
                                        // className="h-40 w-full object-contain rounded-md bg-gray-900"
                                        // className="h-40 w-full object-cover object-center rounded-md"
                                    />
                                ) : item.mime_type?.startsWith("video/") ? (
                                    <video
                                        src={item.signedUrl + "#t=0.1"}
                                        className="h-60 w-full rounded-md object-cover object-top"
                                        muted
                                        preload="metadata"
                                    />
                                ) : item.mime_type === "application/pdf" ? (
                                    <div className="flex flex-col items-center justify-center h-60 w-full bg-red-100 rounded-md">
                                        <File className="h-10 w-10 text-red-500" />
                                        <span className="text-sm mt-2 truncate">{item.name}</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-40 w-full bg-gray-800 rounded-md">
                                        <File className="h-10 w-10 text-gray-400" />
                                        <span className="text-sm mt-2">{item.name}</span>
                                    </div>
                                )
                            ) : (
                                <div className="flex flex-col items-center justify-center h-40 w-full bg-gray-800 rounded-md">
                                    <File className="h-10 w-10 text-gray-400" />
                                    <span className="text-sm mt-2">{item.name}</span>
                                </div>
                            )}

                            {/* File Info */}
                            <p className="truncate mt-3 font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-400 mt-1">{item.size ? formatFileSize(item.size) : "-"}</p>
                        </div>

                    ))}
                </div>
            )}

            {contextMenu && (
                <ItemContextMenu
                    item={contextMenu.item}
                    position={contextMenu.position}
                    onClose={() => setContextMenu(null)}
                    onAction={onItemAction}
                />
            )}
        </div>
    );
}

export default ItemGrid;
