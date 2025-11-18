import { useEffect, useState } from "react"
import { formatDate } from "../helpers/date"

export default function Notifications() {
  const JWT = localStorage.getItem("token")
  const payload = JSON.parse(atob(JWT.split(".")[1]))
  const url = import.meta.env.VITE_BACKEND_URL

  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

useEffect(() => {
  async function load() {
    try {
      // 👉 Primero marcar todas como leídas
      await fetch(url + `/notifications/${payload.sub}/mark_all_read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${JWT}` },
      })

      // 👉 Luego obtener notificaciones ya actualizadas
      const res = await fetch(url + `/notifications/${payload.sub}`, {
        headers: { Authorization: `Bearer ${JWT}` },
      })

      if (!res.ok) throw new Error("Error al cargar notificaciones")

      const data = await res.json()
      setNotifications(data.notificaciones || [])

      // 👉 Avisar a la campana que ya no hay notificaciones
      localStorage.setItem("hasUnreadNotifications", "false")

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  load()
}, [])
  const getTypeStyle = (tipo) => {
    switch (tipo) {
      case "success":
        return "border-success bg-success/10"
      case "warning":
        return "border-warning bg-warning/10"
      case "error":
        return "border-error bg-error/10"
      default:
        return "border-info bg-info/10"
    }
  }

  const getIcon = (tipo) => {
    switch (tipo) {
      case "success":
        return "✅"
      case "warning":
        return "⚠️"
      case "error":
        return "❌"
      default:
        return "ℹ️"
    }
  }

  const markAsRead = async (id) => {
    try {
      const res = await fetch(url + `/notifications/${id}/read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${JWT}` },
      })

      if (!res.ok) throw new Error("Error al marcar como leída")

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, status: "LEIDA" } : n))
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-5">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          🔔 Mis Notificaciones
        </h1>

        {loading ? (
          <div className="text-center opacity-70 py-10">Cargando...</div>
        ) : notifications.length === 0 ? (
          <div className="text-center opacity-60 py-10">
            No tienes notificaciones por ahora 😊
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`card shadow-md border-l-4 ${getTypeStyle(n.tipo)} transition hover:shadow-lg`}
              >
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{getIcon(n.tipo)}</span>
                      <div>
                        <h3 className="font-bold text-lg">{n.titulo}</h3>
                        <p className="opacity-80">{n.mensaje}</p>

                        <p className="text-xs opacity-60 mt-1">
                          🕒 {formatDate(n.hora_envio)}
                        </p>
                      </div>
                    </div>

                    {n.status === "PENDIENTE" && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="btn btn-sm btn-primary"
                      >
                        Marcar como leída
                      </button>
                    )}
                  </div>

                  {n.status === "PENDIENTE" && (
                    <span className="badge badge-warning mt-2">Pendiente</span>
                  )}
                  {n.status === "LEIDA" && (
                    <span className="badge badge-success mt-2">Leída</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

