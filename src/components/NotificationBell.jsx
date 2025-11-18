import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function NotificationBell() {
  const JWT = localStorage.getItem("token")
  const payload = JWT ? JSON.parse(atob(JWT.split(".")[1])) : null
  const url = import.meta.env.VITE_BACKEND_URL

  const [hasUnread, setHasUnread] = useState(
    localStorage.getItem("hasUnreadNotifications") === "true"
  )

  useEffect(() => {
    if (!payload) return

    async function load() {
      try {
        const res = await fetch(url + `/notifications/${payload.sub}`, {
          headers: { Authorization: `Bearer ${JWT}` },
        })

        if (!res.ok) throw new Error("Error")

        const data = await res.json()
        const nots = data.notificaciones || []

        const unread = nots.some((n) => n.status === "PENDIENTE")

        setHasUnread(unread)
        localStorage.setItem("hasUnreadNotifications", unread ? "true" : "false")

      } catch (err) {
        console.error(err)
      }
    }

    load()

    // 🔥 Listener para cambios provenientes de la página de notificaciones
    const handler = () => {
      setHasUnread(localStorage.getItem("hasUnreadNotifications") === "true")
    }
    window.addEventListener("storage", handler)

    return () => window.removeEventListener("storage", handler)

  }, [])

  return (
    <div className="relative">
      <Link to="/notificaciones" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <span className="text-2xl">🔔</span>

          {hasUnread && <span className="badge badge-error badge-xs indicator-item"></span>}
        </div>
      </Link>
    </div>
  )
}

