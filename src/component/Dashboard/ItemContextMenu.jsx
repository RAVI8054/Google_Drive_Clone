
import { useEffect, useRef } from "react";
import { Eye, Download, Share2, Star, StarOff, Trash2, Settings, MoveRight } from "lucide-react";

function ItemContextMenu(props) {
    const { item, position, onClose, onAction } = props;
    const menuRef = useRef(null);

    useEffect(function () {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const menuItems = [
        { label: item.type === "folder" ? "Open" : "Preview", icon: Eye, action: item.type === "folder" ? "open" : "preview" },
        { label: "Download", icon: Download, action: "download" },
        // { label: "Share", icon: Share2, action: "share" }, // you said: leave share for now
        { label: item?.starred ? "Unstar" : "Star", icon: item?.starred ? StarOff : Star, action: "star" },
        { label: "Rename", icon: Settings, action: "rename" },
        { label: "Move", icon: MoveRight, action: "move" },
        { label: "Move to Trash", icon: Trash2, action: "delete", danger: true },
    ];

    return (
        <div
            ref={menuRef}
            className="fixed bg-gray-800 text-gray-100 border border-gray-700 rounded-lg shadow-lg py-2 z-50"
            style={{ top: position.y, left: position.x, minWidth: "180px" }}
        >
            {menuItems.map(function (menuItem) {
                const Icon = menuItem.icon;
                return (
                    <button
                        key={menuItem.action}
                        onClick={function () {
                            onAction(menuItem.action, item);
                            onClose();
                        }}
                        className={`w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-700 transition-colors ${menuItem.danger ? "text-red-500" : "text-gray-100"
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        <span>{menuItem.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default ItemContextMenu;
