import React from "react";

function Features() {
    const features = [
        {
            name: "Secure Storage",
            tag: "Enterprise-Grade Security",
            description: "Advanced encryption and multi-layer security protocols to keep your files safe and protected.",
            position: "top-left"
        },
        {
            name: "Real-time Sync",
            tag: "Instant Collaboration",
            description: "Seamlessly sync files across all devices with real-time updates and version control.",
            position: "middle-left"
        },
        {
            name: "Smart Search",
            tag: "AI-Powered Discovery",
            description: "Find any file instantly with intelligent search that understands content, not just names.",
            position: "bottom-left"
        },
        {
            name: "Team Sharing",
            tag: "Collaborative Workspace",
            description: "Share folders and files with granular permissions for seamless team collaboration.",
            position: "top-right"
        },
        {
            name: "Auto Backup",
            tag: "Never Lose Data",
            description: "Automatic backup of your important files with multiple recovery points and versioning.",
            position: "middle-right"
        },
        {
            name: "Mobile Access",
            tag: "Anywhere, Anytime",
            description: "Access, edit, and share your files on any device with our responsive mobile apps.",
            position: "bottom-right"
        }
    ];

    function getIcon(name) {
        var iconProps = "w-8 h-8 text-teal-400";

        switch (name) {
            case "Secure Storage":
                return (
                    <svg className={iconProps} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16.2V16H7.8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
                    </svg>
                );
            case "Real-time Sync":
                return (
                    <svg className={iconProps} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                );
            case "Smart Search":
                return (
                    <svg className={iconProps} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                    </svg>
                );
            case "Team Sharing":
                return (
                    <svg className={iconProps} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25Z" />
                    </svg>
                );
            case "Auto Backup":
                return (
                    <svg className={iconProps} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17,12C17,10.89 16.1,10 15,10H13.5C13.1,8.75 12.1,7.91 11,7.91C9.9,7.91 8.9,8.75 8.5,10H7C5.9,10 5,10.89 5,12V18C5,19.1 5.9,20 7,20H17C18.1,20 19,19.1 19,18V12C19,10.89 18.1,10 17,10M11,9C11.6,9 12,9.4 12,10C12,10.6 11.6,11 11,11C10.4,11 10,10.6 10,10C10,9.4 10.4,9 11,9M17,18H7V12H8.5C8.9,13.25 9.9,14.09 11,14.09C12.1,14.09 13.1,13.25 13.5,12H15H17V18Z" />
                    </svg>
                );
            case "Mobile Access":
                return (
                    <svg className={iconProps} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21C5,22.1 5.9,23 7,23H17C18.1,23 19,22.1 19,21V3C19,1.89 18.1,1 17,1Z" />
                    </svg>
                );
            default:
                return (
                    <svg className={iconProps} viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                );
        }
    }

    function renderFeature(feature) {
        return (
            <div
                key={feature.name}
                className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:border-teal-500/30"
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center">
                        {getIcon(feature.name)}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white">{feature.name}</h3>
                        <span className="inline-block bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm mt-1">
                            {feature.tag}
                        </span>
                    </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
        );
    }

    function renderLeftColumn() {
        return features
            .filter(function (feature) {
                return feature.position.indexOf("left") !== -1;
            })
            .map(renderFeature);
    }

    function renderRightColumn() {
        return features
            .filter(function (feature) {
                return feature.position.indexOf("right") !== -1;
            })
            .map(renderFeature);
    }

    return (
        <div className="max-w-7xl bg-gray-900 text-white p-8 font-sans">
            {/* Heading */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4">
                    Experience the power
                    <br />
                    of our cloud storage features
                </h1>
            </div>

            {/* Main Layout */}
            <div className="max-w-7xl mx-auto relative">
                {/* Central Glowing Circle */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-64 h-64 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center relative">
                        {/* Outer glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/30 to-cyan-600/30 blur-xl scale-150"></div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/20 to-cyan-600/20 blur-2xl scale-200"></div>

                        {/* Inner circle with cloud icon */}
                        <div className="w-48 h-48 rounded-full bg-gray-900 flex items-center justify-center relative z-10">
                            <svg className="w-16 h-16 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.35,10.04C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.04C2.34,8.36 0,10.91 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.04Z" />
                            </svg>
                        </div>

                        {/* Floating particles */}
                        <div className="absolute top-8 left-8 w-2 h-2 bg-teal-300 rounded-full animate-pulse"></div>
                        <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse delay-300"></div>
                        <div className="absolute bottom-16 left-16 w-1 h-1 bg-teal-200 rounded-full animate-pulse delay-700"></div>
                    </div>
                </div>

                {/* Features Cards Grid */}
                <div className="grid grid-cols-2 gap-8 items-center min-h-[600px]">
                    <div className="space-y-8 pr-40">{renderLeftColumn()}</div>
                    <div className="space-y-8 pl-40">{renderRightColumn()}</div>
                </div>

                {/* Connection Lines (subtle) */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                    {/* Left side connections */}
                    <line x1="45%" y1="20%" x2="50%" y2="50%" stroke="rgba(20, 184, 166, 0.1)" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="45%" y1="50%" x2="50%" y2="50%" stroke="rgba(20, 184, 166, 0.1)" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="45%" y1="80%" x2="50%" y2="50%" stroke="rgba(20, 184, 166, 0.1)" strokeWidth="1" strokeDasharray="4,4" />

                    {/* Right side connections */}
                    <line x1="55%" y1="20%" x2="50%" y2="50%" stroke="rgba(20, 184, 166, 0.1)" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="55%" y1="50%" x2="50%" y2="50%" stroke="rgba(20, 184, 166, 0.1)" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="55%" y1="80%" x2="50%" y2="50%" stroke="rgba(20, 184, 166, 0.1)" strokeWidth="1" strokeDasharray="4,4" />
                </svg>
            </div>
        </div>
    );
}

export default Features;
