"use client"

import { useState } from "react"
import Logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import NotificationModal from "../components/NotificationModal"

export default function Register() {
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState("student")
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    motivation: "",
    college: "",
    cedula: "",
  })

  const [modal, setModal] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  })

  const showModal = (type, title, message) => {
    setModal({ isOpen: true, type, title, message })
  }

  const closeModal = () => {
    setModal({ isOpen: false, type: "info", title: "", message: "" })
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { nombre, apellido, email, password, motivation, college, cedula } = formData

    if (!nombre || !apellido || !email || !password) {
      showModal("error", "Campos Requeridos", "Por favor, complete todos los campos obligatorios.")
      setLoading(false)
      return
    }

    // Rol traducido correctamente
    const role = userType === "teacher" ? "Profesor" : "Estudiante"

    if (userType === "teacher" && (!motivation || !college || !cedula)) {
      showModal("error", "Información Incompleta", "Por favor, complete todos los campos para ser profesor.")
      setLoading(false)
      return
    }

    const data = {
      nombre,
      apellido,
      email,
      password,
      role,
      motivacion: motivation || null,
      profesor_institucion: userType === "teacher" ? college : null,
      profesor_cedula: userType === "teacher" ? cedula : null,
    }

    try {
      const url = import.meta.env.VITE_BACKEND_URL
      const response = await fetch(url + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        let errorMessage = "No se pudo registrar"
        if (Array.isArray(result.detail)) {
          errorMessage = result.detail.map((e) => e.msg).join(" | ")
        } else if (typeof result.detail === "string") {
          errorMessage = result.detail
        }

        showModal("error", "Error de Registro", errorMessage)
        setLoading(false)
        return
      }

      if (role === "Estudiante") {
        showModal("success", "Registro Exitoso", "Revisa tu correo para activar tu cuenta.")
      } else {
        showModal("success", "Solicitud Enviada", "Tu solicitud será revisada por un administrador.")
      }

      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)

    } catch (error) {
      console.error("Error en el registro:", error)
      showModal("error", "Error de Conexión", "Ocurrió un error al conectar con el servidor.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10 text-base-content">

      <div className="card bg-base-100 shadow-2xl rounded-2xl border border-base-300 w-full max-w-4xl grid md:grid-cols-2 overflow-hidden">

        {/* Formulario */}
        <div className="p-10 flex flex-col justify-center">

          <h1 className="text-4xl font-bold text-primary">SmartWeb</h1>
          <h2 className="text-2xl font-semibold mt-1">Crea tu cuenta</h2>
          <p className="opacity-70 text-sm mb-8">Selecciona tu tipo de usuario y regístrate</p>

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Tipo de usuario */}
            <div>
              <label className="font-semibold mb-3 block">¿Cómo deseas registrarte?</label>
              <div className="flex gap-6">

                <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                  <input
                    type="radio"
                    value="student"
                    name="userType"
                    className="radio radio-primary"
                    checked={userType === "student"}
                    onChange={() => setUserType("student")}
                  />
                  <span className="font-medium">Estudiante</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                  <input
                    type="radio"
                    value="teacher"
                    name="userType"
                    className="radio radio-primary"
                    checked={userType === "teacher"}
                    onChange={() => setUserType("teacher")}
                  />
                  <span className="font-medium">Profesor</span>
                </label>

              </div>
            </div>

            {/* Nombre y apellido */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-text font-semibold mb-2 block">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Juan"
                  className="input input-bordered w-full focus:input-primary"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="label-text font-semibold mb-2 block">Apellido</label>
                <input
                  id="apellido"
                  type="text"
                  placeholder="Pérez"
                  className="input input-bordered w-full focus:input-primary"
                  value={formData.apellido}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="label-text font-semibold mb-2 block">Email</label>
              <input
                id="email"
                type="email"
                placeholder="hello@ejemplo.com"
                className="input input-bordered w-full focus:input-primary"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label className="label-text font-semibold mb-2 block">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full focus:input-primary"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Extra para profesores */}
            {userType === "teacher" && (
              <>
                <div>
                  <label className="label-text font-semibold mb-2 block">Motivación</label>
                  <textarea
                    id="motivation"
                    rows="3"
                    placeholder="¿Por qué quieres ser profesor?"
                    className="textarea textarea-bordered w-full focus:textarea-primary"
                    value={formData.motivation}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="label-text font-semibold mb-2 block">Instituto</label>
                  <input
                    id="college"
                    type="text"
                    placeholder="UNICAES"
                    className="input input-bordered w-full focus:input-primary"
                    value={formData.college}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="label-text font-semibold mb-2 block">Cédula Profesional</label>
                  <input
                    id="cedula"
                    type="text"
                    placeholder="1234"
                    className="input input-bordered w-full focus:input-primary"
                    value={formData.cedula}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {/* Botón */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-6 font-semibold"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : "Registrarse"}
            </button>

            <p className="text-sm text-center opacity-70">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="link link-primary font-semibold">
                Iniciar Sesión
              </Link>
            </p>

          </form>
        </div>

        {/* Imagen lateral */}
        <div className="hidden md:flex flex-col items-center justify-center bg-base-300/40 p-8 backdrop-blur">
          <img src={Logo} className="w-56 mb-6 rounded-xl shadow" />
          <p className="opacity-80 text-center font-medium">Aprende a través de videollamadas</p>
        </div>

      </div>

      <NotificationModal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />
    </div>
  )
}
