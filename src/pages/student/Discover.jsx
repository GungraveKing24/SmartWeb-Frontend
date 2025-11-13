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

      // Opcional: remover curso de la lista
      setCursos((prev) => prev.filter((c) => c.id !== cursoId))
    } catch (error) {
      console.error(error)
      setNotification({
        type: "error",
        message: "⚠️ No se pudo completar la inscripción. Inténtalo más tarde.",
      })
    }
  }

  const filteredCursos = cursos.filter((c) =>
    c.titulo.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🧭 Encabezado */}
      <header className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-10 px-6 shadow-sm">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-semibold mb-2">🎓 Descubre Nuevos Cursos</h1>
          <p className="text-lg text-white/90">
            Explora los cursos disponibles e inscríbete para comenzar a aprender.
          </p>
        </div>
      </header>

      {/* 🔍 Barra de búsqueda */}
      <main className="container mx-auto px-6 py-10 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full sm:w-2/3">
            <label className="block text-gray-700 font-semibold mb-2">Buscar curso:</label>
            <input
              type="text"
              placeholder="Ej: Python, Redes, Matemáticas..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <span className="badge badge-primary p-4 text-white text-base font-medium">
            {filteredCursos.length} disponibles
          </span>
        </div>

        {/* 🧱 Grid de cursos */}
        {filteredCursos.length === 0 ? (
          <p className="text-center text-gray-500 py-10 text-lg">
            No hay cursos disponibles o que coincidan con tu búsqueda 💤
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
                    📘 {curso.titulo}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{curso.descripcion}</p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      👨‍🏫 <span className="font-medium">{curso.profesor}</span>
                    </p>
                  </div>

                  <div className="card-actions justify-end mt-6">
                    <button
                      className="btn btn-primary text-white"
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

