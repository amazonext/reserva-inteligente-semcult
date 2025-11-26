import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("access_token");
        if (stored) setToken(stored);
        setLoading(false);
    }, []);

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}