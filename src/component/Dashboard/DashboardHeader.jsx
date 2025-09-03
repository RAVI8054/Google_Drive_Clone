
import { Search, Upload, List, Grid3X3 } from "lucide-react";

function DashboardHeader(props) {
    const { searchQuery, onSearchChange, onSearchKeyDown, viewMode, onViewModeToggle, onNewClick } = props;

    function handleSearchChange(event) {
        onSearchChange(event.target.value);
    }

    function handleViewToggle() {
        onViewModeToggle(viewMode === "grid" ? "list" : "grid");
    }

    return (
        <header className="bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between text-gray-100">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search in Drive"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={onSearchKeyDown}
                    className="w-full pl-10 pr-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 ml-4">
                <button
                    onClick={handleViewToggle}
                    className="p-2 hover:bg-gray-700 rounded transition"
                >
                    {viewMode === "grid" ? <List className="w-5 h-5" /> : <Grid3X3 className="w-5 h-5" />}
                </button>

                <button
                    onClick={onNewClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center space-x-2"
                >
                    <Upload className="w-4 h-4" />
                    <span>New</span>
                </button>
            </div>
        </header>
    );
}

export default DashboardHeader;
