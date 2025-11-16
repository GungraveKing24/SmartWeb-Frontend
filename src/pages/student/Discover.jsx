"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NotificationModal from "../../components/NotificationModal"

export default function DescubrirCursos() {
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
      const res = await fetch(url + `/students/available`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await res.json()
      setCursos(data.cursos)
    } catch (err) {
      console.error(err)
      setNotification({
        type: "error",
        message: "❌ Error al cargar los cursos disponibles.",
      })
    }
  }

  const handleInscribirse = async (cursoId, titulo) => {
    try {
      const res = await fetch(url + `/students/courses/enroll/${cursoId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error("Error al inscribirse al curso.")

      setNotification({
        type: "success",
        message: `🎉 Te has inscrito exitosamente en "${titulo}"`,
      })

      setCursos((prev) => prev.filter((c) => c.id !== cursoId))
    } catch (error) {
      console.error(error)
      setNotification({
        type: "error",
        message: "⚠️ No se pudo completar la inscripción.",
      })
    }
  }

  const filteredCursos = cursos.filter((c) =>
    c.titulo.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-base-200">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-primary to-accent text-primary-content py-10 px-6 shadow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">🎓 Descubre Nuevos Cursos</h1>
          <p className="opacity-90 text-lg">
            Explora cursos disponibles e inscríbete para empezar a aprender.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* BÚSQUEDA */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full sm:w-2/3">
            <label className="font-semibold mb-2 block">Buscar curso:</label>

            <input
              type="text"
              placeholder="Ej: Python, Matemáticas, Redes..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input input-bordered w-full bg-base-100"
            />
          </div>

          <span className="badge badge-primary badge-lg">
            {filteredCursos.length} disponibles
          </span>
        </div>

        {/* GRID DE CURSOS */}
        {filteredCursos.length === 0 ? (
          <p className="text-center opacity-70 py-10 text-lg">
            No hay cursos disponibles o que coincidan con tu búsqueda 💤
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCursos.map((curso) => (
              <div
                key={curso.id}
                className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition rounded-xl"
              >
                <div className="card-body">

                  <h2 className="card-title flex items-center gap-2">
                    📘 {curso.titulo}
                  </h2>

                  <p className="opacity-80">
                    {curso.descripcion}
                  </p>

                  <div className="mt-3 text-sm opacity-70">
                    👨‍🏫 <span className="font-medium">{curso.profesor}</span>
                  </div>

                  <div className="card-actions justify-end mt-6">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleInscribirse(curso.id, curso.titulo)}
                    >
                      Inscribirse
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* NOTIFICACIÓN */}
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
