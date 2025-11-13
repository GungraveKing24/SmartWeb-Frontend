"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../helpers/date"

export default function AdminHome() {
    const navigate = useNavigate()

    const [profesores, setProfesores] = useState([])
    const [cursos, setCursos] = useState([])
    const [selectedInstructor, setSelectedInstructor] = useState(null)
    const [modalType, setModalType] = useState(null)

    const token = localStorage.getItem("token")

    const url = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        if (!token) {
            alert("No estás autenticado. Inicia sesión.", "error")
            navigate("/login")
            return
        }
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const [profesRes, cursosRes] = await Promise.all([
                fetch(url + `/administrador/profesores`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch(url + `/administrador/all/cursos`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ])

            if (!profesRes.ok || !cursosRes.ok) throw new Error("Error al cargar los datos.")
            setProfesores(await profesRes.json())
            setCursos(await cursosRes.json())
        } catch (err) {
            console.error(err)
            alert("Error al cargar la información.", "error")
        }
    }

    const handleAction = async (id, name, action) => {
        const endpoint =
            action === "approve"
                ? url + `/administrador/approve-profesor/${id}`
                : url + `/administrador/deny-profesor/${id}`

        try {
            const res = await fetch(endpoint, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            if (!res.ok) throw new Error("Error en la acción")

            alert(
                action === "approve" ? `✅ Instructor ${name} aprobado correctamente.` : `❎ Solicitud de ${name} rechazada.`,
                "success",
            )
            setProfesores((prev) => prev.filter((p) => p.id !== id))
        } catch {
            alert("❌ Error al procesar la solicitud.", "error")
        } finally {
            setModalType(null)
            setSelectedInstructor(null)
        }
    }

    const openModal = (instructor, type) => {
        setSelectedInstructor(instructor)
        setModalType(type)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-100">
            {/* HEADER */}
            <div className="bg-gradient-to-r from-primary to-accent text-white shadow-md py-10 px-6">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-4xl font-bold mb-2 drop-shadow-md">Panel de Administración</h1>
                    <p className="text-lg opacity-90">Gestiona usuarios, instructores y cursos del sistema</p>
                </div>
            </div>

            {/* CONTENIDO */}
            <div className="container mx-auto px-6 py-12 max-w-6xl space-y-16">

                {/* === ACCIONES RÁPIDAS === */}
                <section>
                    <h2 className="text-2xl font-bold mb-8 border-l-4 border-primary pl-3">Acciones Rápidas</h2>

                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Gestionar Usuarios",
                                desc: "Administrar estudiantes y permisos",
                                icon: "👤",
                                link: "/gestionar-usuarios",
                            },
                            {
                                title: "Verificar Instructores",
                                desc: "Revisar solicitudes de instructores",
                                icon: "👨‍🏫",
                                link: "/verificar-instructores",
                            },
                            {
                                title: "Gestionar Cursos",
                                desc: "Aprobar y moderar cursos",
                                icon: "📚",
                                link: "/gestionar-cursos",
                            },
                        ].map((card) => (
                            <div
                                key={card.title}
                                className="card bg-base-100 shadow-xl border border-base-200 hover:border-primary transition-all hover:scale-[1.03]"
                            >
                                <div className="card-body items-center text-center">
                                    <div className="text-5xl mb-3">{card.icon}</div>
                                    <h3 className="font-bold text-lg mb-1">{card.title}</h3>
                                    <p className="text-sm opacity-70">{card.desc}</p>
                                    <button
                                        onClick={() => navigate(card.link)}
                                        className="btn btn-primary btn-sm w-full mt-4 rounded-lg"
                                    >
                                        Acceder
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* === SOLICITUDES PENDIENTES === */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold border-l-4 border-primary pl-3">Solicitudes Pendientes</h2>
                        <button className="link link-primary font-semibold" onClick={() => navigate("/admin/instructores")}>
                            Ver todas →
                        </button>
                    </div>

                    <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-md border border-base-200">
                        <table className="table">
                            <thead>
                                <tr className="bg-base-200 text-base-content text-sm uppercase">
                                    <th>Instructor</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profesores.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center text-gray-500 py-10">
                                            No hay solicitudes pendientes 💤
                                        </td>
                                    </tr>
                                ) : (
                                    profesores.slice(0, 5).map((p) => (
                                        <tr key={p.id} className="hover:bg-base-200/40 transition">
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(p.nombre)}&background=0e2a47&color=fff`}
                                                        alt={p.nombre}
                                                        className="mask mask-circle w-10 h-10"
                                                    />
                                                    <div>
                                                        <div className="font-semibold">{p.nombre}</div>
                                                        <div className="text-xs opacity-70">{p.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{p.rol || "—"}</td>
                                            <td>
                                                <span
                                                    className={`badge ${
                                                        p.status === "Activo"
                                                            ? "badge-success text-white"
                                                            : "badge-warning text-white"
                                                    }`}
                                                >
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        className="btn btn-success btn-sm btn-outline"
                                                        onClick={() => openModal(p, "approve")}
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        className="btn btn-error btn-sm btn-outline"
                                                        onClick={() => openModal(p, "deny")}
                                                    >
                                                        ✕
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

                {/* === CURSOS RECIENTES === */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold border-l-4 border-primary pl-3">Cursos Recientes</h2>
                        <button className="link link-primary font-semibold" onClick={() => navigate("/gestionar-cursos")}>
                            Ver todos →
                        </button>
                    </div>

                    <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-md border border-base-200">
                        <table className="table">
                            <thead>
                                <tr className="bg-base-200 text-base-content text-sm uppercase">
                                    <th>Curso</th>
                                    <th>Instructor</th>
                                    <th>Estudiantes</th>
                                    <th>Creación</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cursos.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-gray-500 py-10">
                                            No hay cursos registrados 📚
                                        </td>
                                    </tr>
                                ) : (
                                    cursos.slice(0, 5).map((c) => (
                                        <tr key={c.id} className="hover:bg-base-200/40 transition">
                                            <td>
                                                <div className="font-semibold">{c.titulo}</div>
                                                <div className="text-xs opacity-70">{c.descripcion || "Sin descripción"}</div>
                                            </td>
                                            <td>{c.profesor || "—"}</td>
                                            <td>{c.estudiantes || 0}</td>
                                            <td>{formatDate(c.creacion_curso) || "—"}</td>
                                            <td>
                                                <span
                                                    className={`badge ${
                                                        c.estado_curso === "Activo"
                                                            ? "badge-success text-white"
                                                            : "badge-neutral"
                                                    }`}
                                                >
                                                    {c.estado_curso}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {/* === MODAL === */}
            {modalType && selectedInstructor && (
                <dialog open className="modal modal-open">
                    <div className="modal-box rounded-2xl p-6">
                        <h3 className="font-bold text-xl mb-4 text-center">
                            {modalType === "approve" ? "Aprobar Instructor" : "Rechazar Instructor"}
                        </h3>
                        <p className="py-4 text-center opacity-80">
                            ¿Estás seguro de {modalType === "approve" ? "aprobar" : "rechazar"} a{" "}
                            <b>{selectedInstructor.nombre}</b>?
                        </p>
                        <div className="modal-action flex justify-center gap-3">
                            <button className="btn btn-outline" onClick={() => setModalType(null)}>
                                Cancelar
                            </button>
                            <button
                                className={`btn ${
                                    modalType === "approve" ? "btn-success" : "btn-error"
                                }`}
                                onClick={() =>
                                    handleAction(selectedInstructor.id, selectedInstructor.nombre, modalType)
                                }
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    )
}
