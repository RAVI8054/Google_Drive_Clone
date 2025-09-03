


function ConfirmDialog({ isOpen, title, description, confirmText = "Confirm", onCancel, onConfirm }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[80]">
            <div className="bg-gray-800 text-gray-100 rounded-lg p-6 w-[420px]">
                <h3 className="text-lg font-semibold">{title}</h3>
                {description && <p className="text-gray-400 mt-2">{description}</p>}

                <div className="flex justify-end gap-2 mt-6">
                    <button className="px-4 py-2 text-gray-300 hover:text-gray-100" onClick={onCancel}>Cancel</button>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;
