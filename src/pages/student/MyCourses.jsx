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
  const url = import.meta.env.VITE_BACKEND_URL
  
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
      const res = await fetch(url + `/students/courses/active`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error("Error al cargar cursos")

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
        return "badge badge-success text-white"
      case "inactivo":
        return "badge badge-neutral text-white"
      default:
        return "badge badge-ghost"
    }
  }

  return (
    <div className="min-h-screen bg-base-200">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-primary to-secondary text-primary-content py-10 px-6 shadow">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-2">📚 Mis Cursos</h1>
          <p className="opacity-90 text-lg">
            Aquí puedes ver todos los cursos en los que estás inscrito.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-6xl">

        {/* BUSQUEDA */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full sm:w-2/3">
            <label className="block text-base-content font-semibold mb-2">
              Buscar curso:
            </label>
            <input
              type="text"
              placeholder="Ej: Python, Go, Linux..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input input-bordered w-full bg-base-100"
            />
          </div>

          <span className="badge badge-primary p-4 text-primary-content text-base font-medium">
            {filteredCursos.length} cursos
          </span>
        </div>

        {/* TARJETAS */}
        {filteredCursos.length === 0 ? (
          <p className="text-center text-base-content/70 py-10 text-lg italic">
            No estás inscrito en ningún curso actualmente 💤
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCursos.map((curso) => (
              <div
                key={curso.id}
                className="card bg-base-100 border border-base-300 shadow-md hover:shadow-lg transition rounded-xl"
              >
                <div className="card-body">

                  {/* TITULO */}
                  <h2 className="card-title text-base-content flex items-center gap-2">
                    🎓 {curso.titulo}
                  </h2>

                  {/* DESCRIPCIÓN */}
                  <p className="opacity-70 leading-relaxed line-clamp-3">
                    {curso.descripcion}
                  </p>

                  {/* INFO */}
                  <div className="mt-4 space-y-1 text-sm opacity-80">
                    <p>
                      📅 <span className="font-medium">Creado:</span>{" "}
                      {formatDate(curso.creacion_curso)}
                    </p>
                    <p>
                      👨‍🏫 <span className="font-medium">Profesor ID:</span>{" "}
                      {curso.profesor_id}
                    </p>

                    <span className={getEstadoBadge(curso.estado_curso)}>
                      {curso.estado_curso}
                    </span>
                  </div>

                  {/* BOTÓN */}
                  <div className="card-actions justify-end mt-6">
                    <button
                      className="btn btn-primary btn-outline"
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

      {/* Notificación */}
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
