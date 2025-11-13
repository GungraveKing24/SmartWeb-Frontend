import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"

export const Footer = () => (
    <footer className="footer footer-center bg-base-100 text-base-content p-8 mt-12 border-t border-base-200">
        <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img src={Logo || "/placeholder.svg"} alt="SMARTWEB Logo" className="w-10 h-10 rounded-lg" />
                <span className="font-bold text-lg">SMARTWEB</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
                <Link to="/privacy-policy" className="link link-hover">
                    Políticas de Privacidad
                </Link>
                <Link to="/terms" className="link link-hover">
                    Términos de Servicio
                </Link>
                <Link to="/about" className="link link-hover">
                    Contacto
                </Link>
            </div>

            <p className="text-xs opacity-60">
                © 2025 SMARTWEB — Plataforma Educativa Internacional. Todos los derechos reservados.
            </p>
        </div>
    </footer>
)
