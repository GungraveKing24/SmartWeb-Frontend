"use client"

import { Link } from "react-router-dom"
import { LogOut, Home, Users, BookOpen, GraduationCap, Search, Menu } from "lucide-react"
import Logo from "../assets/logo.png"
import { useAuth } from "../hooks/useAuth"
import ThemeSelector from "./ThemeSelector"
import NotificationBell from "./NotificationBell"
import { useState } from "react"

export default function Navbar() {
    const { user, logout } = useAuth()
    const role = user?.role?.toLowerCase()
    const home = role === "administrador"
        ? "/admin"
        : role === "profesor"
            ? "/profesor"
            : "/usuario"

    const [open, setOpen] = useState(false)

    return (
        <nav className="navbar bg-base-100 border-b border-base-200 px-4 shadow-sm">
            <div className="flex-1">
                <Link
                    to={home}
                    className="flex items-center gap-3 text-xl font-bold text-primary hover:opacity-80 transition-opacity"
                >
                    <img src={Logo || "/placeholder.svg"} alt="SMARTWEB Logo" className="w-10 h-10 rounded-lg" />
                    <span className="hidden sm:flex">SMARTWEB</span>
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden">
                <button onClick={() => setOpen(!open)} className="btn btn-ghost btn-square">
                    <Menu size={22} />
                </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex flex-none">
                <ul className="menu menu-horizontal px-1 gap-1">

                    {/* ADMIN */}
                    {role === "administrador" && (
                        <>
                            <li><Link to="/admin" className="gap-2"><Home size={18} /> Home</Link></li>
                            <li><Link to="/gestionar-usuarios" className="gap-2"><Users size={18} /> Usuarios</Link></li>
                            <li><Link to="/verificar-instructores" className="gap-2"><GraduationCap size={18} /> Instructores</Link></li>
                            <li><Link to="/gestionar-cursos" className="gap-2"><BookOpen size={18} /> Cursos</Link></li>
                        </>
                    )}

                    {/* ESTUDIANTE */}
                    {role === "estudiante" && (
                        <>
                            <li><Link to="/usuario" className="gap-2"><Home size={18} /> Inicio</Link></li>
                            <li><Link to="/usuario/miscursos" className="gap-2"><BookOpen size={18} /> Mis Cursos</Link></li>
                            <li><Link to="/usuario/discover" className="gap-2"><Search size={18} /> Descubrir</Link></li>
                        </>
                    )}

                    {/* PROFESOR */}
                    {role === "profesor" && (
                        <>
                            <li><Link to="/profesor" className="gap-2"><Home size={18} /> Panel</Link></li>
                            <li><Link to="/profesor/cursos" className="gap-2"><BookOpen size={18} /> Cursos</Link></li>
                        </>
                    )}

                    {/* Theme Selector */}
                    <li>
                        <button className="btn btn-ghost btn-sm min-w-[40px] h-[40px] flex items-center justify-center">
                            <ThemeSelector small />
                        </button>
                    </li>

                    {/* Notification Bell */}
                    {(role === "profesor" || role === "estudiante") && (
                        <li>
                            <button className="btn btn-ghost btn-sm min-w-[40px] h-[40px] relative flex items-center justify-center">
                                <NotificationBell small />
                            </button>
                        </li>
                    )}

                    {/* LOGOUT */}
                    {role && (
                        <li>
                            <button onClick={logout} className="btn btn-ghost btn-sm text-error gap-2">
                                <LogOut size={18} /> Cerrar sesión
                            </button>
                        </li>
                    )}
                </ul>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="absolute top-16 left-0 w-full bg-base-100 border-t border-base-200 shadow-md sm:hidden z-50 animate-fade-in">
                    <ul className="menu p-4 space-y-2">

                        {/* Opciones iguales pero versión móvil */}
                        {role === "administrador" && (
                            <>
                                <li><Link to="/admin" onClick={() => setOpen(false)} className="gap-2"><Home size={18} /> Home</Link></li>
                                <li><Link to="/gestionar-usuarios" onClick={() => setOpen(false)} className="gap-2"><Users size={18} /> Usuarios</Link></li>
                                <li><Link to="/verificar-instructores" onClick={() => setOpen(false)} className="gap-2"><GraduationCap size={18} /> Instructores</Link></li>
                                <li><Link to="/gestionar-cursos" onClick={() => setOpen(false)} className="gap-2"><BookOpen size={18} /> Cursos</Link></li>
                            </>
                        )}

                        {role === "estudiante" && (
                            <>
                                <li><Link to="/usuario" onClick={() => setOpen(false)} className="gap-2"><Home size={18} /> Inicio</Link></li>
                                <li><Link to="/usuario/miscursos" onClick={() => setOpen(false)} className="gap-2"><BookOpen size={18} /> Mis Cursos</Link></li>
                                <li><Link to="/usuario/discover" onClick={() => setOpen(false)} className="gap-2"><Search size={18} /> Descubrir</Link></li>
                            </>
                        )}

                        {role === "profesor" && (
                            <>
                                <li><Link to="/profesor" onClick={() => setOpen(false)} className="gap-2"><Home size={18} /> Panel</Link></li>
                                <li><Link to="/profesor/cursos" onClick={() => setOpen(false)} className="gap-2"><BookOpen size={18} /> Cursos</Link></li>
                            </>
                        )}

                        {/* Theme Selector Mobile */}
                        <li>
                            <button className="btn btn-ghost btn-sm min-h-[40px]" onClick={() => setOpen(false)}>
                                <ThemeSelector small />
                            </button>
                        </li>

                        {/* Notification Bell Mobile */}
                        {(role === "profesor" || role === "estudiante") && (
                            <li>
                                <button className="btn btn-ghost btn-sm min-h-[40px]" onClick={() => setOpen(false)}>
                                    <NotificationBell small />
                                </button>
                            </li>
                        )}

                        {/* Logout */}
                        {role && (
                            <li>
                                <button onClick={logout} className="btn btn-error btn-sm w-full">
                                    <LogOut size={18} /> Cerrar sesión
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    )
}
