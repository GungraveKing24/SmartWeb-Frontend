import React, { useState, useEffect } from "react";
import { FaVideo, FaCopy, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CreateCallPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdLink, setCreatedLink] = useState(null);
  const [copied, setCopied] = useState(false);

  const token = localStorage.getItem("token");

  // 🔹 Cargar cursos activos del profesor
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/courses/active/only", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Error al obtener cursos:", err);
      }
    };
    fetchCourses();
  }, []);

  // 🔹 Crear llamada
  const handleCreateCall = async () => {
    if (!selectedCourse || !titulo || !horaInicio || !horaFin) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/hope/createCall`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            curso_id: selectedCourse,
            titulo,
            descripcion,
            hora_inicio: horaInicio,
            hora_fin: horaFin,
            origen: window.location.origin
          }),
        }
      );

      if (!res.ok) throw new Error("Error al crear la llamada");
      const data = await res.json();
      setCreatedLink(data.enlace_llamada);
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al crear la llamada");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const url = createdLink;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
      <div className="w-full max-w-lg bg-base-100 shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaVideo className="text-primary" />
          Crear enlace de videollamada
        </h2>

        {/* Formulario */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold">Curso</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Selecciona un curso --</option>
            {courses.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold">Título de la sesión</span>
          </label>
          <input
            type="text"
            placeholder="Ej. Clase sobre redes TCP/IP"
            className="input input-bordered w-full"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold">Descripción</span>
          </label>
          <textarea
            placeholder="Escribe una breve descripción de la clase..."
            className="textarea textarea-bordered w-full"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Hora de inicio</span>
            </label>
            <input
              type="datetime-local"
              className="input input-bordered w-full"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Hora de fin</span>
            </label>
            <input
              type="datetime-local"
              className="input input-bordered w-full"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
            />
          </div>
        </div>

        <button
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          onClick={handleCreateCall}
          disabled={loading}
        >
          {loading ? "Creando llamada..." : "Crear enlace"}
        </button>

        {/* Mostrar enlace creado */}
        {createdLink && (
          <div className="mt-6 p-4 bg-success bg-opacity-10 rounded-xl border border-success/30">
            <h3 className="font-semibold text-success mb-2 flex items-center gap-2">
              <FaCheck /> Llamada creada con éxito
            </h3>
            <div className="flex items-center justify-between bg-base-300 p-2 rounded-md">
              <code className="text-sm break-all">
                {createdLink}
              </code>
              <div className="flex gap-2 ml-2">
                <button className="btn btn-sm btn-outline" onClick={handleCopy}>
                  {copied ? "Copiado!" : <FaCopy />}
                </button>
                <Link
                  to={createdLink}
                  className="btn btn-sm btn-outline"
                >
                  IR
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

