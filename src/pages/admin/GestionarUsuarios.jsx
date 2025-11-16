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
  }, [])

  const loadUsuarios = async () => {
    try {
      const res = await fetch(url + `/administrador/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Error")
      setUsuarios(await res.json())
    } catch (err) {
      console.error(err)
      setNotification({ type: "error", message: "❌ Error al cargar los usuarios." })
    }
  }

  // DaisyUI: estilos por rol
  const getRolBadge = (rol) => {
    switch (rol.toLowerCase()) {
      case "profesor":
        return "badge badge-info"
      case "estudiante":
        return "badge badge-success"
      case "administrador":
        return "badge badge-primary"
      default:
        return "badge badge-neutral"
    }
  }

  // Filtrado
  const filteredUsuarios = usuarios.filter((u) => {
    const text = busqueda.toLowerCase()
    const byRol = filtroRol === "todos" || u.rol.toLowerCase() === filtroRol
    const byText = u.nombre.toLowerCase().includes(text) || u.email.toLowerCase().includes(text)
    return byRol && byText
  })

  const handleResetPassword = (user) => setResetUser(user)

  const confirmResetPassword = () => {
    setNotification({
      type: "success",
      message: `🔑 Contraseña de ${resetUser.nombre} reseteada y enviada por correo.`,
    })
    setResetUser(null)
  }

  const handleDeleteUser = (user) => {
    setConfirmModal({
      type: "delete",
      title: `Eliminar usuario: ${user.nombre}`,
      message: "Esta acción no se puede deshacer.",
      userId: user.id,
      nombre: user.nombre,
    })
  }

  const processAction = async (action) => {
    if (action.type === "delete") {
      try {
        const res = await fetch(url + `/administrador/users/${action.userId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error()

        setUsuarios((prev) => prev.filter((u) => u.id !== action.userId))

        setNotification({ type: "success", message: `🗑️ Usuario ${action.nombre} eliminado.` })
      } catch {
        setNotification({ type: "error", message: "❌ Error al eliminar usuario." })
      }
    }

    setConfirmModal(null)
  }

  return (
    <div className="min-h-screen bg-base-200">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-10 px-6 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold flex items-center gap-2">👥 Gestión de Usuarios</h1>
          <p className="opacity-90">Administra estudiantes, profesores y administradores.</p>
        </div>
      </div>

      {/* CONTENIDO */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* FILTROS */}
        <section className="bg-base-100 p-6 rounded-xl shadow border border-base-300">
          <h2 className="text-xl font-bold mb-4">Filtros</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="form-control">
              <label className="label font-semibold">Filtrar por rol</label>
              <select
                value={filtroRol}
                onChange={(e) => setFiltroRol(e.target.value)}
                className="select select-bordered bg-base-100"
              >
                <option value="todos">Todos</option>
                <option value="estudiante">Estudiante</option>
                <option value="profesor">Profesor</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label font-semibold">Buscar usuarios</label>
              <input
                type="text"
                className="input input-bordered bg-base-100"
                placeholder="🔍 Nombre o correo…"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

          </div>
        </section>

        {/* TABLA */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">📋 Listado de Usuarios</h2>
            <span className="badge badge-primary badge-lg">{usuarios.length} Usuarios</span>
          </div>

          <div className="overflow-x-auto bg-base-100 rounded-xl shadow-md border border-base-300">
            <table className="table table-zebra">
              <thead>
                <tr className="bg-base-200 text-base-content uppercase text-sm">
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsuarios.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center opacity-70 py-10">
                      No hay coincidencias.
                    </td>
                  </tr>
                ) : (
                  filteredUsuarios.map((u) => (
                    <tr key={u.id} className="hover:bg-base-200 transition">
                      <td className="font-semibold">{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={getRolBadge(u.rol)}>{u.rol}</span>
                      </td>
                      <td>{u.status || "—"}</td>

                      {/* Acciones */}
                      <td className="text-center">
                        <div className="flex justify-center gap-2">

                          <button
                            className="btn btn-error btn-sm btn-outline"
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

      {/* MODAL RESET PASSWORD */}
      {resetUser && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">🔑 Resetear contraseña</h3>
            <p className="py-4">
              ¿Deseas resetear la contraseña de <b>{resetUser.nombre}</b>?
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

      {/* MODAL ELIMINAR */}
      {confirmModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error">{confirmModal.title}</h3>
            <p className="py-4 opacity-80">{confirmModal.message}</p>

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
