"use client"

export default function NotificationModal({ isOpen, type = "info", title, message, onClose }) {
    if (!isOpen) return null

    const getIcon = () => {
        switch (type) {
            case "error":
                return "✕"
            case "success":
                return "✓"
            case "info":
                return "ℹ"
            default:
                return "ℹ"
        }
    }

    const getBadgeColor = () => {
        switch (type) {
            case "error":
                return "badge-error"
            case "success":
                return "badge-success"
            case "info":
                return "badge-info"
            default:
                return "badge-info"
        }
    }

    return (
        <div
            className="fixed inset-0 bg-base-100/40 flex items-center justify-center z-50 px-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-base-100 rounded-xl shadow-2xl p-6 max-w-sm w-full border border-base-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Título con ícono */}
                <div className="flex items-center gap-3 mb-4">
                    <div className={`badge ${getBadgeColor()} text-white`}>{getIcon()}</div>
                    <h3 className="font-bold text-lg">{title}</h3>
                </div>

                {/* Mensaje */}
                <p className="mb-6 text-base-content opacity-80">{message}</p>

                {/* Botones */}
                <div className="flex justify-end gap-2">
                    <button className="btn btn-sm btn-primary" onClick={onClose}>
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    )
}
