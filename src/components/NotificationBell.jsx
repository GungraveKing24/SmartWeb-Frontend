import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Bell } from "lucide-react"   // ⭐ ÍCONO BONITO Y PROFESIONAL

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
    <>
      <Link 
        to="/notificaciones" 
        className="relative btn btn-ghost btn-circle"
      >
        <div className="min-w-[42px] h-[42px] flex items-center justify-center">
          <Bell
            size={18}
            strokeWidth={2}
            className="text-primary opacity-80 hover:opacity-100 transition-all"
          />

          {hasUnread && <span className="absolute top-[6px] right-[6px] w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>}
        </div>
      </Link>
    </>
  )
}

