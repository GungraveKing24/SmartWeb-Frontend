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
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(url + `/courses/active/only`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCourses(data ?? []);
      } catch (err) {
        console.error("Error al obtener cursos:", err);
        setCourses([]);
      }
    };
    fetchCourses();
  }, [token, url]);

  const handleCreateCall = async () => {
    if (!selectedCourse || !titulo || !horaInicio || !horaFin) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(url + `/hope/createCall`, {
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
          //origen: Creo que tendria que ser la url del frontend cuando ya esta desplegado
          origen: window.location.origin,
        }),
      });

      if (!res.ok) throw new Error("Error al crear la llamada");
      const data = await res.json();
      setCreatedLink(data.enlace_llamada);
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al crear la llamada");
    } finally {
      setLoading(false);
      clearForm()
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(createdLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearForm = () => {
    setSelectedCourse("")
    setTitulo("")
    setDescripcion("")
    setHoraInicio("")
    setHoraFin("")
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl card bg-base-100 shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <FaVideo className="text-primary text-4xl" />
          Crear nueva sesión de videollamada
        </h2>

        <div className="space-y-6">
          <div className="form-control">
            <label className="label font-semibold">Curso</label>
            <select
              className="select select-bordered w-full"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.length === 0 ? (
                <option value="">No tienes cursos</option>
              ) : (
                <option value="">Selecciona un curso...</option>
              )}
              {(courses || []).map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.titulo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label font-semibold">Título</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Ej. Clase 3 - Introducción a Redes"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Descripción</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Describe brevemente tu sesión..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-semibold">Hora inicio</label>
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Hora fin</label>
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
            {loading ? "Creando..." : "Crear enlace"}
          </button>
        </div>

        {createdLink && (
          <div className="mt-10 alert bg-primary/10 border border-primary/40 p-6 rounded-xl flex flex-col gap-4">
            <h3 className="font-semibold text-primary flex items-center gap-2">
              <FaCheck /> Sesión creada con éxito
            </h3>

            <div className="p-4 bg-base-100 rounded-lg border flex items-center justify-between">
              <code className="break-all text-sm">{createdLink}</code>

              <div className="flex gap-2 ml-4">
                <button className="btn btn-sm btn-outline" onClick={handleCopy}>
                  {copied ? "Copiado!" : <FaCopy />}
                </button>

                <Link to={createdLink} className="btn btn-sm btn-primary">
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

