import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("access_token");
        const storedUser = localStorage.getItem("user");

        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));

        setLoading(false);
    }, []);

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            token,
            user,
            setToken,
            setUser,
            logout,
            isAuthenticated: !!token,
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}