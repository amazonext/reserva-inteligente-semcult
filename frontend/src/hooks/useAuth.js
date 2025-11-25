import { useState, useEffect } from "react";
import axios from "axios";

const TOKEN_KEY = "supabase_jwt";

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            setUser({ token });
        } else {
            setUser(null);
        }
    }, [token]);

    const register = async (payload) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.post(`${API}/register`, payload);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || "Erro inesperado no registro");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const login = async (payload) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.post(`${API}/login`, payload);

            if (data?.access_token) {
                localStorage.setItem(TOKEN_KEY, data.access_token);
                setToken(data.access_token);
                setUser({ token: data.access_token });
            }

            return data;
        } catch (err) {
            const detail = err.response?.data?.detail;

            const formatted =
                typeof detail === "string"
                    ? detail
                    : detail?.error || detail?.message || "Erro inesperado no login";

            setError(formatted);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
    };

    return {
        register,
        login,
        logout,
        loading,
        error,
        token,
        user,
        isAuthenticated: !!token,
    };
}