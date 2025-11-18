"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { formatDate, formatIndividualDate } from "../helpers/date"
import NotificationModal from "../components/NotificationModal"

export default function SesionesCurso() {
  const { curso_id } = useParams()
  const navigate = useNavigate()
  const [cursoInfo, setCursoInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(null)

  const token = localStorage.getItem("token")
  const payload = JSON.parse(atob(token.split(".")[1]))
  const rol = String(payload.rol)

  useEffect(() => {
    if (!token) {
      setNotification({ type: "error", message: "No estás autenticado. Inicia sesión." })
      setTimeout(() => navigate("/login"), 2000)
      return
    }

    const fetchSesiones = async () => {
      try {
        const url = import.meta.env.VITE_BACKEND_URL
        const res = await fetch(url + `/courses/${curso_id}/sessions`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error("Error al cargar las sesiones.")
        const data = await res.json()
        setCursoInfo(data ?? [])
      } catch (err) {
        console.error(err)
        setNotification({
          type: "error",
          message: "❌ Error al cargar las sesiones del curso.",
        })
        setCursoInfo([])
      } finally {
        setLoading(false)
      }
    }

    fetchSesiones()
  }, [curso_id])

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "concluida":
        return "badge badge-neutral"
      case "en_curso":
        return "badge badge-success text-success-content"
      case "futura":
        return "badge badge-info text-info-content"
      default:
        return "badge badge-outline"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-base-content">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4">Cargando sesiones...</p>
      </div>
    )
  }

  if (!cursoInfo || cursoInfo.message) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-base-content">
        <p>{cursoInfo.message}</p>
      </div>
    )
  }
  console.log(cursoInfo)

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-primary-content py-10 px-6 shadow-sm">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-semibold mb-2">📘 {cursoInfo.curso}</h1>
          <p className="text-lg opacity-90 mb-2">👨‍🏫 {cursoInfo.profesor}</p>
          <p className="text-sm opacity-80">
            Total de sesiones: <span className="font-semibold">{cursoInfo.total_sesiones}</span>
          </p>
        </div>
      </header>

      {/* Lista de sesiones */}
      <main className="container mx-auto px-6 py-10 max-w-6xl">
        {cursoInfo.sesiones?.length === 0 ? (
          <p className="text-center opacity-70 text-lg py-10">
            No hay sesiones registradas para este curso 💤
          </p>
        ) : (
          <div className="space-y-4">
            {(cursoInfo.sesiones || []).map((sesion, idx) => (
              <div
                key={idx}
                className={`
                  card shadow-md hover:shadow-lg transition-all border-l-4
                  ${
                    sesion.estado === "concluida"
                      ? "bg-base-300 border-base-content/40"
                      : sesion.estado === "en_curso"
                      ? "bg-success/10 border-success"
                      : "bg-base-100 border-primary"
                  }
                `}
              >
                <div className="card-body md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">{sesion.titulo}</h3>
                    <p className="opacity-80 text-sm leading-relaxed">{sesion.descripcion}</p>

                    <div className="text-sm opacity-80 flex flex-wrap gap-4">
                      <span>📅 {formatDate(sesion.hora_inicio)}</span>
                      <span>
                        🕐 {formatIndividualDate(sesion.hora_inicio, "hour")}:
                        {formatIndividualDate(sesion.hora_inicio, "minutes")}{" "}
                        - {formatIndividualDate(sesion.hora_fin, "hour")}:
                        {formatIndividualDate(sesion.hora_fin, "minutes")}
                      </span>
                      <span>👥 {sesion.participantes} participantes</span>
                      <span>🎞️ {sesion.calidad_video}</span>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-col md:items-end gap-3 mt-4 md:mt-0">
                    <div className={getEstadoBadge(sesion.estado)}>
                      {sesion.estado === "en_curso"
                        ? "En curso"
                        : sesion.estado === "futura"
                        ? "Próxima"
                        : "Concluida"}
                    </div>

                    {sesion.estado === "en_curso" && (
                      <Link
                        to={sesion.enlace_llamada}
                        className="btn btn-outline btn-primary btn-sm"
                      >
                        🚀 Unirse
                      </Link>
                    )}

                    {rol === "Profesor" && (
                      <Link
                        to={`/profesor/sesion/${sesion.sesion_id}/participantes`}
                        className="btn btn-outline btn-primary btn-sm"
                      >
                        Participantes
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Volver */}
        <div className="mt-10 text-center">
          <button onClick={() => navigate(-1)} className="btn btn-outline btn-primary">
            ← Volver
          </button>
        </div>
      </main>

      {/* Modal notificación */}
      {notification && (
        <NotificationModal
          isOpen={true}
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  )
}
