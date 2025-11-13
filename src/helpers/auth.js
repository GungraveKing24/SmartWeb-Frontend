export const isTokenValid = (token) => {
    // Aquí podrías usar jwt-decode o verificar expiración
    return !!token;
};

export const getUserFromToken = (token) => {
    // Supón que tu backend incluye role y username
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return { username: payload.username, role: payload.role, token };
    } catch {
        return null;
    }
};
