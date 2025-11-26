import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000/api/auth";

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

            // Persistência do token — pilar fundamental
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);

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

    return {
        register,
        login,
        loading,
        error,
    };
}