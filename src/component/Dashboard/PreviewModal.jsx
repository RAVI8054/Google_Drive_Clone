import React, { useEffect } from "react";

function PreviewModal({ isOpen, item, onClose }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // lock background scroll
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen || !item) return null;

    const mime = item.mime_type;
    const url = item.signedUrl;

    const isImage = mime?.startsWith("image/");
    const isPdf = mime === "application/pdf";
    const isVideo = mime?.startsWith("video/");
    const isText = mime?.startsWith("text/");

    return (
        <div
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center"
        >
            {/* Close button - fixed top right */}
            <button
                className="absolute top-6 right-6 text-white text-3xl bg-black/60 rounded-full px-3 py-1 hover:bg-black/80 cursor-pointer z-[110]"
                onClick={onClose}
            >
                ✕
            </button>

            {/* Content centered in full viewport */}
            <div className="w-full h-full flex items-center justify-center">
                {isImage && (
                    <img
                        src={url}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                    />
                )}

                {isPdf && (
                    <iframe
                        title="pdf"
                        src={url}
                        className="w-full h-full bg-gray-900"
                    />
                )}

                {isVideo && (
                    <video
                        src={url}
                        controls
                        autoPlay
                        className="max-h-full max-w-full"
                    />
                )}

                {isText && (
                    <iframe
                        title="text"
                        src={url}
                        className="w-full h-full bg-gray-900"
                    />
                )}

                {!isImage && !isPdf && !isVideo && !isText && (
                    <div className="text-gray-300">
                        No inline preview for this file type.{" "}
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-400 underline cursor-pointer"
                        >
                            Open in new tab
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PreviewModal;
