import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { role, token }
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const url = import.meta.env.BACKEND_URL

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) verifyTokenBackend(token);
        else setLoading(false);
    }, []);

    const verifyTokenBackend = async (token) => {
        try {
            const res = await fetch(url + `/auth/verify-token`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (!res.ok || !data.valid) throw new Error();

            setUser({
                token,
                role: data.rol,
                user_id: data.user_id,
                nombre: data.nombre,
            });

            // 🔄 Redirigir a su dashboard correspondiente
            switch (data.rol.toLowerCase()) {
                case "administrador":
                    navigate("/admin");
                    break;
                case "profesor":
                    navigate("/profesor");
                    break;
                case "estudiante":
                    navigate("/usuario");
                    break;
                default:
                    navigate("/");
            }
        } catch {
            // Token expirado o inválido
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (data) => {
        const { access_token, role } = data;
        localStorage.setItem("token", access_token);
        setUser({ token: access_token, role });
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
                if (token) localStorage.removeItem("token");
            }
        } catch (err) {
            console.error("Error cerrando sesión:", err);
        } finally {
            navigate("/login");
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
