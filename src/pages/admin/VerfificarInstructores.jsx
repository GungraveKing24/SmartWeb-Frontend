"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NotificationModal from "../../components/NotificationModal"
import { formatDate } from "../../helpers/date"

export default function VerificarInstructores() {
  const navigate = useNavigate()
  const [instructores, setInstructores] = useState([])
  const [selectedInstructor, setSelectedInstructor] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
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
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const res = await fetch(url + `/administrador/profesores`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error("Error al cargar datos")

      setInstructores(await res.json())
    } catch (err) {
      setNotification({ type: "error", message: "⚠️ Error al cargar la información." })
      console.error(err)
    }
  }

  const handleViewDetail = (inst) => {
    setSelectedInstructor(inst)
    setModalOpen(true)
  }

  const handleApprove = (inst) => {
    setConfirmModal({
      type: "approve",
      title: `¿Aprobar a ${inst.nombre}?`,
      message: "El instructor podrá crear cursos una vez aprobado.",
      id: inst.id,
      nombre: inst.nombre,
    })
  }

  const handleReject = (inst) => {
    setConfirmModal({
      type: "reject",
      title: `¿Rechazar a ${inst.nombre}?`,
      message: "Esta acción no se puede deshacer.",
      id: inst.id,
      nombre: inst.nombre,
    })
  }

  const processAction = async (action) => {
    const endpoint =
      action.type === "approve"
        ? `approve-profesor/${confirmModal.id}`
        : `deny-profesor/${confirmModal.id}`

    try {
      const res = await fetch(url + `/administrador/${endpoint}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) throw new Error("Error en la acción")

      setNotification({
        type: action.type === "approve" ? "success" : "error",
        message:
          action.type === "approve"
            ? `✅ Instructor ${action.nombre} aprobado.`
            : `❎ Instructor ${action.nombre} rechazado.`,
      })

      setInstructores((prev) => prev.filter((p) => p.id !== confirmModal.id))
    } catch {
      setNotification({
        type: "error",
        message: `⚠️ Ocurrió un error al ${
          action.type === "approve" ? "aprobar" : "rechazar"
        } al instructor.`,
      })
    } finally {
      setConfirmModal(null)
    }
  }

  return (
    <div className="min-h-screen bg-base-200">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-primary to-accent text-white py-10 px-6 shadow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">🧑‍🏫 Verificación de Instructores</h1>
          <p className="opacity-90 text-lg">
            Revisa y gestiona las solicitudes de instructores.
          </p>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* TITULO Y CONTADOR */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold border-l-4 border-primary pl-3">
              Solicitudes Pendientes
            </h2>

            <span className="badge badge-warning badge-lg">
              {instructores.length} {instructores.length === 1 ? "Solicitud" : "Solicitudes"}
            </span>
          </div>

          {/* TABLA */}
          <div className="overflow-x-auto bg-base-100 rounded-xl shadow-md border border-base-300">
            <table className="table table-zebra">
              <thead>
                <tr className="bg-base-200 text-base-content text-sm uppercase">
                  <th>Instructor</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {instructores.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-10 text-center opacity-70">
                      No hay solicitudes pendientes 💤
                    </td>
                  </tr>
                ) : (
                  instructores.map((inst) => (
                    <tr key={inst.id} className="hover:bg-base-200 transition">
                      <td>
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              inst.nombre
                            )}&background=random`}
                            className="w-10 h-10 rounded-full"
                            alt={inst.nombre}
                          />
                          <div>
                            <p className="font-semibold">{inst.nombre}</p>
                            <p className="text-xs opacity-70">{inst.email}</p>
                          </div>
                        </div>
                      </td>

                      <td>{inst.rol}</td>

                      <td>
                        <span className="badge badge-info">{inst.status}</span>
                      </td>

                      <td>
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="btn btn-sm btn-info btn-outline"
                            onClick={() => handleViewDetail(inst)}
                          >
                            👁️ Detalle
                          </button>

                          <button
                            className="btn btn-sm btn-success btn-outline"
                            onClick={() => handleApprove(inst)}
                          >
                            ✓ Aprobar
                          </button>

                          <button
                            className="btn btn-sm btn-error btn-outline"
                            onClick={() => handleReject(inst)}
                          >
                            ✕ Rechazar
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

      {/* MODAL DETALLE */}
      {modalOpen && selectedInstructor && (
        <dialog open className="modal modal-open">
          <div className="modal-box bg-base-100 border border-base-300 rounded-xl">
            <h3 className="text-xl font-bold mb-4">📄 Detalles del Instructor</h3>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  selectedInstructor.nombre
                )}&background=random`}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="text-lg font-semibold">{selectedInstructor.nombre}</p>
                <p className="opacity-70">{selectedInstructor.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium">📅 Fecha de solicitud</p>
                <p>{formatDate(selectedInstructor.fecha)}</p>
              </div>

              <div>
                <p className="font-medium">🪪 Cédula</p>
                <p>{selectedInstructor.cedula}</p>
              </div>

              <div>
                <p className="font-medium">🏫 Institución</p>
                <p>{selectedInstructor.instituto}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-medium">💬 Motivación:</p>
              <p className="bg-base-200 p-4 rounded-lg border border-base-300 mt-2">
                {selectedInstructor.motivacion}
              </p>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setModalOpen(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* MODAL CONFIRMACIÓN */}
      {confirmModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box bg-base-100 border border-base-300 rounded-xl">
            <h3 className="text-lg font-bold">{confirmModal.title}</h3>
            <p className="opacity-80 my-4">{confirmModal.message}</p>

            <div className="modal-action">
              <button className="btn btn-outline" onClick={() => setConfirmModal(null)}>
                Cancelar
              </button>
              <button
                className={`btn ${
                  confirmModal.type === "approve" ? "btn-success" : "btn-error"
                }`}
                onClick={() => processAction(confirmModal)}
              >
                Confirmar
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* NOTIFICATION */}
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
