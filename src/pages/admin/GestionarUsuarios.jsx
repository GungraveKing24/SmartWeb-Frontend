"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NotificationModal from "../../components/NotificationModal"

export default function GestionarUsuarios() {
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [filtroRol, setFiltroRol] = useState("todos")
  const [resetUser, setResetUser] = useState(null)
  const [confirmModal, setConfirmModal] = useState(null)
  const [notification, setNotification] = useState(null)
  const token = localStorage.getItem("token")
  const url = import.meta.env.VITE_BACKEND_URL
  useEffect(() => {
    if (!token) {
      setNotification({ type: "error", message: "No estás autenticado. Inicia sesión." })
      setTimeout(() => navigate("/login"), 2000)
      return
    }
    loadUsuarios()
  }, [token, navigate])

  const loadUsuarios = async () => {
    try {
      const res = await fetch(url + `/administrador/users`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
      if (!res.ok) throw new Error("Error al obtener los usuarios")
      setUsuarios(await res.json())
    } catch (err) {
      console.error(err)
      setNotification({ type: "error", message: "❌ Error al cargar los usuarios." })
    }
  }

  const filteredUsuarios = usuarios.filter((u) => {
    const text = busqueda.toLowerCase()
    const matchRol = filtroRol === "todos" || u.rol.toLowerCase() === filtroRol
    const matchTexto = u.nombre.toLowerCase().includes(text) || u.email.toLowerCase().includes(text)
    return matchRol && matchTexto
  })

  const getRolBadge = (rol) => {
    switch (rol.toLowerCase()) {
      case "profesor":
        return "bg-blue-100 text-blue-700 border border-blue-200"
      case "estudiante":
        return "bg-green-100 text-green-700 border border-green-200"
      case "administrador":
        return "bg-indigo-100 text-indigo-700 border border-indigo-200"
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200"
    }
  }

  const handleResetPassword = (user) => setResetUser(user)

  const confirmResetPassword = () => {
    if (!resetUser) return
    console.log(`Reseteando contraseña para ${resetUser.nombre}`)
    setNotification({
      type: "success",
      message: `🔑 Contraseña de ${resetUser.nombre} reseteada y enviada al correo.`,
    })
    setResetUser(null)
  }

  const handleDeleteUser = (user) => {
    setConfirmModal({
      type: "delete",
      title: `¿Eliminar usuario ${user.nombre}?`,
      message: "Esta acción eliminará permanentemente al usuario.",
      userId: user.id,
      nombre: user.nombre,
    })
  }

  const processAction = async (action) => {
    if (action.type === "delete") {
      try {
        const res = await fetch(url + `/administrador/users/${action.userId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        })
        if (!res.ok) throw new Error("Error al eliminar")
        setUsuarios((prev) => prev.filter((u) => u.id !== action.userId))
        setNotification({ type: "success", message: `❎ Usuario ${action.nombre} eliminado.` })
      } catch (err) {
        console.error(err)
        setNotification({ type: "error", message: "❌ Error al eliminar usuario." })
      }
    }
    setConfirmModal(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Encabezado */}
      <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-10 px-6 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-semibold mb-2 flex items-center gap-2">
            👥 Gestión de Usuarios
          </h1>
          <p className="text-white/90">
            Visualiza, busca y administra estudiantes, profesores y administradores del sistema.
          </p>
        </div>
      </div>

      {/* 🔹 Contenido */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">Filtrar por Rol</label>
            <select
              value={filtroRol}
              onChange={(e) => setFiltroRol(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="todos">Todos</option>
              <option value="estudiante">Estudiante</option>
              <option value="profesor">Profesor</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-gray-700 mb-2 block">Buscar Usuario</label>
            <input
              type="text"
              placeholder="🔍 Nombre o correo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Tabla */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
              📋 Listado de Usuarios
            </h2>
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium">
              {usuarios.length} Usuarios Activos
            </span>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
            <table className="table table-zebra w-full">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                <tr>
                  <th>Nombre</th>
                  <th>Correo Electrónico</th>
                  <th>Rol</th>
                  <th>Último Acceso</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsuarios.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500 italic">
                      No hay usuarios que coincidan con tu búsqueda.
                    </td>
                  </tr>
                ) : (
                  filteredUsuarios.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition">
                      <td className="font-medium">{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getRolBadge(
                            u.rol
                          )}`}
                        >
                          {u.rol}
                        </span>
                      </td>
                      <td>{u.status || "—"}</td>
                      <td className="text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            className="btn btn-sm border-warning text-warning hover:bg-warning hover:text-white transition"
                            onClick={() => handleResetPassword(u)}
                          >
                            🔑 Resetear
                          </button>
                          <button
                            className="btn btn-sm border-error text-error hover:bg-error hover:text-white transition"
                            onClick={() => handleDeleteUser(u)}
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* 🔹 Modal Reset Password */}
      {resetUser && (
        <dialog open className="modal modal-open">
          <div className="modal-box rounded-xl max-w-md">
            <h3 className="font-bold text-xl mb-4 text-warning">Confirmar Reseteo</h3>
            <p>
              ¿Deseas resetear la contraseña de <strong>{resetUser.nombre}</strong>?
            </p>
            <p className="text-sm text-error mt-2">
              Se enviará una nueva contraseña temporal al correo del usuario.
            </p>
            <div className="modal-action">
              <button className="btn btn-outline" onClick={() => setResetUser(null)}>
                Cancelar
              </button>
              <button className="btn btn-warning" onClick={confirmResetPassword}>
                Confirmar
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* 🔹 Modal Confirmación Eliminar */}
      {confirmModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box rounded-xl max-w-md">
            <h3 className="font-bold text-xl mb-4 text-error">{confirmModal.title}</h3>
            <p className="opacity-80 mb-4">{confirmModal.message}</p>
            <div className="modal-action">
              <button className="btn btn-outline" onClick={() => setConfirmModal(null)}>
                Cancelar
              </button>
              <button className="btn btn-error" onClick={() => processAction(confirmModal)}>
                Confirmar
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* 🔹 Notificación */}
      {notification && (
        <NotificationModal
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  )
}
