
import { Home, Users, Clock, Star, Trash2, HardDrive } from "lucide-react";

function Sidebar(props) {
    const { activeSection, onSectionChange } = props;

    const sections = [
        {id: "home", label: "Home", icon: Home},
        { id: "my-drive", label: "My Drive", icon: HardDrive },
        { id: "shared-with-me", label: "Shared with Me", icon: Users },
        { id: "recent", label: "Recent", icon: Clock },
        { id: "starred", label: "Starred", icon: Star },
        { id: "trash", label: "Trash", icon: Trash2 },
    ];

    function handleSectionClick(sectionId) {
        onSectionChange(sectionId); // parent will decide filtering
    }

    return (
        <aside className="w-64 bg-gray-800 p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-6 text-gray-100">My Drive</h2>
            <ul className="space-y-3 text-gray-300">
                {sections.map(function (section) {
                    const Icon = section.icon;
                    return (
                        <li
                            key={section.id}
                            onClick={function () {
                                handleSectionClick(section.id);
                            }}
                            className={`cursor-pointer flex items-center space-x-2 px-2 py-2 rounded hover:bg-gray-700 transition ${activeSection === section.id ? "bg-gray-700 text-white" : ""
                                }`}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{section.label}</span>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}

export default Sidebar;
