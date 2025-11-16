import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { role, token }
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const url = import.meta.env.VITE_BACKEND_URL

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
        } catch (err) {
            console.warn("Error verificando token", err);

            if (err instanceof TypeError) {
                // Error de red, no cierres sesión
                return;
            }

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
                const res = await fetch(url + `/auth/logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error();
                else localStorage.removeItem("token");
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
