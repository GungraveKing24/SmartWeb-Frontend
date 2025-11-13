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
      const profesRes = await fetch("http://127.0.0.1:8000/administrador/profesores", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!profesRes.ok) throw new Error("Error al cargar los datos.")

      setInstructores(await profesRes.json())
    } catch (err) {
      console.error(err)
      setNotification({ type: "error", message: "❌ Error al cargar la información." })
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
      const res = await fetch(`http://127.0.0.1:8000/administrador/${endpoint}`, {
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
    } catch (error) {
      console.error(error)
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
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Encabezado */}
      <header className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-10 px-6 shadow-sm">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-semibold mb-2">🧑‍🏫 Verificación de Instructores</h1>
          <p className="text-lg text-white/90">
            Revisa y gestiona las solicitudes para convertirse en profesor.
          </p>
        </div>
      </header>

      {/* 🔹 Contenido principal */}
      <main className="container mx-auto px-6 py-10 max-w-6xl space-y-10">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 text-gray-800">
              Solicitudes pendientes
            </h2>
            <span className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full font-medium text-sm shadow-sm">
              {instructores.length} {instructores.length === 1 ? "Solicitud" : "Solicitudes"}
            </span>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl shadow border border-gray-100">
            <table className="table">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                  <th>Instructor</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {instructores.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 py-8">
                      No hay solicitudes pendientes 💤
                    </td>
                  </tr>
                ) : (
                  instructores.map((inst) => (
                    <tr key={inst.id} className="hover:bg-gray-50 transition">
                      <td>
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              inst.nombre
                            )}&background=4f46e5&color=fff`}
                            alt={inst.nombre}
                            className="w-10 h-10 rounded-full shadow-sm"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">{inst.nombre}</p>
                            <p className="text-sm text-gray-500">{inst.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-gray-700">{inst.rol}</td>
                      <td>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200">
                          {inst.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="btn btn-sm border border-indigo-400 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                            onClick={() => handleViewDetail(inst)}
                          >
                            👁️ Detalle
                          </button>
                          <button
                            className="btn btn-sm border border-green-400 text-green-600 hover:bg-green-600 hover:text-white transition"
                            onClick={() => handleApprove(inst)}
                          >
                            ✓ Aprobar
                          </button>
                          <button
                            className="btn btn-sm border border-red-400 text-red-600 hover:bg-red-600 hover:text-white transition"
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

      {/* 🔹 Modal Detalle */}
      {modalOpen && selectedInstructor && (
        <dialog open className="modal modal-open">
          <div className="modal-box rounded-2xl max-w-2xl bg-white border border-gray-200">
            <h3 className="font-bold text-2xl mb-6 text-indigo-700">📄 Detalles del Instructor</h3>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  selectedInstructor.nombre
                )}&background=4f46e5&color=fff`}
                alt={selectedInstructor.nombre}
                className="w-16 h-16 rounded-full shadow-sm"
              />
              <div>
                <p className="text-xl font-semibold text-gray-800">{selectedInstructor.nombre}</p>
                <p className="text-sm text-gray-500">{selectedInstructor.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h6 className="font-semibold text-gray-700 mb-2">📅 Fecha Solicitud</h6>
                <p className="text-gray-800">{formatDate(selectedInstructor.fecha)}</p>
              </div>
              <div>
                <h6 className="font-semibold text-gray-700 mb-2">🪪 Cédula</h6>
                <p className="text-gray-800">{selectedInstructor.cedula}</p>
              </div>
              <div>
                <h6 className="font-semibold text-gray-700 mb-2">🏫 Institución</h6>
                <p className="text-gray-800">{selectedInstructor.instituto}</p>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-gray-700 mb-2">💬 Motivación</h5>
              <p className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 leading-relaxed">
                {selectedInstructor.motivacion}
              </p>
            </div>

            <div className="modal-action">
              <button className="btn btn-outline" onClick={() => setModalOpen(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* 🔹 Modal Confirmación */}
      {confirmModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box rounded-2xl p-6 bg-white border border-gray-200">
            <h3 className="font-bold text-xl mb-4 text-gray-800">{confirmModal.title}</h3>
            {confirmModal.message && <p className="py-4 text-gray-600">{confirmModal.message}</p>}
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

      {/* 🔹 Modal Notificación */}
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
