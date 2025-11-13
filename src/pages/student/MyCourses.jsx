"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NotificationModal from "../../components/NotificationModal"
import { formatDate } from "../../helpers/date"

export default function MyCourses() {
  const navigate = useNavigate()
  const [cursos, setCursos] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [notification, setNotification] = useState(null)
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      setNotification({ type: "error", message: "No estás autenticado. Inicia sesión." })
      setTimeout(() => navigate("/login"), 2000)
      return
    }
    loadCursos()
  }, [])

  const loadCursos = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/students/courses/active", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Error al cargar los cursos.")
      const data = await res.json()
      setCursos(data || [])
    } catch (err) {
      console.error(err)
      setNotification({
        type: "error",
        message: "❌ Error al cargar tus cursos.",
      })
    }
  }

  const filteredCursos = cursos.filter((c) =>
    c.titulo.toLowerCase().includes(busqueda.toLowerCase())
  )

  const getEstadoBadge = (estado) => {
    switch (estado.toLowerCase()) {
      case "activo":
        return "badge-success text-white"
      case "inactivo":
        return "badge-neutral text-white"
      default:
        return "badge-ghost"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🧭 Encabezado */}
      <header className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-10 px-6 shadow-sm">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-semibold mb-2">📚 Mis Cursos</h1>
          <p className="text-lg text-white/90">
            Aquí puedes ver todos los cursos en los que estás inscrito.
          </p>
        </div>
      </header>

      {/* 🔍 Búsqueda */}
      <main className="container mx-auto px-6 py-10 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full sm:w-2/3">
            <label className="block text-gray-700 font-semibold mb-2">Buscar curso:</label>
            <input
              type="text"
              placeholder="Ej: Python, Go, Linux..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <span className="badge badge-primary p-4 text-white text-base font-medium">
            {filteredCursos.length} cursos
          </span>
        </div>

        {/* 🧱 Tarjetas */}
        {filteredCursos.length === 0 ? (
          <p className="text-center text-gray-500 py-10 text-lg">
            No estás inscrito en ningún curso actualmente 💤
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCursos.map((curso) => (
              <div
                key={curso.id}
                className="card bg-white border border-gray-200 shadow-md hover:shadow-lg transition rounded-2xl"
              >
                <div className="card-body">
                  <h2 className="card-title text-gray-800 flex items-center gap-2">
                    🎓 {curso.titulo}
                  </h2>
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {curso.descripcion}
                  </p>

                  <div className="mt-4 space-y-1">
                    <p className="text-sm text-gray-600">
                      📅 <span className="font-medium">Creado:</span>{" "}
                      {formatDate(curso.creacion_curso)}
                    </p>
                    <p className="text-sm text-gray-600">
                      👨‍🏫 <span className="font-medium">Profesor ID:</span> {curso.profesor_id}
                    </p>
                    <span className={`badge ${getEstadoBadge(curso.estado_curso)}`}>
                      {curso.estado_curso}
                    </span>
                  </div>

                  <div className="card-actions justify-end mt-6">
                    <button
                      className="btn btn-outline btn-primary"
                      onClick={() => navigate(`/curso/${curso.id}`)}
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 🔔 Notificaciones */}
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

