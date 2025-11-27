import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000/api/requests";

export function useRequest() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Criar uma nova solicitação
    const createRequest = async (payload) => {
        try {
            setLoading(true);
            setError(null);

            // Convertendo datas para string ISO, para evitar erro JSON serialization
            const payloadWithDates = {
                ...payload,
                start_time: payload.start_time instanceof Date ? payload.start_time.toISOString() : payload.start_time,
                end_time: payload.end_time instanceof Date ? payload.end_time.toISOString() : payload.end_time,
            };

            const response = await axios.post(API, payloadWithDates);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Buscar todas as solicitações
    const getRequests = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(API);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    // Atualizar status de uma solicitação
    const updateRequestStatus = async (id, status) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.patch(`${API}/${id}`, { status });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        createRequest,
        getRequests,
        updateRequestStatus,
        loading,
        error,
    };
}