"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NotificationModal from "../../components/NotificationModal"

export default function GestionarUsuarios() {
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [filtroRol, setFiltroRol] = useState("todos")
  const [confirmModal, setConfirmModal] = useState(null)
  const [notification, setNotification] = useState(null)

  // Nuevo modal para editar max_cursos
  const [maxCursosModal, setMaxCursosModal] = useState(null)
  const [nuevoMax, setNuevoMax] = useState("")

  const token = localStorage.getItem("token")
  const url = import.meta.env.VITE_BACKEND_URL
  console.log(usuarios)

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
      if (!res.ok) throw new Error("Error al cargar usuarios")
      setUsuarios(await res.json())
    } catch (err) {
      console.error(err)
      setNotification({ type: "error", message: "❌ Error al cargar los usuarios." })
    }
  }

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
    const byText =
      u.nombre.toLowerCase().includes(text) || u.email.toLowerCase().includes(text)
    return byRol && byText
  })

  const handleDeactivateUser = (user) => {
    setConfirmModal({
      type: "deactivate",
      title: `Desactivar Usuario`,
      message: `¿Deseas desactivar la cuenta de ${user.nombre}?`,
      userId: user.id,
      nombre: user.nombre,
    })
  }

  //  Abrir modal de max cursos
  const handleEditMaxCursos = (user) => {
    setNuevoMax(user.max_cursos || "")
    setMaxCursosModal({
      userId: user.id,
      nombre: user.nombre,
    })
  }

  // Ejecutar PUT /change/max-cursos/{profesor_id}
  const updateMaxCursos = async () => {
    try {
      const res = await fetch(
        `${url}/administrador/change/max-cursos/${maxCursosModal.userId}?count=${nuevoMax}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!res.ok) throw new Error()

      // Actualizar estado local
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === maxCursosModal.userId ? { ...u, max_cursos: nuevoMax } : u
        )
      )

      setNotification({
        type: "success",
        message: `✔ Máximo de cursos actualizado para ${maxCursosModal.nombre}`,
      })

      setMaxCursosModal(null)
    } catch (err) {
      setNotification({
        type: "error",
        message: "❌ No se pudo actualizar el máximo de cursos.",
      })
    }
  }

  const processAction = async (action) => {
    if (action.type === "deactivate") {
      try {
        const res = await fetch(url + `/administrador/users/${action.userId}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error("No se pudo desactivar")

        setUsuarios((prev) =>
          prev.map((u) =>
            u.id === action.userId ? { ...u, status: "Inactivo" } : u
          )
        )

        setNotification({
          type: "success",
          message: `⚠️ Usuario ${action.nombre} ha sido desactivado.`,
        })
      } catch (error) {
        setNotification({
          type: "error",
          message: "❌ No se pudo desactivar el usuario.",
        })
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
                  <th>Max Cursos</th>
                  <th>Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsuarios.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center opacity-70 py-10">
                      No hay coincidencias.
                    </td>
                  </tr>
                ) : (
                  filteredUsuarios.map((u) => (
                    <tr key={u.id} className="hover:bg-base-200 transition">
                      <td className="font-semibold">{u.nombre}</td>
                      <td>{u.email}</td>
                      <td><span className={getRolBadge(u.rol)}>{u.rol}</span></td>
                      <td>{u.rol === "Profesor" ? u.max_cursos ?? "-" : "-"}</td>
                      <td>
                        {u.status === "Inactivo" ? (
                          <span className="badge badge-error">Inactivo</span>
                        ) : (
                          <span className="badge badge-success">Activo</span>
                        )}
                      </td>

                      {/* ACCIONES */}
                      <td className=" space-x-2">

                        {/* Solo profesores */}
                        {u.rol === "Profesor" && (
                          <button
                            className="btn btn-info btn-sm btn-outline"
                            onClick={() => handleEditMaxCursos(u)}
                          >
                            📘 Editar Máx. Cursos
                          </button>
                        )}

                        <button
                          className="btn btn-warning btn-sm btn-outline"
                          onClick={() => handleDeactivateUser(u)}
                        >
                          🚫 Desactivar
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* MODAL → EDITAR MAX CURSOS */}
      {maxCursosModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              📘 Editar Máximo de Cursos — {maxCursosModal.nombre}
            </h3>

            <div className="form-control mt-4">
              <label className="label">Nuevo máximo</label>
              <input
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                pattern="[0-9]"
                className="input input-bordered"
                value={nuevoMax}
                onChange={(e) => {
                  const val = e.target.value;

                  if (val < 0) return;

                  if (!/^\d*$/.test(val)) return;

                  setNuevoMax(e.target.value)
                }}
              />
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setMaxCursosModal(null)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={updateMaxCursos}>
                Guardar cambios
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* MODAL CONFIRMACIÓN DESACTIVAR */}
      {confirmModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{confirmModal.title}</h3>
            <p className="py-4 opacity-80">{confirmModal.message}</p>

            <div className="modal-action">
              <button className="btn btn-outline" onClick={() => setConfirmModal(null)}>
                Cancelar
              </button>
              <button className="btn btn-warning" onClick={() => processAction(confirmModal)}>
                Confirmar
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* NOTIFICACIONES */}
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

