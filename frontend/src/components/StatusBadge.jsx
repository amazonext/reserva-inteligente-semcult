import React from "react";

export const StatusBadge = ({ status }) => {
    const styles = {
        pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
        approved: "bg-green-100 text-green-700 border-green-200",
        rejected: "bg-red-100 text-red-700 border-red-200",
    };

    const labels = {
        pending: "Pendente",
        approved: "Aprovado",
        rejected: "Reprovado",
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
            {labels[status]}
        </span>
    );
};