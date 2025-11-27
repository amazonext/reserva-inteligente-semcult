import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";

const API = "http://localhost:8000/api/auth";

export function useAuth() {
    const { setToken, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async ({ email, password }) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(`${API}/login`, { email, password });
            const { access_token, refresh_token, name } = response.data;

            // Salva token e usuário no localStorage
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            localStorage.setItem("user", JSON.stringify({ name, email }));

            // Atualiza context
            setToken(access_token);
            setUser({ name, email });

            return true;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    return { login, logout, loading, error };
}