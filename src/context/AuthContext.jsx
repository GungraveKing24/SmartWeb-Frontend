import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const url = import.meta.env.VITE_BACKEND_URL;

    // 🔥 VERIFICAR TOKEN AL CARGAR LA PÁGINA
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            verifyTokenBackend(token);
        } else {
            setLoading(false);
        }
    }, []);

    const redirectByRole = (role) => {
        switch (role) {
            case "administrador":
                navigate("/admin", { replace: true });
                break;
            case "profesor":
                navigate("/profesor", { replace: true });
                break;
            case "estudiante":
                navigate("/usuario", { replace: true });
                break;
            default:
                navigate("/", { replace: true });
        }
    };

    const verifyTokenBackend = async (token) => {
        try {
            const res = await fetch(url + `/auth/verify-token`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            if (!res.ok || !data.valid) throw new Error();

            const role = data.rol?.toLowerCase();

            setUser({
                token,
                role,
                user_id: data.user_id,
                nombre: data.nombre,
            });

            // 🔥 REDIRIGIR AUTOMÁTICAMENTE
            redirectByRole(role);

        } catch (err) {
            console.warn("Error verificando token", err);

            if (err instanceof TypeError) {
                return; // error de red → no cerrar sesión
            }

            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Login normal
    const login = (data) => {
        const { access_token, role } = data;
        localStorage.setItem("token", access_token);
        setUser({ token: access_token, role });
        redirectByRole(role);
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                await fetch(url + `/auth/logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        } catch (err) {
            console.error("Error cerrando sesión:", err);
        } finally {
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
