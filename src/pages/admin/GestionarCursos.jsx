"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationModal from "../../components/NotificationModal";

export default function GestionarCursos() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // 🔹 Cargar cursos al iniciar
  useEffect(() => {
    if (!token) {
      setNotification({
        type: "error",
        message: "No estás autenticado. Inicia sesión.",
      });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);

    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(url + "/administrador/all/cursos", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al cargar cursos");

      const data = await res.json();

      const formatted = data.map((c) => ({
        id: c.id,
        title: c.titulo,
        description: c.descripcion,
        instructor: c.profesor,
        creationDate: new Date(c.creacion_curso).toLocaleDateString("es-ES"),
        students: Array(c.estudiantes).fill("Estudiante"),
        status: c.estado_curso?.toLowerCase() ?? "pendiente",
      }));

      setCursos(formatted);
    } catch (err) {
      console.error(err);
      setNotification({
        type: "error",
        message: "No se pudieron cargar los cursos.",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Búsqueda y filtros
  const filteredCourses = cursos.filter((curso) => {
    const estadoOK = filtroEstado === "todos" || curso.status === filtroEstado;
    const texto = busqueda.toLowerCase();
    const busquedaOK =
      curso.title.toLowerCase().includes(texto) ||
      curso.instructor.toLowerCase().includes(texto);

    return estadoOK && busquedaOK;
  });

  // 🎨 Colores de estado (DaisyUI)
  const estadoBadge = {
    pendiente: "badge badge-warning text-white",
    activo: "badge badge-success text-white",
    inactivo: "badge badge-neutral text-white",
  };

  const pendingCount = cursos.filter((c) => c.status === "pendiente").length;

  return (
    <div className="min-h-screen bg-base-200">

      {/* HEADER */}
      <header className="bg-primary text-white py-10 px-6 shadow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold">📚 Gestión de Cursos</h1>
          <p className="opacity-90">Administra y revisa los cursos registrados.</p>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* FILTROS */}
        <section className="bg-base-100 p-6 rounded-xl shadow border border-base-300">
          <h2 className="text-xl font-bold mb-4">Filtros</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Select DaisyUI */}
            <div className="form-control">
              <label className="label font-semibold">Filtrar por estado:</label>
              <select
                className="select select-bordered bg-base-100"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            {/* Busqueda */}
            <div className="form-control">
              <label className="label font-semibold">Buscar:</label>
              <input
                type="text"
                className="input input-bordered bg-base-100"
                placeholder="Buscar por título o instructor…"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

          </div>
        </section>

        {/* TABLA */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Catálogo de Cursos</h2>

            {pendingCount > 0 && (
              <span className="badge badge-warning text-white">
                {pendingCount} pendientes
              </span>
            )}
          </div>

          {loading ? (
            <div className="text-center py-10">Cargando cursos...</div>
          ) : (
            <div className="bg-base-100 rounded-xl shadow p-4">

              <table className="table w-full">
                <thead className="text-sm text-base-content/70 border-b border-base-300">
                  <tr>
                    <th className="font-semibold">Curso</th>
                    <th className="font-semibold">Instructor</th>
                    <th className="font-semibold">Estudiantes</th>
                    <th className="font-semibold">Creación</th>
                    <th className="font-semibold">Estado</th>
                    <th className="font-semibold">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCourses.map((curso) => (
                    <tr key={curso.id} className="hover:bg-base-200 transition">
                      <td>
                        <div className="font-semibold">{curso.title}</div>
                        <div className="text-sm opacity-60">
                          {curso.description}
                        </div>
                      </td>

                      <td>{curso.instructor}</td>
                      <td>{curso.students.length}</td>
                      <td>{curso.creationDate}</td>

                      <td>
                        <span className={estadoBadge[curso.status]}>
                          {curso.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-sm btn-outline btn-primary"
                          onClick={() => {
                            setSelectedCourse(curso);
                            setModalOpen(true);
                          }}
                        >
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          )}
        </section>

      </main>

      {/* MODAL DETALLES */}
      {modalOpen && selectedCourse && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-xl">
            <h3 className="text-xl font-bold mb-4">
              📘 {selectedCourse.title}
            </h3>

            <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
            <p><strong>Creado:</strong> {selectedCourse.creationDate}</p>

            <p className="mt-4">
              <strong>Descripción:</strong><br />
              {selectedCourse.description}
            </p>

            <div className="modal-action">
              <button className="btn" onClick={() => setModalOpen(false)}>
                Cerrar
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
  );
}
