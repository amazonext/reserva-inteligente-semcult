import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000/api/events";

export function useEvent() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createEvent = async (payload) => {
        try {
            setLoading(true);
            setError(null);

            // Transformação para atender o DB
            const dbPayload = { ...payload, location_name: payload.location_name };
            const { data } = await axios.post(API, dbPayload);

            return data;
        } catch (err) {
            const message = err.response?.data?.detail?.message || err.message;
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getEvents = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(API);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.detail?.message || err.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const updateEvent = async (id, payload) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.put(`${API}/${id}`, payload);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.detail?.message || err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const deleteEvent = async (id) => {
        try {
            setLoading(true);
            setError(null);
            await axios.delete(`${API}/${id}`);
            return true;
        } catch (err) {
            setError(err.response?.data?.detail?.message || err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        createEvent,
        getEvents,
        updateEvent,
        deleteEvent,
        loading,
        error
    };
}