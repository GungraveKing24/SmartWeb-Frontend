"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import NotificationModal from "../../components/NotificationModal"

export default function ParticipantesSesion() {
  const { sesion_id } = useParams()
  const navigate = useNavigate()
  const [participantes, setParticipantes] = useState([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(null)

  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      setNotification({ type: "error", message: "No estás autenticado. Inicia sesión." })
      setTimeout(() => navigate("/login"), 2000)
      return
    }

    const fetchParticipantes = async () => {
      try {
        const url = import.meta.env.VITE_BACKEND_URL
        const res = await fetch(url + `/participants/call/${sesion_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error("Error al obtener los participantes.")
        const data = await res.json()
        setParticipantes(data.participantes || [])
      } catch (error) {
        console.error(error)
        setNotification({
          type: "error",
          message: "❌ Error al cargar los participantes de la sesión.",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchParticipantes()
  }, [sesion_id])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🧭 Encabezado */}
      <header className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-10 px-6 shadow-sm">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-semibold mb-2">👥 Participantes de la Sesión</h1>
          <p className="text-white/90 text-lg">
            Visualiza los asistentes inscritos a esta videollamada.
          </p>
        </div>
      </header>

      {/* 🔍 Contenido */}
      <main className="container mx-auto px-6 py-10 max-w-5xl">
        {loading ? (
          <div className="text-center text-gray-500 py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4">Cargando participantes...</p>
          </div>
        ) : participantes.length === 0 ? (
          <p className="text-center text-gray-500 py-10 text-lg">
            No hay participantes en esta sesión 💤
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {participantes.map((p) => (
              <div
                key={p.id_usuario}
                className="card bg-white border border-gray-200 shadow-md hover:shadow-lg transition rounded-2xl"
              >
                <div className="card-body flex items-center gap-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      p.nombre
                    )}&background=4f46e5&color=fff`}
                    alt={p.nombre}
                    className="w-12 h-12 rounded-full shadow-sm"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{p.nombre}</h3>
                    <p className="text-sm text-gray-500">ID: {p.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🔙 Botón volver */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-primary"
          >
            ← Volver
          </button>
        </div>
      </main>

      {/* 🔔 Modal de notificación */}
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

