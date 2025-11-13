"use client"

import { Link } from "react-router-dom"
import { LogOut, Home, Users, BookOpen, GraduationCap, Search } from "lucide-react"
import Logo from "../assets/logo.png"
import { useAuth } from "../hooks/useAuth"
import ThemeSelector from "./ThemeSelector"

export default function Navbar() {
    const { user, logout } = useAuth()
    const role = user?.role?.toLowerCase()

    return (
        <nav className="navbar bg-base-100 border-b border-base-200 px-6 py-4 shadow-sm">
            <div className="flex-1">
                <Link
                    to="/"
                    className="flex items-center gap-3 text-xl font-bold text-primary hover:opacity-80 transition-opacity"
                >
                    <img src={Logo || "/placeholder.svg"} alt="SMARTWEB Logo" className="w-10 h-10 rounded-lg" />
                    <span>SMARTWEB</span>
                </Link>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 gap-1">
                    {role === "administrador" && (
                        <>
                            <li>
                                <Link to="/admin" className="gap-2">
                                    <Home size={18} /> Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/gestionar-usuarios" className="gap-2">
                                    <Users size={18} /> Usuarios
                                </Link>
                            </li>
                            <li>
                                <Link to="/verificar-instructores" className="gap-2">
                                    <GraduationCap size={18} /> Instructores
                                </Link>
                            </li>
                            <li>
                                <Link to="/gestionar-cursos" className="gap-2">
                                    <BookOpen size={18} /> Cursos
                                </Link>
                            </li>
                        </>
                    )}

                    {role === "estudiante" && (
                        <>
                            <li>
                                <Link to="/usuario" className="gap-2">
                                    <Home size={18} /> Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/usuario/miscursos" className="gap-2">
                                    <BookOpen size={18} /> Mis Cursos
                                </Link>
                            </li>
                            <li>
                                <Link to="/usuario/discover" className="gap-2">
                                    <Search size={18} /> Descubrir
                                </Link>
                            </li>
                        </>
                    )}

                    {role === "profesor" && (
                        <>
                            <li>
                                <Link to="/profesor" className="gap-2">
                                    <Home size={18} /> Panel
                                </Link>
                            </li>
                            <li>
                                <Link to="/profesor/cursos" className="gap-2">
                                    <BookOpen size={18} /> Cursos
                                </Link>
                            </li>
                        </>
                    )}

                    <ThemeSelector />

                    {role && (
                        <li>
                            <button onClick={logout} className="btn btn-ghost btn-sm text-error gap-2">
                                <LogOut size={18} /> Cerrar sesión
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}
