"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NotificationModal from "../../components/NotificationModal"
import CreateCourseModal from "../../components/CreateCourseModal"
import { formatDate } from "../../helpers/date"

export default function VisualizarCursos() {
    const navigate = useNavigate()
    const [cursos, setCursos] = useState([])
    const [filtroEstado, setFiltroEstado] = useState("todos")
    const [busqueda, setBusqueda] = useState("")
    const [createModalOpen, setCreateModalOpen] = useState(false)
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
    }, [token, navigate])

    const loadCursos = async () => {
        // En tu caso real harías un fetch aquí
        try {
            const courses = await fetch(url + `/courses/active`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (!courses.ok) throw new Error("Error al cargar los datos.")

            setCursos(await courses.json())
        } catch (err) {
            console.error(err)
            setNotification({
                type: "error",
                message: "❌ Error al cargar los cursos desde el servidor.",
            })
        }
    }

    const handleToggleStatus = async (cursoId, cursoEstado) => {
        const link = cursoEstado === "Activo" ? url + `/deactivate/course/${cursoId}` : url + `/activate/course/${cursoId}`;
        try {
            const res = await fetch(link, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            if (!res.ok) throw new Error("Error al realizar la accion")

            setNotification({
                type: "success",
                message: "✅ Estado del curso actualizado correctamente.",
            })

            setCursos((prev) =>
                prev.map((c) =>
                    c.id === cursoId
                        ? { ...c, estado_curso: c.estado_curso === "Activo" ? "Inactivo" : "Activo" }
                        : c
                )
            )
        } catch (error) {
            console.log(error)
            setNotification({
                type: "error",
                message: "Ocurrio un error, intentelo mas tarde",
            })
        }
    }

    const handleCreateCourse = async (nuevoCurso) => {
        try {
            const res = await fetch(url + `/create/course`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoCurso),
            });

            if (!res.ok) {
              const message = await res.json()
              throw new Error(message.detail)
            }
            const data = await res.json()

            setNotification({
                type: "success",
                message: `🎉 Curso "${nuevoCurso.titulo}" creado correctamente.`,
            })

            setCursos((prev) => [...prev, data.curso])
        } catch (error) {
            setNotification({
                type: "error",
                message: error.message || `Ocurrio un error al crear el curso, intentelo mas tarde`,
            })
        } finally {
            setCreateModalOpen(false)
        }
    }

    const filteredCursos = cursos.filter((c) => {
        const matchesEstado = filtroEstado === "todos" || c.estado_curso === filtroEstado
        const matchesBusqueda =
            busqueda === "" ||
            c.titulo.toLowerCase().includes(busqueda.toLowerCase())
        return matchesEstado && matchesBusqueda
    })

    const getEstadoBadge = (estado) => {
        switch (estado) {
            case "Activo":
                return "badge-success text-white"
            case "Inactivo":
                return "badge-neutral text-white"
            default:
                return "badge-gray"
        }
    }

    console.log(cursos)
    return (
        <div className="min-h-screen bg-base-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-10 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-4xl font-bold mb-2">🎓 Visualización de Cursos</h1>
                    <p className="text-lg opacity-90">
                        Explora los cursos disponibles y administra su estado.
                    </p>
                </div>
            </div>

            {/* Filtros */}
            <main className="container mx-auto px-4 py-10 max-w-6xl mb-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div>
                        <label className="block label label-text font-semibold mb-2">
                            Filtrar por Estado:
                        </label>
                        <select
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option value="todos">Todos</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block label label-text font-semibold mb-2">
                            Buscar por Nombre:
                        </label>
                        <input
                            type="text"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Ej: React o Python"
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Encabezado y botón de creación */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <span>📚</span> Lista de Cursos
                    </h2>
                    <button
                        className="btn btn-primary"
                        onClick={() => setCreateModalOpen(true)}
                    >
                        ➕ Crear Curso
                    </button>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto bg-base-100 rounded-xl shadow-md border border-base-200">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="bg-base-200 text-base-content">
                                <th>Título</th>
                                <th>Descripción</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCursos.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center opacity-60 py-8">
                                        No hay cursos que coincidan
                                    </td>
                                </tr>
                            ) : (
                                filteredCursos.map((c) => (
                                    <tr key={c.id}>
                                        <td className="font-semibold">{c.titulo}</td>
                                        <td>{c.descripcion}</td>
                                        <td>{formatDate(c.creacion_curso)}</td>
                                        <td>
                                            <span className={`badge ${getEstadoBadge(c.estado_curso)}`}>
                                                {c.estado_curso.charAt(0).toUpperCase() + c.estado_curso.slice(1)}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn btn-sm btn-outline ${c.estado_curso.toLowerCase() === "activo"
                                                    ? "btn-warning"
                                                    : "btn-success"
                                                    }`}
                                                onClick={() => handleToggleStatus(c.id, c.estado_curso)}
                                            >
                                                {c.estado_curso.toLowerCase() === "activo" ? "⊘ Desactivar" : "✓ Activar"}
                                            </button>
                                            <Link to={`/curso/${c.id}`} className="btn btn-sm btn-outline">Detalles</Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Modal para crear curso */}
            {createModalOpen && (
                <CreateCourseModal
                    onClose={() => setCreateModalOpen(false)}
                    onCreate={handleCreateCourse}
                />
            )}

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

