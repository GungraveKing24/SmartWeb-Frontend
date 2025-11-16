"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useAuth } from "../hooks/useAuth"
import Logo from "../assets/logo.png"
import NotificationModal from "../components/NotificationModal"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [modal, setModal] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    role: null,
  })

  const showModal = (type, title, message, role = null) => {
    setModal({ isOpen: true, type, title, message, role })
  }

  const closeModal = () => {
    if (modal.role) {
      switch (modal.role) {
        case "administrador":
          navigate("/admin", { replace: true })
          break
        case "profesor":
          navigate("/profesor", { replace: true })
          break
        case "estudiante":
          navigate("/usuario", { replace: true })
          break
        default:
          navigate("/", { replace: true })
      }
    }
    setModal({
      isOpen: false,
      type: "info",
      title: "",
      message: "",
      role: null
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!email || !password) {
      showModal("error", "Campos Requeridos", "Por favor, completa todos los campos.")
      setLoading(false)
      return
    }

    try {
      const url = import.meta.env.VITE_BACKEND_URL
      const response = await fetch(url + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (!response.ok) {
        showModal("error", "Error en Login", data.detail || "Error al iniciar sesión.")
        setLoading(false)
        return
      }

      login({
        access_token: data.access_token,
        role: data.role?.toLowerCase(),
      })

      const role = data.role?.toLowerCase()
      showModal("success", "Bienvenido", `Inicio de sesión exitoso como ${data.role}.`, role)

    } catch (err) {
      console.error("Error en login:", err)
      showModal("error", "Error de Conexión", "No se pudo conectar con el servidor.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 text-base-content px-4 py-10">

      {/* Card principal */}
      <div className="card bg-base-100 shadow-2xl border border-base-300 rounded-2xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden">

        {/* Formulario */}
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-primary mb-1">SmartWeb</h1>
          <h2 className="text-2xl font-semibold mb-2">Bienvenido de nuevo</h2>
          <p className="opacity-70 text-sm mb-8">Ingresa a tu cuenta para continuar</p>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="label-text font-semibold mb-2 block">Email</label>
              <input
                type="email"
                placeholder="hello@ejemplo.com"
                className="input input-bordered w-full focus:input-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="label-text font-semibold mb-2 block">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full pr-10 focus:input-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-base-content/60 hover:text-base-content transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-6 font-semibold"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : "Entrar"}
            </button>

            {/* Registro */}
            <p className="text-center text-sm opacity-70">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="link link-primary font-semibold">
                Regístrate aquí
              </Link>
            </p>
          </form>
        </div>

        {/* Imagen lateral */}
        <div className="hidden md:flex flex-col items-center justify-center bg-base-300/40 p-8 backdrop-blur">
          <img
            src={Logo || "/placeholder.svg"}
            alt="SmartWeb Logo"
            className="w-52 mb-6 rounded-xl shadow"
          />
          <p className="text-center opacity-80 font-medium">
            Aprende a través de videollamadas
          </p>
        </div>
      </div>

      {/* Modal de notificación */}
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
