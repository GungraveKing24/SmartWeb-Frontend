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
        setModal({ isOpen: false, type: "info", title: "", message: "", role: null })
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
            const response = await fetch("http://127.0.0.1:8000/auth/login", {
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

            // 🔹 Mostrar modal de éxito y guardar rol
            const role = data.role?.toLowerCase()
            showModal("success", "Bienvenido", `Inicio de sesión exitoso como ${data.role}.`, role)

        } catch (err) {
            console.error("Error en login:", err)
            showModal("error", "Error de Conexión", "Error de conexión con el servidor.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-base-100 to-base-200 text-base-content px-4 py-10">
            <div className="bg-base-100 shadow-2xl rounded-2xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden border border-base-200">
                {/* Formulario */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold text-primary mb-2">SmartWeb</h1>
                    <h2 className="text-2xl font-semibold mb-1">Bienvenido de nuevo</h2>
                    <p className="text-sm opacity-70 mb-8">Ingresa a tu cuenta para seguir aprendiendo</p>

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
                                required
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
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-base-content/50 hover:text-base-content transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full mt-6 font-semibold" disabled={loading}>
                            {loading ? <span className="loading loading-spinner loading-sm"></span> : null}
                            {loading ? "Entrando..." : "Entrar"}
                        </button>

                        <div className="text-sm text-center mt-4 opacity-70">
                            ¿No tienes una cuenta?{" "}
                            <Link to="/register" className="link link-primary font-semibold">
                                Regístrate aquí
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Imagen lateral */}
                <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 p-8">
                    <img src={Logo || "/placeholder.svg"} alt="SmartWeb Logo" className="w-56 mb-6 rounded-xl shadow-lg" />
                    <p className="text-center opacity-80 font-medium">Aprende a través de videollamadas</p>
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
