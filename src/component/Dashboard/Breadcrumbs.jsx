
import { Home, ChevronRight } from "lucide-react";
import React from "react";

function Breadcrumbs(props) {
    // path is a state -breadcrumbs in dashboard which is holding current folder path
    // onNavigate function will tell dashboard which folder was clicked.
    const { path, onNavigate } = props;

    function handleNavigate(folderId) {
        onNavigate(folderId); // passing folder id back to dasboard so that dasboard can fetch the file/folder inside it..
    }

    return (
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
            {/* Root/Home */}
            <button
                onClick={function () { handleNavigate(null); }}
                className="flex items-center hover:text-blue-400 transition-colors"
            >
                <Home className="w-4 h-4 mr-1" />
                Root
            </button>

            {path.map(function (folder) {
                return (
                    <React.Fragment key={folder.id}>
                        <ChevronRight className="w-4 h-4" />
                        <button
                            onClick={function () { handleNavigate(folder.id); }}
                            className="hover:text-blue-400 transition-colors"
                        >
                            {folder.name}
                        </button>
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default Breadcrumbs;

